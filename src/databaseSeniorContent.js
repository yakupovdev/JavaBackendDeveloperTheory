const method = (name, en, ru) => ({
  name,
  description: { en, ru },
});

const faq = (enQ, ruQ, enA, ruA) => ({
  question: { en: enQ, ru: ruQ },
  answer: { en: enA, ru: ruA },
});

const mechanics = (en, ru) => ({ en, ru });

const chapter = (enTitle, ruTitle, enBody, ruBody, points = [], examples = []) => ({
  title: { en: enTitle, ru: ruTitle },
  body: { en: enBody, ru: ruBody },
  points,
  examples,
});

const p = (en, ru) => ({ en, ru });

export const databaseSeniorTopics = [
  {
    id: 'database-transactions-acid-isolation',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'Database Transactions: ACID, Isolation & Locks', ru: 'Транзакции БД: ACID, isolation и locks' },
    intro: {
      en: 'Senior backend work requires knowing what a transaction guarantees, what it does not guarantee, and how Spring, Hibernate, JDBC, and PostgreSQL cooperate.',
      ru: 'Senior backend требует понимать, что transaction гарантирует, что не гарантирует, и как вместе работают Spring, Hibernate, JDBC и PostgreSQL.',
    },
    deepDive: {
      en: 'A transaction is a consistency boundary. Application code decides the business unit of work, Spring opens and closes the boundary, JDBC carries commands over one connection, Hibernate flushes object changes into SQL, and the database enforces isolation, constraints, locks, WAL, commit, and rollback. ACID is not a marketing acronym: it is a set of trade-offs. Atomicity prevents half-written work, consistency relies on constraints plus correct domain logic, isolation defines what concurrent work can observe, and durability defines what survives a crash after commit.',
      ru: 'Transaction - это consistency boundary. Application code выбирает business unit of work, Spring открывает и закрывает boundary, JDBC отправляет команды по одному connection, Hibernate flush-ит object changes в SQL, а database обеспечивает isolation, constraints, locks, WAL, commit и rollback. ACID - не рекламная аббревиатура, а набор trade-offs. Atomicity защищает от half-written work, consistency держится на constraints плюс корректной domain logic, isolation определяет, что видит concurrent work, durability определяет, что переживет crash после commit.',
    },
    mechanics: [
      mechanics('A Spring transaction usually binds one JDBC connection to the current thread until commit or rollback.', 'Spring transaction обычно binds one JDBC connection к current thread до commit или rollback.'),
      mechanics('Hibernate dirty checking does not commit data. It only creates SQL during flush; the database transaction can still roll back.', 'Hibernate dirty checking не commit-ит data. Он только создает SQL during flush; database transaction все еще может rollback.'),
      mechanics('PostgreSQL MVCC gives snapshots, but locks still exist for writers, DDL, constraints, and explicit SELECT FOR UPDATE.', 'PostgreSQL MVCC дает snapshots, но locks все еще существуют для writers, DDL, constraints и explicit SELECT FOR UPDATE.'),
      mechanics('Higher isolation can improve correctness but reduce throughput and require retry handling.', 'Более высокий isolation может улучшить correctness, но снизить throughput и потребовать retry handling.'),
    ],
    diagram: `sequenceDiagram
participant Service
participant SpringTx as Spring transaction proxy
participant Pool as HikariCP pool
participant Hibernate
participant DB as PostgreSQL
Service->>SpringTx: call @Transactional method
SpringTx->>Pool: borrow JDBC connection
SpringTx->>DB: begin / set isolation
Service->>Hibernate: mutate entities
Hibernate->>DB: flush SQL
SpringTx->>DB: commit or rollback
SpringTx->>Pool: return connection`,
    methods: [
      method('BEGIN', 'Starts an explicit database transaction.', 'Запускает explicit database transaction.'),
      method('COMMIT', 'Makes transaction changes durable and visible according to isolation rules.', 'Делает changes durable и visible согласно isolation rules.'),
      method('ROLLBACK', 'Aborts transaction work and releases locks.', 'Отменяет работу transaction и освобождает locks.'),
      method('SAVEPOINT', 'Creates a rollback point inside a transaction.', 'Создает точку rollback внутри transaction.'),
      method('@Transactional', 'Defines a Spring transaction boundary around a proxied method call.', 'Задает Spring transaction boundary вокруг proxied method call.'),
      method('SELECT FOR UPDATE', 'Locks selected rows for update until transaction end.', 'Блокирует выбранные rows для update до конца transaction.'),
    ],
    examples: [
      `@Service
class TransferService {
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void transfer(long fromId, long toId, BigDecimal amount) {
        Account from = accounts.findForUpdate(fromId);
        Account to = accounts.findForUpdate(toId);

        from.withdraw(amount);
        to.deposit(amount);
    }
}`,
      `begin isolation level repeatable read;

select sum(balance)
from account
where customer_id = 42;

-- same transaction sees the same snapshot for later reads
select sum(balance)
from account
where customer_id = 42;

commit;`,
      `@Retryable(
    retryFor = CannotSerializeTransactionException.class,
    maxAttempts = 3
)
@Transactional(isolation = Isolation.SERIALIZABLE)
public void closePeriod(long periodId) {
    accounting.closePeriod(periodId);
}`,
    ],
    chapters: [
      chapter('ACID: exact meaning', 'ACID: точный смысл', 'ACID explains transaction guarantees, but each letter has boundaries.', 'ACID объясняет guarantees transaction, но у каждой буквы есть границы.', [
        p('Atomicity means all-or-nothing for one transaction. If one statement fails and transaction rolls back, earlier statements in that transaction do not become committed business facts.', 'Atomicity означает all-or-nothing для одной transaction. Если statement падает и transaction rolls back, ранние statements этой transaction не становятся committed business facts.'),
        p('Consistency means the database moves between valid states. The database enforces declared constraints, but it cannot know every business rule unless you encode it with constraints, locks, or transaction logic.', 'Consistency означает переход database между valid states. Database enforced declared constraints, но не знает все business rules, если вы не encoded их constraints, locks или transaction logic.'),
        p('Isolation means concurrent transactions should not observe each other in ways forbidden by the chosen isolation level.', 'Isolation означает, что concurrent transactions не должны видеть друг друга способами, запрещенными выбранным isolation level.'),
        p('Durability means a committed transaction survives crash according to WAL and fsync settings. In PostgreSQL, synchronous_commit changes latency and durability trade-offs.', 'Durability означает, что committed transaction переживает crash согласно WAL и fsync settings. В PostgreSQL synchronous_commit меняет latency и durability trade-offs.'),
      ]),
      chapter('Transaction lifecycle', 'Жизненный цикл transaction', 'A transaction is a stateful interaction over one database connection.', 'Transaction - stateful interaction по одному database connection.', [
        p('Spring proxy enters the method and asks the transaction manager to start or join a transaction.', 'Spring proxy входит в method и просит transaction manager start или join transaction.'),
        p('A JDBC connection is borrowed from the pool and usually has autoCommit disabled for the transaction.', 'JDBC connection берется из pool и обычно получает autoCommit disabled на время transaction.'),
        p('Hibernate creates or joins a persistence context. Managed entities are tracked inside it.', 'Hibernate создает или joins persistence context. Managed entities tracked внутри него.'),
        p('Flush sends SQL, but commit is still separate. Constraint errors can appear at flush or commit depending on constraint type.', 'Flush отправляет SQL, но commit все еще отдельный шаг. Constraint errors могут появиться на flush или commit в зависимости от constraint type.'),
        p('After commit or rollback, Spring unbinds resources and the connection returns to the pool.', 'После commit или rollback Spring unbinds resources, и connection возвращается в pool.'),
      ]),
      chapter('Common anomalies', 'Типовые anomalies', 'Isolation levels exist because concurrent transactions can produce surprising histories.', 'Isolation levels существуют, потому что concurrent transactions могут давать неожиданные histories.', [
        p('Dirty read: reading uncommitted data from another transaction. PostgreSQL prevents it even at READ UNCOMMITTED syntax.', 'Dirty read: чтение uncommitted data другой transaction. PostgreSQL предотвращает это даже при READ UNCOMMITTED syntax.'),
        p('Non-repeatable read: a row read twice in one transaction has different committed values.', 'Non-repeatable read: row, прочитанная дважды в одной transaction, имеет разные committed values.'),
        p('Phantom read: repeating a predicate query returns different row set because another transaction inserted or deleted matching rows.', 'Phantom read: повтор predicate query возвращает другой row set, потому что другая transaction inserted/deleted matching rows.'),
        p('Lost update: two transactions read the same value and overwrite each other without detecting conflict.', 'Lost update: две transactions читают одно value и overwrite друг друга без conflict detection.'),
        p('Write skew: two transactions read overlapping data, update different rows, and together violate an invariant.', 'Write skew: две transactions читают overlapping data, update different rows и вместе violate invariant.'),
      ]),
      chapter('Isolation levels decision table', 'Таблица выбора isolation levels', 'Isolation choice is a business and performance decision.', 'Выбор isolation - business и performance decision.', [
        p('READ COMMITTED: default PostgreSQL level. Best default for OLTP services with constraints, row locks, and optimistic locking where needed.', 'READ COMMITTED: default PostgreSQL level. Лучший default для OLTP services с constraints, row locks и optimistic locking где нужно.'),
        p('REPEATABLE READ: stable snapshot for multi-step reads. Good for reports or calculations that must not see changing data during one transaction.', 'REPEATABLE READ: stable snapshot для multi-step reads. Хорош для reports или calculations, которые не должны видеть changing data внутри одной transaction.'),
        p('SERIALIZABLE: strongest correctness for complex invariants. Use only with retry because PostgreSQL can abort transactions to preserve serial order.', 'SERIALIZABLE: strongest correctness для complex invariants. Используйте только с retry, потому что PostgreSQL может abort transactions для сохранения serial order.'),
        p('Explicit locks can be clearer than SERIALIZABLE when the resource set is known, for example one account row, inventory row, or queue item.', 'Explicit locks могут быть понятнее SERIALIZABLE, когда resource set известен: account row, inventory row или queue item.'),
      ]),
      chapter('Spring propagation and rollback', 'Spring propagation и rollback', 'Propagation defines transaction composition across method calls.', 'Propagation определяет composition transactions между method calls.', [
        p('REQUIRED is default: join existing transaction or create a new one. It is correct for most service use cases.', 'REQUIRED - default: join existing transaction или create new one. Это корректно для большинства service use cases.'),
        p('REQUIRES_NEW suspends outer transaction and borrows another connection. It commits independently, so outer rollback will not undo it.', 'REQUIRES_NEW suspends outer transaction и берет another connection. Он commits independently, поэтому outer rollback его не undo.'),
        p('NESTED uses savepoints when supported. It is not the same as independent commit.', 'NESTED использует savepoints, если supported. Это не independent commit.'),
        p('By default Spring rolls back on RuntimeException and Error. Checked exceptions need rollbackFor if they mean transaction failure.', 'По default Spring rollback on RuntimeException и Error. Checked exceptions требуют rollbackFor, если означают transaction failure.'),
      ]),
      chapter('Retry policy', 'Retry policy', 'Some database failures are expected under concurrency and should be retried only when safe.', 'Некоторые database failures ожидаемы при concurrency и должны retry-иться только когда safe.', [
        p('Deadlock loser should usually be retried if the operation is idempotent or has idempotency key.', 'Deadlock loser обычно стоит retry-ить, если operation idempotent или имеет idempotency key.'),
        p('Serialization failure under SERIALIZABLE is normal. Retry the whole transaction, not only the failed SQL statement.', 'Serialization failure под SERIALIZABLE - нормальная ситуация. Retry-ьте всю transaction, а не только failed SQL statement.'),
        p('Unique violation is usually not transient. It often means business conflict and should map to 409 Conflict.', 'Unique violation обычно не transient. Часто это business conflict и должен map-иться в 409 Conflict.'),
        p('Connection timeout may mean pool saturation, database outage, leaked connections, or transactions held too long.', 'Connection timeout может означать pool saturation, database outage, leaked connections или слишком долгие transactions.'),
      ]),
      chapter('Distributed consistency', 'Distributed consistency', 'A local database transaction cannot atomically commit remote HTTP calls.', 'Local database transaction не может atomically commit remote HTTP calls.', [
        p('Do not hold DB transaction open while calling another service if the workflow can be redesigned.', 'Не держите DB transaction open во время call another service, если workflow можно redesign.'),
        p('Use outbox to atomically store state change and event in one local transaction, then publish asynchronously.', 'Используйте outbox, чтобы atomically store state change и event в одной local transaction, затем publish asynchronously.'),
        p('Use saga or process manager for multi-service workflows with compensating actions.', 'Используйте saga или process manager для multi-service workflows с compensating actions.'),
      ]),
    ],
    faq: [
      faq('Does ACID mean no concurrency bugs?', 'ACID означает, что concurrency bugs невозможны?', 'No. ACID depends on isolation level, constraints, locks, retry policy, and correct transaction boundaries.', 'Нет. ACID зависит от isolation level, constraints, locks, retry policy и correct transaction boundaries.'),
      faq('Why not always use SERIALIZABLE?', 'Почему не всегда использовать SERIALIZABLE?', 'It can reduce throughput and cause serialization failures that require whole-transaction retries.', 'Он может снижать throughput и вызывать serialization failures, требующие retry всей transaction.'),
      faq('Is readOnly a real database lock?', 'readOnly - это реальный database lock?', 'No. In Spring it mostly communicates intent and can optimize ORM behavior. Use database users or transaction settings for enforcement.', 'Нет. В Spring это в основном communicates intent и может optimize ORM behavior. Для enforcement используйте database users или transaction settings.'),
      faq('What is the safest transaction boundary?', 'Какая transaction boundary самая безопасная?', 'A service-level use case that is short, explicit, observable, and does not include slow remote calls.', 'Service-level use case: short, explicit, observable и без slow remote calls.'),
    ],
  },
  {
    id: 'connection-pooling-hikaricp',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'Connection Pooling: HikariCP, JDBC & PostgreSQL', ru: 'Connection pooling: HikariCP, JDBC и PostgreSQL' },
    intro: {
      en: 'A connection pool is a concurrency control and resource reuse mechanism between a Java service and a database.',
      ru: 'Connection pool - это механизм concurrency control и resource reuse между Java service и database.',
    },
    deepDive: {
      en: 'Opening a database connection is expensive: TCP, TLS if enabled, authentication, backend process or session allocation, memory, and server-side state. A pool keeps a bounded set of physical JDBC connections and gives application code short-lived logical handles. Calling close on a pooled connection returns it to the pool, not to the operating system. Correct pool design prevents connection storms, caps database pressure, exposes backpressure, and makes slow transactions visible.',
      ru: 'Открытие database connection дорогое: TCP, TLS если включен, authentication, backend process или session allocation, memory и server-side state. Pool держит bounded set physical JDBC connections и выдает application code short-lived logical handles. close на pooled connection возвращает его в pool, а не в operating system. Правильный pool design предотвращает connection storms, ограничивает давление на database, создает backpressure и делает slow transactions visible.',
    },
    mechanics: [
      mechanics('HikariCP returns proxy Connection objects. close() returns the connection to the pool.', 'HikariCP возвращает proxy Connection objects. close() возвращает connection в pool.'),
      mechanics('If all connections are active, a borrower waits up to connectionTimeout and then fails.', 'Если все connections active, borrower ждет до connectionTimeout и затем падает.'),
      mechanics('A Spring transaction keeps its borrowed connection until transaction completion.', 'Spring transaction держит borrowed connection до completion transaction.'),
      mechanics('Pool size must be planned across all service replicas, not per instance in isolation.', 'Pool size нужно планировать по всем service replicas, а не per instance отдельно.'),
    ],
    diagram: `flowchart LR
requests["Request threads"] --> pool["HikariCP pool"]
pool --> idle["Idle connections"]
pool --> active["Active borrowed connections"]
active --> tx["Spring transaction"]
tx --> db["PostgreSQL backends"]
pool --> waiters["Waiting borrowers"]
waiters --> timeout["connectionTimeout"]`,
    methods: [
      method('maximumPoolSize', 'Upper bound for physical connections in one application instance.', 'Верхняя граница physical connections в одном application instance.'),
      method('minimumIdle', 'Target number of idle connections kept ready.', 'Target number idle connections, которые pool держит готовыми.'),
      method('connectionTimeout', 'How long a thread waits for a connection before failing.', 'Сколько thread ждет connection перед failure.'),
      method('maxLifetime', 'Maximum age of a physical connection before retirement.', 'Максимальный age physical connection перед retirement.'),
      method('leakDetectionThreshold', 'Logs when a borrowed connection is not returned in time.', 'Логирует borrowed connection, который не вернули вовремя.'),
      method('idleTimeout', 'How long extra idle connections can stay before being closed.', 'Сколько extra idle connections могут жить перед close.'),
    ],
    examples: [
      `spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=1000
spring.datasource.hikari.validation-timeout=500
spring.datasource.hikari.max-lifetime=1800000
spring.datasource.hikari.leak-detection-threshold=10000`,
      `@Transactional
public void checkout(long cartId) {
    // One connection is borrowed and bound to this thread.
    Cart cart = carts.findById(cartId).orElseThrow();
    cart.checkout();

    // Avoid slow remote calls here if possible.
    // The connection stays occupied until commit or rollback.
}`,
      `// Bad pool math:
// 8 service replicas * maximumPoolSize 50 = 400 possible DB connections.
// If PostgreSQL max_connections is 300, incidents are waiting nearby.

// Start lower, measure active connections, wait time, DB CPU, locks, and latency.`,
    ],
    chapters: [
      chapter('Why pools exist', 'Зачем нужны pools', 'A database connection is not a cheap object allocation.', 'Database connection - это не дешевый object allocation.', [
        p('Connection creation includes network handshake, authentication, session initialization, and server memory.', 'Connection creation включает network handshake, authentication, session initialization и server memory.'),
        p('PostgreSQL commonly has one backend process per connection, so too many connections can hurt the database.', 'PostgreSQL обычно имеет one backend process per connection, поэтому слишком много connections может вредить database.'),
        p('The pool limits concurrency. This is a feature: it protects the database and pushes overload back to the application.', 'Pool ограничивает concurrency. Это feature: он защищает database и возвращает overload в application.'),
      ]),
      chapter('Borrow and return lifecycle', 'Lifecycle borrow и return', 'Application code borrows a logical connection and returns it quickly.', 'Application code берет logical connection и быстро возвращает его.', [
        p('If an idle connection exists, Hikari marks it active and returns a proxy.', 'Если idle connection существует, Hikari marks it active и возвращает proxy.'),
        p('If no idle connection exists and pool is below maximumPoolSize, Hikari can create a new physical connection.', 'Если idle connection нет и pool ниже maximumPoolSize, Hikari может create new physical connection.'),
        p('If pool is full, the request waits. This wait time is a key saturation signal.', 'Если pool full, request waits. Это wait time - ключевой saturation signal.'),
        p('When application calls close, Hikari resets tracked state and returns connection to idle pool.', 'Когда application calls close, Hikari resets tracked state и возвращает connection в idle pool.'),
      ]),
      chapter('Pool sizing', 'Размер pool', 'A pool should match database capacity and workload, not the number of HTTP threads.', 'Pool должен соответствовать database capacity и workload, а не количеству HTTP threads.', [
        p('Total possible connections equals replicas multiplied by maximumPoolSize plus migrations, jobs, admin sessions, and monitoring.', 'Total possible connections = replicas * maximumPoolSize плюс migrations, jobs, admin sessions и monitoring.'),
        p('More connections do not always mean more throughput. Past a point they add CPU switching, memory, locks, and I/O contention.', 'Больше connections не всегда больше throughput. После точки они добавляют CPU switching, memory, locks и I/O contention.'),
        p('Use metrics: active connections, idle connections, pending threads, acquire time, usage time, DB CPU, lock waits, and p95 latency.', 'Используйте metrics: active connections, idle connections, pending threads, acquire time, usage time, DB CPU, lock waits и p95 latency.'),
        p('A small fast pool often beats a huge saturated pool.', 'Small fast pool часто лучше huge saturated pool.'),
      ]),
      chapter('Spring transaction interaction', 'Связь со Spring transaction', 'Spring transaction scope directly controls how long a connection is occupied.', 'Spring transaction scope напрямую управляет тем, как долго connection occupied.', [
        p('A @Transactional method can borrow a connection when DB access first happens, then keep it until completion.', '@Transactional method может borrow connection при первом DB access и держать его до completion.'),
        p('Nested repository calls inside the same transaction reuse the thread-bound connection.', 'Nested repository calls внутри той же transaction reuse thread-bound connection.'),
        p('REQUIRES_NEW can need another connection while the outer transaction still holds its own.', 'REQUIRES_NEW может потребовать another connection, пока outer transaction все еще держит свое.'),
        p('Long transactions are pool killers because they occupy connections even while waiting for remote services.', 'Long transactions - pool killers, потому что занимают connections даже во время ожидания remote services.'),
      ]),
      chapter('Pool starvation patterns', 'Pool starvation patterns', 'Pool starvation means threads wait for connections instead of doing useful work.', 'Pool starvation означает, что threads ждут connections вместо useful work.', [
        p('Connection leak: code never closes connection or transaction never completes.', 'Connection leak: code never closes connection или transaction never completes.'),
        p('Slow query: connection is active for a long time because database work is slow.', 'Slow query: connection active долго, потому что database work slow.'),
        p('Remote call inside transaction: connection sits idle while thread waits for HTTP.', 'Remote call inside transaction: connection idle, пока thread ждет HTTP.'),
        p('Pool-lock deadlock: outer transaction holds a connection, inner REQUIRES_NEW waits for another connection, and all threads do the same.', 'Pool-lock deadlock: outer transaction держит connection, inner REQUIRES_NEW ждет another connection, и все threads делают то же самое.'),
      ]),
      chapter('Timeouts and lifetimes', 'Timeouts и lifetimes', 'Timeouts turn invisible waiting into controlled failure.', 'Timeouts превращают invisible waiting в controlled failure.', [
        p('connectionTimeout should be short enough to fail fast during saturation, not hang request threads forever.', 'connectionTimeout должен быть short enough, чтобы fail fast during saturation, а не hang request threads forever.'),
        p('maxLifetime should be shorter than database, proxy, or load balancer connection lifetime.', 'maxLifetime должен быть меньше database, proxy или load balancer connection lifetime.'),
        p('statement_timeout and lock_timeout belong in the database/session layer and protect against runaway SQL.', 'statement_timeout и lock_timeout живут в database/session layer и защищают от runaway SQL.'),
        p('leakDetectionThreshold is diagnostic, not a production cure. Use it to find long-held connections.', 'leakDetectionThreshold - diagnostic, а не production cure. Используйте его, чтобы найти long-held connections.'),
      ]),
      chapter('Connection state reset', 'Reset состояния connection', 'A returned connection must not poison the next borrower.', 'Returned connection не должен poison следующего borrower.', [
        p('Pool tracks and resets common JDBC state such as autoCommit, readOnly, isolation, catalog, schema, and network timeout.', 'Pool tracks and resets common JDBC state: autoCommit, readOnly, isolation, catalog, schema и network timeout.'),
        p('SQL session state changed through raw SET can leak if not scoped. Prefer SET LOCAL inside transaction.', 'SQL session state через raw SET может leak, если не scoped. Предпочитайте SET LOCAL внутри transaction.'),
        p('Temporary tables, session variables, advisory locks, and prepared statement caches need careful ownership rules.', 'Temporary tables, session variables, advisory locks и prepared statement caches требуют careful ownership rules.'),
      ]),
      chapter('Monitoring checklist', 'Monitoring checklist', 'Connection pools must be observed like thread pools.', 'Connection pools нужно наблюдать как thread pools.', [
        p('Watch active, idle, pending, acquire duration, usage duration, creation failures, and timeout count.', 'Следите за active, idle, pending, acquire duration, usage duration, creation failures и timeout count.'),
        p('Correlate pool metrics with DB metrics: max connections, wait events, locks, CPU, I/O, slow queries, and deadlocks.', 'Correlate pool metrics с DB metrics: max connections, wait events, locks, CPU, I/O, slow queries и deadlocks.'),
        p('A full pool is a symptom. The root cause may be slow SQL, locks, leaks, remote calls inside transactions, or too many replicas.', 'Full pool - symptom. Root cause может быть slow SQL, locks, leaks, remote calls inside transactions или too many replicas.'),
      ]),
    ],
    faq: [
      faq('Does a bigger pool always help?', 'Больший pool всегда помогает?', 'No. Bigger pools can overload PostgreSQL, increase lock contention, and make latency worse.', 'Нет. Bigger pools могут overload PostgreSQL, увеличить lock contention и ухудшить latency.'),
      faq('What happens when I call close on a pooled connection?', 'Что происходит при close pooled connection?', 'The logical connection is returned to the pool. The physical database connection usually stays open for reuse.', 'Logical connection возвращается в pool. Physical database connection обычно остается open для reuse.'),
      faq('Why do remote calls inside @Transactional hurt pools?', 'Почему remote calls внутри @Transactional вредят pools?', 'The transaction keeps a connection while waiting for a remote system, so pool capacity is wasted.', 'Transaction держит connection во время ожидания remote system, поэтому pool capacity wasted.'),
      faq('How do I choose maximumPoolSize?', 'Как выбрать maximumPoolSize?', 'Start from total database capacity, replica count, workload measurements, transaction duration, and pool wait metrics.', 'Начните с total database capacity, replica count, workload measurements, transaction duration и pool wait metrics.'),
    ],
  },
];

export const databaseSeniorChapterExpansions = {
  'jdbc-database-development': [
    chapter('JDBC connection lifecycle in production', 'JDBC connection lifecycle в production', 'JDBC code should borrow a connection late, use it briefly, and return it reliably.', 'JDBC code должен borrow connection late, use briefly и return reliably.', [
      p('DataSource is preferred over DriverManager in applications because DataSource can be backed by a pool.', 'DataSource предпочтительнее DriverManager в applications, потому что DataSource может быть backed by pool.'),
      p('try-with-resources is mandatory style for raw JDBC because close returns pooled resources.', 'try-with-resources - mandatory style для raw JDBC, потому что close возвращает pooled resources.'),
      p('Connection leaks often appear as pool timeouts, rising request latency, and threads stuck waiting for a connection.', 'Connection leaks часто проявляются как pool timeouts, rising request latency и threads stuck waiting for connection.'),
    ], [
      `try (Connection connection = dataSource.getConnection()) {
    connection.setAutoCommit(false);
    try {
        // execute multiple statements
        connection.commit();
    } catch (Exception ex) {
        connection.rollback();
        throw ex;
    }
}`,
    ]),
    chapter('PreparedStatement, batching, and fetch size', 'PreparedStatement, batching и fetch size', 'PreparedStatement is both a safety tool and a performance tool.', 'PreparedStatement - и safety tool, и performance tool.', [
      p('Parameter binding prevents SQL injection because values are not parsed as SQL syntax.', 'Parameter binding предотвращает SQL injection, потому что values не parsed как SQL syntax.'),
      p('Batching reduces round trips for many inserts or updates, but errors must be handled carefully.', 'Batching снижает round trips для many inserts/updates, но errors нужно handle carefully.'),
      p('Fetch size can avoid loading huge result sets into memory at once when driver and transaction settings support cursor behavior.', 'Fetch size может avoid loading huge result sets into memory at once, когда driver и transaction settings поддерживают cursor behavior.'),
    ], [
      `try (PreparedStatement statement = connection.prepareStatement(
    "insert into audit_log(event_type, payload) values (?, ?::jsonb)"
)) {
    for (AuditEvent event : events) {
        statement.setString(1, event.type());
        statement.setString(2, event.payloadJson());
        statement.addBatch();
    }
    statement.executeBatch();
}`,
    ]),
    chapter('JDBC transaction isolation', 'JDBC transaction isolation', 'JDBC exposes isolation through Connection, but the database decides the exact semantics.', 'JDBC exposes isolation через Connection, но database решает exact semantics.', [
      p('Connection.TRANSACTION_READ_COMMITTED maps to PostgreSQL READ COMMITTED.', 'Connection.TRANSACTION_READ_COMMITTED maps to PostgreSQL READ COMMITTED.'),
      p('Connection.TRANSACTION_REPEATABLE_READ maps to PostgreSQL REPEATABLE READ snapshot behavior.', 'Connection.TRANSACTION_REPEATABLE_READ maps to PostgreSQL REPEATABLE READ snapshot behavior.'),
      p('Connection.TRANSACTION_SERIALIZABLE maps to PostgreSQL Serializable Snapshot Isolation and requires retry on serialization failures.', 'Connection.TRANSACTION_SERIALIZABLE maps to PostgreSQL Serializable Snapshot Isolation и требует retry on serialization failures.'),
      p('Always reset connection state or rely on a pool that tracks and resets state before reuse.', 'Всегда reset connection state или полагайтесь на pool, который tracks/resets state before reuse.'),
    ]),
  ],
  'spring-framework-essentials': [
    chapter('Transaction manager selection', 'Выбор transaction manager', 'Spring transaction behavior depends on the transaction manager and resource type.', 'Spring transaction behavior зависит от transaction manager и resource type.', [
      p('DataSourceTransactionManager controls plain JDBC transactions over a DataSource.', 'DataSourceTransactionManager управляет plain JDBC transactions over DataSource.'),
      p('JpaTransactionManager coordinates EntityManager, persistence context, flush, and JDBC connection underneath.', 'JpaTransactionManager координирует EntityManager, persistence context, flush и JDBC connection underneath.'),
      p('JtaTransactionManager exists for distributed/JTA transactions, but many modern systems avoid XA and use outbox/sagas.', 'JtaTransactionManager существует для distributed/JTA transactions, но многие modern systems avoid XA и используют outbox/sagas.'),
    ]),
    chapter('Transaction boundaries as architecture', 'Transaction boundaries как архитектура', 'A transaction boundary is an architectural decision, not just an annotation.', 'Transaction boundary - architectural decision, не просто annotation.', [
      p('Put @Transactional on service use cases, not controllers, because service methods know business consistency boundaries.', 'Ставьте @Transactional на service use cases, а не controllers, потому что service methods знают business consistency boundaries.'),
      p('Keep transaction scope short. Validate input before opening transaction when possible.', 'Держите transaction scope short. Validate input до opening transaction, когда возможно.'),
      p('Do not include slow network calls, file processing, or user waits inside DB transactions unless there is a deliberate reason.', 'Не включайте slow network calls, file processing или user waits внутри DB transactions без deliberate reason.'),
    ]),
    chapter('Isolation level trade-offs in Spring', 'Trade-offs isolation в Spring', 'Spring isolation enum is easy to set, but hard to choose correctly.', 'Spring isolation enum легко поставить, но сложно выбрать correctly.', [
      p('DEFAULT is usually best until a use case proves it needs stronger semantics.', 'DEFAULT обычно лучший, пока use case не докажет, что нужны stronger semantics.'),
      p('READ_COMMITTED is the PostgreSQL default and works well with constraints and explicit row locks.', 'READ_COMMITTED - PostgreSQL default и хорошо работает с constraints и explicit row locks.'),
      p('REPEATABLE_READ helps stable reports but can hold snapshots longer and delay vacuum cleanup if transactions run too long.', 'REPEATABLE_READ помогает stable reports, но может hold snapshots longer и delay vacuum cleanup, если transactions run too long.'),
      p('SERIALIZABLE needs retry support and should be reserved for real invariant protection.', 'SERIALIZABLE требует retry support и должен reserved для real invariant protection.'),
    ]),
  ],
  'spring-boot-production-internals': [
    chapter('Spring Boot DataSource auto-configuration', 'Spring Boot DataSource auto-configuration', 'Boot creates a DataSource when JDBC dependencies and datasource properties are present.', 'Boot создает DataSource, когда есть JDBC dependencies и datasource properties.', [
      p('With HikariCP on the classpath, Boot uses HikariCP as the default pool in common servlet applications.', 'С HikariCP on classpath Boot использует HikariCP as default pool в common servlet applications.'),
      p('DataSource properties configure URL, username, password, driver, and pool-specific Hikari settings.', 'DataSource properties configure URL, username, password, driver и pool-specific Hikari settings.'),
      p('Actuator and Micrometer can expose Hikari metrics such as active, idle, pending, max, min, and acquire time.', 'Actuator и Micrometer могут expose Hikari metrics: active, idle, pending, max, min и acquire time.'),
    ]),
    chapter('Production HikariCP settings', 'Production HikariCP settings', 'Pool settings are capacity controls and should be reviewed like thread pool settings.', 'Pool settings - capacity controls, их нужно review-ить как thread pool settings.', [
      p('maximumPoolSize is per application instance. Multiply it by replica count before comparing to PostgreSQL max_connections.', 'maximumPoolSize per application instance. Multiply by replica count перед сравнением с PostgreSQL max_connections.'),
      p('connectionTimeout should be bounded and visible in logs/metrics. Infinite waiting hides incidents.', 'connectionTimeout должен быть bounded и visible in logs/metrics. Infinite waiting hides incidents.'),
      p('maxLifetime should be lower than database, proxy, and load balancer connection timeouts.', 'maxLifetime должен быть ниже database, proxy и load balancer connection timeouts.'),
      p('leakDetectionThreshold is useful in test/staging and during incidents, but it is not a replacement for correct transaction scope.', 'leakDetectionThreshold полезен в test/staging и incidents, но не заменяет correct transaction scope.'),
    ], [
      `management.metrics.enable.hikaricp=true
spring.datasource.hikari.maximum-pool-size=16
spring.datasource.hikari.connection-timeout=1000
spring.datasource.hikari.max-lifetime=1740000
spring.datasource.hikari.leak-detection-threshold=10000`,
    ]),
  ],
  'orm-jpa-hibernate': [
    chapter('Spring Data JPA repository internals', 'Spring Data JPA repository internals', 'Spring Data JPA creates repository proxies that delegate to generated query implementations and SimpleJpaRepository.', 'Spring Data JPA создает repository proxies, которые delegate to generated query implementations и SimpleJpaRepository.', [
      p('Repository interfaces are not implemented by your code. Spring creates proxy objects through repository factory infrastructure.', 'Repository interfaces не implemented вашим code. Spring создает proxy objects через repository factory infrastructure.'),
      p('Derived query methods are parsed from names, matched against entity metadata, and converted to JPQL/Criteria behavior.', 'Derived query methods parsed from names, matched against entity metadata и converted to JPQL/Criteria behavior.'),
      p('@Query bypasses name parsing and defines JPQL or native SQL explicitly.', '@Query bypasses name parsing и явно defines JPQL/native SQL.'),
      p('The proxy still uses EntityManager underneath, so persistence context, flushing, and transactions still matter.', 'Proxy все равно uses EntityManager underneath, поэтому persistence context, flushing и transactions все еще важны.'),
    ]),
    chapter('JpaRepository method semantics', 'Семантика методов JpaRepository', 'Common repository methods have important persistence-context behavior.', 'Common repository methods имеют важное persistence-context behavior.', [
      p('findById usually uses EntityManager.find and returns a managed entity when inside an open persistence context.', 'findById обычно uses EntityManager.find и returns managed entity внутри open persistence context.'),
      p('getReferenceById returns a lazy reference/proxy and can defer SELECT until state is accessed.', 'getReferenceById returns lazy reference/proxy и может defer SELECT до доступа к state.'),
      p('save on a new entity calls persist or equivalent new-state handling. save on detached existing entity usually calls merge.', 'save на new entity calls persist или equivalent new-state handling. save на detached existing entity обычно calls merge.'),
      p('merge returns a managed copy. The detached instance you passed remains detached.', 'merge returns managed copy. Detached instance, который вы передали, остается detached.'),
      p('delete may require loading or referencing entity and executes SQL on flush, not necessarily immediately.', 'delete может require loading/reference entity и executes SQL on flush, не обязательно immediately.'),
    ], [
      `@Transactional
void rename(long id, String newName) {
    User user = users.findById(id).orElseThrow(); // managed
    user.rename(newName);

    // save is not required here. Dirty checking flushes UPDATE.
}`,
      `@Transactional
void mergeDetached(User detached) {
    User managed = entityManager.merge(detached);
    managed.markVerified();

    // detached is still detached. Changes to detached are not tracked.
}`,
    ]),
    chapter('Repository transactions', 'Transactions в repositories', 'Repository methods can be transactional, but service-level transactions should define business consistency.', 'Repository methods могут быть transactional, но service-level transactions должны define business consistency.', [
      p('Spring Data JPA read methods are commonly read-only by default through SimpleJpaRepository configuration.', 'Spring Data JPA read methods часто read-only by default через SimpleJpaRepository configuration.'),
      p('Write methods such as save/delete run in transactions, but multiple repository calls need one service transaction if they form one invariant.', 'Write methods вроде save/delete run in transactions, но multiple repository calls требуют one service transaction, если они form one invariant.'),
      p('An outer service @Transactional overrides repository transaction participation because repository joins existing transaction.', 'Outer service @Transactional overrides repository transaction participation, потому что repository joins existing transaction.'),
      p('Do not rely on repository method transactions to model a business use case that spans several operations.', 'Не rely on repository method transactions для business use case, который spans several operations.'),
    ]),
    chapter('Projections, EntityGraph, and pagination SQL', 'Projections, EntityGraph и pagination SQL', 'Spring Data JPA convenience APIs still create SQL that must match indexes and fetch plans.', 'Spring Data JPA convenience APIs все равно создают SQL, который должен match indexes и fetch plans.', [
      p('Interface projections can select fewer columns, but nested projections may trigger joins or additional queries depending on mapping.', 'Interface projections могут select fewer columns, но nested projections могут trigger joins/additional queries depending on mapping.'),
      p('DTO constructor projections are often clearer for read models and API responses.', 'DTO constructor projections часто яснее для read models и API responses.'),
      p('@EntityGraph changes fetch plan for a query and can solve N+1 without hardcoding join fetch JPQL.', '@EntityGraph меняет fetch plan for query и может solve N+1 без hardcoding join fetch JPQL.'),
      p('Page<T> usually needs a count query. Slice<T> avoids total count and can be cheaper for infinite scrolling.', 'Page<T> обычно требует count query. Slice<T> avoids total count и может быть дешевле для infinite scrolling.'),
    ], [
      `interface UserRow {
    Long getId();
    String getEmail();
}

@EntityGraph(attributePaths = {"roles"})
List<User> findByStatus(UserStatus status);

@Query("""
    select new com.example.UserSummary(u.id, u.email, count(o))
    from User u
    left join u.orders o
    group by u.id, u.email
""")
List<UserSummary> findSummaries();`,
    ]),
    chapter('EntityManager to JDBC connection timing', 'От EntityManager к JDBC connection', 'A persistence context is not the same as a physical database connection.', 'Persistence context - не то же самое, что physical database connection.', [
      p('EntityManager tracks entities. It may borrow a JDBC connection lazily when SQL is actually needed.', 'EntityManager tracks entities. Он может borrow JDBC connection lazily, когда SQL реально нужен.'),
      p('During a Spring transaction, the same connection is bound and reused for SQL work until transaction completion.', 'Во время Spring transaction same connection bound и reused для SQL work до completion.'),
      p('Flush needs a connection because it sends INSERT/UPDATE/DELETE to the database.', 'Flush требует connection, потому что sends INSERT/UPDATE/DELETE to database.'),
      p('A long persistence context with an open transaction can hold both memory and connection resources.', 'Long persistence context with open transaction может hold memory и connection resources.'),
    ]),
  ],
  'postgresql-sql-senior': [
    chapter('ACID and PostgreSQL implementation details', 'ACID и детали реализации PostgreSQL', 'PostgreSQL implements ACID through WAL, MVCC, locks, constraints, and transaction snapshots.', 'PostgreSQL implements ACID через WAL, MVCC, locks, constraints и transaction snapshots.', [
      p('Atomicity is supported by transaction status and visibility. Aborted transaction changes are not visible as committed data.', 'Atomicity поддерживается transaction status и visibility. Changes aborted transaction не visible как committed data.'),
      p('Consistency is as strong as declared constraints and application transaction logic.', 'Consistency настолько сильна, насколько declared constraints и application transaction logic.'),
      p('Isolation is implemented with snapshots and locks, not by running one transaction at a time.', 'Isolation реализован snapshots и locks, а не запуском transactions strictly one at a time.'),
      p('Durability is based on WAL flush behavior and settings such as synchronous_commit.', 'Durability основана на WAL flush behavior и settings вроде synchronous_commit.'),
    ]),
    chapter('Isolation differences in PostgreSQL', 'Разница isolation levels в PostgreSQL', 'The same SQL isolation names can behave differently across databases, so PostgreSQL details matter.', 'Одинаковые SQL isolation names могут behave differently across databases, поэтому PostgreSQL details важны.', [
      p('READ COMMITTED creates a new snapshot per statement. It is good for high-concurrency OLTP.', 'READ COMMITTED создает new snapshot per statement. Хорош для high-concurrency OLTP.'),
      p('REPEATABLE READ creates one snapshot per transaction. It is stable for reads, but not full serial execution.', 'REPEATABLE READ создает one snapshot per transaction. Он stable for reads, но не full serial execution.'),
      p('SERIALIZABLE uses SSI to detect dangerous structures. It can fail at commit and must be retried.', 'SERIALIZABLE uses SSI для detect dangerous structures. Может fail at commit и должен retry-иться.'),
      p('READ UNCOMMITTED is accepted but behaves like READ COMMITTED in PostgreSQL.', 'READ UNCOMMITTED accepted, но behaves like READ COMMITTED в PostgreSQL.'),
    ]),
  ],
  'sql-database-design-deep': [
    chapter('Transactions as schema design partner', 'Transactions как партнер schema design', 'Schema constraints and transaction logic must be designed together.', 'Schema constraints и transaction logic нужно проектировать вместе.', [
      p('A UNIQUE constraint can solve concurrency better than checking existence in application code.', 'UNIQUE constraint может решить concurrency лучше, чем checking existence в application code.'),
      p('Foreign keys protect relationships across services, jobs, migrations, and manual SQL.', 'Foreign keys защищают relationships across services, jobs, migrations и manual SQL.'),
      p('CHECK constraints stop invalid local row states even when a bug bypasses service validation.', 'CHECK constraints останавливают invalid local row states, даже если bug bypasses service validation.'),
      p('Transactions combine multiple constraints and state changes into one commit decision.', 'Transactions combine multiple constraints и state changes в one commit decision.'),
    ]),
    chapter('Connection pool aware schema work', 'Schema work с учетом connection pool', 'Migrations and slow queries consume the same database capacity as user requests.', 'Migrations и slow queries consume same database capacity, что и user requests.', [
      p('Large backfills should be batched to avoid holding locks, WAL pressure, and pool saturation.', 'Large backfills должны быть batched, чтобы avoid holding locks, WAL pressure и pool saturation.'),
      p('CREATE INDEX CONCURRENTLY reduces blocking but still consumes CPU, I/O, and maintenance slots.', 'CREATE INDEX CONCURRENTLY снижает blocking, но все равно consumes CPU, I/O и maintenance slots.'),
      p('Run dangerous maintenance with statement_timeout, lock_timeout, observability, and rollback plan.', 'Запускайте dangerous maintenance с statement_timeout, lock_timeout, observability и rollback plan.'),
    ]),
  ],
};
