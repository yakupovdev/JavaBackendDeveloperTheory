import { seniorChapterExpansions, seniorInterviewTopics } from './seniorTheoryContent.js';

const faq = (enQ, ruQ, enA, ruA) => ({
  question: { en: enQ, ru: ruQ },
  answer: { en: enA, ru: ruA },
});

const method = (name, en, ru) => ({
  name,
  description: { en, ru },
});

export const groups = [
  { id: 'language', title: { en: 'Language Model', ru: 'Модель языка' } },
  { id: 'runtime', title: { en: 'Runtime & Memory', ru: 'Runtime и память' } },
  { id: 'libraries', title: { en: 'Core Libraries', ru: 'Базовые библиотеки' } },
  { id: 'advanced', title: { en: 'Advanced Java Core', ru: 'Продвинутый Java Core' } },
];

export const content = [
  {
    id: 'java-basics-oop',
    groupId: 'language',
    title: { en: 'Java Basics & OOP', ru: 'Основы Java и ООП' },
    intro: {
      en: 'Java is a statically typed, class-based language where most domain models are expressed through objects, contracts, and composition.',
      ru: 'Java - статически типизированный язык, где доменная модель обычно выражается через объекты, контракты и композицию.',
    },
    deepDive: {
      en: 'Primitives store raw values, wrappers are objects and can be null, boxed, cached, and used with generics. OOP in Java is built around encapsulation, inheritance, polymorphism, and abstraction. Interfaces define capability contracts, abstract classes share state and partial behavior, enums are singleton instances, and Object defines identity methods. equals and hashCode must agree: equal objects must return the same hash code, otherwise hash-based collections lose entries.',
      ru: 'Примитивы хранят значения напрямую, wrappers являются объектами: могут быть null, участвуют в boxing, кешируются и подходят для generics. ООП в Java держится на инкапсуляции, наследовании, полиморфизме и абстракции. Интерфейсы задают контракт возможностей, abstract classes переиспользуют состояние и часть поведения, enum - singleton-экземпляры, а Object задает базовые методы идентичности. equals и hashCode обязаны быть согласованы: равные объекты должны иметь одинаковый hashCode, иначе hash-коллекции начинают терять элементы.',
    },
    diagram: `classDiagram
Object <|-- DomainObject
DomainObject <|-- User
Identifiable <|.. User
Serializable <|.. User
class Object {
  equals(Object)
  hashCode()
  toString()
}
class Identifiable {
  <<interface>>
  id()
}
class User {
  -Long id
  -String email
  +equals(Object)
  +hashCode()
}`,
    methods: [
      method('equals(Object)', 'Defines logical equality; always check reflexive, symmetric, transitive, consistent, and null rules.', 'Определяет логическое равенство; соблюдайте reflexive, symmetric, transitive, consistent и null правила.'),
      method('hashCode()', 'Returns an integer bucket hint for hash collections; must be stable while the object is in the collection.', 'Возвращает числовую подсказку для bucket в hash-коллекциях; должен быть стабильным, пока объект лежит в коллекции.'),
      method('toString()', 'Creates a developer-readable representation for logs and diagnostics.', 'Создает читаемое представление для логов и диагностики.'),
      method('Enum.valueOf()', 'Finds an enum constant by exact name and throws when the name is invalid.', 'Ищет enum-константу по точному имени и бросает исключение при неверном значении.'),
    ],
    examples: [
      `import java.util.Objects;

final class User {
    private final long id;
    private final String email;

    User(long id, String email) {
        this.id = id;
        this.email = email;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (!(other instanceof User user)) return false;
        return id == user.id && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }
}`,
    ],
    faq: [
      faq('Why can Integer comparison with == be dangerous?', 'Почему сравнение Integer через == опасно?', '== compares references for wrappers. Small Integer values are cached, so tests may pass for -128..127 and fail outside the cache. Use equals for value equality.', '== сравнивает ссылки у wrapper-объектов. Малые Integer кешируются, поэтому код может работать для -128..127 и ломаться за пределами кеша. Для значения используйте equals.'),
      faq('When should an abstract class be preferred over an interface?', 'Когда abstract class лучше interface?', 'Use an abstract class when subclasses share state, constructors, or protected helper behavior. Use interfaces for capability contracts and multiple implementation inheritance.', 'Abstract class уместен, когда наследники делят состояние, конструкторы или protected-поведение. Interface лучше для контрактов возможностей и множественной реализации.'),
      faq('What breaks if equals changes but hashCode does not?', 'Что сломается, если изменить equals, но не hashCode?', 'HashMap and HashSet first locate a bucket by hashCode and only then compare with equals. Equal objects in different buckets become unreachable duplicates.', 'HashMap и HashSet сначала ищут bucket по hashCode и только потом сравнивают equals. Равные объекты в разных bucket становятся недостижимыми дублями.'),
    ],
  },
  {
    id: 'strings-immutability',
    groupId: 'language',
    title: { en: 'Strings & Immutability', ru: 'Строки и иммутабельность' },
    intro: {
      en: 'String is immutable, heavily optimized, and central to Java APIs; understanding the pool prevents subtle memory and identity mistakes.',
      ru: 'String иммутабелен, сильно оптимизирован и лежит в основе Java API; понимание pool помогает избегать ошибок памяти и идентичности.',
    },
    deepDive: {
      en: 'String literals are interned in the String Pool, so identical literals can share one object. Runtime concatenation usually creates new objects through invokedynamic or StringBuilder-like machinery. Immutability lets strings cache hash codes, be safe keys in maps, and be shared across threads. StringBuilder uses a mutable character storage and grows its capacity, making it preferable inside loops.',
      ru: 'Строковые литералы интернируются в String Pool, поэтому одинаковые литералы могут ссылаться на один объект. Runtime-конкатенация обычно создает новые объекты через invokedynamic или механизм, похожий на StringBuilder. Иммутабельность позволяет кешировать hashCode, безопасно использовать строки как ключи Map и делить их между потоками. StringBuilder хранит изменяемый буфер и расширяет capacity, поэтому лучше подходит для циклов.',
    },
    diagram: `flowchart LR
literalA["String a = \\"java\\""] --> pool["String Pool: java"]
literalB["String b = \\"java\\""] --> pool
newString["new String(\\"java\\")"] --> heap["Heap object"]
heap -. intern() .-> pool`,
    methods: [
      method('intern()', 'Returns the canonical pooled String for the same character sequence.', 'Возвращает каноническую строку из pool для той же последовательности символов.'),
      method('equals()', 'Compares string contents, not object identity.', 'Сравнивает содержимое строки, а не идентичность объекта.'),
      method('StringBuilder.append()', 'Mutates the builder buffer and avoids many intermediate String instances.', 'Изменяет буфер builder и избегает множества промежуточных String.'),
      method('substring()', 'Creates a new String view/value depending on JDK internals; do not rely on sharing.', 'Создает новую String-структуру согласно реализации JDK; не полагайтесь на sharing.'),
    ],
    examples: [
      `String a = "core";
String b = "core";
String c = new String("core");

System.out.println(a == b);      // true: same pooled literal
System.out.println(a == c);      // false: different object
System.out.println(a.equals(c)); // true: same content

StringBuilder sql = new StringBuilder("select * from users");
sql.append(" where active = ").append(true);`,
    ],
    faq: [
      faq('Why is String immutable?', 'Почему String иммутабелен?', 'It enables safe sharing, hash caching, class loading security, map key stability, and thread safety without defensive copies.', 'Это дает безопасное разделение, кеширование hash, безопасность class loading, стабильность ключей Map и thread safety без защитных копий.'),
      faq('Does String Pool mean no duplicate strings exist?', 'Означает ли String Pool, что дублей строк нет?', 'No. Literals and interned values are pooled; new String and many runtime values can still create separate heap objects.', 'Нет. Пулятся литералы и interned-значения; new String и многие runtime-значения создают отдельные объекты в heap.'),
      faq('Why is StringBuilder not thread-safe?', 'Почему StringBuilder не thread-safe?', 'It mutates internal storage without synchronization. Use local builders or StringBuffer only when shared synchronized mutation is really needed.', 'Он изменяет внутренний буфер без синхронизации. Используйте локальные builder или StringBuffer, если реально нужна синхронизированная общая мутация.'),
    ],
  },
  {
    id: 'jvm-memory',
    groupId: 'runtime',
    title: { en: 'JVM Architecture & Memory', ru: 'Архитектура JVM и память' },
    intro: {
      en: 'The JVM loads bytecode, verifies it, executes it with an interpreter and JIT compiler, and manages memory through well-defined runtime areas.',
      ru: 'JVM загружает bytecode, проверяет его, исполняет интерпретатором и JIT-компилятором, а память делит на runtime-области.',
    },
    deepDive: {
      en: 'Classloaders follow parent delegation: bootstrap first, then platform, application, and custom loaders. The heap stores objects, thread stacks store frames and local variables, metaspace stores class metadata in native memory, and the program counter tracks execution per thread. The Java Memory Model defines happens-before rules so visibility and ordering are not left to CPU cache luck.',
      ru: 'Classloader обычно работает по parent delegation: сначала bootstrap, затем platform, application и custom loaders. Heap хранит объекты, thread stack хранит frames и локальные переменные, metaspace хранит метаданные классов в native memory, а program counter отслеживает выполнение каждого потока. Java Memory Model задает happens-before правила, чтобы видимость и порядок операций не зависели от случайностей CPU cache.',
    },
    diagram: `flowchart TB
source[".java source"] --> bytecode[".class bytecode"]
bytecode --> loader["ClassLoader + verifier"]
loader --> runtime["Runtime Data Areas"]
runtime --> heap["Heap: objects"]
runtime --> stacks["Thread stacks: frames"]
runtime --> meta["Metaspace: class metadata"]
runtime --> pc["PC register per thread"]
runtime --> jit["Interpreter + JIT"]`,
    methods: [
      method('Class.forName()', 'Loads and initializes a class by name through a classloader.', 'Загружает и инициализирует класс по имени через classloader.'),
      method('Runtime.getRuntime()', 'Provides coarse memory and processor information for the current JVM.', 'Дает базовую информацию о памяти и процессорах текущей JVM.'),
      method('Thread.start()', 'Creates a new native thread and JVM stack, then calls run on that thread.', 'Создает native thread и JVM stack, затем вызывает run в этом потоке.'),
      method('volatile read/write', 'Creates visibility and ordering guarantees under the Java Memory Model.', 'Создает гарантии видимости и порядка в Java Memory Model.'),
    ],
    examples: [
      `class VisibilityDemo {
    private volatile boolean running = true;

    void stop() {
        running = false; // visible to another thread
    }

    void work() {
        while (running) {
            // loop observes volatile reads
        }
    }
}`,
    ],
    faq: [
      faq('Is a local object stored on the stack?', 'Локальный объект хранится на stack?', 'Usually the reference is local, but the object is on the heap. JIT escape analysis may optimize allocation away, but the language model is reference-to-object.', 'Обычно локальна ссылка, а объект находится в heap. JIT escape analysis может убрать аллокацию, но модель языка - ссылка на объект.'),
      faq('What is metaspace and why can it leak?', 'Что такое metaspace и почему он может утекать?', 'Metaspace stores class metadata. It leaks when classloaders remain reachable, keeping all classes they loaded alive.', 'Metaspace хранит метаданные классов. Утечка возникает, когда classloader остается достижимым и удерживает все загруженные классы.'),
      faq('What does happens-before mean?', 'Что значит happens-before?', 'It is a formal visibility and ordering relation. If A happens-before B, effects of A are visible to B in the ways defined by the JMM.', 'Это формальное отношение видимости и порядка. Если A happens-before B, эффекты A видимы B согласно правилам JMM.'),
    ],
  },
  {
    id: 'garbage-collection',
    groupId: 'runtime',
    title: { en: 'Garbage Collection', ru: 'Garbage Collection' },
    intro: {
      en: 'Garbage collection reclaims objects that are no longer reachable from live roots, reducing manual memory management errors.',
      ru: 'Garbage collection освобождает объекты, которые больше не достижимы из живых roots, уменьшая ошибки ручного управления памятью.',
    },
    deepDive: {
      en: 'GC starts from roots such as thread stacks, static fields, JNI handles, and active monitors. It marks reachable objects and reclaims the rest. Generational collectors rely on the weak generational hypothesis: most objects die young. References alter reachability strength: strong prevents collection, soft is memory-sensitive, weak is collected eagerly, and phantom is used for post-mortem cleanup coordination.',
      ru: 'GC начинает с roots: thread stacks, static fields, JNI handles и active monitors. Он маркирует достижимые объекты и освобождает остальные. Generational collectors опираются на гипотезу: большинство объектов умирают молодыми. Reference-типы меняют силу достижимости: strong не дает собрать объект, soft чувствителен к нехватке памяти, weak собирается быстро, phantom нужен для координации cleanup после смерти объекта.',
    },
    diagram: `flowchart LR
roots["GC Roots"] --> a["Reachable object A"]
a --> b["Reachable object B"]
roots --> c["Static cache"]
x["Unreachable cycle X"] --> y["Unreachable cycle Y"]
y --> x
x -. collected .-> gc["GC reclaim"]`,
    methods: [
      method('System.gc()', 'Requests GC but does not guarantee immediate collection; avoid in application logic.', 'Просит GC, но не гарантирует немедленный сбор; не используйте в бизнес-логике.'),
      method('WeakReference.get()', 'Returns the referent if it has not been cleared by GC.', 'Возвращает объект, если GC еще не очистил reference.'),
      method('ReferenceQueue.poll()', 'Retrieves references whose referents reached the required lifecycle state.', 'Получает references, чьи referents дошли до нужной стадии жизненного цикла.'),
      method('finalize()', 'Deprecated cleanup hook; unsafe and unpredictable.', 'Устаревший cleanup hook; небезопасен и непредсказуем.'),
    ],
    examples: [
      `import java.lang.ref.WeakReference;
import java.util.Map;
import java.util.WeakHashMap;

Object key = new Object();
Map<Object, String> cache = new WeakHashMap<>();
cache.put(key, "metadata");

WeakReference<Object> ref = new WeakReference<>(key);
key = null; // now only weak references remain
// A later GC may clear ref and remove the map entry.`,
    ],
    faq: [
      faq('Can GC collect cyclic references?', 'Может ли GC собрать циклические ссылки?', 'Yes. Java GC is reachability-based, not reference-count based. Unreachable cycles are collectible.', 'Да. Java GC основан на достижимости, а не на подсчете ссылок. Недостижимые циклы собираются.'),
      faq('Why do young and old generations exist?', 'Зачем нужны young и old generations?', 'Most objects die shortly after allocation. Separating generations lets the JVM collect young memory frequently and cheaply.', 'Большинство объектов умирает вскоре после создания. Разделение поколений позволяет часто и дешево собирать young memory.'),
      faq('Are soft references good caches?', 'SoftReference хороши для кешей?', 'They are usually inferior to explicit bounded caches because eviction depends on GC pressure and can be hard to reason about.', 'Обычно хуже явных bounded cache, потому что eviction зависит от давления на GC и сложен для анализа.'),
    ],
  },
  {
    id: 'collections',
    groupId: 'libraries',
    title: { en: 'Collections Framework', ru: 'Collections Framework' },
    intro: {
      en: 'Collections provide reusable data structures with predictable contracts for iteration, lookup, ordering, and mutation.',
      ru: 'Collections дают переиспользуемые структуры данных с понятными контрактами обхода, поиска, порядка и мутации.',
    },
    deepDive: {
      en: 'ArrayList is a dynamic array; appends are amortized O(1), but middle insertions shift elements. HashMap computes a spread hash using bitwise mixing, places entries into buckets by index = (n - 1) & hash, resizes at load factor thresholds, and treeifies long collision chains into red-black trees when capacity is high enough. Iterator fail-fast behavior uses modCount to detect structural modification.',
      ru: 'ArrayList - динамический массив: append амортизированно O(1), но вставка в середину сдвигает элементы. HashMap вычисляет spread hash через bitwise mixing, кладет entry в bucket по index = (n - 1) & hash, расширяется по load factor и превращает длинные collision chains в red-black tree при достаточной capacity. Fail-fast iterator использует modCount для обнаружения структурной модификации.',
    },
    diagram: `flowchart TB
Collection --> List
Collection --> Set
Collection --> Queue
Map --> HashMap
Map --> TreeMap
List --> ArrayList
List --> LinkedList
Set --> HashSet
Set --> TreeSet
Queue --> ArrayDeque`,
    methods: [
      method('List.add(E)', 'Appends an element; ArrayList may resize and copy its backing array.', 'Добавляет элемент; ArrayList может расширить и скопировать внутренний массив.'),
      method('Map.put(K,V)', 'Computes bucket, updates equal key, or links/tree-inserts a new node.', 'Вычисляет bucket, обновляет равный ключ или добавляет новый node в list/tree.'),
      method('Iterator.remove()', 'Safely removes the current element during iteration.', 'Безопасно удаляет текущий элемент во время итерации.'),
      method('Collections.unmodifiableList()', 'Returns a read-only view; underlying collection can still change elsewhere.', 'Возвращает read-only view; исходная коллекция все еще может изменяться в другом месте.'),
    ],
    examples: [
      `import java.util.HashMap;
import java.util.Map;

Map<String, Integer> scores = new HashMap<>();
scores.put("java", 10);
scores.merge("java", 5, Integer::sum);

int capacity = 16;
int hash = "java".hashCode();
int spread = hash ^ (hash >>> 16);
int bucket = (capacity - 1) & spread;`,
    ],
    faq: [
      faq('Why should HashMap capacity be a power of two?', 'Почему capacity HashMap - степень двойки?', 'It lets HashMap replace slow modulo with bit masking: (n - 1) & hash, while spread hashing keeps high bits useful.', 'Это позволяет заменить медленный modulo на bit mask: (n - 1) & hash, а spread hashing задействует старшие биты.'),
      faq('When does HashMap treeify buckets?', 'Когда HashMap превращает bucket в дерево?', 'Long chains treeify after thresholds are crossed and table capacity is large enough; otherwise resize is preferred.', 'Длинные цепочки treeify после порога и при достаточной capacity таблицы; иначе предпочтительнее resize.'),
      faq('Why is LinkedList rarely faster than ArrayList?', 'Почему LinkedList редко быстрее ArrayList?', 'LinkedList has poor cache locality and node allocation overhead. ArrayList is compact and CPU-cache friendly for most real workloads.', 'У LinkedList плохая locality и overhead на nodes. ArrayList компактнее и дружелюбнее к CPU cache для большинства задач.'),
    ],
  },
  {
    id: 'generics',
    groupId: 'language',
    title: { en: 'Generics', ru: 'Generics' },
    intro: {
      en: 'Generics add compile-time type safety while keeping runtime compatibility through type erasure.',
      ru: 'Generics добавляют compile-time type safety, сохраняя runtime-совместимость через type erasure.',
    },
    deepDive: {
      en: 'Java erases most generic type information at runtime: List<String> and List<Integer> share the same raw class. Bounds restrict what operations are valid. Wildcards model variance: ? extends T is a producer you can read as T, ? super T is a consumer you can write T into. This is PECS: Producer Extends, Consumer Super.',
      ru: 'Java стирает большую часть generic-информации в runtime: List<String> и List<Integer> имеют один raw class. Bounds ограничивают допустимые операции. Wildcards моделируют variance: ? extends T - producer, из которого читают T; ? super T - consumer, куда можно писать T. Это PECS: Producer Extends, Consumer Super.',
    },
    diagram: `flowchart LR
source["List<String>"] --> compiler["Compiler checks types"]
compiler --> erased["Runtime: List"]
extends["? extends Number"] --> read["read Number"]
super["? super Integer"] --> write["write Integer"]`,
    methods: [
      method('<T> T identity(T)', 'Declares a method type parameter independent from class type parameters.', 'Объявляет type parameter метода независимо от type parameters класса.'),
      method('Class<T>.cast(Object)', 'Performs a checked runtime cast using a Class token.', 'Выполняет checked runtime cast через Class token.'),
      method('List<? extends T>', 'Covariant read-oriented API: safe to read as T, unsafe to add T except null.', 'Ковариантный read-oriented API: безопасно читать как T, небезопасно добавлять T кроме null.'),
      method('List<? super T>', 'Contravariant write-oriented API: safe to add T, reads as Object.', 'Контравариантный write-oriented API: безопасно добавлять T, чтение как Object.'),
    ],
    examples: [
      `import java.util.List;

static double sum(List<? extends Number> numbers) {
    double result = 0;
    for (Number number : numbers) {
        result += number.doubleValue();
    }
    return result;
}

static void addDefaults(List<? super Integer> target) {
    target.add(1);
    target.add(2);
}`,
    ],
    faq: [
      faq('Why cannot we create new T[]?', 'Почему нельзя создать new T[]?', 'Arrays know their component type at runtime, but T is erased. Generic arrays would break runtime type checks.', 'Массивы знают component type в runtime, а T стирается. Generic arrays ломали бы runtime type checks.'),
      faq('What is heap pollution?', 'Что такое heap pollution?', 'It happens when a variable of parameterized type references an object that is not actually of that parameterized type, often through raw types.', 'Это ситуация, когда переменная parameterized type ссылается на объект не того parameterized type, часто из-за raw types.'),
      faq('Why are generics invariant?', 'Почему generics инвариантны?', 'List<Integer> is not a List<Number> because then adding a Double through the Number view would corrupt the Integer list.', 'List<Integer> не является List<Number>, иначе через Number-view можно было бы добавить Double и испортить Integer-list.'),
    ],
  },
  {
    id: 'exceptions',
    groupId: 'language',
    title: { en: 'Exceptions', ru: 'Исключения' },
    intro: {
      en: 'Exceptions model abnormal control flow and separate recoverable conditions from programming defects.',
      ru: 'Исключения моделируют нештатный поток выполнения и отделяют восстановимые ситуации от ошибок программирования.',
    },
    deepDive: {
      en: 'Throwable splits into Error and Exception. Checked exceptions must be declared or caught and represent recoverable external failures. RuntimeException is unchecked and often signals invalid usage or state. try-with-resources compiles to finally-like cleanup and records close failures as suppressed exceptions so the primary failure is preserved.',
      ru: 'Throwable делится на Error и Exception. Checked exceptions нужно объявлять или ловить, они описывают восстановимые внешние сбои. RuntimeException unchecked и часто означает неправильное использование или состояние. try-with-resources компилируется в cleanup, похожий на finally, и записывает ошибки close как suppressed exceptions, сохраняя основную причину.',
    },
    diagram: `classDiagram
Throwable <|-- Error
Throwable <|-- Exception
Exception <|-- IOException
Exception <|-- RuntimeException
RuntimeException <|-- NullPointerException
RuntimeException <|-- IllegalArgumentException
RuntimeException <|-- IllegalStateException`,
    methods: [
      method('getMessage()', 'Returns the detail message intended for diagnostics.', 'Возвращает диагностическое сообщение.'),
      method('getCause()', 'Returns the wrapped root cause if exception chaining was used.', 'Возвращает вложенную причину, если использовался exception chaining.'),
      method('addSuppressed()', 'Attaches secondary failures, commonly from resource closing.', 'Добавляет вторичные сбои, обычно из закрытия ресурсов.'),
      method('AutoCloseable.close()', 'Called automatically by try-with-resources in reverse declaration order.', 'Автоматически вызывается try-with-resources в обратном порядке объявления.'),
    ],
    examples: [
      `import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

static String firstLine(Path path) {
    try (BufferedReader reader = Files.newBufferedReader(path)) {
        return reader.readLine();
    } catch (IOException ex) {
        throw new IllegalStateException("Cannot read " + path, ex);
    }
}`,
    ],
    faq: [
      faq('Should all exceptions be caught at the service boundary?', 'Нужно ли ловить все исключения на границе сервиса?', 'Catch what you can translate, enrich, retry, or recover from. Blind catch-all blocks often hide bugs and break observability.', 'Ловите то, что можете перевести, обогатить, повторить или восстановить. Слепые catch-all часто скрывают баги и ломают observability.'),
      faq('Why not use checked exceptions everywhere?', 'Почему не использовать checked exceptions везде?', 'They are useful for recoverable API contracts, but overuse creates noisy signatures and forces callers into meaningless wrapping.', 'Они полезны для восстановимых API-контрактов, но избыток создает шумные сигнатуры и вынуждает callers бессмысленно wrap-ить.'),
      faq('What is exception chaining?', 'Что такое exception chaining?', 'It wraps a lower-level cause into a higher-level exception while preserving the stack trace and original reason.', 'Это оборачивание низкоуровневой причины в более высокоуровневое исключение с сохранением stack trace и исходной причины.'),
    ],
  },
  {
    id: 'concurrency',
    groupId: 'runtime',
    title: { en: 'Multithreading & Concurrency', ru: 'Многопоточность и Concurrency' },
    intro: {
      en: 'Java concurrency combines threads, memory visibility rules, synchronization primitives, executors, and concurrent data structures.',
      ru: 'Java concurrency объединяет threads, правила видимости памяти, synchronization primitives, executors и concurrent structures.',
    },
    deepDive: {
      en: 'A Java thread moves through new, runnable, blocked, waiting, timed waiting, and terminated states. synchronized uses object monitors and creates happens-before edges on monitor exit/enter. volatile gives visibility without compound atomicity. ReentrantLock exposes explicit locking, interruptible lock acquisition, and conditions. ExecutorService decouples task submission from thread management. Deadlocks arise from circular wait over locks.',
      ru: 'Java thread проходит состояния new, runnable, blocked, waiting, timed waiting и terminated. synchronized использует object monitors и создает happens-before между monitor exit/enter. volatile дает видимость, но не compound atomicity. ReentrantLock дает явный lock, interruptible acquisition и conditions. ExecutorService отделяет отправку задач от управления потоками. Deadlock возникает из-за circular wait по locks.',
    },
    diagram: `stateDiagram-v2
[*] --> NEW
NEW --> RUNNABLE: start()
RUNNABLE --> BLOCKED: monitor busy
BLOCKED --> RUNNABLE: monitor acquired
RUNNABLE --> WAITING: wait/join
WAITING --> RUNNABLE: notify/complete
RUNNABLE --> TIMED_WAITING: sleep/await
TIMED_WAITING --> RUNNABLE: timeout
RUNNABLE --> TERMINATED: run exits`,
    methods: [
      method('synchronized', 'Acquires a monitor, protects critical section, and publishes changes on exit.', 'Захватывает monitor, защищает critical section и публикует изменения при выходе.'),
      method('volatile', 'Ensures reads see the latest write and prevents selected reorderings.', 'Гарантирует видимость последней записи и запрещает некоторые reorderings.'),
      method('ExecutorService.submit()', 'Schedules callable/runnable work and returns a Future.', 'Планирует Callable/Runnable и возвращает Future.'),
      method('ConcurrentHashMap.computeIfAbsent()', 'Atomically initializes a value for a missing key without external locking.', 'Атомарно инициализирует значение отсутствующего ключа без внешнего locking.'),
    ],
    examples: [
      `import java.util.concurrent.*;

ExecutorService pool = Executors.newFixedThreadPool(4);
try {
    Future<Integer> result = pool.submit(() -> 40 + 2);
    System.out.println(result.get(1, TimeUnit.SECONDS));
} finally {
    pool.shutdown();
}

class Counter {
    private final Object lock = new Object();
    private int value;

    int increment() {
        synchronized (lock) {
            return ++value;
        }
    }
}`,
    ],
    faq: [
      faq('Does volatile make increment atomic?', 'Делает ли volatile increment атомарным?', 'No. value++ is read, add, write. volatile makes reads and writes visible, but does not turn the compound operation into one atomic action.', 'Нет. value++ - это read, add, write. volatile дает видимость чтения/записи, но не делает compound operation атомарной.'),
      faq('How does ConcurrentHashMap avoid one global lock?', 'Как ConcurrentHashMap избегает одного глобального lock?', 'Modern implementations synchronize at bin level for contended updates and use CAS for several paths, so unrelated keys can progress independently.', 'Современные реализации синхронизируются на уровне bin при конкурирующих update и используют CAS в ряде путей, поэтому независимые ключи продвигаются отдельно.'),
      faq('What are the four deadlock conditions?', 'Какие четыре условия deadlock?', 'Mutual exclusion, hold and wait, no preemption, and circular wait. Breaking any one of them prevents deadlock.', 'Mutual exclusion, hold and wait, no preemption и circular wait. Нарушение любого условия предотвращает deadlock.'),
    ],
  },
  {
    id: 'io-serialization',
    groupId: 'libraries',
    title: { en: 'I/O & Serialization', ru: 'I/O и Serialization' },
    intro: {
      en: 'Java I/O APIs move bytes and characters between programs and external resources; serialization turns object graphs into byte streams.',
      ru: 'Java I/O API перемещают байты и символы между программой и внешними ресурсами; serialization превращает object graph в byte stream.',
    },
    deepDive: {
      en: 'Classic I/O is stream-oriented and often blocking. NIO introduces buffers, channels, selectors, and paths. Buffers have position, limit, and capacity; flip switches from writing into a buffer to reading from it. Java built-in serialization records class metadata and object graph identity, skips transient fields, and is sensitive to serialVersionUID compatibility.',
      ru: 'Классический I/O stream-oriented и часто blocking. NIO добавляет buffers, channels, selectors и paths. Buffer имеет position, limit и capacity; flip переключает буфер из режима записи в режим чтения. Встроенная Java serialization записывает metadata класса и идентичность object graph, пропускает transient поля и зависит от совместимости serialVersionUID.',
    },
    diagram: `flowchart LR
file["File/Socket"] --> stream["InputStream/Reader"]
stream --> app["Application"]
app --> out["OutputStream/Writer"]
nio["Channel"] <--> buffer["ByteBuffer: position/limit/capacity"]
buffer <--> app`,
    methods: [
      method('InputStream.read()', 'Reads bytes and returns -1 at end of stream.', 'Читает байты и возвращает -1 в конце stream.'),
      method('Files.readString()', 'Convenience API for reading text files using NIO Path.', 'Удобный API для чтения текстовых файлов через NIO Path.'),
      method('ByteBuffer.flip()', 'Sets limit to current position and position to zero for reading.', 'Ставит limit в текущую position и position в zero для чтения.'),
      method('ObjectOutputStream.writeObject()', 'Serializes an object graph that implements Serializable.', 'Сериализует object graph, реализующий Serializable.'),
    ],
    examples: [
      `import java.io.Serializable;
import java.nio.file.Files;
import java.nio.file.Path;

record Session(String user, transient String token) implements Serializable {
    private static final long serialVersionUID = 1L;
}

String config = Files.readString(Path.of("application.properties"));`,
    ],
    faq: [
      faq('Why is Java serialization risky?', 'Почему Java serialization рискованна?', 'Deserialization can instantiate unexpected classes and trigger gadget chains. Prefer explicit formats like JSON/Protocol Buffers for boundaries.', 'Deserialization может создавать неожиданные классы и запускать gadget chains. Для границ систем лучше явные форматы вроде JSON/Protocol Buffers.'),
      faq('What does transient do?', 'Что делает transient?', 'It excludes a field from default serialization. After deserialization it has the default value unless restored manually.', 'Исключает поле из default serialization. После deserialization поле имеет default value, если его не восстановили вручную.'),
      faq('Why use NIO channels?', 'Зачем нужны NIO channels?', 'Channels and buffers give more control, can support non-blocking multiplexing, and integrate with selectors for scalable networking.', 'Channels и buffers дают больше контроля, могут работать non-blocking и интегрируются с selectors для масштабируемого networking.'),
    ],
  },
  {
    id: 'reflection-annotations',
    groupId: 'advanced',
    title: { en: 'Reflection & Annotations', ru: 'Reflection и Annotations' },
    intro: {
      en: 'Reflection inspects and invokes program structure at runtime; annotations attach metadata consumed by compilers, frameworks, or runtime code.',
      ru: 'Reflection анализирует и вызывает структуру программы в runtime; annotations прикрепляют metadata для компиляторов, frameworks или runtime-кода.',
    },
    deepDive: {
      en: 'Reflection works through Class, Method, Field, and Constructor descriptors. It can bypass normal compile-time coupling, which powers frameworks, but costs performance, type safety, and sometimes module accessibility. Annotation retention controls availability: SOURCE for processors only, CLASS in bytecode, RUNTIME visible through reflection. Targets restrict where annotations may appear.',
      ru: 'Reflection работает через descriptors Class, Method, Field и Constructor. Он убирает compile-time coupling, что удобно для frameworks, но стоит производительности, type safety и иногда module accessibility. Retention аннотации управляет доступностью: SOURCE только для processors, CLASS в bytecode, RUNTIME виден через reflection. Target ограничивает места применения.',
    },
    diagram: `flowchart TB
class["Class<?>"] --> fields["Field[]"]
class --> methods["Method[]"]
class --> constructors["Constructor[]"]
annotation["@Retention(RUNTIME)"] --> class
framework["Framework scanner"] --> annotation
framework --> methods`,
    methods: [
      method('Class.getDeclaredMethods()', 'Returns methods declared directly on the class, including private ones.', 'Возвращает методы, объявленные прямо в классе, включая private.'),
      method('Method.invoke()', 'Invokes a reflected method and wraps thrown user exceptions.', 'Вызывает reflected method и оборачивает пользовательские исключения.'),
      method('Field.setAccessible()', 'Requests access override, subject to security and module rules.', 'Запрашивает override доступа с учетом security и module rules.'),
      method('@Retention', 'Defines how long annotation metadata is retained.', 'Определяет, как долго хранится metadata аннотации.'),
    ],
    examples: [
      `import java.lang.annotation.*;
import java.lang.reflect.Method;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Audit {
    String value();
}

class BillingService {
    @Audit("invoice-created")
    void createInvoice() {}
}

for (Method method : BillingService.class.getDeclaredMethods()) {
    Audit audit = method.getAnnotation(Audit.class);
    if (audit != null) {
        System.out.println(audit.value());
    }
}`,
    ],
    faq: [
      faq('Why do frameworks use reflection?', 'Почему frameworks используют reflection?', 'It lets them discover user classes, instantiate components, inject dependencies, and bind metadata without hard-coded application types.', 'Он позволяет обнаруживать пользовательские классы, создавать компоненты, внедрять зависимости и связывать metadata без hard-code типов приложения.'),
      faq('What is the difference between getMethods and getDeclaredMethods?', 'Чем отличаются getMethods и getDeclaredMethods?', 'getMethods returns public inherited methods too. getDeclaredMethods returns all methods declared on that class only.', 'getMethods возвращает public методы, включая inherited. getDeclaredMethods возвращает все методы, объявленные только в этом классе.'),
      faq('Why does retention matter?', 'Почему retention важен?', 'A runtime framework cannot read an annotation with SOURCE or CLASS retention through reflection.', 'Runtime framework не сможет прочитать через reflection аннотацию с SOURCE или CLASS retention.'),
    ],
  },
  {
    id: 'functional',
    groupId: 'advanced',
    title: { en: 'Functional Concepts', ru: 'Функциональные концепции' },
    intro: {
      en: 'Lambdas, functional interfaces, and streams let Java express behavior as values and transform data declaratively.',
      ru: 'Lambdas, functional interfaces и streams позволяют Java выражать поведение как значение и декларативно преобразовывать данные.',
    },
    deepDive: {
      en: 'A lambda targets a functional interface, an interface with one abstract method. Captured local variables must be effectively final because lambdas may outlive the stack frame. Streams are lazy pipelines: intermediate operations build a plan, terminal operations execute it. Parallel streams split work through spliterators and the common ForkJoinPool, which helps CPU-bound work but can hurt blocking or small workloads.',
      ru: 'Lambda направлена на functional interface - interface с одним abstract method. Захваченные локальные переменные должны быть effectively final, потому что lambda может жить дольше stack frame. Streams - lazy pipelines: intermediate operations строят план, terminal operations запускают выполнение. Parallel streams делят работу через spliterators и common ForkJoinPool; это помогает CPU-bound задачам, но вредит blocking или маленьким workloads.',
    },
    diagram: `flowchart LR
source["Collection source"] --> filter["filter"]
filter --> map["map"]
map --> sorted["sorted"]
sorted --> collect["collect terminal"]
lambda["Lambda"] --> fi["Functional Interface"]
fi --> invoke["SAM invocation"]`,
    methods: [
      method('Function.apply()', 'Transforms one value into another.', 'Преобразует одно значение в другое.'),
      method('Predicate.test()', 'Returns a boolean decision used by filters and guards.', 'Возвращает boolean-решение для filters и guards.'),
      method('Stream.map()', 'Creates a lazy mapping stage in a stream pipeline.', 'Создает lazy mapping stage в stream pipeline.'),
      method('Stream.collect()', 'Terminal operation that folds stream elements into a container or result.', 'Terminal operation, сворачивающая элементы stream в container или результат.'),
    ],
    examples: [
      `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

record User(String name, String role, boolean active) {}

Map<String, List<String>> namesByRole = users.stream()
    .filter(User::active)
    .collect(Collectors.groupingBy(
        User::role,
        Collectors.mapping(User::name, Collectors.toList())
    ));`,
    ],
    faq: [
      faq('Why must captured variables be effectively final?', 'Почему захваченные переменные должны быть effectively final?', 'It avoids sharing mutable stack locals across lifetimes and threads. Capture copies the value/reference, not a live local variable slot.', 'Это избегает sharing mutable stack locals между жизненными циклами и потоками. Capture копирует значение/ссылку, а не живой slot локальной переменной.'),
      faq('Are streams always faster than loops?', 'Streams всегда быстрее циклов?', 'No. Streams improve expressiveness and composition. Loops can be faster for tiny hot paths; measure before optimizing.', 'Нет. Streams улучшают выразительность и композицию. Циклы могут быть быстрее в маленьких hot paths; оптимизируйте по измерениям.'),
      faq('When are parallel streams dangerous?', 'Когда parallel streams опасны?', 'They are risky with blocking I/O, shared mutable state, ordering-sensitive pipelines, and environments already using the common pool.', 'Они рискованны при blocking I/O, общем mutable state, order-sensitive pipelines и окружениях, где common pool уже занят.'),
    ],
  },
];

const mechanics = (en, ru) => ({ en, ru });

groups.push(
  { id: 'foundation', title: { en: 'Backend Foundations', ru: 'Backend foundation' } },
  { id: 'engineering', title: { en: 'Engineering Practice', ru: 'Инженерная практика' } },
  { id: 'backend', title: { en: 'Java Backend', ru: 'Java backend' } },
);

const groupOrder = ['foundation', 'language', 'runtime', 'libraries', 'advanced', 'engineering', 'backend'];
groups.sort((left, right) => groupOrder.indexOf(left.id) - groupOrder.indexOf(right.id));

const mechanicsByTopic = {
  'java-basics-oop': [
    mechanics('The JVM dispatches overridden instance methods dynamically through class metadata, while overloaded methods are chosen at compile time.', 'JVM вызывает overridden instance methods динамически через metadata класса, а overloaded methods выбираются на этапе компиляции.'),
    mechanics('Wrapper boxing can allocate objects unless the value is cached; repeated boxing inside hot loops creates GC pressure.', 'Boxing wrapper может создавать объекты, если значение не в кеше; повторный boxing в hot loop создает давление на GC.'),
    mechanics('A HashMap lookup first uses hashCode to choose a bucket, then equals to distinguish collisions inside that bucket.', 'HashMap lookup сначала использует hashCode для выбора bucket, затем equals для различения collision внутри bucket.'),
  ],
  'strings-immutability': [
    mechanics('A string literal is resolved from the constant pool; the runtime may reuse the same String object across class usages.', 'Строковый литерал резолвится из constant pool; runtime может переиспользовать один String object между классами.'),
    mechanics('StringBuilder keeps mutable storage and expands by allocating a larger array and copying old content.', 'StringBuilder держит изменяемое хранилище и расширяется через выделение большего массива и копирование старого содержимого.'),
    mechanics('String hash codes are cached after calculation, which is safe only because the character sequence cannot change.', 'String hashCode кешируется после вычисления; это безопасно только потому, что последовательность символов не меняется.'),
  ],
  'jvm-memory': [
    mechanics('Each method call creates a stack frame with local variable slots, an operand stack, and a reference to runtime constant pool data.', 'Каждый вызов метода создает stack frame с local variable slots, operand stack и ссылкой на runtime constant pool.'),
    mechanics('Objects live on the heap by default, but JIT escape analysis can replace allocations with scalar values.', 'Объекты по умолчанию живут в heap, но JIT escape analysis может заменить allocation набором scalar values.'),
    mechanics('Happens-before edges force visibility; without them, CPU caches and compiler reordering may expose stale values.', 'Happens-before связи принуждают видимость; без них CPU cache и compiler reordering могут показать устаревшие значения.'),
  ],
  'garbage-collection': [
    mechanics('Marking starts from GC Roots, so an object is alive because it is reachable, not because its reference count is positive.', 'Marking начинается от GC Roots, поэтому объект жив из-за достижимости, а не из-за положительного счетчика ссылок.'),
    mechanics('Generational collectors record old-to-young references with card tables or remembered sets to avoid scanning the whole heap.', 'Generational collectors записывают old-to-young ссылки через card tables или remembered sets, чтобы не сканировать весь heap.'),
    mechanics('Stop-the-world pauses happen when application threads must stop so the collector can see a stable object graph.', 'Stop-the-world паузы возникают, когда application threads должны остановиться, чтобы collector увидел стабильный object graph.'),
  ],
  collections: [
    mechanics('HashMap spreads high hash bits downward, then uses a bit mask instead of modulo for bucket selection.', 'HashMap смешивает старшие hash bits вниз и использует bit mask вместо modulo для выбора bucket.'),
    mechanics('ArrayList resize allocates a larger backing array and copies references; elements themselves are not cloned.', 'ArrayList resize выделяет больший backing array и копирует ссылки; сами элементы не клонируются.'),
    mechanics('Fail-fast iterators compare expectedModCount with modCount and throw when structural changes are detected.', 'Fail-fast iterators сравнивают expectedModCount с modCount и бросают исключение при structural changes.'),
  ],
  generics: [
    mechanics('The compiler inserts casts after erasure so generic safety is mostly enforced before runtime.', 'Compiler вставляет casts после erasure, поэтому generic safety в основном проверяется до runtime.'),
    mechanics('Bridge methods preserve polymorphism when erasure changes method signatures in subclasses.', 'Bridge methods сохраняют polymorphism, когда erasure меняет сигнатуры методов в subclass.'),
    mechanics('Wildcards do not create new runtime types; they constrain what the compiler allows you to read or write.', 'Wildcards не создают новые runtime types; они ограничивают, что compiler разрешает читать или писать.'),
  ],
  exceptions: [
    mechanics('Throwing captures a stack trace, which is useful for diagnostics but expensive in hot paths.', 'Throwing захватывает stack trace; это полезно для диагностики, но дорого в hot paths.'),
    mechanics('try-with-resources closes resources in reverse order and attaches close failures as suppressed exceptions.', 'try-with-resources закрывает ресурсы в обратном порядке и добавляет ошибки close как suppressed exceptions.'),
    mechanics('Unchecked exceptions do not change bytecode mechanics; the difference is compile-time declaration enforcement.', 'Unchecked exceptions не меняют механику bytecode; отличие в compile-time требовании объявлять исключение.'),
  ],
  concurrency: [
    mechanics('synchronized uses monitorenter/monitorexit bytecode and releases the monitor even when an exception exits the block.', 'synchronized использует bytecode monitorenter/monitorexit и освобождает monitor даже при выходе через exception.'),
    mechanics('volatile writes flush visibility before the write, and volatile reads invalidate assumptions after the read.', 'volatile write публикует видимость перед записью, а volatile read сбрасывает предположения после чтения.'),
    mechanics('Executors reuse worker threads and keep tasks in queues, so queue growth and rejection policy are part of capacity design.', 'Executors переиспользуют worker threads и держат tasks в queues, поэтому рост queue и rejection policy - часть capacity design.'),
  ],
  'io-serialization': [
    mechanics('Blocking streams park the calling thread until bytes are available or the OS reports completion.', 'Blocking streams удерживают вызывающий поток, пока байты не доступны или OS не сообщит завершение.'),
    mechanics('NIO buffers separate writing and reading with position/limit transitions; forgetting flip makes the buffer look empty.', 'NIO buffers разделяют запись и чтение через position/limit transitions; забытый flip делает buffer похожим на пустой.'),
    mechanics('Serialization stores object identity handles, so repeated references can point to one restored object.', 'Serialization хранит object identity handles, поэтому повторные ссылки могут указывать на один восстановленный объект.'),
  ],
  'reflection-annotations': [
    mechanics('Reflection resolves members through metadata tables and performs access checks unless access is explicitly opened.', 'Reflection резолвит members через metadata tables и выполняет access checks, если доступ явно не открыт.'),
    mechanics('Runtime annotations are stored in class metadata and can be scanned without instantiating the annotated class.', 'Runtime annotations хранятся в metadata класса и могут сканироваться без создания annotated class.'),
    mechanics('Method.invoke boxes arguments and wraps user exceptions, which is why frameworks cache reflective handles.', 'Method.invoke boxing-ит arguments и оборачивает user exceptions, поэтому frameworks кешируют reflective handles.'),
  ],
  functional: [
    mechanics('Most lambdas are linked through invokedynamic, letting the JVM create implementation classes lazily.', 'Большинство lambdas связываются через invokedynamic, позволяя JVM лениво создавать implementation classes.'),
    mechanics('Intermediate stream operations are not executed until a terminal operation pulls data through the pipeline.', 'Intermediate stream operations не выполняются, пока terminal operation не протянет данные через pipeline.'),
    mechanics('Parallel streams split data with Spliterator; poor splitting or blocking work can make parallel execution slower.', 'Parallel streams делят данные через Spliterator; плохое splitting или blocking work может сделать parallel execution медленнее.'),
  ],
};

content.forEach((topic) => {
  topic.mechanics = mechanicsByTopic[topic.id] || topic.mechanics || [];
  topic.stage = topic.stage || (topic.groupId === 'advanced' ? 'Fundamentals' : 'Beginner');
});

content.push(
  {
    id: 'cs-algorithms-data-structures',
    groupId: 'foundation',
    stage: 'Basic',
    title: { en: 'CS Basics: Algorithms & Data Structures', ru: 'CS basics: алгоритмы и структуры данных' },
    intro: {
      en: 'Backend developers constantly trade CPU time, memory, latency, and readability; Big O gives a shared language for those tradeoffs.',
      ru: 'Backend-разработчик постоянно балансирует CPU time, memory, latency и читаемость; Big O дает общий язык для этих компромиссов.',
    },
    deepDive: {
      en: 'An algorithm is a repeatable procedure with cost that grows as input grows. Arrays optimize indexed access through contiguous memory, linked nodes optimize local insertion but lose cache locality, hash tables trade memory for near-constant lookup, and trees keep sorted order with logarithmic operations. Real backend performance depends not only on Big O but also on allocation rate, CPU cache locality, network round trips, and database indexes.',
      ru: 'Алгоритм - повторяемая процедура, стоимость которой растет вместе с входом. Arrays оптимизируют indexed access через contiguous memory, linked nodes упрощают локальную вставку, но теряют cache locality, hash tables меняют memory на почти constant lookup, а trees сохраняют sorted order с logarithmic operations. Реальная backend-производительность зависит не только от Big O, но и от allocation rate, CPU cache locality, network round trips и database indexes.',
    },
    mechanics: [
      mechanics('Big O ignores constants, but constants matter when work happens on every request in a high-QPS service.', 'Big O игнорирует константы, но константы важны, когда работа выполняется на каждом request в high-QPS сервисе.'),
      mechanics('Hash-based structures depend on stable hashes and low collision rates; a bad hash can degrade lookup to chain/tree traversal.', 'Hash-based structures зависят от стабильных hashes и низких collisions; плохой hash может превратить lookup в обход chain/tree.'),
      mechanics('Database indexes are data structures too; many backend slowdowns are algorithmic problems moved into SQL.', 'Database indexes тоже структуры данных; многие backend slowdown - это алгоритмические проблемы, перенесенные в SQL.'),
    ],
    diagram: `flowchart LR
input["Input size n"] --> algorithm["Algorithm"]
algorithm --> cpu["CPU operations"]
algorithm --> memory["Memory allocations"]
algorithm --> io["I/O or DB round trips"]
cpu --> latency["Request latency"]
memory --> latency
io --> latency`,
    methods: [
      method('Collections.binarySearch()', 'Runs logarithmic search on a sorted list.', 'Выполняет logarithmic search по sorted list.'),
      method('Comparator.comparing()', 'Defines order without embedding sorting rules into the entity.', 'Задает порядок без встраивания sorting rules в entity.'),
      method('Queue.offer()/poll()', 'Models FIFO processing for breadth-first traversal and task queues.', 'Моделирует FIFO processing для breadth-first traversal и task queues.'),
      method('Map.compute()', 'Keeps lookup and update in one map operation.', 'Объединяет lookup и update в одну map operation.'),
    ],
    examples: [
      `import java.util.*;

Deque<Integer> queue = new ArrayDeque<>();
Set<Integer> visited = new HashSet<>();
queue.offer(startNode);

while (!queue.isEmpty()) {
    int node = queue.poll();
    if (!visited.add(node)) continue;
    for (int next : graph.getOrDefault(node, List.of())) {
        queue.offer(next);
    }
}`,
    ],
    faq: [
      faq('Why is O(1) not always faster than O(log n)?', 'Почему O(1) не всегда быстрее O(log n)?', 'Hashing, collisions, memory access, and allocation can dominate small inputs. Big O describes growth, not absolute runtime.', 'Hashing, collisions, memory access и allocation могут доминировать на маленьких входах. Big O описывает рост, а не абсолютное время.'),
      faq('Why does cache locality matter in Java?', 'Почему cache locality важна в Java?', 'Compact arrays let the CPU prefetch nearby references. Pointer-heavy structures jump around memory and lose cache efficiency.', 'Компактные arrays позволяют CPU prefetch соседние ссылки. Pointer-heavy структуры прыгают по памяти и теряют эффективность cache.'),
      faq('How should juniors practice algorithms for backend?', 'Как junior должен практиковать algorithms для backend?', 'Connect each structure to production use: HashMap for identity lookup, queue for async work, tree/index for ordered range queries.', 'Связывайте каждую структуру с production use: HashMap для identity lookup, queue для async work, tree/index для ordered range queries.'),
    ],
  },
  {
    id: 'git-development-tools',
    groupId: 'engineering',
    stage: 'Basic',
    title: { en: 'Git & Development Tools', ru: 'Git и development tools' },
    intro: {
      en: 'Git, build tools, IDEs, and debuggers are part of backend engineering because they control change, reproducibility, and feedback speed.',
      ru: 'Git, build tools, IDE и debuggers - часть backend engineering, потому что они управляют изменениями, воспроизводимостью и скоростью обратной связи.',
    },
    deepDive: {
      en: 'Git stores content as objects addressed by hashes: blobs for file contents, trees for directories, commits for snapshots plus parent links. Branches are movable pointers to commits. Merge creates a new commit with multiple parents, while rebase rewrites commits on top of a new base. Maven and Gradle resolve dependency graphs and run lifecycle tasks so builds are repeatable across machines.',
      ru: 'Git хранит content как objects, адресуемые hashes: blobs для содержимого файлов, trees для директорий, commits для snapshots плюс parent links. Branches - подвижные указатели на commits. Merge создает новый commit с несколькими parents, а rebase переписывает commits поверх новой base. Maven и Gradle резолвят dependency graph и запускают lifecycle tasks, чтобы builds были воспроизводимы на разных машинах.',
    },
    mechanics: [
      mechanics('A commit does not store a diff as its primary model; it points to a full tree snapshot plus parent commits.', 'Commit не хранит diff как основную модель; он указывает на полный tree snapshot и parent commits.'),
      mechanics('A dependency lock or Maven effective POM protects the team from “works on my machine” version drift.', 'Dependency lock или Maven effective POM защищает команду от version drift в стиле “works on my machine”.'),
      mechanics('The debugger pauses threads and reads stack frames, which is why stepping through multithreaded code can change timing.', 'Debugger останавливает threads и читает stack frames, поэтому stepping в multithreaded code может менять timing.'),
    ],
    diagram: `gitGraph
commit id: "A"
branch feature
checkout feature
commit id: "B"
checkout main
commit id: "C"
merge feature id: "M"`,
    methods: [
      method('git status', 'Shows working tree, staging area, and branch state.', 'Показывает working tree, staging area и состояние branch.'),
      method('git rebase', 'Replays commits on top of another base and rewrites commit IDs.', 'Переигрывает commits поверх другой base и переписывает commit IDs.'),
      method('mvn test', 'Runs the test lifecycle phase and required earlier phases.', 'Запускает test lifecycle phase и необходимые предыдущие phases.'),
      method('breakpoint', 'Stops execution at a chosen line so stack and variables can be inspected.', 'Останавливает execution на выбранной строке для просмотра stack и variables.'),
    ],
    examples: [
      `// A tiny method worth debugging with a breakpoint.
int parsePort(String raw) {
    int port = Integer.parseInt(raw);
    if (port < 1 || port > 65535) {
        throw new IllegalArgumentException("Invalid port: " + port);
    }
    return port;
}`,
    ],
    faq: [
      faq('Why avoid rebasing public branches?', 'Почему не стоит rebase public branches?', 'Rebase rewrites commit IDs. Teammates who already based work on the old commits must reconcile divergent history.', 'Rebase переписывает commit IDs. Коллегам, которые уже работали от старых commits, придется чинить divergent history.'),
      faq('What is the staging area for?', 'Зачем staging area?', 'It lets you choose exactly which changes become the next commit, enabling small reviewable commits.', 'Она позволяет выбрать, какие изменения войдут в следующий commit, создавая маленькие reviewable commits.'),
      faq('Why do build tools matter for theory?', 'Почему build tools важны для теории?', 'They define classpath, dependency versions, test execution, packaging, and reproducibility, which directly affect runtime behavior.', 'Они задают classpath, версии dependencies, test execution, packaging и reproducibility, что напрямую влияет на runtime behavior.'),
    ],
  },
  {
    id: 'testing',
    groupId: 'engineering',
    stage: 'Fundamentals',
    title: { en: 'Testing: Unit, Integration, Test Doubles', ru: 'Testing: unit, integration, test doubles' },
    intro: {
      en: 'Testing is executable design feedback: it proves behavior, protects refactoring, and documents edge cases for future maintainers.',
      ru: 'Testing - executable feedback по дизайну: он доказывает поведение, защищает refactoring и документирует edge cases для будущих maintainers.',
    },
    deepDive: {
      en: 'Unit tests isolate a small behavior and run in memory. Integration tests cross boundaries such as database, filesystem, HTTP, or Spring context. Mocks verify collaboration, stubs provide canned responses, and fakes implement lightweight working substitutes. Good backend test suites form a pyramid: many fast unit tests, fewer integration tests, and a small number of end-to-end checks.',
      ru: 'Unit tests изолируют маленькое поведение и работают in memory. Integration tests переходят границы: database, filesystem, HTTP или Spring context. Mocks проверяют collaboration, stubs возвращают подготовленные ответы, fakes реализуют легкие рабочие substitutes. Хороший backend test suite похож на пирамиду: много быстрых unit tests, меньше integration tests и немного end-to-end checks.',
    },
    mechanics: [
      mechanics('JUnit creates a test instance, runs lifecycle callbacks, executes assertions, and reports failures through exceptions.', 'JUnit создает test instance, запускает lifecycle callbacks, выполняет assertions и сообщает failures через exceptions.'),
      mechanics('Mock frameworks often use proxies or bytecode generation to intercept calls and record interactions.', 'Mock frameworks часто используют proxies или bytecode generation, чтобы перехватывать calls и записывать interactions.'),
      mechanics('A flaky test usually means hidden shared state, time dependence, concurrency, network, or external data leakage.', 'Flaky test обычно означает hidden shared state, зависимость от time, concurrency, network или leakage внешних данных.'),
    ],
    diagram: `flowchart TB
unit["Unit tests: domain rules"] --> integration["Integration tests: DB/Spring/HTTP"]
integration --> e2e["E2E smoke checks"]
unit --> feedback["Fast feedback"]
integration --> confidence["Boundary confidence"]`,
    methods: [
      method('@Test', 'Marks a method as a test case.', 'Помечает метод как test case.'),
      method('assertEquals()', 'Compares expected and actual values with a clear failure message.', 'Сравнивает expected и actual values с понятным failure message.'),
      method('@BeforeEach', 'Runs setup before every test method.', 'Запускает setup перед каждым test method.'),
      method('verify()', 'Checks that a mock received an expected interaction.', 'Проверяет, что mock получил ожидаемое interaction.'),
    ],
    examples: [
      `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PriceServiceTest {
    @Test
    void rejectsNegativePrice() {
        PriceService service = new PriceService();

        assertThrows(IllegalArgumentException.class,
            () -> service.applyDiscount(-10, 5));
    }
}`,
    ],
    faq: [
      faq('What should be unit-tested first?', 'Что unit-test-ить первым?', 'Start with domain rules, edge cases, calculations, parsers, and code that changes often.', 'Начните с domain rules, edge cases, calculations, parsers и кода, который часто меняется.'),
      faq('Are mocks bad?', 'Mocks плохие?', 'Mocks are useful for boundaries, but over-mocking implementation details makes tests brittle and hostile to refactoring.', 'Mocks полезны для boundaries, но over-mocking implementation details делает tests хрупкими и мешает refactoring.'),
      faq('Why do integration tests run slower?', 'Почему integration tests медленнее?', 'They start heavier infrastructure, perform I/O, initialize contexts, and verify real boundary behavior.', 'Они поднимают тяжелую infrastructure, выполняют I/O, инициализируют contexts и проверяют реальное boundary behavior.'),
    ],
  },
  {
    id: 'software-design-architecture',
    groupId: 'engineering',
    stage: 'Fundamentals',
    title: { en: 'Software Design & Architecture', ru: 'Software design и architecture' },
    intro: {
      en: 'Architecture is the set of decisions that make a system understandable, changeable, observable, and resilient under real constraints.',
      ru: 'Architecture - набор решений, который делает систему понятной, изменяемой, наблюдаемой и устойчивой в реальных ограничениях.',
    },
    deepDive: {
      en: 'SOLID, cohesion, coupling, layering, and boundaries matter because backend systems live longer than their first feature. A layered architecture separates controllers, services, repositories, and domain rules. Hexagonal architecture pushes infrastructure behind ports and adapters so domain code can be tested without HTTP or databases. Architecture is not diagrams alone; it is enforced by dependencies, packages, tests, and module boundaries.',
      ru: 'SOLID, cohesion, coupling, layering и boundaries важны, потому что backend systems живут дольше первой фичи. Layered architecture разделяет controllers, services, repositories и domain rules. Hexagonal architecture прячет infrastructure за ports/adapters, чтобы domain code тестировался без HTTP или databases. Architecture - не только диаграммы; она enforced через dependencies, packages, tests и module boundaries.',
    },
    mechanics: [
      mechanics('Dependency direction controls change cost: stable domain code should not depend on volatile infrastructure details.', 'Dependency direction управляет стоимостью изменений: стабильный domain code не должен зависеть от volatile infrastructure details.'),
      mechanics('A service method is often a transaction boundary: it coordinates validation, domain changes, persistence, and events.', 'Service method часто является transaction boundary: координирует validation, domain changes, persistence и events.'),
      mechanics('Coupling hides in static calls, shared DTOs, database schemas, message contracts, and exception types.', 'Coupling прячется в static calls, shared DTOs, database schemas, message contracts и exception types.'),
    ],
    diagram: `flowchart LR
http["Controller / HTTP"] --> app["Application service"]
app --> domain["Domain model"]
app --> port["Repository port"]
adapter["JPA adapter"] --> port
adapter --> db["Database"]`,
    methods: [
      method('Controller', 'Translates transport input into application calls.', 'Переводит transport input в application calls.'),
      method('Service', 'Coordinates use cases and transaction boundaries.', 'Координирует use cases и transaction boundaries.'),
      method('Repository', 'Hides persistence mechanics behind collection-like access.', 'Прячет persistence mechanics за collection-like access.'),
      method('DTO', 'Carries data across boundaries without exposing domain internals.', 'Передает данные через boundaries без раскрытия domain internals.'),
    ],
    examples: [
      `interface UserRepository {
    Optional<User> findByEmail(String email);
    User save(User user);
}

final class RegisterUserUseCase {
    private final UserRepository users;

    User register(String email) {
        users.findByEmail(email).ifPresent(existing -> {
            throw new IllegalArgumentException("Email already used");
        });
        return users.save(new User(email));
    }
}`,
    ],
    faq: [
      faq('What is the difference between design and architecture?', 'Чем design отличается от architecture?', 'Design is local structure; architecture is the set of high-impact decisions that are hard to change later.', 'Design - локальная структура; architecture - высоковлияющие решения, которые трудно менять позже.'),
      faq('Why not put business logic in controllers?', 'Почему не класть business logic в controllers?', 'Controllers are transport adapters. Mixing rules there ties domain behavior to HTTP and makes reuse/testing harder.', 'Controllers - transport adapters. Смешивание rules там привязывает domain behavior к HTTP и усложняет reuse/testing.'),
      faq('When is hexagonal architecture worth it?', 'Когда hexagonal architecture оправдана?', 'When the domain is important, integrations change, and tests should run without infrastructure.', 'Когда domain важен, integrations меняются, а tests должны работать без infrastructure.'),
    ],
  },
  {
    id: 'code-quality',
    groupId: 'engineering',
    stage: 'Fundamentals',
    title: { en: 'Code Quality, Clean Code & Refactoring', ru: 'Code quality, clean code и refactoring' },
    intro: {
      en: 'Code quality is the ability to safely understand, change, test, and operate code under team pressure.',
      ru: 'Code quality - способность безопасно понимать, менять, тестировать и эксплуатировать код под командным давлением.',
    },
    deepDive: {
      en: 'Clean code is not about prettiness; it is about reducing cognitive load. Names encode intent, small methods isolate reasons to change, immutability reduces hidden state, and tests protect behavior while refactoring changes structure. Static analysis tools catch patterns humans miss, but the strongest quality signal is whether the next change is easy and safe.',
      ru: 'Clean code не про красоту; он снижает cognitive load. Names кодируют intent, маленькие methods изолируют reasons to change, immutability уменьшает hidden state, а tests защищают behavior при refactoring структуры. Static analysis tools ловят patterns, которые пропускают люди, но главный quality signal - насколько следующее изменение простое и безопасное.',
    },
    mechanics: [
      mechanics('Cyclomatic complexity grows with branches; each branch multiplies the number of paths a reader and test suite must reason about.', 'Cyclomatic complexity растет с branches; каждая ветка умножает paths, которые должны понимать reader и test suite.'),
      mechanics('Refactoring is behavior-preserving; tests are the safety net that tells you whether structure changed without semantics changing.', 'Refactoring сохраняет behavior; tests - safety net, показывающая, что структура изменилась без изменения semantics.'),
      mechanics('Static analyzers parse AST/bytecode and match suspicious patterns such as null risks, duplicated blocks, or resource leaks.', 'Static analyzers парсят AST/bytecode и находят suspicious patterns: null risks, duplicated blocks или resource leaks.'),
    ],
    diagram: `flowchart LR
smell["Code smell"] --> test["Characterization test"]
test --> refactor["Small refactor"]
refactor --> analyze["Static analysis"]
analyze --> review["Code review"]
review --> deploy["Safer deploy"]`,
    methods: [
      method('extract method', 'Names a block and reduces local cognitive load.', 'Дает имя блоку и снижает local cognitive load.'),
      method('rename', 'Aligns code vocabulary with domain vocabulary.', 'Синхронизирует vocabulary кода с domain vocabulary.'),
      method('guard clause', 'Flattens nested conditionals by handling invalid states early.', 'Упрощает nested conditionals ранней обработкой invalid states.'),
      method('immutability', 'Makes object state easier to reason about and share safely.', 'Упрощает reasoning о state и безопасное sharing.'),
    ],
    examples: [
      `final class OrderValidator {
    void validate(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order is required");
        }
        if (order.items().isEmpty()) {
            throw new IllegalArgumentException("Order must contain items");
        }
    }
}`,
    ],
    faq: [
      faq('Is clean code subjective?', 'Clean code субъективен?', 'Some taste is subjective, but low coupling, clear names, small scope, tests, and simple control flow are objectively helpful.', 'Часть вкуса субъективна, но low coupling, clear names, small scope, tests и simple control flow объективно полезны.'),
      faq('When should code be refactored?', 'Когда нужно refactor-ить код?', 'Refactor when you are already changing the area and structure slows safe delivery.', 'Refactor-ьте, когда вы уже меняете область и структура мешает безопасной поставке.'),
      faq('Why does duplication matter?', 'Почему duplication важна?', 'Duplicated rules diverge. One bug fix may update one copy and leave another incorrect.', 'Дублированные rules расходятся. Один bug fix может обновить одну копию и оставить другую неправильной.'),
    ],
  },
  {
    id: 'jdbc-database-development',
    groupId: 'backend',
    stage: 'Fundamentals',
    title: { en: 'Java Database Development: JDBC & Transactions', ru: 'Java database development: JDBC и transactions' },
    intro: {
      en: 'JDBC is the low-level bridge between Java code and relational databases; understanding it makes ORM behavior less magical.',
      ru: 'JDBC - низкоуровневый мост между Java code и relational databases; понимание JDBC делает ORM behavior менее магическим.',
    },
    deepDive: {
      en: 'A JDBC driver implements database-specific protocol details behind the standard Connection, PreparedStatement, and ResultSet APIs. A connection is a scarce network resource, so production applications use pools. Prepared statements separate SQL shape from values, allowing safe parameter binding and often server-side planning. Transactions group statements with ACID guarantees; isolation controls what concurrent transactions can observe.',
      ru: 'JDBC driver реализует database-specific protocol details за стандартными API Connection, PreparedStatement и ResultSet. Connection - дефицитный network resource, поэтому production apps используют pools. Prepared statements отделяют SQL shape от values, позволяя безопасный parameter binding и часто server-side planning. Transactions группируют statements с ACID guarantees; isolation управляет тем, что видят concurrent transactions.',
    },
    mechanics: [
      mechanics('Connection pools do not make the database infinite; they cap concurrency and reuse authenticated TCP sessions.', 'Connection pools не делают database бесконечной; они ограничивают concurrency и переиспользуют authenticated TCP sessions.'),
      mechanics('ResultSet streams rows from the driver cursor; fetching everything into memory can destroy latency and heap.', 'ResultSet стримит rows из driver cursor; загрузка всего в memory может разрушить latency и heap.'),
      mechanics('Transaction commit forces the database to make changes durable according to its log and isolation rules.', 'Transaction commit заставляет database сделать changes durable согласно log и isolation rules.'),
    ],
    diagram: `sequenceDiagram
participant App
participant Pool
participant Driver
participant DB
App->>Pool: borrow connection
Pool->>Driver: JDBC Connection
App->>Driver: PreparedStatement + params
Driver->>DB: protocol query
DB-->>Driver: rows
App->>Pool: return connection`,
    methods: [
      method('DriverManager.getConnection()', 'Creates a database connection, usually replaced by a DataSource in apps.', 'Создает database connection, в приложениях обычно заменяется DataSource.'),
      method('PreparedStatement.setString()', 'Binds a value without string-concatenating SQL.', 'Привязывает value без string-concatenating SQL.'),
      method('ResultSet.next()', 'Moves the cursor to the next row.', 'Передвигает cursor к следующей row.'),
      method('Connection.commit()', 'Ends a transaction and persists its changes.', 'Завершает transaction и сохраняет changes.'),
    ],
    examples: [
      `try (Connection connection = dataSource.getConnection();
     PreparedStatement statement = connection.prepareStatement(
         "select id, email from users where email = ?")) {
    statement.setString(1, email);
    try (ResultSet rs = statement.executeQuery()) {
        if (rs.next()) {
            return new User(rs.getLong("id"), rs.getString("email"));
        }
    }
}`,
    ],
    faq: [
      faq('Why is string-concatenated SQL dangerous?', 'Почему SQL через конкатенацию опасен?', 'User input becomes executable SQL text, enabling injection. Prepared statements bind values separately.', 'User input становится исполняемым SQL text, открывая injection. Prepared statements отдельно bind-ят values.'),
      faq('Why use a connection pool?', 'Зачем connection pool?', 'Opening connections is expensive and databases have limits. Pools reuse connections and apply backpressure.', 'Открытие connections дорого, а у databases есть limits. Pools переиспользуют connections и создают backpressure.'),
      faq('What is transaction isolation?', 'Что такое transaction isolation?', 'It defines which uncommitted or concurrent changes a transaction can observe, trading consistency and throughput.', 'Она определяет, какие uncommitted или concurrent changes видит transaction, балансируя consistency и throughput.'),
    ],
  },
  {
    id: 'java-web-http',
    groupId: 'backend',
    stage: 'Fundamentals',
    title: { en: 'Java Web Development: HTTP, Servlets, REST', ru: 'Java web development: HTTP, Servlets, REST' },
    intro: {
      en: 'Java web development turns HTTP requests into application use cases and serializes responses back to clients.',
      ru: 'Java web development превращает HTTP requests в application use cases и сериализует responses обратно clients.',
    },
    deepDive: {
      en: 'HTTP is stateless: each request carries method, path, headers, body, and authentication context. Servlet containers such as Tomcat accept sockets, parse HTTP, choose a servlet/filter chain, and call application code on worker threads. REST uses resources, representations, status codes, and idempotency rules to make APIs predictable. Backend correctness includes validation, error mapping, content negotiation, timeouts, and safe request logging.',
      ru: 'HTTP stateless: каждый request несет method, path, headers, body и authentication context. Servlet containers вроде Tomcat принимают sockets, парсят HTTP, выбирают servlet/filter chain и вызывают application code на worker threads. REST использует resources, representations, status codes и idempotency rules, чтобы API было предсказуемым. Backend correctness включает validation, error mapping, content negotiation, timeouts и safe request logging.',
    },
    mechanics: [
      mechanics('A servlet container multiplexes many client connections onto a bounded worker thread pool.', 'Servlet container multiplex-ит много client connections на bounded worker thread pool.'),
      mechanics('Filters run before and after the servlet, making them natural places for auth, tracing, compression, and error handling.', 'Filters выполняются до и после servlet, поэтому подходят для auth, tracing, compression и error handling.'),
      mechanics('Idempotent methods let clients retry safely when a network failure hides whether the server received the request.', 'Idempotent methods позволяют clients безопасно retry, когда network failure скрывает, получил ли server request.'),
    ],
    diagram: `flowchart LR
client["HTTP client"] --> connector["Tomcat connector"]
connector --> filters["Filter chain"]
filters --> controller["Controller/Servlet"]
controller --> service["Service use case"]
service --> response["JSON + status code"]`,
    methods: [
      method('GET', 'Reads a resource and should be safe and idempotent.', 'Читает resource и должен быть safe и idempotent.'),
      method('POST', 'Creates or triggers processing and is not automatically idempotent.', 'Создает или запускает обработку и не является автоматически idempotent.'),
      method('HttpServletRequest', 'Provides method, path, headers, parameters, and body access.', 'Дает доступ к method, path, headers, parameters и body.'),
      method('HttpServletResponse', 'Controls status, headers, and response body.', 'Управляет status, headers и response body.'),
    ],
    examples: [
      `@RestController
class UserController {
    private final RegisterUserUseCase register;

    @PostMapping("/users")
    ResponseEntity<UserResponse> create(@Valid @RequestBody CreateUserRequest request) {
        User user = register.register(request.email());
        return ResponseEntity.status(201).body(UserResponse.from(user));
    }
}`,
    ],
    faq: [
      faq('What makes an endpoint RESTful?', 'Что делает endpoint RESTful?', 'It models resources, uses HTTP methods consistently, returns meaningful status codes, and avoids action-heavy RPC naming.', 'Он моделирует resources, последовательно использует HTTP methods, возвращает meaningful status codes и избегает action-heavy RPC naming.'),
      faq('Why does statelessness matter?', 'Почему statelessness важна?', 'Any server instance can handle the next request, improving scaling and failure recovery.', 'Любой server instance может обработать следующий request, улучшая scaling и failure recovery.'),
      faq('Where should validation happen?', 'Где должна быть validation?', 'Input shape validation belongs at the boundary; business invariant validation belongs in application/domain code.', 'Input shape validation находится на boundary; business invariant validation - в application/domain code.'),
    ],
  },
  {
    id: 'spring-framework-essentials',
    groupId: 'backend',
    stage: 'Fundamentals',
    title: { en: 'Spring Framework Essentials', ru: 'Spring Framework essentials' },
    intro: {
      en: 'Spring provides dependency injection, configuration, transactions, web adapters, and integration glue for enterprise Java applications.',
      ru: 'Spring дает dependency injection, configuration, transactions, web adapters и integration glue для enterprise Java applications.',
    },
    deepDive: {
      en: 'The Spring container scans configuration, creates bean definitions, resolves dependencies, and manages bean lifecycle. Dependency injection inverts object creation so application components depend on contracts instead of manually constructing collaborators. Spring often adds behavior through proxies: transactions, security, caching, and async execution wrap method calls around your bean. Understanding proxies explains why self-invocation can bypass @Transactional.',
      ru: 'Spring container сканирует configuration, создает bean definitions, резолвит dependencies и управляет bean lifecycle. Dependency injection инвертирует создание объектов, чтобы application components зависели от contracts, а не вручную создавали collaborators. Spring часто добавляет behavior через proxies: transactions, security, caching и async execution оборачивают method calls вокруг bean. Понимание proxies объясняет, почему self-invocation может обходить @Transactional.',
    },
    mechanics: [
      mechanics('Bean creation has phases: instantiate, populate dependencies, initialize, proxy, then expose for injection.', 'Bean creation проходит phases: instantiate, populate dependencies, initialize, proxy, затем expose for injection.'),
      mechanics('@Transactional usually works through a proxy, so only calls entering through the proxy get transaction advice.', '@Transactional обычно работает через proxy, поэтому transaction advice получают только calls, входящие через proxy.'),
      mechanics('Auto-configuration is conditional configuration; it backs off when the application provides its own bean.', 'Auto-configuration - conditional configuration; она отступает, когда приложение предоставляет свой bean.'),
    ],
    diagram: `flowchart TB
config["Configuration / component scan"] --> definitions["Bean definitions"]
definitions --> container["ApplicationContext"]
container --> bean["Target bean"]
bean --> proxy["Proxy with advice"]
proxy --> app["Application call"]`,
    methods: [
      method('@Component', 'Marks a class as a candidate for component scanning.', 'Помечает class как candidate для component scanning.'),
      method('@Bean', 'Declares an object created by configuration code.', 'Объявляет object, созданный configuration code.'),
      method('@Autowired', 'Requests dependency injection by type and qualifiers.', 'Запрашивает dependency injection по type и qualifiers.'),
      method('@Transactional', 'Wraps method execution in transaction boundaries through Spring AOP.', 'Оборачивает method execution в transaction boundaries через Spring AOP.'),
    ],
    examples: [
      `@Service
class TransferService {
    private final AccountRepository accounts;

    TransferService(AccountRepository accounts) {
        this.accounts = accounts;
    }

    @Transactional
    void transfer(long from, long to, BigDecimal amount) {
        accounts.getReferenceById(from).withdraw(amount);
        accounts.getReferenceById(to).deposit(amount);
    }
}`,
    ],
    faq: [
      faq('What is dependency injection really solving?', 'Что на самом деле решает dependency injection?', 'It separates object construction from object behavior, making dependencies explicit and replaceable.', 'Она отделяет object construction от object behavior, делая dependencies явными и заменяемыми.'),
      faq('Why can @Transactional fail on self-invocation?', 'Почему @Transactional может не сработать при self-invocation?', 'The call stays inside the target object and does not pass through the proxy that applies transaction advice.', 'Call остается внутри target object и не проходит через proxy, который применяет transaction advice.'),
      faq('Is Spring Boot different from Spring?', 'Spring Boot отличается от Spring?', 'Spring is the framework; Boot adds opinionated auto-configuration, starters, embedded servers, and production defaults.', 'Spring - framework; Boot добавляет opinionated auto-configuration, starters, embedded servers и production defaults.'),
    ],
  },
  {
    id: 'orm-jpa-hibernate',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'ORM Framework: JPA & Hibernate', ru: 'ORM framework: JPA и Hibernate' },
    intro: {
      en: 'ORM maps objects to relational tables, but the real skill is understanding the persistence context, SQL generation, and transaction boundaries.',
      ru: 'ORM маппит objects на relational tables, но настоящий навык - понимать persistence context, SQL generation и transaction boundaries.',
    },
    deepDive: {
      en: 'JPA defines a standard API, Hibernate implements it. The persistence context is a first-level cache and identity map: one database row maps to one managed entity instance inside a transaction. Dirty checking compares managed entity state and flushes SQL before commit or queries that need synchronization. Lazy loading uses proxies or bytecode enhancement, which can trigger SQL when a relation is accessed.',
      ru: 'JPA задает стандартный API, Hibernate его реализует. Persistence context - first-level cache и identity map: одна database row соответствует одному managed entity instance внутри transaction. Dirty checking сравнивает state managed entity и flush-ит SQL перед commit или queries, которым нужна синхронизация. Lazy loading использует proxies или bytecode enhancement, что может вызвать SQL при доступе к relation.',
    },
    mechanics: [
      mechanics('Managed entities are tracked; changing a field can become an UPDATE even without calling save explicitly.', 'Managed entities отслеживаются; изменение field может стать UPDATE даже без явного save.'),
      mechanics('N+1 happens when one query loads roots and then lazy relations trigger one extra query per row.', 'N+1 возникает, когда один query грузит roots, а lazy relations запускают по дополнительному query на row.'),
      mechanics('Flush synchronizes persistence context to SQL; commit makes the database transaction durable.', 'Flush синхронизирует persistence context в SQL; commit делает database transaction durable.'),
    ],
    diagram: `flowchart LR
entity["Entity object"] <--> context["Persistence context"]
context --> dirty["Dirty checking"]
dirty --> sql["Generated SQL"]
sql --> db["Relational DB"]
context --> cache["1st level cache"]`,
    methods: [
      method('EntityManager.find()', 'Loads an entity and places it in the persistence context.', 'Загружает entity и помещает его в persistence context.'),
      method('persist()', 'Makes a new entity managed and scheduled for insert.', 'Делает new entity managed и планирует insert.'),
      method('merge()', 'Copies detached state into a managed instance.', 'Копирует detached state в managed instance.'),
      method('flush()', 'Synchronizes pending changes with the database.', 'Синхронизирует pending changes с database.'),
    ],
    examples: [
      `@Entity
class OrderEntity {
    @Id
    private Long id;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderLineEntity> lines = new ArrayList<>();
}

@Transactional
void rename(long id, String name) {
    Product product = entityManager.find(Product.class, id);
    product.setName(name); // dirty checking schedules UPDATE
}`,
    ],
    faq: [
      faq('What is the persistence context?', 'Что такое persistence context?', 'It is a unit-of-work cache that tracks managed entities and coordinates SQL flushing.', 'Это unit-of-work cache, который tracks managed entities и координирует SQL flushing.'),
      faq('Why is N+1 dangerous?', 'Почему N+1 опасен?', 'Latency grows with row count because each entity access triggers extra database round trips.', 'Latency растет с row count, потому что доступ к каждой entity вызывает extra database round trips.'),
      faq('What is a detached entity?', 'Что такое detached entity?', 'An entity that has an identity but is no longer tracked by the current persistence context.', 'Entity с identity, которая больше не tracked текущим persistence context.'),
    ],
  },
  {
    id: 'devops-cloud-overview',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'DevOps & Cloud Essentials for Java Backend', ru: 'DevOps и cloud essentials для Java backend' },
    intro: {
      en: 'A backend service is not finished when code compiles; it must be packaged, configured, deployed, monitored, scaled, and recovered.',
      ru: 'Backend service не закончен, когда код компилируется; его нужно package-ить, configure-ить, deploy-ить, monitor-ить, scale-ить и recover-ить.',
    },
    deepDive: {
      en: 'Modern Java services are commonly built into jars or container images. Configuration comes from environment variables, files, or secret stores. Health checks tell orchestrators when to route traffic or restart instances. Metrics, logs, and traces expose runtime behavior. CI/CD pipelines compile, test, scan, package, and deploy in repeatable stages. Cloud platforms add managed databases, queues, load balancers, IAM, and autoscaling, but also require cost and failure-mode thinking.',
      ru: 'Современные Java services обычно собираются в jars или container images. Configuration приходит из environment variables, files или secret stores. Health checks говорят orchestrators, когда направлять traffic или restart-ить instances. Metrics, logs и traces показывают runtime behavior. CI/CD pipelines compile, test, scan, package и deploy в воспроизводимых stages. Cloud platforms добавляют managed databases, queues, load balancers, IAM и autoscaling, но требуют думать о cost и failure modes.',
    },
    mechanics: [
      mechanics('A container image layers filesystem changes; rebuilding only changed layers speeds delivery.', 'Container image наслаивает filesystem changes; rebuild только измененных layers ускоряет delivery.'),
      mechanics('Readiness and liveness are different: one controls traffic, the other controls restart decisions.', 'Readiness и liveness различны: одна управляет traffic, другая restart decisions.'),
      mechanics('Autoscaling reacts to signals such as CPU, queue depth, or request rate; bad signals scale the wrong bottleneck.', 'Autoscaling реагирует на CPU, queue depth или request rate; плохие signals scale-ят неправильный bottleneck.'),
    ],
    diagram: `flowchart LR
commit["Git commit"] --> ci["CI: build + test"]
ci --> image["Container image"]
image --> registry["Registry"]
registry --> deploy["Deploy"]
deploy --> runtime["Cloud runtime"]
runtime --> obs["Logs / metrics / traces"]`,
    methods: [
      method('Dockerfile', 'Defines how the application image is built.', 'Определяет, как строится application image.'),
      method('health endpoint', 'Reports whether the service can run or receive traffic.', 'Сообщает, может ли service работать или принимать traffic.'),
      method('CI pipeline', 'Automates build, tests, quality checks, and packaging.', 'Автоматизирует build, tests, quality checks и packaging.'),
      method('structured logging', 'Emits machine-readable events for search and correlation.', 'Пишет machine-readable events для search и correlation.'),
    ],
    examples: [
      `@RestController
class HealthController {
    @GetMapping("/health/readiness")
    Map<String, String> readiness() {
        return Map.of("status", "UP");
    }
}`,
    ],
    faq: [
      faq('Why should config be externalized?', 'Почему config должен быть externalized?', 'The same artifact can move between environments while values such as URLs and secrets change safely.', 'Один artifact может идти между environments, а values вроде URLs и secrets безопасно меняются.'),
      faq('What is observability?', 'Что такое observability?', 'The ability to infer internal state from outputs: logs, metrics, traces, and events.', 'Способность понимать internal state по outputs: logs, metrics, traces и events.'),
      faq('Why do backend developers need cloud basics?', 'Зачем backend-разработчику cloud basics?', 'Runtime limits, networking, scaling, storage, and failure modes shape application design.', 'Runtime limits, networking, scaling, storage и failure modes формируют application design.'),
    ],
  },
);

const chapterMap = {
  'java-basics-oop': [
    chapter('Primitive and reference types', 'Primitive и reference types', 'Java has primitive values and object references. This distinction affects memory, nullability, generics, collections, and performance.', 'В Java есть primitive values и object references. Это влияет на memory, nullability, generics, collections и performance.', [
      point('Primitives cannot be null and store raw values; wrappers are objects and can represent absence with null, but at allocation and identity cost.', 'Primitives не могут быть null и хранят raw values; wrappers - objects и могут выражать absence через null, но ценой allocation и identity.'),
      point('Autoboxing hides conversions. In hot paths, accidental boxing can create many temporary objects.', 'Autoboxing скрывает conversions. В hot paths случайный boxing может создавать много temporary objects.'),
    ]),
    chapter('Object class contract', 'Контракт Object', 'Every Java class inherits Object methods, so equals, hashCode, and toString form the base object protocol.', 'Каждый Java class наследует methods Object, поэтому equals, hashCode и toString формируют базовый object protocol.', [
      point('Override equals and hashCode together. Hash-based collections depend on both.', 'Переопределяйте equals и hashCode вместе. Hash-based collections зависят от обоих.'),
      point('toString should be useful for diagnostics but must not leak passwords, tokens, or personal data.', 'toString должен быть полезен для diagnostics, но не должен leak-ить passwords, tokens или personal data.'),
    ]),
    chapter('Enums and domain modeling', 'Enums и domain modeling', 'Enums are fixed singleton instances and can contain fields, methods, and behavior per constant.', 'Enums - fixed singleton instances и могут содержать fields, methods и behavior per constant.', [
      point('Use enum for a stable closed set controlled by code. Avoid enum when values are configured by users or database.', 'Используйте enum для stable closed set, controlled code-ом. Избегайте enum, когда values configured users/database.'),
      point('Enum-specific methods can replace switch statements when behavior belongs to each constant.', 'Enum-specific methods могут заменить switch statements, когда behavior принадлежит каждой constant.'),
    ], [
      `enum OrderStatus {
    NEW {
        boolean canCancel() { return true; }
    },
    PAID {
        boolean canCancel() { return false; }
    };

    abstract boolean canCancel();
}`,
    ]),
  ],
  'strings-immutability': [
    chapter('String pool and interning', 'String pool и interning', 'The String Pool stores canonical string instances for literals and explicitly interned strings.', 'String Pool хранит canonical string instances для literals и явно interned strings.', [
      point('Use equals for content comparison. == only checks whether references point to the same object.', 'Используйте equals для content comparison. == проверяет только, указывают ли references на один object.'),
      point('Do not call intern blindly on user data; it can increase memory pressure by keeping many canonical strings.', 'Не вызывайте intern слепо на user data; это может увеличить memory pressure из-за множества canonical strings.'),
    ]),
    chapter('StringBuilder and concatenation', 'StringBuilder и concatenation', 'StringBuilder is mutable and efficient for repeated assembly of text.', 'StringBuilder mutable и эффективен для повторной сборки text.', [
      point('Compiler can optimize simple concatenation, but loops should use StringBuilder or stream collectors deliberately.', 'Compiler может optimize simple concatenation, но loops должны использовать StringBuilder или stream collectors осознанно.'),
      point('StringBuffer is synchronized legacy API; use it only when shared mutable string building is actually required.', 'StringBuffer - synchronized legacy API; используйте только когда реально нужен shared mutable string building.'),
    ], [
      `StringBuilder builder = new StringBuilder();
for (String column : columns) {
    if (!builder.isEmpty()) {
        builder.append(", ");
    }
    builder.append(column);
}`,
    ]),
    chapter('Designing immutable classes', 'Проектирование immutable classes', 'Immutability is a design discipline: final state, no mutators, defensive copies, and no escaping mutable internals.', 'Immutability - design discipline: final state, no mutators, defensive copies и no escaping mutable internals.', [
      point('If a field refers to a mutable object, final only protects the reference, not the object contents.', 'Если field ссылается на mutable object, final защищает только reference, а не contents object.'),
      point('Use List.copyOf, Set.copyOf, or defensive copying when accepting collections into immutable objects.', 'Используйте List.copyOf, Set.copyOf или defensive copying при приеме collections в immutable objects.'),
    ]),
  ],
  'jvm-memory': [
    chapter('Class loading lifecycle', 'Class loading lifecycle', 'Classes are loaded, linked, verified, prepared, resolved, and initialized before normal use.', 'Classes проходят loading, linking, verification, preparation, resolution и initialization перед normal use.', [
      point('Parent delegation prevents application code from replacing core JDK classes accidentally.', 'Parent delegation предотвращает accidental replacement core JDK classes application code-ом.'),
      point('Static initialization happens once per classloader, not once globally across all classloaders.', 'Static initialization происходит один раз на classloader, а не один раз globally для всех classloaders.'),
    ]),
    chapter('Heap, stack, and frames', 'Heap, stack и frames', 'A method invocation creates a frame; object graphs live on the heap and are reached through references.', 'Method invocation создает frame; object graphs живут в heap и достижимы через references.', [
      point('StackOverflowError usually means recursive call depth or huge stack frames, not heap exhaustion.', 'StackOverflowError обычно означает recursive call depth или huge stack frames, а не heap exhaustion.'),
      point('OutOfMemoryError can happen in heap, metaspace, direct memory, thread creation, or native memory.', 'OutOfMemoryError может случиться в heap, metaspace, direct memory, thread creation или native memory.'),
    ]),
    chapter('JMM in daily code', 'JMM в ежедневном коде', 'JMM rules explain why concurrency bugs can appear only under load.', 'JMM rules объясняют, почему concurrency bugs могут проявляться только под load.', [
      point('Use final fields for safe construction of immutable objects.', 'Используйте final fields для safe construction immutable objects.'),
      point('Use synchronized, volatile, locks, atomics, or concurrent collections to create correct happens-before edges.', 'Используйте synchronized, volatile, locks, atomics или concurrent collections для correct happens-before edges.'),
    ]),
  ],
  'garbage-collection': [
    chapter('Roots and reachability', 'Roots и reachability', 'GC starts from roots and walks references; everything not reached can be reclaimed.', 'GC стартует от roots и проходит references; все недостижимое может быть reclaimed.', [
      point('Thread locals are common leak sources in application servers and thread pools.', 'Thread locals - частые leak sources в application servers и thread pools.'),
      point('Caches need eviction by size, time, or explicit invalidation.', 'Caches требуют eviction по size, time или explicit invalidation.'),
    ]),
    chapter('Reference types', 'Reference types', 'Java reference strengths let you communicate cache and cleanup semantics to GC.', 'Java reference strengths позволяют сообщать GC semantics cache и cleanup.', [
      point('WeakHashMap is useful when keys should not prevent collection, but values can still accidentally reference keys.', 'WeakHashMap полезен, когда keys не должны предотвращать collection, но values могут accidentally reference keys.'),
      point('Phantom references are for post-mortem cleanup coordination, not for resurrecting objects.', 'Phantom references нужны для post-mortem cleanup coordination, не для resurrecting objects.'),
    ]),
    chapter('Tuning principles', 'Принципы tuning', 'Tune GC only after understanding allocation rate, live set, pause goals, and throughput needs.', 'Tune-ьте GC только после понимания allocation rate, live set, pause goals и throughput needs.', [
      point('Increasing heap can reduce GC frequency but increase worst-case pause and memory footprint.', 'Увеличение heap может снизить GC frequency, но увеличить worst-case pause и memory footprint.'),
      point('A memory leak cannot be solved by changing collector algorithm; reachability must be fixed.', 'Memory leak нельзя решить сменой collector algorithm; нужно чинить reachability.'),
    ]),
  ],
  collections: [
    chapter('HashMap internals', 'HashMap internals', 'HashMap uses an array of bins, spread hashes, linked nodes, tree bins under heavy collisions, and resizing by thresholds.', 'HashMap использует array bins, spread hashes, linked nodes, tree bins при heavy collisions и resizing по thresholds.', [
      point('Bucket index is calculated with a mask because capacity is a power of two.', 'Bucket index вычисляется mask-ом, потому что capacity - power of two.'),
      point('Treeification requires both collision threshold and sufficient table capacity.', 'Treeification требует collision threshold и достаточную table capacity.'),
    ], [
      `int spread(int h) {
    return h ^ (h >>> 16);
}

int bucketIndex(int hash, int capacity) {
    return (capacity - 1) & spread(hash);
}`,
    ]),
    chapter('List implementations', 'List implementations', 'ArrayList optimizes random access and compact memory; LinkedList optimizes neither CPU cache nor most real insert patterns.', 'ArrayList оптимизирует random access и compact memory; LinkedList обычно не оптимизирует ни CPU cache, ни большинство real insert patterns.', [
      point('ArrayList middle insert shifts references with System.arraycopy-like mechanics.', 'ArrayList middle insert shifts references через механику вроде System.arraycopy.'),
      point('LinkedList node overhead makes traversal expensive despite O(1) local insertion once node is known.', 'LinkedList node overhead делает traversal дорогим, несмотря на O(1) local insertion когда node уже известен.'),
    ]),
    chapter('Collection contracts', 'Collection contracts', 'Collections rely on contracts: equality, ordering, mutability, fail-fast iteration, and null policy.', 'Collections опираются на contracts: equality, ordering, mutability, fail-fast iteration и null policy.', [
      point('TreeSet/TreeMap use comparator equality for uniqueness, not equals directly.', 'TreeSet/TreeMap используют comparator equality для uniqueness, а не equals напрямую.'),
      point('Unmodifiable views are not necessarily immutable snapshots.', 'Unmodifiable views не обязательно immutable snapshots.'),
    ]),
  ],
  generics: [
    chapter('Type erasure', 'Type erasure', 'Generics are mainly a compile-time safety system layered over erased runtime types.', 'Generics - в основном compile-time safety system поверх erased runtime types.', [
      point('You cannot overload methods only by generic parameter: List<String> and List<Integer> erase similarly.', 'Нельзя overload methods только generic parameter-ом: List<String> и List<Integer> erase-ятся похоже.'),
      point('Runtime libraries use Class<T>, ParameterizedType, or framework-specific type tokens to recover type information.', 'Runtime libraries используют Class<T>, ParameterizedType или framework-specific type tokens для восстановления type information.'),
    ]),
    chapter('Bounds and wildcards', 'Bounds и wildcards', 'Bounds describe what operations are legal; wildcards describe producer/consumer variance.', 'Bounds описывают legal operations; wildcards описывают producer/consumer variance.', [
      point('T extends Number lets code call Number methods on T.', 'T extends Number позволяет code вызывать Number methods на T.'),
      point('? super T is useful for sinks: adding T values into a collection.', '? super T полезен для sinks: добавления T values в collection.'),
    ]),
    chapter('API design with generics', 'API design with generics', 'Good generic APIs communicate flexibility without forcing callers into casts.', 'Хорошие generic APIs передают flexibility без принуждения callers к casts.', [
      point('Use method-level type parameters when the type relationship exists only for one operation.', 'Используйте method-level type parameters, когда type relationship существует только для одной operation.'),
      point('Avoid exposing raw types anywhere in modern code.', 'Избегайте raw types в modern code.'),
    ]),
  ],
  exceptions: [
    chapter('Exception taxonomy', 'Exception taxonomy', 'Throwable splits fatal JVM/application errors from recoverable or meaningful exceptions.', 'Throwable разделяет fatal JVM/application errors и recoverable/meaningful exceptions.', [
      point('Do not catch Error except at very high-level crash reporting boundaries.', 'Не catch-ьте Error кроме very high-level crash reporting boundaries.'),
      point('Use domain-specific exceptions only when they improve caller decisions or error mapping.', 'Используйте domain-specific exceptions только когда они улучшают caller decisions или error mapping.'),
    ]),
    chapter('Resource safety', 'Resource safety', 'Resource cleanup must happen on success and failure.', 'Resource cleanup должен происходить при success и failure.', [
      point('try-with-resources is safer than manual finally blocks and preserves suppressed close failures.', 'try-with-resources безопаснее manual finally blocks и сохраняет suppressed close failures.'),
      point('Closing a wrapper stream often closes the underlying stream.', 'Closing wrapper stream часто closes underlying stream.'),
    ]),
    chapter('Error mapping', 'Error mapping', 'Backend APIs should translate internal failures into stable external error contracts.', 'Backend APIs должны translate internal failures в stable external error contracts.', [
      point('Do not return raw stack traces to clients.', 'Не возвращайте raw stack traces clients.'),
      point('Log enough correlation data to diagnose without leaking secrets.', 'Log-ируйте достаточно correlation data для diagnosis без leakage secrets.'),
    ]),
  ],
  concurrency: [
    chapter('Thread lifecycle and scheduling', 'Thread lifecycle и scheduling', 'Java threads map to OS scheduling realities; runnable does not mean currently running.', 'Java threads связаны с OS scheduling; runnable не означает currently running.', [
      point('Blocking calls occupy threads. In servlet apps, blocked request threads reduce throughput.', 'Blocking calls занимают threads. В servlet apps blocked request threads снижают throughput.'),
      point('Thread interruption is cooperative; code must check or propagate InterruptedException correctly.', 'Thread interruption cooperative; code должен check или propagate InterruptedException корректно.'),
    ]),
    chapter('Locks, volatile, and atomics', 'Locks, volatile и atomics', 'Different primitives solve different concurrency problems.', 'Разные primitives решают разные concurrency problems.', [
      point('Use locks for compound invariants involving multiple fields.', 'Используйте locks для compound invariants с несколькими fields.'),
      point('Use AtomicInteger/AtomicReference for simple atomic state transitions.', 'Используйте AtomicInteger/AtomicReference для simple atomic state transitions.'),
      point('Use volatile for status flags and safe publication, not counters.', 'Используйте volatile для status flags и safe publication, не counters.'),
    ]),
    chapter('Executors and concurrent collections', 'Executors и concurrent collections', 'Concurrency utilities encode hard-won rules; use them before writing custom thread coordination.', 'Concurrency utilities кодируют сложные rules; используйте их до написания custom thread coordination.', [
      point('CompletableFuture is powerful but can accidentally run blocking work on the wrong pool.', 'CompletableFuture powerful, но может случайно запускать blocking work на wrong pool.'),
      point('ConcurrentHashMap operations are thread-safe individually, but multi-step workflows may still need coordination.', 'ConcurrentHashMap operations thread-safe individually, но multi-step workflows могут требовать coordination.'),
    ]),
  ],
  'io-serialization': [
    chapter('Classic I/O vs NIO', 'Classic I/O vs NIO', 'Classic I/O is stream-oriented; NIO is buffer/channel-oriented and supports scalable multiplexing.', 'Classic I/O stream-oriented; NIO buffer/channel-oriented и поддерживает scalable multiplexing.', [
      point('Use Readers/Writers for characters and streams/channels for bytes.', 'Используйте Readers/Writers для characters и streams/channels для bytes.'),
      point('Character encoding must be explicit at system boundaries.', 'Character encoding должен быть explicit на system boundaries.'),
    ]),
    chapter('Serialization design', 'Serialization design', 'Serialization is a contract between versions and processes.', 'Serialization - contract между versions и processes.', [
      point('serialVersionUID controls compatibility checks for native Java serialization.', 'serialVersionUID управляет compatibility checks для native Java serialization.'),
      point('Prefer schema-based formats for service communication.', 'Предпочитайте schema-based formats для service communication.'),
    ]),
    chapter('File and network resource limits', 'File и network resource limits', 'I/O code must respect descriptors, timeouts, backpressure, and partial reads/writes.', 'I/O code должен учитывать descriptors, timeouts, backpressure и partial reads/writes.', [
      point('A read call may return fewer bytes than requested.', 'Read call может вернуть меньше bytes, чем requested.'),
      point('Network code without timeouts can hang threads forever.', 'Network code без timeouts может hang-нуть threads навсегда.'),
    ]),
  ],
  'reflection-annotations': [
    chapter('Reflection use cases', 'Reflection use cases', 'Reflection powers frameworks, serialization, dependency injection, test tools, and mappers.', 'Reflection питает frameworks, serialization, dependency injection, test tools и mappers.', [
      point('Use reflection at boundaries; keep core domain code statically typed.', 'Используйте reflection на boundaries; core domain code держите statically typed.'),
      point('Cache discovered metadata to avoid repeated scanning.', 'Cache-ируйте discovered metadata, чтобы избежать repeated scanning.'),
    ]),
    chapter('Annotation design', 'Annotation design', 'Annotations should describe metadata, not hide complex business logic.', 'Annotations должны описывать metadata, а не скрывать complex business logic.', [
      point('Choose RetentionPolicy.RUNTIME only when runtime code must read the annotation.', 'Выбирайте RetentionPolicy.RUNTIME только когда runtime code должен читать annotation.'),
      point('Use @Target narrowly so annotations cannot be placed on meaningless elements.', 'Используйте @Target narrow, чтобы annotations не ставили на meaningless elements.'),
    ]),
    chapter('Framework scanning', 'Framework scanning', 'Frameworks scan classes, build metadata models, then instantiate or proxy selected types.', 'Frameworks scan-ят classes, строят metadata models, затем instantiate/proxy selected types.', [
      point('Classpath scanning cost matters at startup in large applications.', 'Classpath scanning cost важен на startup больших applications.'),
      point('Reflection exceptions often wrap the real user-code exception.', 'Reflection exceptions часто wrap-ят real user-code exception.'),
    ]),
  ],
  functional: [
    chapter('Functional interfaces', 'Functional interfaces', 'A functional interface has one abstract method and becomes a target type for lambdas.', 'Functional interface имеет один abstract method и становится target type для lambdas.', [
      point('@FunctionalInterface documents intent and lets compiler catch accidental second abstract methods.', '@FunctionalInterface documents intent и позволяет compiler ловить accidental second abstract methods.'),
      point('Use standard interfaces such as Function, Predicate, Consumer, Supplier before creating custom ones.', 'Используйте standard interfaces вроде Function, Predicate, Consumer, Supplier до создания custom.'),
    ]),
    chapter('Stream pipeline execution', 'Stream pipeline execution', 'Streams build a lazy pipeline and execute it only through a terminal operation.', 'Streams строят lazy pipeline и выполняются только через terminal operation.', [
      point('Intermediate operations can be stateless or stateful. sorted and distinct need more coordination than map/filter.', 'Intermediate operations бывают stateless/stateful. sorted и distinct требуют больше coordination, чем map/filter.'),
      point('Short-circuiting operations like anyMatch can stop early.', 'Short-circuiting operations вроде anyMatch могут остановиться early.'),
    ]),
    chapter('Collectors and grouping', 'Collectors и grouping', 'Collectors encode reduction into maps, lists, sets, summaries, strings, or custom containers.', 'Collectors кодируют reduction в maps, lists, sets, summaries, strings или custom containers.', [
      point('groupingBy is powerful but can create large maps; understand cardinality.', 'groupingBy powerful, но может создать large maps; понимайте cardinality.'),
      point('toMap needs a merge function when duplicate keys are possible.', 'toMap требует merge function, когда duplicate keys possible.'),
    ]),
  ],
  'cs-algorithms-data-structures': [
    chapter('Complexity in backend systems', 'Complexity в backend systems', 'Backend complexity includes CPU, memory, network, database, and serialization costs.', 'Backend complexity включает CPU, memory, network, database и serialization costs.', [
      point('An O(n) operation inside every request becomes a capacity problem when request volume grows.', 'O(n) operation внутри каждого request становится capacity problem при росте request volume.'),
      point('Remote calls inside loops are usually worse than local algorithmic inefficiency.', 'Remote calls внутри loops обычно хуже local algorithmic inefficiency.'),
    ]),
    chapter('Core structures to master', 'Core structures to master', 'Senior Java developers should know when to use arrays, hash tables, trees, heaps, queues, and graphs.', 'Senior Java developers должны знать, когда использовать arrays, hash tables, trees, heaps, queues и graphs.', [
      point('Heaps appear in priority queues, schedulers, top-K problems, and timeouts.', 'Heaps встречаются в priority queues, schedulers, top-K problems и timeouts.'),
      point('Graphs appear in dependencies, permissions, workflows, routes, and recommendation logic.', 'Graphs встречаются в dependencies, permissions, workflows, routes и recommendation logic.'),
    ]),
    chapter('Problem-solving pattern', 'Problem-solving pattern', 'Clarify constraints before choosing an algorithm.', 'Уточняйте constraints до выбора algorithm.', [
      point('Ask about input size, ordering, duplicates, mutation, memory limits, and latency requirements.', 'Спрашивайте про input size, ordering, duplicates, mutation, memory limits и latency requirements.'),
      point('Choose the simplest structure that meets constraints.', 'Выбирайте simplest structure, удовлетворяющую constraints.'),
    ]),
  ],
  'git-development-tools': [
    chapter('Git internals enough for work', 'Git internals для работы', 'Understanding objects, commits, branches, merge, and rebase prevents panic during conflicts.', 'Понимание objects, commits, branches, merge и rebase предотвращает panic при conflicts.', [
      point('A commit points to a tree and parents; branch names point to commits.', 'Commit указывает на tree и parents; branch names указывают на commits.'),
      point('Reflog can recover many “lost” commits while local history still exists.', 'Reflog может восстановить многие “lost” commits, пока local history существует.'),
    ]),
    chapter('Build and dependency hygiene', 'Build и dependency hygiene', 'Build files are production inputs, not incidental metadata.', 'Build files - production inputs, а не incidental metadata.', [
      point('Dependency convergence and version conflicts can cause runtime NoSuchMethodError or ClassNotFoundException.', 'Dependency convergence и version conflicts могут вызвать runtime NoSuchMethodError или ClassNotFoundException.'),
      point('CI should run the same commands developers trust locally.', 'CI должен запускать те же commands, которым developers доверяют локально.'),
    ]),
    chapter('Debugging tools', 'Debugging tools', 'Use debugger, logs, profiler, and tests for different layers of evidence.', 'Используйте debugger, logs, profiler и tests для разных layers evidence.', [
      point('Debugger answers current state; logs answer historical flow; profiler answers where time/resources went.', 'Debugger отвечает current state; logs - historical flow; profiler - куда ушли time/resources.'),
      point('Do not debug concurrency only with breakpoints; breakpoints change timing.', 'Не debug-ьте concurrency только breakpoints; breakpoints меняют timing.'),
    ]),
  ],
  testing: [
    chapter('Unit testing deep rules', 'Unit testing deep rules', 'Unit tests should be fast, deterministic, isolated, and behavior-focused.', 'Unit tests должны быть fast, deterministic, isolated и behavior-focused.', [
      point('One test should fail for one clear reason.', 'Один test должен падать по одной clear reason.'),
      point('Avoid asserting implementation details that will change during refactoring.', 'Избегайте assert implementation details, которые изменятся при refactoring.'),
    ]),
    chapter('Integration testing boundaries', 'Integration testing boundaries', 'Integration tests prove that wiring, serialization, SQL, transactions, and framework behavior work together.', 'Integration tests доказывают, что wiring, serialization, SQL, transactions и framework behavior работают вместе.', [
      point('Use realistic database behavior for transaction and SQL tests; in-memory substitutes can lie.', 'Используйте realistic database behavior для transaction и SQL tests; in-memory substitutes могут лгать.'),
      point('Test slices reduce startup cost but can hide full-context configuration issues.', 'Test slices снижают startup cost, но могут скрыть full-context configuration issues.'),
    ]),
    chapter('Test doubles', 'Test doubles', 'Mocks, stubs, fakes, spies, and dummies solve different testing problems.', 'Mocks, stubs, fakes, spies и dummies решают разные testing problems.', [
      point('Prefer fakes for complex behavior when mocks become unreadable.', 'Предпочитайте fakes для complex behavior, когда mocks становятся unreadable.'),
      point('Mock external boundaries, not every internal class.', 'Mock-айте external boundaries, не каждый internal class.'),
    ]),
  ],
  'software-design-architecture': [
    chapter('Layered architecture', 'Layered architecture', 'Layers organize responsibilities: transport, application, domain, persistence, infrastructure.', 'Layers организуют responsibilities: transport, application, domain, persistence, infrastructure.', [
      point('A lower layer should not depend on a higher layer.', 'Lower layer не должен зависеть от higher layer.'),
      point('Domain rules should not require HTTP request objects or ORM sessions.', 'Domain rules не должны требовать HTTP request objects или ORM sessions.'),
    ]),
    chapter('Hexagonal architecture', 'Hexagonal architecture', 'Ports define what the application needs; adapters implement those needs using technology.', 'Ports определяют, что нужно application; adapters реализуют это technology-ей.', [
      point('Inbound adapters call use cases; outbound adapters call databases, queues, HTTP APIs.', 'Inbound adapters вызывают use cases; outbound adapters вызывают databases, queues, HTTP APIs.'),
      point('The domain can be tested without starting Spring or a database.', 'Domain можно тестировать без запуска Spring или database.'),
    ]),
    chapter('Architecture decisions', 'Architecture decisions', 'Senior engineers record important trade-offs, not just final diagrams.', 'Senior engineers фиксируют important trade-offs, не только final diagrams.', [
      point('Use ADRs for decisions that future maintainers will question.', 'Используйте ADRs для decisions, которые future maintainers будут questioning.'),
      point('Architecture must include operational concerns: deploy, observe, recover, secure.', 'Architecture должна включать operational concerns: deploy, observe, recover, secure.'),
    ]),
  ],
  'code-quality': [
    chapter('Naming and intent', 'Naming и intent', 'Names are the first documentation readers see.', 'Names - первая documentation, которую видят readers.', [
      point('Prefer domain terms over technical placeholders: invoice, settlement, reservation, entitlement.', 'Предпочитайте domain terms вместо technical placeholders: invoice, settlement, reservation, entitlement.'),
      point('Boolean names should read like predicates: isExpired, hasPermission, canRetry.', 'Boolean names должны читаться как predicates: isExpired, hasPermission, canRetry.'),
    ]),
    chapter('Managing complexity', 'Managing complexity', 'Complexity grows through branching, mutable state, hidden dependencies, and mixed abstraction levels.', 'Complexity растет через branching, mutable state, hidden dependencies и mixed abstraction levels.', [
      point('Guard clauses reduce nesting and reveal preconditions.', 'Guard clauses снижают nesting и показывают preconditions.'),
      point('Extract policy objects when conditionals represent business rules that change independently.', 'Extract policy objects, когда conditionals представляют business rules, меняющиеся независимо.'),
    ]),
    chapter('Review mindset', 'Review mindset', 'Code review should protect behavior, maintainability, observability, and operability.', 'Code review должен защищать behavior, maintainability, observability и operability.', [
      point('Review error paths, transaction boundaries, logging, security, and test coverage, not only happy path.', 'Review-ьте error paths, transaction boundaries, logging, security и test coverage, не только happy path.'),
      point('Ask whether the next developer will know where to change this code.', 'Спрашивайте, поймет ли следующий developer, где менять этот code.'),
    ]),
  ],
  'jdbc-database-development': [
    chapter('Connection and statement lifecycle', 'Lifecycle connection и statement', 'Correct JDBC code borrows, uses, and returns resources predictably.', 'Correct JDBC code предсказуемо borrows, uses и returns resources.', [
      point('try-with-resources prevents leaks when query execution or row mapping throws.', 'try-with-resources предотвращает leaks, когда query execution или row mapping throws.'),
      point('Connection pool size should match database capacity and request concurrency, not CPU cores alone.', 'Connection pool size должен соответствовать database capacity и request concurrency, а не только CPU cores.'),
    ]),
    chapter('Transactions', 'Transactions', 'A transaction should wrap one business-consistent unit of work.', 'Transaction должен wrap-ить одну business-consistent unit of work.', [
      point('Do not keep transactions open during remote HTTP calls if avoidable.', 'Не держите transactions open во время remote HTTP calls, если можно избежать.'),
      point('Rollback rules must match business failure semantics.', 'Rollback rules должны соответствовать business failure semantics.'),
    ]),
    chapter('SQL safety', 'SQL safety', 'SQL safety includes injection prevention, type binding, result limits, and plan awareness.', 'SQL safety включает injection prevention, type binding, result limits и plan awareness.', [
      point('Always bind values; never concatenate user input into SQL text.', 'Всегда bind-ьте values; никогда не concatenate user input в SQL text.'),
      point('Paginate large result sets and define deterministic ordering.', 'Paginate large result sets и задавайте deterministic ordering.'),
    ]),
  ],
  'java-web-http': [
    chapter('HTTP semantics', 'HTTP semantics', 'HTTP method semantics help clients, caches, proxies, retries, and humans reason about APIs.', 'HTTP method semantics помогают clients, caches, proxies, retries и людям понимать APIs.', [
      point('GET should be safe; PUT and DELETE should be idempotent; POST is flexible but less retry-friendly.', 'GET должен быть safe; PUT и DELETE idempotent; POST flexible, но менее retry-friendly.'),
      point('Use 409 for conflict, 404 for missing resource, 401 for unauthenticated, 403 for authenticated but forbidden.', 'Используйте 409 для conflict, 404 для missing resource, 401 для unauthenticated, 403 для authenticated but forbidden.'),
    ]),
    chapter('Request processing', 'Request processing', 'A request passes through connectors, filters, argument binding, validation, controller, service, and serialization.', 'Request проходит connectors, filters, argument binding, validation, controller, service и serialization.', [
      point('Validation errors should produce stable machine-readable error responses.', 'Validation errors должны давать stable machine-readable error responses.'),
      point('Correlation IDs should flow through logs and downstream calls.', 'Correlation IDs должны идти через logs и downstream calls.'),
    ]),
    chapter('API evolution', 'API evolution', 'APIs are contracts and must evolve compatibly.', 'APIs - contracts и должны evolve compatibly.', [
      point('Adding optional response fields is usually safe; removing or renaming fields breaks clients.', 'Добавление optional response fields обычно safe; removal/rename fields ломает clients.'),
      point('Version when behavior or contract changes cannot be made backward compatible.', 'Version-ьте, когда behavior или contract changes нельзя сделать backward compatible.'),
    ]),
  ],
  'spring-framework-essentials': [
    chapter('Dependency injection', 'Dependency injection', 'DI makes dependencies explicit and lets the container assemble object graphs.', 'DI делает dependencies explicit и позволяет container assemble object graphs.', [
      point('Constructor injection expresses required dependencies and supports immutability.', 'Constructor injection выражает required dependencies и поддерживает immutability.'),
      point('Field injection hides dependencies and complicates tests.', 'Field injection скрывает dependencies и усложняет tests.'),
    ]),
    chapter('Bean lifecycle', 'Bean lifecycle', 'Beans are discovered, instantiated, dependency-populated, initialized, post-processed, and sometimes proxied.', 'Beans discovered, instantiated, dependency-populated, initialized, post-processed и иногда proxied.', [
      point('Circular dependencies are design smells even if Spring can resolve some of them.', 'Circular dependencies - design smells, даже если Spring может некоторые resolve-ить.'),
      point('Singleton beans must avoid request-specific mutable fields.', 'Singleton beans должны избегать request-specific mutable fields.'),
    ]),
    chapter('AOP and transactions', 'AOP и transactions', 'Spring AOP adds behavior at method boundaries through proxies.', 'Spring AOP добавляет behavior на method boundaries через proxies.', [
      point('Self-invocation bypasses proxy advice.', 'Self-invocation bypass-ит proxy advice.'),
      point('Method visibility and proxy type affect whether advice is applied.', 'Method visibility и proxy type влияют на применение advice.'),
    ]),
  ],
  'orm-jpa-hibernate': [
    chapter('Persistence context', 'Persistence context', 'The persistence context is the first-level cache and unit of work for managed entities.', 'Persistence context - first-level cache и unit of work для managed entities.', [
      point('Within one context, the same row maps to the same entity instance.', 'В одном context одна row map-ится на один entity instance.'),
      point('Dirty checking compares managed state and schedules SQL at flush time.', 'Dirty checking сравнивает managed state и schedules SQL во время flush.'),
    ]),
    chapter('Mapping design', 'Mapping design', 'Entity mapping should reflect persistence needs, not blindly mirror API DTOs.', 'Entity mapping должен отражать persistence needs, а не blindly mirror API DTOs.', [
      point('Use lazy associations by default and fetch intentionally per use case.', 'Используйте lazy associations по умолчанию и fetch intentionally per use case.'),
      point('equals/hashCode for entities should not depend on mutable database-loaded associations.', 'equals/hashCode для entities не должен зависеть от mutable database-loaded associations.'),
    ]),
    chapter('Query performance', 'Query performance', 'ORM performance is SQL performance plus persistence context behavior.', 'ORM performance - это SQL performance плюс behavior persistence context.', [
      point('Inspect generated SQL for important endpoints.', 'Inspect-ьте generated SQL для важных endpoints.'),
      point('Use projections for read-heavy endpoints that do not need full entity graphs.', 'Используйте projections для read-heavy endpoints, которым не нужны full entity graphs.'),
    ]),
  ],
  'devops-cloud-overview': [
    chapter('Artifact and runtime', 'Artifact и runtime', 'A service artifact must be reproducible, configurable, observable, and restartable.', 'Service artifact должен быть reproducible, configurable, observable и restartable.', [
      point('The same artifact should run in different environments with different config.', 'Один artifact должен работать в разных environments с разным config.'),
      point('Startup should fail fast on invalid required configuration.', 'Startup должен fail fast при invalid required configuration.'),
    ]),
    chapter('CI/CD', 'CI/CD', 'Pipelines reduce human error by making quality gates repeatable.', 'Pipelines уменьшают human error, делая quality gates repeatable.', [
      point('Typical gates: compile, tests, static analysis, dependency scan, image build, deploy.', 'Typical gates: compile, tests, static analysis, dependency scan, image build, deploy.'),
      point('Rollback strategy is part of deployment design.', 'Rollback strategy - часть deployment design.'),
    ]),
    chapter('Operations', 'Operations', 'Production readiness means knowing how the service behaves under failure and load.', 'Production readiness означает знать, как service ведет себя при failure и load.', [
      point('Monitor saturation: CPU, memory, thread pools, connection pools, queues, and disk.', 'Monitor-ьте saturation: CPU, memory, thread pools, connection pools, queues и disk.'),
      point('Alerts should point to user impact and actionable symptoms.', 'Alerts должны указывать на user impact и actionable symptoms.'),
    ]),
  ],
};

content.forEach((topic) => {
  if (!topic.chapters) {
    topic.chapters = chapterMap[topic.id] || [
      chapter('Senior study frame', 'Senior study frame', 'Study the topic as an API contract, runtime mechanism, design trade-off, and production failure mode.', 'Изучайте тему как API contract, runtime mechanism, design trade-off и production failure mode.', [
        point('Know what problem it solves and what problem it introduces.', 'Знайте, какую problem оно решает и какую problem создает.'),
        point('Be able to explain one real bug caused by misunderstanding it.', 'Умейте объяснить один real bug из-за неправильного понимания.'),
      ]),
    ];
  }

  if (!topic.details) {
    topic.details = seniorDetails(topic.title.en, topic.title.ru);
  }

  if (!topic.mechanics) {
    topic.mechanics = [
      mechanics('Trace the lifecycle from public API call to runtime/framework behavior.', 'Проследите lifecycle от public API call до runtime/framework behavior.'),
      mechanics('Identify invariants, resource ownership, concurrency assumptions, and failure behavior.', 'Определите invariants, resource ownership, concurrency assumptions и failure behavior.'),
      mechanics('Validate understanding with tests, logs, metrics, and source-code reading.', 'Проверяйте понимание tests, logs, metrics и чтением source code.'),
    ];
  }
});

content.push(...seniorInterviewTopics);

content.forEach((topic) => {
  const extraChapters = seniorChapterExpansions[topic.id];
  if (extraChapters?.length) {
    topic.chapters = [...extraChapters, ...(topic.chapters || [])];
  }
  if (!topic.details) {
    topic.details = seniorDetails(topic.title.en, topic.title.ru);
  }
});

function detailSection(enTitle, ruTitle, points) {
  return {
    title: { en: enTitle, ru: ruTitle },
    points,
  };
}

function point(en, ru) {
  return { en, ru };
}

const detailedNotes = {
  'java-basics-oop': [
    detailSection('Object model and dispatch', 'Модель объектов и dispatch', [
      point('Every non-primitive value is a reference. The variable stores a reference, while the object state lives elsewhere on the heap unless the JIT proves it can optimize the allocation away.', 'Любое non-primitive value - это reference. Переменная хранит ссылку, а состояние объекта живет в heap, если JIT не докажет, что allocation можно оптимизировать.'),
      point('Overriding is runtime polymorphism: the JVM chooses the method implementation from the real object type. Overloading is compile-time selection based on declared argument types.', 'Overriding - runtime polymorphism: JVM выбирает реализацию по реальному типу объекта. Overloading выбирается compiler-ом по объявленным типам аргументов.'),
      point('An interface should describe a capability or role. An abstract class should be used when children share state, constructor rules, or protected algorithm steps.', 'Interface должен описывать capability или role. Abstract class нужен, когда наследники делят state, constructor rules или protected шаги алгоритма.'),
    ]),
    detailSection('Equality, identity, and hash contracts', 'Equality, identity и hash contracts', [
      point('Identity means “same object reference”; equality means “same business value”. Mixing the two creates bugs in caches, sets, and authorization checks.', 'Identity означает “та же ссылка”; equality означает “то же business value”. Смешивание ломает caches, sets и authorization checks.'),
      point('equals must be stable for the lifetime of a collection membership. If a field used in hashCode changes after insertion into HashSet, the object can become unreachable.', 'equals должен быть стабильным, пока объект находится в collection. Если поле из hashCode меняется после вставки в HashSet, объект может стать недостижимым.'),
      point('Prefer immutable identifiers or immutable value objects as map keys. Mutable entities are risky keys unless equality is based only on immutable identity.', 'Предпочитайте immutable identifiers или immutable value objects как map keys. Mutable entities рискованны как keys, если equality не основан только на immutable identity.'),
    ]),
  ],
  'strings-immutability': [
    detailSection('String lifecycle', 'Жизненный цикл String', [
      point('String literals are loaded from class metadata and can be interned so equal literals share one canonical object.', 'String literals загружаются из metadata класса и могут intern-иться, чтобы одинаковые literals делили один canonical object.'),
      point('new String("x") deliberately creates a separate heap object even though the literal "x" also exists in the pool.', 'new String("x") намеренно создает отдельный heap object, хотя literal "x" уже существует в pool.'),
      point('Concatenation in simple expressions can be folded by the compiler; concatenation in loops should use StringBuilder or collectors.', 'Concatenation в простых expressions может folded compiler-ом; concatenation в loops лучше делать через StringBuilder или collectors.'),
    ]),
    detailSection('Immutability rules', 'Правила immutability', [
      point('An immutable class must prevent state changes after construction, avoid leaking mutable internals, and usually be final or carefully designed for inheritance.', 'Immutable class должен запрещать изменение state после construction, не отдавать mutable internals наружу и обычно быть final или очень аккуратно спроектированным для inheritance.'),
      point('Immutability makes thread sharing simple because readers never need synchronization to protect against state mutation.', 'Immutability упрощает sharing между threads, потому что readers не нужна synchronization против изменения state.'),
      point('Immutability does not mean “cheap”. Creating many short-lived immutable objects can still create allocation and GC cost.', 'Immutability не означает “дешево”. Создание множества short-lived immutable objects все еще создает allocation и GC cost.'),
    ]),
  ],
  'jvm-memory': [
    detailSection('Runtime memory areas', 'Runtime области памяти', [
      point('The stack stores frames, not full object graphs. A frame contains local variables, operand stack entries, and bookkeeping for the current method call.', 'Stack хранит frames, а не полные object graphs. Frame содержит local variables, operand stack entries и служебные данные текущего method call.'),
      point('The heap stores objects and arrays shared across threads. Thread safety is not automatic just because an object is on the heap.', 'Heap хранит objects и arrays, разделяемые между threads. Thread safety не появляется автоматически из-за того, что объект в heap.'),
      point('Metaspace stores class metadata outside the ordinary Java heap, so classloader leaks can exhaust memory even when heap usage looks acceptable.', 'Metaspace хранит metadata классов вне обычного Java heap, поэтому classloader leaks могут исчерпать память, даже если heap выглядит нормально.'),
    ]),
    detailSection('JMM and visibility', 'JMM и visibility', [
      point('The Java Memory Model defines when one thread is guaranteed to see writes made by another thread.', 'Java Memory Model определяет, когда один thread гарантированно видит writes другого thread.'),
      point('Without happens-before, a program can appear correct in tests and fail on another CPU, JDK, optimization level, or load profile.', 'Без happens-before программа может казаться корректной в tests и ломаться на другом CPU, JDK, optimization level или load profile.'),
      point('Synchronization is about both mutual exclusion and visibility. A lock protects the critical section and publishes changes when released.', 'Synchronization - это и mutual exclusion, и visibility. Lock защищает critical section и публикует changes при release.'),
    ]),
  ],
  'garbage-collection': [
    detailSection('Reachability model', 'Модель reachability', [
      point('GC never asks whether an object is “needed by business logic”. It only asks whether the object is reachable from roots.', 'GC никогда не спрашивает, “нужен ли объект бизнес-логике”. Он спрашивает только, достижим ли объект от roots.'),
      point('Static fields are common accidental roots. A static cache without eviction can keep an entire object graph alive forever.', 'Static fields - частые accidental roots. Static cache без eviction может держать весь object graph живым бесконечно.'),
      point('A memory leak in Java usually means unwanted reachability, not forgotten free().', 'Memory leak в Java обычно означает нежелательную reachability, а не забытый free().'),
    ]),
    detailSection('Collector behavior', 'Поведение collectors', [
      point('Young collections are optimized for short-lived objects. Old generation pressure usually indicates long-lived data, caches, queues, or promotion from allocation bursts.', 'Young collections оптимизированы под short-lived objects. Old generation pressure часто указывает на long-lived data, caches, queues или promotion после allocation bursts.'),
      point('Low pause time collectors trade throughput, memory overhead, and implementation complexity for shorter pauses.', 'Low pause time collectors меняют throughput, memory overhead и complexity на более короткие pauses.'),
      point('GC tuning should start from measurements: allocation rate, pause distribution, live set size, and latency requirements.', 'GC tuning должен начинаться с measurements: allocation rate, pause distribution, live set size и latency requirements.'),
    ]),
  ],
  collections: [
    detailSection('Choosing a collection', 'Выбор коллекции', [
      point('Choose by access pattern: indexed access, insertion order, sorted order, uniqueness, queue semantics, or key lookup.', 'Выбирайте по access pattern: indexed access, insertion order, sorted order, uniqueness, queue semantics или key lookup.'),
      point('The default choice for a list is usually ArrayList. LinkedList is rarely a performance win because each node is a separate object and cache locality is poor.', 'Default choice для list обычно ArrayList. LinkedList редко выигрывает, потому что каждый node - отдельный object и cache locality плохая.'),
      point('HashSet is backed by HashMap, so equality and hash quality matter exactly as much as for map keys.', 'HashSet основан на HashMap, поэтому equality и качество hash важны так же, как для map keys.'),
    ]),
    detailSection('Internal costs', 'Внутренние costs', [
      point('Resizing a hash table or array is not free. It allocates new storage and redistributes or copies references.', 'Resize hash table или array не бесплатен. Он выделяет новое storage и redistributes/copies references.'),
      point('TreeMap keeps keys sorted with a red-black tree, giving O(log n) lookup and range operations but more pointer chasing than HashMap.', 'TreeMap держит keys sorted через red-black tree, дает O(log n) lookup и range operations, но больше pointer chasing, чем HashMap.'),
      point('Concurrent collections often weaken iteration guarantees. They prefer progress and safety over a perfectly frozen snapshot.', 'Concurrent collections часто ослабляют guarantees итерации. Они предпочитают progress и safety вместо идеально frozen snapshot.'),
    ]),
  ],
  generics: [
    detailSection('Erasure consequences', 'Последствия erasure', [
      point('Generic type parameters mostly disappear at runtime, so List<String> and List<Integer> have the same runtime class.', 'Generic type parameters в основном исчезают в runtime, поэтому List<String> и List<Integer> имеют один runtime class.'),
      point('Because runtime does not know T, APIs that need runtime type checks often accept Class<T> or TypeReference-like tokens.', 'Поскольку runtime не знает T, API с runtime type checks часто принимают Class<T> или TypeReference-like tokens.'),
      point('Raw types disable generic checks and can move a ClassCastException far away from the original mistake.', 'Raw types отключают generic checks и могут перенести ClassCastException далеко от исходной ошибки.'),
    ]),
    detailSection('Variance with PECS', 'Variance через PECS', [
      point('Use extends when a structure produces values for you. You can read T safely, but you cannot safely add arbitrary T.', 'Используйте extends, когда структура produces values. Можно безопасно читать T, но нельзя безопасно добавлять произвольный T.'),
      point('Use super when a structure consumes values from you. You can add T, but reading gives only Object without more knowledge.', 'Используйте super, когда структура consumes values. Можно добавлять T, но чтение дает только Object без дополнительного знания.'),
      point('Invariance protects mutable collections from type corruption, even though it can feel verbose at API boundaries.', 'Invariance защищает mutable collections от type corruption, хотя на API boundaries это может выглядеть verbose.'),
    ]),
  ],
  exceptions: [
    detailSection('Designing exception flow', 'Проектирование exception flow', [
      point('Throw exceptions for exceptional situations, not for normal branching in hot loops or validation paths that run constantly.', 'Бросайте exceptions для exceptional situations, а не для обычного branching в hot loops или validation paths, которые выполняются постоянно.'),
      point('Translate low-level exceptions at boundaries. A repository can wrap SQL details; a controller can map domain failures to HTTP status codes.', 'Переводите low-level exceptions на boundaries. Repository может wrap-ить SQL details; controller может map-ить domain failures в HTTP status codes.'),
      point('Keep the cause. Losing the original exception destroys the stack trace that explains the real failure.', 'Сохраняйте cause. Потеря original exception уничтожает stack trace, который объясняет настоящий failure.'),
    ]),
    detailSection('Checked vs unchecked', 'Checked vs unchecked', [
      point('Checked exceptions are best when the caller can realistically recover or must make an explicit policy decision.', 'Checked exceptions лучше, когда caller реально может recover или должен принять explicit policy decision.'),
      point('Unchecked exceptions are appropriate for programming errors, invalid state, violated preconditions, and failures handled centrally.', 'Unchecked exceptions подходят для programming errors, invalid state, violated preconditions и failures, обрабатываемых centrally.'),
      point('Do not catch Exception just to log and continue. That often converts visible failure into silent data corruption.', 'Не ловите Exception только ради log and continue. Это часто превращает visible failure в silent data corruption.'),
    ]),
  ],
  concurrency: [
    detailSection('Reasoning about shared state', 'Reasoning о shared state', [
      point('First ask whether state must be shared. Local variables, immutable objects, and message passing are simpler than locks.', 'Сначала спросите, должен ли state быть shared. Local variables, immutable objects и message passing проще, чем locks.'),
      point('Atomicity, visibility, and ordering are separate concerns. volatile solves visibility/order for a variable, not compound atomic updates.', 'Atomicity, visibility и ordering - разные concerns. volatile решает visibility/order для переменной, но не compound atomic updates.'),
      point('Thread safety is a property of the whole invariant, not a single method. Two individually synchronized methods can still be unsafe together.', 'Thread safety - свойство всего invariant, а не одного method. Два отдельно synchronized methods вместе все равно могут быть unsafe.'),
    ]),
    detailSection('Executors and production risks', 'Executors и production risks', [
      point('A thread pool needs sizing. Too few threads underutilize resources; too many create context switching, memory pressure, and database overload.', 'Thread pool требует sizing. Слишком мало threads недоиспользуют resources; слишком много создают context switching, memory pressure и database overload.'),
      point('Unbounded queues hide overload until latency and memory explode. Bounded queues plus rejection policies expose backpressure.', 'Unbounded queues скрывают overload, пока latency и memory не взорвутся. Bounded queues и rejection policies показывают backpressure.'),
      point('Deadlock prevention is usually about lock ordering, timeout-based acquisition, or avoiding nested locks entirely.', 'Deadlock prevention обычно строится на lock ordering, timeout-based acquisition или полном избегании nested locks.'),
    ]),
  ],
  'io-serialization': [
    detailSection('I/O mental model', 'Ментальная модель I/O', [
      point('I/O latency is usually dominated by the operating system, disk, network, or remote peer, not Java instruction speed.', 'I/O latency обычно определяется operating system, disk, network или remote peer, а не скоростью Java instructions.'),
      point('Buffering reduces system calls by grouping small reads and writes into larger chunks.', 'Buffering уменьшает system calls, группируя маленькие reads/writes в более крупные chunks.'),
      point('Always close resources. try-with-resources is the default because leaks are otherwise easy in exceptional paths.', 'Всегда закрывайте resources. try-with-resources - default, потому что leaks иначе легко появляются в exceptional paths.'),
    ]),
    detailSection('Serialization boundaries', 'Serialization boundaries', [
      point('Java native serialization couples byte streams to Java class structure, which makes versioning and security difficult.', 'Java native serialization связывает byte streams со структурой Java class, что усложняет versioning и security.'),
      point('transient is useful for secrets, caches, derived values, and fields that cannot or should not cross process boundaries.', 'transient полезен для secrets, caches, derived values и fields, которые не могут или не должны пересекать process boundaries.'),
      point('For APIs, prefer explicit formats and schemas so non-Java clients, validation, and migrations are manageable.', 'Для API предпочитайте explicit formats и schemas, чтобы non-Java clients, validation и migrations были управляемыми.'),
    ]),
  ],
  'reflection-annotations': [
    detailSection('Runtime metadata', 'Runtime metadata', [
      point('Reflection lets code inspect classes whose exact types were not known when the framework was written.', 'Reflection позволяет коду inspect-ить classes, точные типы которых framework не знал при написании.'),
      point('Annotation retention decides whether metadata disappears after compilation or remains readable at runtime.', 'Annotation retention решает, исчезает ли metadata после compilation или остается readable в runtime.'),
      point('Frameworks scan classpaths, build metadata models, then cache results because repeated reflection is expensive.', 'Frameworks scan-ят classpath, строят metadata models и кешируют results, потому что repeated reflection дорогой.'),
    ]),
    detailSection('Limits and risks', 'Ограничения и риски', [
      point('Reflection weakens compile-time safety. A renamed method or changed constructor can fail only at runtime.', 'Reflection ослабляет compile-time safety. Renamed method или changed constructor может упасть только в runtime.'),
      point('Modules and access rules can block deep reflection unless packages are opened intentionally.', 'Modules и access rules могут блокировать deep reflection, если packages не opened намеренно.'),
      point('Prefer normal calls in domain code; reserve reflection for framework boundaries, tooling, mapping, and metadata-driven behavior.', 'Предпочитайте normal calls в domain code; reflection оставляйте для framework boundaries, tooling, mapping и metadata-driven behavior.'),
    ]),
  ],
  functional: [
    detailSection('Lambda and stream model', 'Модель lambda и stream', [
      point('A lambda is not magic syntax for an anonymous class in every case; modern JVMs usually link it with invokedynamic.', 'Lambda - не всегда magic syntax для anonymous class; современные JVM обычно связывают ее через invokedynamic.'),
      point('A stream is not a collection. It is a one-use pipeline that pulls data from a source when a terminal operation starts.', 'Stream - не collection. Это одноразовый pipeline, который тянет data из source при запуске terminal operation.'),
      point('Intermediate operations are lazy and can be fused, so filter-map-filter does not necessarily create intermediate collections.', 'Intermediate operations lazy и могут fused, поэтому filter-map-filter не обязательно создает intermediate collections.'),
    ]),
    detailSection('Practical stream rules', 'Практические правила streams', [
      point('Avoid side effects in stream operations. Mutation inside map/filter makes ordering and parallel execution hard to reason about.', 'Избегайте side effects в stream operations. Mutation внутри map/filter усложняет reasoning об ordering и parallel execution.'),
      point('Use streams when they make transformation clearer. Use loops when control flow, early exits, exception handling, or debugging become clearer.', 'Используйте streams, когда transformation становится яснее. Используйте loops, когда control flow, early exits, exception handling или debugging яснее.'),
      point('Parallel streams should be measured. They are not a free performance switch and often conflict with blocking I/O or shared pools.', 'Parallel streams нужно измерять. Это не бесплатный performance switch, и они часто конфликтуют с blocking I/O или shared pools.'),
    ]),
  ],
  'cs-algorithms-data-structures': [
    detailSection('Backend performance thinking', 'Backend performance thinking', [
      point('In backend code, algorithmic complexity often appears as slow SQL, oversized payloads, repeated remote calls, or unnecessary scans.', 'В backend code algorithmic complexity часто проявляется как slow SQL, oversized payloads, repeated remote calls или unnecessary scans.'),
      point('An O(n) loop over 100 items is fine. An O(n) loop that performs a database query per item is usually an N+1 incident.', 'O(n) loop по 100 items нормален. O(n) loop, который делает database query на item, обычно превращается в N+1 incident.'),
      point('Always identify the real input size: users, rows, requests per second, queue depth, graph edges, or payload bytes.', 'Всегда определяйте реальный input size: users, rows, requests per second, queue depth, graph edges или payload bytes.'),
    ]),
    detailSection('Study checklist', 'Чеклист изучения', [
      point('Know arrays, lists, stacks, queues, hash tables, trees, heaps, graphs, sorting, binary search, BFS, and DFS.', 'Знайте arrays, lists, stacks, queues, hash tables, trees, heaps, graphs, sorting, binary search, BFS и DFS.'),
      point('For each structure, learn operations, complexity, memory behavior, and one backend use case.', 'Для каждой структуры учите operations, complexity, memory behavior и один backend use case.'),
      point('Practice explaining why you picked a structure, not only how to implement it.', 'Практикуйтесь объяснять, почему выбрали структуру, а не только как ее реализовать.'),
    ]),
  ],
  'git-development-tools': [
    detailSection('Git as a data model', 'Git как data model', [
      point('The working tree, index, and repository are three different states. Many beginner mistakes come from mixing them.', 'Working tree, index и repository - три разных состояния. Многие ошибки новичков идут от их смешивания.'),
      point('A branch is only a pointer. Creating or deleting a branch does not copy or delete file contents by itself.', 'Branch - это только pointer. Создание или удаление branch само по себе не копирует и не удаляет содержимое файлов.'),
      point('Conflicts happen when Git cannot automatically combine two changes to the same logical area.', 'Conflicts возникают, когда Git не может автоматически объединить два изменения в одной logical area.'),
    ]),
    detailSection('Daily backend workflow', 'Ежедневный backend workflow', [
      point('Small commits are easier to review, revert, bisect, and explain during code review.', 'Маленькие commits проще review-ить, revert-ить, bisect-ить и объяснять на code review.'),
      point('Build tools define the classpath. If dependency versions differ, runtime behavior can differ even with the same source code.', 'Build tools задают classpath. Если версии dependencies отличаются, runtime behavior может отличаться даже при том же source code.'),
      point('Use debugger, logs, tests, and profiler for different questions: state, history, correctness, and performance.', 'Используйте debugger, logs, tests и profiler для разных вопросов: state, history, correctness и performance.'),
    ]),
  ],
  testing: [
    detailSection('Test design', 'Проектирование tests', [
      point('A good test has arrange, act, assert. If setup is huge, the production design may have too much coupling.', 'Хороший test имеет arrange, act, assert. Если setup огромный, production design может иметь слишком сильный coupling.'),
      point('Test names should describe behavior, not implementation: rejectsExpiredToken is better than testTokenMethod.', 'Имена tests должны описывать behavior, а не implementation: rejectsExpiredToken лучше, чем testTokenMethod.'),
      point('Assertions should verify observable behavior: returned value, state change, event, exception, or interaction at a boundary.', 'Assertions должны проверять observable behavior: returned value, state change, event, exception или interaction на boundary.'),
    ]),
    detailSection('Integration strategy', 'Integration strategy', [
      point('Use integration tests for things unit tests cannot prove: SQL mappings, transactions, serialization, framework configuration, and HTTP contracts.', 'Используйте integration tests для того, что unit tests не докажут: SQL mappings, transactions, serialization, framework configuration и HTTP contracts.'),
      point('Keep external dependencies deterministic with containers, test profiles, embedded servers, or contract tests.', 'Держите external dependencies deterministic через containers, test profiles, embedded servers или contract tests.'),
      point('A slow test suite changes team behavior. People stop running it, feedback arrives late, and defects escape.', 'Медленный test suite меняет поведение команды. Люди перестают запускать его, feedback приходит поздно, defects уходят дальше.'),
    ]),
  ],
  'software-design-architecture': [
    detailSection('Boundaries and dependencies', 'Boundaries и dependencies', [
      point('A boundary is useful when it protects a stable concept from volatile details such as HTTP, SQL, messaging, or vendor APIs.', 'Boundary полезна, когда защищает stable concept от volatile details: HTTP, SQL, messaging или vendor APIs.'),
      point('Package structure should show architecture. If every class can import every other class, the architecture exists only in a diagram.', 'Package structure должна показывать architecture. Если любой class может import-ить любой другой, architecture существует только на диаграмме.'),
      point('DTOs, entities, and domain objects have different jobs. Reusing one model everywhere creates accidental coupling.', 'DTOs, entities и domain objects имеют разные задачи. Переиспользование одной модели везде создает accidental coupling.'),
    ]),
    detailSection('Operational architecture', 'Operational architecture', [
      point('Architecture must include failure behavior: timeouts, retries, idempotency, circuit breakers, and fallback policy.', 'Architecture должна включать failure behavior: timeouts, retries, idempotency, circuit breakers и fallback policy.'),
      point('Consistency decisions matter: one transaction, eventual consistency, outbox, saga, or manual reconciliation.', 'Consistency decisions важны: one transaction, eventual consistency, outbox, saga или manual reconciliation.'),
      point('A design is junior-friendly when a new developer can predict where a new use case, validation rule, or integration belongs.', 'Design junior-friendly, когда новый developer может предсказать, куда добавить use case, validation rule или integration.'),
    ]),
  ],
  'code-quality': [
    detailSection('Readable code mechanics', 'Механика читаемого кода', [
      point('A name should answer “what is this in the domain?” rather than “what type is this in Java?”.', 'Имя должно отвечать “что это в domain?”, а не “какой это Java type?”.'),
      point('A method should usually operate at one abstraction level. Mixing SQL, validation, mapping, and business decisions in one method increases load.', 'Method обычно должен работать на одном abstraction level. Смешивание SQL, validation, mapping и business decisions в одном method увеличивает load.'),
      point('Comments should explain why a surprising decision exists; code should explain what it does.', 'Comments должны объяснять, почему существует неожиданное решение; code должен объяснять, что он делает.'),
    ]),
    detailSection('Refactoring safety', 'Безопасность refactoring', [
      point('Refactor in small steps: rename, extract, move, simplify condition, then run tests.', 'Refactor-ьте маленькими шагами: rename, extract, move, simplify condition, затем run tests.'),
      point('Before changing legacy code, add characterization tests that capture current behavior, even if the behavior is imperfect.', 'Перед изменением legacy code добавьте characterization tests, фиксирующие текущее behavior, даже если оно несовершенно.'),
      point('Do not refactor unrelated areas in a feature PR unless the cleanup is needed for the change.', 'Не refactor-ьте unrelated areas в feature PR, если cleanup не нужен для изменения.'),
    ]),
  ],
  'jdbc-database-development': [
    detailSection('JDBC execution flow', 'JDBC execution flow', [
      point('Application borrows a connection, prepares SQL, binds parameters, executes, reads rows, handles exceptions, and returns the connection.', 'Application берет connection, prepares SQL, binds parameters, executes, читает rows, handles exceptions и возвращает connection.'),
      point('PreparedStatement prevents injection by sending values separately from SQL structure; it is not just string escaping.', 'PreparedStatement предотвращает injection, отправляя values отдельно от SQL structure; это не просто string escaping.'),
      point('Connection leaks slowly exhaust the pool. The symptom is not always a clear exception; it can be rising latency and stuck requests.', 'Connection leaks постепенно исчерпывают pool. Симптом не всегда clear exception; это может быть rising latency и stuck requests.'),
    ]),
    detailSection('Transactions and isolation', 'Transactions и isolation', [
      point('A transaction groups changes so they commit together or roll back together. Without it, partial updates can corrupt invariants.', 'Transaction группирует changes, чтобы они commit-ились или roll back-ились вместе. Без этого partial updates могут corrupt invariants.'),
      point('Isolation anomalies include dirty reads, non-repeatable reads, phantom reads, and write skew depending on database and level.', 'Isolation anomalies включают dirty reads, non-repeatable reads, phantom reads и write skew в зависимости от database и level.'),
      point('Indexes speed reads but slow writes and consume memory/storage. They are design decisions, not automatic decorations.', 'Indexes ускоряют reads, но замедляют writes и потребляют memory/storage. Это design decisions, а не automatic decorations.'),
    ]),
  ],
  'java-web-http': [
    detailSection('HTTP request lifecycle', 'Жизненный цикл HTTP request', [
      point('A request moves from socket accept to parsing, routing, filters, controller, service, serialization, and response writing.', 'Request проходит socket accept, parsing, routing, filters, controller, service, serialization и response writing.'),
      point('Headers carry metadata such as content type, authorization, caching rules, trace IDs, and accepted response formats.', 'Headers несут metadata: content type, authorization, caching rules, trace IDs и accepted response formats.'),
      point('Timeouts must exist at every boundary: client, load balancer, server, database, and remote service calls.', 'Timeouts должны быть на каждой boundary: client, load balancer, server, database и remote service calls.'),
    ]),
    detailSection('REST correctness', 'REST correctness', [
      point('Use nouns for resources and HTTP methods for actions. /users/42 is easier to reason about than /getUserById.', 'Используйте nouns для resources и HTTP methods для actions. /users/42 проще понимать, чем /getUserById.'),
      point('Status codes are part of the API contract. 400, 401, 403, 404, 409, and 422 communicate different failure meanings.', 'Status codes - часть API contract. 400, 401, 403, 404, 409 и 422 передают разные смыслы failures.'),
      point('Idempotency keys help make unsafe operations retryable when clients face network uncertainty.', 'Idempotency keys помогают делать unsafe operations retryable, когда clients сталкиваются с network uncertainty.'),
    ]),
  ],
  'spring-framework-essentials': [
    detailSection('Container lifecycle', 'Container lifecycle', [
      point('Spring first discovers configuration, builds bean definitions, resolves dependency graph, creates beans, applies post-processors, and exposes proxies.', 'Spring сначала discovers configuration, строит bean definitions, resolves dependency graph, creates beans, applies post-processors и exposes proxies.'),
      point('Constructor injection is preferred because required dependencies are visible and immutable after construction.', 'Constructor injection предпочтительнее, потому что required dependencies видны и immutable после construction.'),
      point('Bean scope matters. Singleton beans are shared, so mutable fields in services can become cross-request bugs.', 'Bean scope важен. Singleton beans shared, поэтому mutable fields в services могут стать cross-request bugs.'),
    ]),
    detailSection('Spring AOP and transactions', 'Spring AOP и transactions', [
      point('Many annotations work because a proxy intercepts method calls and adds behavior before and after the target method.', 'Многие annotations работают потому, что proxy intercept-ит method calls и добавляет behavior до и после target method.'),
      point('@Transactional needs a transaction manager, a proxied bean call, and a database resource that participates in the transaction.', '@Transactional требует transaction manager, proxied bean call и database resource, участвующий в transaction.'),
      point('Exceptions affect rollback rules. By default, unchecked exceptions trigger rollback, while checked exceptions need explicit configuration.', 'Exceptions влияют на rollback rules. По умолчанию unchecked exceptions trigger rollback, а checked exceptions требуют explicit configuration.'),
    ]),
  ],
  'orm-jpa-hibernate': [
    detailSection('Entity state transitions', 'Entity state transitions', [
      point('New entities are ordinary objects until persist makes them managed. Managed entities are tracked by the persistence context.', 'New entities - обычные objects, пока persist не сделает их managed. Managed entities tracked persistence context.'),
      point('Detached entities have database identity but are no longer tracked. Changing them does not automatically flush SQL.', 'Detached entities имеют database identity, но больше не tracked. Их изменение не flush-ит SQL автоматически.'),
      point('Removed entities are scheduled for DELETE, but SQL may be emitted only during flush.', 'Removed entities scheduled for DELETE, но SQL может выйти только во время flush.'),
    ]),
    detailSection('Performance traps', 'Performance traps', [
      point('Lazy loading is useful, but accessing lazy fields in a loop can silently create N+1 queries.', 'Lazy loading полезен, но доступ к lazy fields в loop может тихо создать N+1 queries.'),
      point('Fetch joins, entity graphs, batch size, and DTO projections are different tools for controlling SQL shape.', 'Fetch joins, entity graphs, batch size и DTO projections - разные tools для управления SQL shape.'),
      point('Do not expose entities directly from REST APIs. Serialization can trigger lazy loading and leak persistence details.', 'Не отдавайте entities напрямую из REST APIs. Serialization может trigger lazy loading и leak persistence details.'),
    ]),
  ],
  'devops-cloud-overview': [
    detailSection('From code to running service', 'От кода к running service', [
      point('The artifact must include compiled code, dependencies, configuration hooks, startup command, and health endpoints.', 'Artifact должен включать compiled code, dependencies, configuration hooks, startup command и health endpoints.'),
      point('A deployment is safe when it can be rolled back, observed, and gradually exposed through rolling or blue-green strategies.', 'Deployment безопасен, когда его можно rollback-нуть, observe-ить и постепенно exposing через rolling или blue-green strategies.'),
      point('Secrets must not live in Git or images. They should be injected from secret stores or environment-specific configuration.', 'Secrets не должны жить в Git или images. Их нужно inject-ить из secret stores или environment-specific configuration.'),
    ]),
    detailSection('Operating Java in production', 'Эксплуатация Java в production', [
      point('Watch memory, GC pauses, thread counts, connection pool usage, request latency, error rate, and queue depth.', 'Следите за memory, GC pauses, thread counts, connection pool usage, request latency, error rate и queue depth.'),
      point('Logs explain events, metrics show trends, and traces connect work across services. You usually need all three.', 'Logs объясняют events, metrics показывают trends, traces связывают работу между services. Обычно нужны все три.'),
      point('Cloud failures are normal: instances restart, networks partition, disks fill, credentials expire, and rate limits apply.', 'Cloud failures нормальны: instances restart, networks partition, disks fill, credentials expire и rate limits apply.'),
    ]),
  ],
};

content.forEach((topic) => {
  topic.details = detailedNotes[topic.id] || [
    detailSection('How to study this topic', 'Как изучать эту тему', [
      point('Start from the public contract, then trace what the runtime or framework does after the call.', 'Начните с public contract, затем проследите, что runtime или framework делает после call.'),
      point('Learn the happy path, then list edge cases: nulls, empty input, concurrency, exceptions, resource limits, and performance.', 'Изучите happy path, затем перечислите edge cases: nulls, empty input, concurrency, exceptions, resource limits и performance.'),
      point('Practice explaining the topic with one code example, one diagram, and one production failure scenario.', 'Практикуйтесь объяснять тему через один code example, одну diagram и один production failure scenario.'),
    ]),
  ];
});

function chapter(enTitle, ruTitle, enBody, ruBody, points = [], examples = []) {
  return {
    title: { en: enTitle, ru: ruTitle },
    body: { en: enBody, ru: ruBody },
    points,
    examples,
  };
}

function seniorDetails(focusEn, focusRu) {
  return [
    detailSection('Senior mental model', 'Senior mental model', [
      point(`Senior-level understanding means connecting ${focusEn} to correctness, maintainability, performance, failure modes, and team delivery.`, `Senior-level понимание означает связывать ${focusRu} с correctness, maintainability, performance, failure modes и delivery команды.`),
      point('Do not learn the definition only. Learn when the concept helps, when it hurts, what it costs, and how to verify that it works.', 'Не учите только определение. Учите, когда концепция помогает, когда вредит, сколько стоит и как проверить, что она работает.'),
      point('For interviews, always be ready to give a production example, a counterexample, and a trade-off.', 'Для собеседований всегда готовьте production example, counterexample и trade-off.'),
    ]),
    detailSection('Practice path', 'Путь практики', [
      point('Implement the happy path from scratch, then intentionally break it with nulls, concurrency, invalid state, slow dependencies, and partial failure.', 'Реализуйте happy path с нуля, затем намеренно ломайте его nulls, concurrency, invalid state, slow dependencies и partial failure.'),
      point('Read framework or JDK source code for the core abstraction after you understand the API contract.', 'Читайте framework или JDK source code для core abstraction после понимания API contract.'),
      point('Write tests that prove behavior and small benchmarks or logs that prove performance assumptions.', 'Пишите tests, доказывающие behavior, и маленькие benchmarks/logs, доказывающие performance assumptions.'),
    ]),
  ];
}

content.push(
  {
    id: 'oop-principles-deep',
    groupId: 'language',
    stage: 'Fundamentals',
    title: { en: 'OOP Principles in Practice', ru: 'Принципы ООП на практике' },
    intro: {
      en: 'OOP is not “classes everywhere”; it is a way to model behavior, protect invariants, and make change local.',
      ru: 'ООП - это не “классы везде”, а способ моделировать поведение, защищать invariants и делать изменения локальными.',
    },
    deepDive: {
      en: 'The four classic principles are encapsulation, abstraction, inheritance, and polymorphism. A senior Java developer also understands composition, invariants, identity, immutability, behavioral contracts, and when an object model becomes over-engineered. Good OOP places behavior near the state it protects and exposes stable contracts instead of leaking implementation details.',
      ru: 'Четыре классических принципа: инкапсуляция, абстракция, наследование и полиморфизм. Senior Java developer также понимает composition, invariants, identity, immutability, behavioral contracts и момент, когда object model становится over-engineered. Хорошее ООП держит behavior рядом со state, который оно защищает, и открывает stable contracts вместо leakage implementation details.',
    },
    mechanics: [
      mechanics('Encapsulation is enforced by API boundaries, not merely private fields. A getter returning a mutable list can break encapsulation.', 'Encapsulation обеспечивается API boundaries, а не просто private fields. Getter, возвращающий mutable list, может сломать encapsulation.'),
      mechanics('Polymorphism moves branching from “if type then action” into dynamic dispatch through interfaces or overridden methods.', 'Polymorphism переносит branching из “if type then action” в dynamic dispatch через interfaces или overridden methods.'),
      mechanics('Inheritance couples child classes to parent implementation details; composition couples through smaller explicit contracts.', 'Inheritance связывает child classes с implementation details parent; composition связывает через меньшие explicit contracts.'),
    ],
    details: seniorDetails('object modeling', 'object modeling'),
    diagram: `classDiagram
Payment <|.. CardPayment
Payment <|.. CashPayment
Order --> Payment
class Payment {
  <<interface>>
  pay(Money)
}
class CardPayment {
  +pay(Money)
}
class CashPayment {
  +pay(Money)
}
class Order {
  -List~OrderLine~ lines
  +total()
  +pay(Payment)
}`,
    methods: [
      method('private fields', 'Hide representation so invariants can be protected.', 'Скрывают representation, чтобы защищать invariants.'),
      method('interface method', 'Defines behavior without binding callers to implementation classes.', 'Определяет behavior без привязки callers к implementation classes.'),
      method('final class/value object', 'Prevents accidental subclassing and makes invariants easier.', 'Предотвращает accidental subclassing и упрощает invariants.'),
      method('factory method', 'Creates valid objects and hides construction complexity.', 'Создает valid objects и скрывает construction complexity.'),
    ],
    examples: [
      `// Encapsulation: state changes only through behavior that protects invariants.
final class BankAccount {
    private BigDecimal balance;

    BankAccount(BigDecimal openingBalance) {
        if (openingBalance.signum() < 0) {
            throw new IllegalArgumentException("Negative opening balance");
        }
        this.balance = openingBalance;
    }

    void withdraw(BigDecimal amount) {
        if (amount.signum() <= 0) throw new IllegalArgumentException("Amount must be positive");
        if (balance.compareTo(amount) < 0) throw new IllegalStateException("Insufficient funds");
        balance = balance.subtract(amount);
    }
}`,
      `// Polymorphism: no switch by payment type.
interface DiscountPolicy {
    Money discountFor(Order order);
}

final class VipDiscount implements DiscountPolicy {
    public Money discountFor(Order order) {
        return order.total().multiply("0.10");
    }
}

final class CheckoutService {
    Money price(Order order, DiscountPolicy policy) {
        return order.total().minus(policy.discountFor(order));
    }
}`,
    ],
    chapters: [
      chapter('Encapsulation', 'Инкапсуляция', 'Encapsulation means an object owns its state and exposes behavior that keeps the state valid.', 'Инкапсуляция означает, что объект владеет своим state и открывает behavior, сохраняющее state валидным.', [
        point('Bad encapsulation: public fields, mutable getters, setters that allow invalid combinations, DTOs used as domain objects.', 'Плохая encapsulation: public fields, mutable getters, setters, допускающие invalid combinations, DTOs как domain objects.'),
        point('Good encapsulation: methods named by business actions, constructor/factory validation, immutable collections, no leaked internals.', 'Хорошая encapsulation: methods названы business actions, constructor/factory validation, immutable collections, no leaked internals.'),
      ]),
      chapter('Abstraction', 'Абстракция', 'Abstraction hides irrelevant details and gives callers the smallest useful contract.', 'Абстракция скрывает нерелевантные details и дает callers минимальный полезный contract.', [
        point('An abstraction should be discovered from repeated needs, not invented before the second use case exists.', 'Abstraction должна появляться из повторяющихся needs, а не выдумываться до второго use case.'),
        point('A leaky abstraction forces callers to know implementation details such as SQL dialect, HTTP status mapping, or cache keys.', 'Leaky abstraction заставляет callers знать implementation details: SQL dialect, HTTP status mapping или cache keys.'),
      ]),
      chapter('Inheritance', 'Наследование', 'Inheritance reuses and specializes behavior through an is-a relationship, but it is the tightest form of coupling.', 'Наследование переиспользует и специализирует behavior через is-a relationship, но это самая сильная форма coupling.', [
        point('Use inheritance for true substitutability. If a subclass cannot safely be used where parent is expected, LSP is broken.', 'Используйте inheritance для true substitutability. Если subclass нельзя безопасно использовать вместо parent, LSP сломан.'),
        point('Prefer composition when behavior varies independently or when parent implementation details would leak into children.', 'Предпочитайте composition, когда behavior меняется независимо или parent implementation details протекают в children.'),
      ]),
      chapter('Polymorphism', 'Полиморфизм', 'Polymorphism lets different implementations answer the same message in their own way.', 'Полиморфизм позволяет разным implementations отвечать на одно сообщение своим способом.', [
        point('Runtime polymorphism in Java is dynamic dispatch through virtual methods and interfaces.', 'Runtime polymorphism в Java - dynamic dispatch через virtual methods и interfaces.'),
        point('Polymorphism often removes switch/if chains and makes adding a new behavior a new class instead of a central edit.', 'Polymorphism часто убирает switch/if chains и делает новое behavior новым class вместо central edit.'),
      ]),
    ],
    faq: [
      faq('Is OOP always better than procedural code?', 'ООП всегда лучше procedural code?', 'No. OOP helps when behavior and state form stable domain concepts. Simple scripts, transformations, and data pipelines may be clearer procedurally or functionally.', 'Нет. ООП помогает, когда behavior и state образуют stable domain concepts. Простые scripts, transformations и data pipelines могут быть яснее procedurally или functionally.'),
      faq('Why are setters often harmful in domain models?', 'Почему setters часто вредны в domain models?', 'They expose representation and allow invalid state transitions. Business methods express intent and validate invariants.', 'Они раскрывают representation и допускают invalid state transitions. Business methods выражают intent и проверяют invariants.'),
      faq('How do you know an abstraction is good?', 'Как понять, что abstraction хорошая?', 'It reduces caller knowledge, survives multiple use cases, has a small contract, and does not leak implementation details.', 'Она снижает caller knowledge, переживает несколько use cases, имеет маленький contract и не leak-ит implementation details.'),
    ],
  },
  {
    id: 'solid-principles',
    groupId: 'engineering',
    stage: 'Fundamentals',
    title: { en: 'SOLID Principles for Java', ru: 'SOLID принципы для Java' },
    intro: {
      en: 'SOLID is a vocabulary for designing code that can change safely without forcing the whole system to move together.',
      ru: 'SOLID - vocabulary для дизайна кода, который можно безопасно менять без сдвига всей системы целиком.',
    },
    deepDive: {
      en: 'SOLID is not a checklist to maximize interfaces. It is five pressure points: one reason to change, substitutable abstractions, small client-specific contracts, dependency direction, and extension without editing stable code. Senior use means applying the principle when it lowers change cost, not blindly splitting every class.',
      ru: 'SOLID - не checklist на максимальное количество interfaces. Это пять pressure points: одна причина изменения, substitutable abstractions, маленькие client-specific contracts, направление dependencies и extension без редактирования stable code. Senior use означает применять принцип, когда он снижает change cost, а не слепо дробить каждый class.',
    },
    mechanics: [
      mechanics('SRP is about reason to change, not method count. A class can have many methods if they serve one cohesive responsibility.', 'SRP про reason to change, а не количество methods. Class может иметь много methods, если они обслуживают одну cohesive responsibility.'),
      mechanics('OCP is usually achieved through polymorphism, composition, configuration, or data-driven rules.', 'OCP обычно достигается через polymorphism, composition, configuration или data-driven rules.'),
      mechanics('DIP makes high-level policy depend on abstractions; low-level details implement those abstractions.', 'DIP заставляет high-level policy зависеть от abstractions; low-level details реализуют эти abstractions.'),
    ],
    details: seniorDetails('SOLID design', 'SOLID design'),
    diagram: `flowchart TB
SRP["SRP: one reason to change"] --> design["Change-friendly design"]
OCP["OCP: extend without modifying stable policy"] --> design
LSP["LSP: subtype substitutability"] --> design
ISP["ISP: small client contracts"] --> design
DIP["DIP: depend on abstractions"] --> design`,
    methods: [
      method('SRP', 'Keep a class focused on one axis of change.', 'Держит class вокруг одной оси изменения.'),
      method('OCP', 'Add new behavior by extension instead of editing stable central logic.', 'Добавляет behavior расширением вместо редактирования stable central logic.'),
      method('LSP', 'Subtypes must preserve the expectations of the base type.', 'Subtypes должны сохранять expectations base type.'),
      method('ISP', 'Clients should not depend on methods they do not use.', 'Clients не должны зависеть от methods, которые не используют.'),
      method('DIP', 'Policy depends on abstractions, details depend on policy contracts.', 'Policy зависит от abstractions, details зависят от policy contracts.'),
    ],
    examples: [
      `// OCP + DIP: add a new notification channel without changing RegistrationService.
interface NotificationSender {
    void send(User user, String message);
}

final class EmailSender implements NotificationSender {
    public void send(User user, String message) {
        // SMTP details live here
    }
}

final class RegistrationService {
    private final NotificationSender sender;

    RegistrationService(NotificationSender sender) {
        this.sender = sender;
    }

    void register(User user) {
        // register user
        sender.send(user, "Welcome");
    }
}`,
      `// LSP violation: a subtype that cannot honor the parent contract.
class Bird {
    void fly() {}
}

class Penguin extends Bird {
    @Override
    void fly() {
        throw new UnsupportedOperationException("Penguins do not fly");
    }
}

// Better: model capabilities.
interface FlyingBird {
    void fly();
}`,
    ],
    chapters: [
      chapter('SRP: Single Responsibility', 'SRP: Single Responsibility', 'A responsibility is a reason to change. Mixing validation, persistence, mapping, and notification creates several reasons to change in one class.', 'Responsibility - это reason to change. Смешивание validation, persistence, mapping и notification создает несколько reasons to change в одном class.', [
        point('Good sign: a class can be described in one business sentence.', 'Хороший признак: class можно описать одним business sentence.'),
        point('Bad sign: every feature touches the same service because it became a transaction script dump.', 'Плохой признак: каждая feature трогает один и тот же service, потому что он стал transaction script dump.'),
      ]),
      chapter('OCP: Open/Closed', 'OCP: Open/Closed', 'Open for extension, closed for modification means stable policy should not be edited for every new variant.', 'Open for extension, closed for modification означает, что stable policy не должна редактироваться для каждого нового варианта.', [
        point('Use strategy, registry, enum-specific behavior, rules tables, or configuration when variants are expected.', 'Используйте strategy, registry, enum-specific behavior, rules tables или configuration, когда variants ожидаемы.'),
        point('Do not abstract early. If there is only one behavior and no variation pressure, simple code is better.', 'Не abstract-ьте рано. Если behavior одно и variation pressure нет, простой код лучше.'),
      ]),
      chapter('LSP and ISP', 'LSP и ISP', 'LSP protects substitutability; ISP protects clients from fat contracts.', 'LSP защищает substitutability; ISP защищает clients от fat contracts.', [
        point('LSP breaks when subclass strengthens preconditions, weakens postconditions, or throws surprising unsupported operations.', 'LSP ломается, когда subclass усиливает preconditions, ослабляет postconditions или бросает неожиданные unsupported operations.'),
        point('ISP often leads to role interfaces: ReadRepository, WriteRepository, TokenValidator, TokenIssuer.', 'ISP часто ведет к role interfaces: ReadRepository, WriteRepository, TokenValidator, TokenIssuer.'),
      ]),
      chapter('DIP and testability', 'DIP и testability', 'DIP makes important policy independent from volatile technical details.', 'DIP делает важную policy независимой от volatile technical details.', [
        point('A domain service should not know which HTTP client, database driver, or queue provider is used.', 'Domain service не должен знать, какой HTTP client, database driver или queue provider используется.'),
        point('DIP improves tests because a fake or stub can replace slow infrastructure.', 'DIP улучшает tests, потому что fake или stub может заменить slow infrastructure.'),
      ]),
    ],
    faq: [
      faq('Does SOLID mean every class needs an interface?', 'SOLID означает, что каждому class нужен interface?', 'No. Interfaces are useful when there are multiple implementations, a boundary, or a testing/substitution need.', 'Нет. Interfaces полезны, когда есть multiple implementations, boundary или need в testing/substitution.'),
      faq('Can SOLID be overused?', 'SOLID можно переиспользовать слишком сильно?', 'Yes. Too many tiny abstractions can increase cognitive load. SOLID should reduce change cost, not create ceremony.', 'Да. Слишком много tiny abstractions увеличивает cognitive load. SOLID должен снижать change cost, а не создавать ceremony.'),
      faq('Which principle matters most in backend services?', 'Какой принцип важнее всего в backend services?', 'DIP and SRP usually pay off fastest because backend code changes around integrations, persistence, and business rules.', 'DIP и SRP обычно окупаются быстрее всего, потому что backend code меняется вокруг integrations, persistence и business rules.'),
    ],
  },
  {
    id: 'design-patterns-java-backend',
    groupId: 'engineering',
    stage: 'Fundamentals',
    title: { en: 'Design Patterns for Java Backend', ru: 'Design patterns для Java backend' },
    intro: {
      en: 'Patterns are named solutions to recurring design forces; they are communication tools, not decorations.',
      ru: 'Patterns - именованные решения повторяющихся design forces; это средство коммуникации, а не украшение.',
    },
    deepDive: {
      en: 'Backend Java uses patterns constantly: Factory for creation, Strategy for interchangeable algorithms, Template Method for fixed flows with customizable steps, Adapter for external systems, Decorator/Proxy for cross-cutting behavior, Repository for persistence boundaries, and Builder for complex immutable objects. A senior developer recognizes when a framework already applies the pattern and avoids duplicating it manually.',
      ru: 'Backend Java постоянно использует patterns: Factory для creation, Strategy для interchangeable algorithms, Template Method для fixed flows с customizable steps, Adapter для external systems, Decorator/Proxy для cross-cutting behavior, Repository для persistence boundaries и Builder для complex immutable objects. Senior developer понимает, когда framework уже применяет pattern, и не дублирует его вручную.',
    },
    mechanics: [
      mechanics('A pattern solves a force: creation complexity, behavior variation, API incompatibility, cross-cutting behavior, or persistence isolation.', 'Pattern решает force: creation complexity, behavior variation, API incompatibility, cross-cutting behavior или persistence isolation.'),
      mechanics('Spring uses Proxy for transactions/security, Factory for beans, Template Method in many framework hooks, and Adapter across integrations.', 'Spring использует Proxy для transactions/security, Factory для beans, Template Method во многих hooks и Adapter в integrations.'),
      mechanics('Pattern overuse creates indirection without value; every abstraction must earn its keep.', 'Pattern overuse создает indirection без ценности; каждая abstraction должна заслужить место.'),
    ],
    details: seniorDetails('design patterns', 'design patterns'),
    diagram: `flowchart LR
controller["Controller"] --> service["Service"]
service --> strategy["Strategy"]
service --> repository["Repository"]
repository --> adapter["JPA Adapter"]
proxy["Transactional Proxy"] --> service
factory["Factory"] --> strategy`,
    methods: [
      method('Strategy', 'Swaps algorithms behind one interface.', 'Меняет algorithms за одним interface.'),
      method('Factory', 'Centralizes object creation and hides construction decisions.', 'Централизует object creation и скрывает construction decisions.'),
      method('Adapter', 'Translates one API or model into another.', 'Переводит один API/model в другой.'),
      method('Proxy', 'Controls access and adds behavior around a target object.', 'Контролирует access и добавляет behavior вокруг target object.'),
      method('Repository', 'Gives domain/application code persistence-oriented collection semantics.', 'Дает domain/application code persistence-oriented collection semantics.'),
    ],
    examples: [
      `// Strategy registry: useful for payment, scoring, pricing, validation variants.
interface PriceRule {
    boolean supports(Customer customer);
    Money apply(Order order);
}

final class PricingService {
    private final List<PriceRule> rules;

    Money price(Order order, Customer customer) {
        return rules.stream()
            .filter(rule -> rule.supports(customer))
            .findFirst()
            .orElseThrow()
            .apply(order);
    }
}`,
      `// Adapter: external DTOs do not leak into the domain.
final class StripePaymentAdapter implements PaymentGateway {
    private final StripeClient client;

    public PaymentResult charge(PaymentRequest request) {
        StripeCharge charge = client.createCharge(toStripe(request));
        return new PaymentResult(charge.id(), charge.status());
    }
}`,
    ],
    chapters: [
      chapter('Creational patterns', 'Creational patterns', 'Factory, Builder, and Prototype manage object creation complexity.', 'Factory, Builder и Prototype управляют complexity создания объектов.', [
        point('Use Builder for immutable objects with many optional fields or validation rules.', 'Используйте Builder для immutable objects с множеством optional fields или validation rules.'),
        point('Use Factory when construction depends on type, configuration, environment, or runtime data.', 'Используйте Factory, когда construction зависит от type, configuration, environment или runtime data.'),
      ]),
      chapter('Behavioral patterns', 'Behavioral patterns', 'Strategy, Command, Template Method, Chain of Responsibility, and Observer organize behavior changes.', 'Strategy, Command, Template Method, Chain of Responsibility и Observer организуют изменения behavior.', [
        point('Strategy removes repeated switch blocks when algorithms vary independently.', 'Strategy убирает repeated switch blocks, когда algorithms меняются независимо.'),
        point('Chain of Responsibility is common in filters, validation chains, security checks, and middleware.', 'Chain of Responsibility часто встречается в filters, validation chains, security checks и middleware.'),
      ]),
      chapter('Structural patterns', 'Structural patterns', 'Adapter, Decorator, Facade, Composite, and Proxy organize object relationships.', 'Adapter, Decorator, Facade, Composite и Proxy организуют object relationships.', [
        point('Adapter protects your domain from vendor models and external API churn.', 'Adapter защищает domain от vendor models и изменений external API.'),
        point('Proxy adds lazy loading, transactions, security, logging, caching, or remote access behavior.', 'Proxy добавляет lazy loading, transactions, security, logging, caching или remote access behavior.'),
      ]),
    ],
    faq: [
      faq('Should juniors memorize GoF patterns?', 'Junior должен заучить GoF patterns?', 'They should know the common ones and the forces behind them. Memorized names without trade-offs are not enough.', 'Нужно знать common patterns и forces за ними. Названия без trade-offs недостаточны.'),
      faq('How do patterns appear in Spring?', 'Как patterns проявляются в Spring?', 'Beans are factories/products, AOP uses proxies, MVC uses front controller/adapter ideas, repositories abstract persistence.', 'Beans - factories/products, AOP использует proxies, MVC использует front controller/adapter ideas, repositories abstract persistence.'),
      faq('When is a pattern harmful?', 'Когда pattern вреден?', 'When it adds indirection before there is variation, hides simple logic, or makes debugging harder without reducing change cost.', 'Когда он добавляет indirection до появления variation, скрывает простую логику или усложняет debugging без снижения change cost.'),
    ],
  },
  {
    id: 'java-language-deep-dive',
    groupId: 'language',
    stage: 'Specialization',
    title: { en: 'Java Language Deep Dive', ru: 'Java language deep dive' },
    intro: {
      en: 'Senior Java requires fluency with language features, not just syntax: records, sealed types, pattern matching, var, Optional, annotations, and modules.',
      ru: 'Senior Java требует fluency с language features, а не только syntax: records, sealed types, pattern matching, var, Optional, annotations и modules.',
    },
    deepDive: {
      en: 'Modern Java features reduce boilerplate and make domain intent clearer when used with discipline. Records model transparent immutable data carriers, sealed types model closed hierarchies, pattern matching reduces unsafe casts, Optional models possible absence at return boundaries, and modules express strong dependencies. The senior skill is knowing where features improve clarity and where they create cleverness.',
      ru: 'Современные Java features уменьшают boilerplate и делают domain intent яснее при дисциплинированном применении. Records моделируют transparent immutable data carriers, sealed types - closed hierarchies, pattern matching уменьшает unsafe casts, Optional моделирует possible absence на return boundaries, modules выражают strong dependencies. Senior-навык - понимать, где features улучшают clarity, а где создают cleverness.',
    },
    mechanics: [
      mechanics('A record generates constructor, accessors, equals, hashCode, and toString based on components.', 'Record генерирует constructor, accessors, equals, hashCode и toString на основе components.'),
      mechanics('Sealed classes let the compiler know all permitted subtypes, improving exhaustiveness checks.', 'Sealed classes позволяют compiler-у знать все permitted subtypes, улучшая exhaustiveness checks.'),
      mechanics('Optional is a return type signal, not a universal replacement for fields, parameters, or collections.', 'Optional - signal в return type, а не универсальная замена fields, parameters или collections.'),
    ],
    details: seniorDetails('modern Java language features', 'modern Java language features'),
    diagram: `classDiagram
sealed class PaymentResult
PaymentResult <|-- Approved
PaymentResult <|-- Declined
class Approved {
  <<record>>
  String paymentId
}
class Declined {
  <<record>>
  String reason
}`,
    methods: [
      method('record', 'Declares an immutable transparent data carrier.', 'Объявляет immutable transparent data carrier.'),
      method('sealed', 'Restricts which classes can extend or implement a type.', 'Ограничивает, какие classes могут extend/implement type.'),
      method('var', 'Infers local variable type while keeping static typing.', 'Выводит type local variable, сохраняя static typing.'),
      method('Optional.orElseGet()', 'Lazily provides fallback value only when empty.', 'Лениво дает fallback value только при empty.'),
    ],
    examples: [
      `sealed interface PaymentResult permits Approved, Declined {}

record Approved(String paymentId) implements PaymentResult {}
record Declined(String reason) implements PaymentResult {}

String message(PaymentResult result) {
    return switch (result) {
        case Approved approved -> "Paid: " + approved.paymentId();
        case Declined declined -> "Rejected: " + declined.reason();
    };
}`,
      `Optional<User> maybeUser = repository.findByEmail(email);

User user = maybeUser.orElseThrow(() ->
    new IllegalArgumentException("Unknown email: " + email));`,
    ],
    chapters: [
      chapter('Records', 'Records', 'Records are best for values where identity is the component tuple.', 'Records лучше всего подходят для values, где identity - это tuple компонентов.', [
        point('Use records for DTOs, query results, events, commands, and small immutable values.', 'Используйте records для DTOs, query results, events, commands и small immutable values.'),
        point('Do not put heavy mutable behavior or JPA entity identity semantics into records.', 'Не кладите тяжелое mutable behavior или JPA entity identity semantics в records.'),
      ]),
      chapter('Sealed types and pattern matching', 'Sealed types и pattern matching', 'Sealed hierarchies make closed domain alternatives explicit.', 'Sealed hierarchies делают closed domain alternatives явными.', [
        point('Great for result types, command variants, domain states, and protocol messages.', 'Отлично для result types, command variants, domain states и protocol messages.'),
        point('Avoid sealed types when third parties must add implementations.', 'Избегайте sealed types, когда third parties должны добавлять implementations.'),
      ]),
      chapter('Optional, var, and modules', 'Optional, var и modules', 'These features improve expressiveness only when they preserve intent.', 'Эти features улучшают expressiveness только если сохраняют intent.', [
        point('var is fine when the right side makes type obvious; harmful when it hides important domain type.', 'var нормален, когда right side делает type obvious; вреден, когда скрывает важный domain type.'),
        point('Optional should not be null. Returning null Optional is worse than returning nullable value.', 'Optional не должен быть null. Возврат null Optional хуже, чем nullable value.'),
      ]),
    ],
    faq: [
      faq('Are records always immutable?', 'Records всегда immutable?', 'Record fields are final, but components can reference mutable objects. Defensive copies may still be needed.', 'Record fields final, но components могут ссылаться на mutable objects. Defensive copies все еще могут быть нужны.'),
      faq('Should Optional be used in entity fields?', 'Стоит ли использовать Optional в entity fields?', 'Usually no. It complicates serialization, ORM, and JavaBean conventions. Use it mainly for return types.', 'Обычно нет. Это усложняет serialization, ORM и JavaBean conventions. Используйте в основном для return types.'),
      faq('Why use sealed classes?', 'Зачем sealed classes?', 'They model a closed set of alternatives and let the compiler help with exhaustive handling.', 'Они моделируют closed set alternatives и позволяют compiler помогать с exhaustive handling.'),
    ],
  },
  {
    id: 'jvm-performance-profiling',
    groupId: 'runtime',
    stage: 'Specialization',
    title: { en: 'JVM Performance, Profiling & Tuning', ru: 'JVM performance, profiling и tuning' },
    intro: {
      en: 'Performance work is measurement-driven: understand CPU, allocation, locks, GC, I/O, and the real bottleneck before tuning.',
      ru: 'Performance work строится на measurements: понимайте CPU, allocation, locks, GC, I/O и реальный bottleneck до tuning.',
    },
    deepDive: {
      en: 'The JVM optimizes hot code through JIT compilation, inlining, escape analysis, lock elision, and profile-guided decisions. Performance problems often come from allocation churn, blocking I/O, inefficient SQL, lock contention, poor data structures, serialization overhead, or excessive logging. A senior engineer profiles before changing code and validates improvements with representative load.',
      ru: 'JVM оптимизирует hot code через JIT compilation, inlining, escape analysis, lock elision и profile-guided decisions. Performance problems часто идут от allocation churn, blocking I/O, inefficient SQL, lock contention, poor data structures, serialization overhead или excessive logging. Senior engineer профилирует до изменения кода и подтверждает improvements representative load-ом.',
    },
    mechanics: [
      mechanics('JIT compiles frequently executed methods and may deoptimize when assumptions become invalid.', 'JIT компилирует frequently executed methods и может deoptimize, когда assumptions становятся invalid.'),
      mechanics('Allocation rate matters because even short-lived objects consume CPU and young GC bandwidth.', 'Allocation rate важен, потому что даже short-lived objects потребляют CPU и young GC bandwidth.'),
      mechanics('Profilers sample stack traces or instrument code; each approach has overhead and blind spots.', 'Profilers sample-ят stack traces или instrument code; у каждого подхода есть overhead и blind spots.'),
    ],
    details: seniorDetails('JVM performance', 'JVM performance'),
    diagram: `flowchart LR
load["Production-like load"] --> metrics["Metrics"]
metrics --> profiler["Profiler / JFR"]
profiler --> bottleneck["Bottleneck"]
bottleneck --> change["Small change"]
change --> benchmark["Validate again"]`,
    methods: [
      method('JFR', 'Records low-overhead runtime events for profiling and diagnosis.', 'Записывает low-overhead runtime events для profiling и diagnosis.'),
      method('jcmd', 'Inspects and controls a running JVM.', 'Inspect/control running JVM.'),
      method('async-profiler', 'Samples CPU, allocation, lock, and wall-clock profiles.', 'Sample-ит CPU, allocation, lock и wall-clock profiles.'),
      method('JMH', 'Runs reliable microbenchmarks with warmup and JVM safeguards.', 'Запускает надежные microbenchmarks с warmup и JVM safeguards.'),
    ],
    examples: [
      `// Use JMH for microbenchmarks, not System.currentTimeMillis loops.
@Benchmark
public int hashMapLookup() {
    return map.get("java");
}`,
      `// Allocation-aware code: avoid creating temporary lists in a hot path.
boolean hasAdminRole(User user) {
    for (Role role : user.roles()) {
        if (role.name().equals("ADMIN")) {
            return true;
        }
    }
    return false;
}`,
    ],
    chapters: [
      chapter('Profiling workflow', 'Profiling workflow', 'Start from symptom, collect evidence, isolate bottleneck, change one thing, measure again.', 'Начинайте с symptom, собирайте evidence, изолируйте bottleneck, меняйте одну вещь, измеряйте снова.', [
        point('Never optimize by vibes. A flame graph is more trustworthy than intuition.', 'Никогда не оптимизируйте по ощущениям. Flame graph надежнее intuition.'),
        point('Use production-like data shape. Toy inputs hide allocation, DB, cache, and branch behavior.', 'Используйте production-like data shape. Toy inputs скрывают allocation, DB, cache и branch behavior.'),
      ]),
      chapter('Common bottlenecks', 'Common bottlenecks', 'Most backend bottlenecks are outside arithmetic: SQL, remote calls, serialization, locks, GC, and queues.', 'Большинство backend bottlenecks не в arithmetic: SQL, remote calls, serialization, locks, GC и queues.', [
        point('If CPU is low and latency is high, suspect waiting: DB, network, locks, thread pool starvation.', 'Если CPU low, а latency high, подозревайте waiting: DB, network, locks, thread pool starvation.'),
        point('If GC is frequent, inspect allocation profile before touching GC flags.', 'Если GC frequent, смотрите allocation profile до изменения GC flags.'),
      ]),
      chapter('JIT and warmup', 'JIT и warmup', 'Java performance changes during warmup because code becomes compiled and optimized.', 'Java performance меняется во время warmup, потому что code компилируется и оптимизируется.', [
        point('First requests after startup can be slower due to class loading, JIT warmup, cache initialization, and connection creation.', 'Первые requests после startup могут быть slower из-за class loading, JIT warmup, cache initialization и connection creation.'),
        point('Microbenchmarks must account for dead-code elimination, constant folding, warmup, and blackholes.', 'Microbenchmarks должны учитывать dead-code elimination, constant folding, warmup и blackholes.'),
      ]),
    ],
    faq: [
      faq('Should I tune GC first?', 'Нужно ли первым делом tune-ить GC?', 'Usually no. First reduce allocation, fix leaks, right-size heap, and understand latency targets.', 'Обычно нет. Сначала уменьшайте allocation, чините leaks, подбирайте heap и понимайте latency targets.'),
      faq('What is a flame graph?', 'Что такое flame graph?', 'A visualization of sampled stack traces where width shows where time or allocations are spent.', 'Визуализация sampled stack traces, где ширина показывает, где тратится time или allocations.'),
      faq('Why is JMH needed?', 'Зачем JMH?', 'Naive benchmarks are distorted by JIT, warmup, dead-code elimination, and timer noise.', 'Наивные benchmarks искажены JIT, warmup, dead-code elimination и timer noise.'),
    ],
  },
  {
    id: 'sql-database-design-deep',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'SQL & Database Design Deep Dive', ru: 'SQL и database design deep dive' },
    intro: {
      en: 'Senior backend work requires understanding schema design, indexes, query plans, transactions, locking, and data evolution.',
      ru: 'Senior backend работа требует понимания schema design, indexes, query plans, transactions, locking и data evolution.',
    },
    deepDive: {
      en: 'A relational database is not just storage. It is a query optimizer, transaction manager, lock manager, buffer cache, write-ahead log, and constraint engine. Good schema design encodes invariants with constraints, chooses indexes for real access patterns, and uses migrations to evolve safely. Query performance comes from cardinality, selectivity, join order, indexes, statistics, and avoiding unnecessary round trips.',
      ru: 'Relational database - не просто storage. Это query optimizer, transaction manager, lock manager, buffer cache, write-ahead log и constraint engine. Хороший schema design кодирует invariants через constraints, выбирает indexes под real access patterns и использует migrations для безопасной эволюции. Query performance зависит от cardinality, selectivity, join order, indexes, statistics и избегания лишних round trips.',
    },
    mechanics: [
      mechanics('An index is a separate data structure; it speeds reads but adds write cost and storage.', 'Index - отдельная data structure; ускоряет reads, но добавляет write cost и storage.'),
      mechanics('The optimizer chooses a plan based on statistics; stale statistics can produce bad plans.', 'Optimizer выбирает plan на основе statistics; stale statistics могут дать bad plans.'),
      mechanics('Locks protect consistency but can reduce concurrency; isolation level defines allowed anomalies.', 'Locks защищают consistency, но могут снижать concurrency; isolation level определяет allowed anomalies.'),
    ],
    details: seniorDetails('SQL and relational databases', 'SQL и relational databases'),
    diagram: `flowchart TB
query["SQL query"] --> parser["Parser"]
parser --> optimizer["Optimizer + statistics"]
optimizer --> plan["Execution plan"]
plan --> indexes["Indexes"]
plan --> tables["Tables"]
tables --> buffer["Buffer cache"]
buffer --> wal["WAL / durability"]`,
    methods: [
      method('EXPLAIN', 'Shows the database execution plan.', 'Показывает execution plan database.'),
      method('CREATE INDEX', 'Creates an access path for selected columns/expressions.', 'Создает access path для selected columns/expressions.'),
      method('FOREIGN KEY', 'Enforces referential integrity.', 'Enforces referential integrity.'),
      method('UNIQUE', 'Enforces business uniqueness at the database level.', 'Enforces business uniqueness на уровне database.'),
    ],
    examples: [
      `create table users (
    id bigserial primary key,
    email text not null unique,
    created_at timestamptz not null default now()
);

create index idx_orders_user_created
    on orders (user_id, created_at desc);`,
      `-- Always inspect the plan for important queries.
explain analyze
select *
from orders
where user_id = ?
order by created_at desc
limit 20;`,
    ],
    chapters: [
      chapter('Schema design', 'Schema design', 'Schema design should protect data invariants even when application code has bugs.', 'Schema design должен защищать data invariants, даже когда application code содержит bugs.', [
        point('Use NOT NULL, UNIQUE, CHECK, and FOREIGN KEY constraints for rules that must never be violated.', 'Используйте NOT NULL, UNIQUE, CHECK и FOREIGN KEY constraints для rules, которые никогда нельзя нарушать.'),
        point('Normalize to avoid update anomalies; denormalize deliberately for read performance with clear ownership.', 'Normalize для избежания update anomalies; denormalize осознанно для read performance с clear ownership.'),
      ]),
      chapter('Indexes and plans', 'Indexes и plans', 'An index helps only when it matches filtering, sorting, joining, and selectivity patterns.', 'Index помогает только когда соответствует filtering, sorting, joining и selectivity patterns.', [
        point('Composite index order matters. (user_id, created_at) is different from (created_at, user_id).', 'Порядок composite index важен. (user_id, created_at) отличается от (created_at, user_id).'),
        point('Low-selectivity indexes can be ignored because scanning may be cheaper.', 'Low-selectivity indexes могут игнорироваться, потому что scan может быть дешевле.'),
      ]),
      chapter('Transactions and migrations', 'Transactions и migrations', 'Data correctness depends on isolation, locking, and safe schema evolution.', 'Data correctness зависит от isolation, locking и safe schema evolution.', [
        point('Migrations should be backward-compatible during rolling deploys: expand, backfill, switch, contract.', 'Migrations должны быть backward-compatible при rolling deploys: expand, backfill, switch, contract.'),
        point('Long transactions hold locks and old row versions, hurting throughput and cleanup.', 'Long transactions удерживают locks и old row versions, ухудшая throughput и cleanup.'),
      ]),
    ],
    faq: [
      faq('Why does an index sometimes not get used?', 'Почему index иногда не используется?', 'The optimizer may estimate that sequential scan is cheaper due to selectivity, table size, stale stats, or expression mismatch.', 'Optimizer может оценить sequential scan как более дешевый из-за selectivity, table size, stale stats или expression mismatch.'),
      faq('What is a migration expand-contract pattern?', 'Что такое migration expand-contract?', 'Add compatible schema first, backfill and switch code, then remove old schema after all versions are safe.', 'Сначала добавляется compatible schema, затем backfill и switch code, потом удаляется old schema после безопасности всех versions.'),
      faq('Why keep constraints if application validates?', 'Зачем constraints, если application валидирует?', 'The database is the final consistency boundary across services, jobs, manual scripts, and bugs.', 'Database - финальная consistency boundary для services, jobs, manual scripts и bugs.'),
    ],
  },
  {
    id: 'spring-boot-production-internals',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'Spring Boot Internals & Production Readiness', ru: 'Spring Boot internals и production readiness' },
    intro: {
      en: 'Spring Boot is productive because it turns classpath, properties, and conditions into application configuration.',
      ru: 'Spring Boot продуктивен, потому что превращает classpath, properties и conditions в application configuration.',
    },
    deepDive: {
      en: 'Boot starts by creating an ApplicationContext, loading environment properties, applying auto-configurations, and starting an embedded server for web apps. Auto-configuration classes are conditional: they activate when classes, beans, properties, or missing beans match. Actuator exposes operational endpoints. Production readiness requires configuration discipline, graceful shutdown, health groups, metrics, tracing, security defaults, and startup observability.',
      ru: 'Boot стартует через создание ApplicationContext, загрузку environment properties, применение auto-configurations и запуск embedded server для web apps. Auto-configuration classes conditional: активируются при совпадении classes, beans, properties или missing beans. Actuator открывает operational endpoints. Production readiness требует discipline в configuration, graceful shutdown, health groups, metrics, tracing, security defaults и startup observability.',
    },
    mechanics: [
      mechanics('Auto-configuration backs off when your application defines a bean of the expected type.', 'Auto-configuration отступает, когда application определяет bean ожидаемого type.'),
      mechanics('Configuration properties bind external values into typed objects and can be validated at startup.', 'Configuration properties bind-ят external values в typed objects и могут validate-иться на startup.'),
      mechanics('Actuator health can be split into liveness and readiness so orchestrators make correct decisions.', 'Actuator health можно разделить на liveness и readiness, чтобы orchestrators принимали correct decisions.'),
    ],
    details: seniorDetails('Spring Boot production systems', 'Spring Boot production systems'),
    diagram: `flowchart TB
main["SpringApplication.run"] --> env["Environment"]
env --> auto["Auto-configuration conditions"]
auto --> context["ApplicationContext"]
context --> web["Embedded server"]
context --> actuator["Actuator"]
actuator --> ops["Health / metrics / info"]`,
    methods: [
      method('@SpringBootApplication', 'Combines configuration, component scanning, and auto-configuration.', 'Объединяет configuration, component scanning и auto-configuration.'),
      method('@ConfigurationProperties', 'Binds external configuration to typed Java objects.', 'Bind-ит external configuration в typed Java objects.'),
      method('Actuator', 'Exposes production diagnostics and management endpoints.', 'Открывает production diagnostics и management endpoints.'),
      method('ConditionEvaluationReport', 'Explains why auto-configurations matched or did not match.', 'Объясняет, почему auto-configurations matched или не matched.'),
    ],
    examples: [
      `@ConfigurationProperties(prefix = "payments")
@Validated
record PaymentProperties(
    @NotBlank String endpoint,
    @Min(100) Duration timeout
) {}`,
      `management.endpoint.health.probes.enabled=true
management.endpoints.web.exposure.include=health,info,metrics,prometheus`,
    ],
    chapters: [
      chapter('Auto-configuration', 'Auto-configuration', 'Auto-configuration is conditional bean registration driven by classpath and configuration.', 'Auto-configuration - conditional bean registration, driven classpath и configuration.', [
        point('Use debug condition report when Boot creates or does not create a bean unexpectedly.', 'Используйте debug condition report, когда Boot unexpectedly создает или не создает bean.'),
        point('Prefer overriding with explicit beans or properties rather than excluding auto-configurations blindly.', 'Предпочитайте override через explicit beans или properties вместо blind exclude auto-configurations.'),
      ]),
      chapter('Configuration discipline', 'Configuration discipline', 'Configuration is part of the application contract and should be typed, validated, and documented.', 'Configuration - часть application contract и должна быть typed, validated и documented.', [
        point('Fail fast on invalid config. A service with wrong URLs, empty secrets, or bad timeouts should not start silently.', 'Fail fast при invalid config. Service с wrong URLs, empty secrets или bad timeouts не должен стартовать silently.'),
        point('Separate environment-specific values from code and artifact.', 'Отделяйте environment-specific values от code и artifact.'),
      ]),
      chapter('Production operations', 'Production operations', 'Actuator, metrics, graceful shutdown, and health probes make a Boot service operable.', 'Actuator, metrics, graceful shutdown и health probes делают Boot service operable.', [
        point('Readiness should fail when the service cannot receive traffic, for example during startup or dependency outage.', 'Readiness должен fail-иться, когда service не может принимать traffic, например startup или dependency outage.'),
        point('Graceful shutdown lets in-flight requests finish before the process exits.', 'Graceful shutdown позволяет in-flight requests завершиться до выхода process.'),
      ]),
    ],
    faq: [
      faq('Why did Spring Boot create this bean?', 'Почему Spring Boot создал этот bean?', 'Because an auto-configuration condition matched. Check condition evaluation report and bean definitions.', 'Потому что auto-configuration condition matched. Проверьте condition evaluation report и bean definitions.'),
      faq('What is the difference between liveness and readiness?', 'Чем отличаются liveness и readiness?', 'Liveness means the process should stay alive. Readiness means it can receive traffic.', 'Liveness означает, что process должен жить. Readiness означает, что он может принимать traffic.'),
      faq('Should all actuator endpoints be public?', 'Все actuator endpoints должны быть public?', 'No. Expose only required endpoints and secure sensitive management data.', 'Нет. Открывайте только нужные endpoints и защищайте sensitive management data.'),
    ],
  },
  {
    id: 'spring-security-application-security',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'Spring Security & Application Security', ru: 'Spring Security и application security' },
    intro: {
      en: 'Security is not a filter you add at the end; it shapes identity, authorization, data handling, API design, and operations.',
      ru: 'Security - не filter, который добавляют в конце; он формирует identity, authorization, data handling, API design и operations.',
    },
    deepDive: {
      en: 'Spring Security is built around a filter chain, SecurityContext, Authentication, AuthorizationManager, and method security. Authentication answers “who are you?”, authorization answers “what may you do?”. Senior security work includes password hashing, JWT/session trade-offs, CSRF, CORS, OAuth2/OIDC basics, secret handling, least privilege, audit logging, input validation, output encoding, and safe defaults.',
      ru: 'Spring Security построен вокруг filter chain, SecurityContext, Authentication, AuthorizationManager и method security. Authentication отвечает “кто ты?”, authorization - “что тебе можно?”. Senior security work включает password hashing, JWT/session trade-offs, CSRF, CORS, OAuth2/OIDC basics, secret handling, least privilege, audit logging, input validation, output encoding и safe defaults.',
    },
    mechanics: [
      mechanics('Security filters run before controllers and can authenticate, reject, redirect, or enrich the request context.', 'Security filters выполняются до controllers и могут authenticate, reject, redirect или enrich request context.'),
      mechanics('JWT is signed, not encrypted by default; anyone with the token can read its claims unless encryption is used.', 'JWT signed, но не encrypted по умолчанию; любой с token может читать claims, если не используется encryption.'),
      mechanics('Password hashing must be slow and salted; never store reversible passwords.', 'Password hashing должен быть slow и salted; никогда не храните reversible passwords.'),
    ],
    details: seniorDetails('application security', 'application security'),
    diagram: `flowchart LR
request["HTTP request"] --> filters["Security filter chain"]
filters --> authn["Authentication"]
authn --> context["SecurityContext"]
context --> authz["Authorization"]
authz --> controller["Controller"]`,
    methods: [
      method('SecurityFilterChain', 'Defines HTTP security rules and filter behavior.', 'Определяет HTTP security rules и behavior filters.'),
      method('Authentication', 'Represents the authenticated principal and authorities.', 'Представляет authenticated principal и authorities.'),
      method('@PreAuthorize', 'Applies method-level authorization expressions.', 'Применяет method-level authorization expressions.'),
      method('PasswordEncoder', 'Hashes and verifies passwords safely.', 'Безопасно hashes и verifies passwords.'),
    ],
    examples: [
      `@Bean
SecurityFilterChain security(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/health/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/articles/**").permitAll()
            .anyRequest().authenticated())
        .oauth2ResourceServer(oauth -> oauth.jwt())
        .build();
}`,
      `@PreAuthorize("hasAuthority('ORDER_REFUND')")
public void refund(long orderId) {
    refundService.refund(orderId);
}`,
    ],
    chapters: [
      chapter('Authentication vs authorization', 'Authentication vs authorization', 'Authentication establishes identity; authorization applies permissions to an action/resource.', 'Authentication устанавливает identity; authorization применяет permissions к action/resource.', [
        point('A valid user is not automatically allowed to access every resource.', 'Valid user не получает автоматически доступ ко всем resources.'),
        point('Authorization should often check ownership or tenant, not only role name.', 'Authorization часто должна проверять ownership или tenant, а не только role name.'),
      ]),
      chapter('Web security basics', 'Web security basics', 'HTTP security includes CSRF, CORS, cookies, headers, sessions, and token storage.', 'HTTP security включает CSRF, CORS, cookies, headers, sessions и token storage.', [
        point('CORS is browser enforcement; it is not server-to-server access control.', 'CORS - browser enforcement; это не server-to-server access control.'),
        point('CSRF matters when browsers automatically attach credentials such as cookies.', 'CSRF важен, когда browsers автоматически attach credentials, например cookies.'),
      ]),
      chapter('OWASP mindset', 'OWASP mindset', 'Think about injection, broken access control, sensitive data exposure, insecure configuration, and logging/auditing gaps.', 'Думайте про injection, broken access control, sensitive data exposure, insecure configuration и gaps в logging/auditing.', [
        point('Validate input, encode output, parameterize SQL, and avoid logging secrets or tokens.', 'Validate input, encode output, parameterize SQL и не логируйте secrets/tokens.'),
        point('Security tests should cover unauthorized, forbidden, cross-tenant, expired token, and malformed input cases.', 'Security tests должны покрывать unauthorized, forbidden, cross-tenant, expired token и malformed input cases.'),
      ]),
    ],
    faq: [
      faq('JWT or session?', 'JWT или session?', 'JWT helps stateless APIs and cross-service identity; sessions simplify revocation and server-side control. Choose by requirements.', 'JWT помогает stateless APIs и cross-service identity; sessions упрощают revocation и server-side control. Выбирайте по requirements.'),
      faq('Is CORS security?', 'CORS - это security?', 'It protects browsers from reading disallowed cross-origin responses. It does not replace authentication or authorization.', 'Он защищает browsers от чтения disallowed cross-origin responses. Он не заменяет authentication или authorization.'),
      faq('Where should authorization live?', 'Где должна жить authorization?', 'At boundaries and near sensitive use cases. Do not rely only on frontend hiding buttons.', 'На boundaries и рядом с sensitive use cases. Не полагайтесь только на frontend hiding buttons.'),
    ],
  },
  {
    id: 'messaging-event-driven-systems',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'Messaging & Event-Driven Systems', ru: 'Messaging и event-driven systems' },
    intro: {
      en: 'Messaging decouples services in time, but introduces delivery semantics, ordering, idempotency, and observability challenges.',
      ru: 'Messaging decouple-ит services во времени, но добавляет delivery semantics, ordering, idempotency и observability challenges.',
    },
    deepDive: {
      en: 'Queues distribute work among consumers; topics publish events to multiple subscribers. Delivery can be at-most-once, at-least-once, or effectively-once through idempotency and transactions. Brokers such as Kafka and RabbitMQ manage persistence, offsets/acknowledgements, partitions, retries, and dead-letter flows. Senior design focuses on event contracts, schema evolution, consumer lag, poison messages, backpressure, ordering keys, and the outbox pattern.',
      ru: 'Queues распределяют work между consumers; topics публикуют events нескольким subscribers. Delivery бывает at-most-once, at-least-once или effectively-once через idempotency и transactions. Brokers вроде Kafka/RabbitMQ управляют persistence, offsets/acknowledgements, partitions, retries и dead-letter flows. Senior design фокусируется на event contracts, schema evolution, consumer lag, poison messages, backpressure, ordering keys и outbox pattern.',
    },
    mechanics: [
      mechanics('At-least-once delivery means duplicates are normal; consumers must be idempotent.', 'At-least-once delivery означает, что duplicates нормальны; consumers должны быть idempotent.'),
      mechanics('Kafka ordering is within a partition, not across the whole topic.', 'Kafka ordering действует внутри partition, а не по всему topic.'),
      mechanics('Dead-letter queues isolate messages that repeatedly fail so the main flow can continue.', 'Dead-letter queues изолируют messages, которые repeatedly fail, чтобы main flow продолжался.'),
    ],
    details: seniorDetails('messaging systems', 'messaging systems'),
    diagram: `flowchart LR
service["Order service"] --> outbox["Outbox table"]
outbox --> publisher["Outbox publisher"]
publisher --> broker["Broker topic"]
broker --> consumer["Payment consumer"]
consumer --> dlq["DLQ on repeated failure"]`,
    methods: [
      method('ack', 'Confirms message processing so broker can advance/delete.', 'Подтверждает processing message, чтобы broker advance/delete.'),
      method('offset', 'Consumer position in a Kafka partition.', 'Consumer position в Kafka partition.'),
      method('partition key', 'Controls event ordering and distribution.', 'Управляет event ordering и distribution.'),
      method('outbox', 'Persists state change and event atomically in one database transaction.', 'Сохраняет state change и event atomically в одной database transaction.'),
    ],
    examples: [
      `@Transactional
void placeOrder(PlaceOrder command) {
    Order order = orders.save(Order.place(command));
    outbox.save(new OutboxEvent(
        "OrderPlaced",
        order.id().toString(),
        json.serialize(OrderPlaced.from(order))
    ));
}`,
      `void handle(OrderPlaced event) {
    if (processedEvents.exists(event.eventId())) {
        return; // idempotency
    }
    paymentService.reserve(event.orderId(), event.amount());
    processedEvents.save(event.eventId());
}`,
    ],
    chapters: [
      chapter('Queues vs topics', 'Queues vs topics', 'Queues distribute commands/work; topics broadcast facts/events.', 'Queues распределяют commands/work; topics broadcast-ят facts/events.', [
        point('Use commands when one service asks another to do something.', 'Используйте commands, когда один service просит другой что-то сделать.'),
        point('Use events when something already happened and other services may react.', 'Используйте events, когда что-то уже произошло и другие services могут react.'),
      ]),
      chapter('Delivery semantics', 'Delivery semantics', 'Exactly-once is usually a system-level illusion built from idempotency, transactions, and deduplication.', 'Exactly-once обычно system-level illusion, построенная из idempotency, transactions и deduplication.', [
        point('Design every consumer for duplicates unless you can prove stronger guarantees end to end.', 'Проектируйте каждого consumer под duplicates, если не можете доказать stronger guarantees end-to-end.'),
        point('Retries need backoff and limits; infinite immediate retries amplify outages.', 'Retries требуют backoff и limits; infinite immediate retries усиливают outages.'),
      ]),
      chapter('Event contracts', 'Event contracts', 'Events are long-lived public contracts and must evolve compatibly.', 'Events - long-lived public contracts и должны evolve compatibly.', [
        point('Prefer adding optional fields over renaming/removing existing fields.', 'Предпочитайте adding optional fields вместо rename/remove existing fields.'),
        point('Track schema versions, consumers, and retention requirements.', 'Track-ьте schema versions, consumers и retention requirements.'),
      ]),
    ],
    faq: [
      faq('Why use outbox?', 'Зачем outbox?', 'It prevents saving database state without publishing the corresponding event, or publishing an event for rolled-back state.', 'Он предотвращает сохранение database state без event или публикацию event для rolled-back state.'),
      faq('What is consumer lag?', 'Что такое consumer lag?', 'The distance between latest produced messages and what a consumer group has processed.', 'Разница между latest produced messages и тем, что consumer group обработала.'),
      faq('How do you handle poison messages?', 'Как обрабатывать poison messages?', 'Retry with limits, send to DLQ, alert, inspect, fix data/code, then replay if safe.', 'Retry с limits, отправка в DLQ, alert, inspect, fix data/code, затем replay если safe.'),
    ],
  },
  {
    id: 'microservices-distributed-systems',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'Microservices & Distributed Systems', ru: 'Microservices и distributed systems' },
    intro: {
      en: 'Distributed systems are systems where partial failure, latency, and inconsistent knowledge are normal design inputs.',
      ru: 'Distributed systems - это systems, где partial failure, latency и inconsistent knowledge являются нормальными design inputs.',
    },
    deepDive: {
      en: 'Microservices trade local simplicity for distributed complexity. Each service owns data and deploys independently, but cross-service operations require network calls, contracts, observability, retries, idempotency, timeouts, versioning, and eventual consistency. Senior engineers know when not to split a service and how to design boundaries around business capabilities rather than technical layers.',
      ru: 'Microservices меняют local simplicity на distributed complexity. Каждый service владеет data и deploy-ится независимо, но cross-service operations требуют network calls, contracts, observability, retries, idempotency, timeouts, versioning и eventual consistency. Senior engineers знают, когда не разделять service и как проектировать boundaries вокруг business capabilities, а не technical layers.',
    },
    mechanics: [
      mechanics('Network calls fail independently: timeout, connection reset, DNS issue, overload, bad deploy, partial response.', 'Network calls fail independently: timeout, connection reset, DNS issue, overload, bad deploy, partial response.'),
      mechanics('Distributed transactions are avoided in many systems; sagas and outbox patterns coordinate eventual consistency.', 'Distributed transactions во многих systems избегают; sagas и outbox patterns координируют eventual consistency.'),
      mechanics('Retries can multiply load during incidents unless bounded, delayed, and combined with circuit breakers.', 'Retries могут умножать load во время incidents, если не bounded, delayed и не combined с circuit breakers.'),
    ],
    details: seniorDetails('distributed backend design', 'distributed backend design'),
    diagram: `flowchart LR
client --> gateway["API Gateway"]
gateway --> orders["Order Service"]
orders --> db1[("Orders DB")]
orders --> payments["Payment Service"]
payments --> db2[("Payments DB")]
orders --> events["Event broker"]
events --> shipping["Shipping Service"]`,
    methods: [
      method('timeout', 'Limits how long a caller waits for a dependency.', 'Ограничивает ожидание dependency.'),
      method('retry with backoff', 'Retries transient failures without immediate overload amplification.', 'Retry-ит transient failures без immediate overload amplification.'),
      method('circuit breaker', 'Stops calls to a failing dependency for a period.', 'Останавливает calls к failing dependency на период.'),
      method('saga', 'Coordinates multi-service business process with local transactions and compensations.', 'Координирует multi-service business process через local transactions и compensations.'),
    ],
    examples: [
      `PaymentResult reservePayment(Order order) {
    return circuitBreaker.executeSupplier(() ->
        retry.executeSupplier(() ->
            paymentClient.reserve(order.id(), order.total())
        )
    );
}`,
      `// Idempotency key prevents duplicate creation after client retry.
POST /orders
Idempotency-Key: 0b7f6c1f-6bb6-4d8f-9bfb-6f6a9c2a0102`,
    ],
    chapters: [
      chapter('Service boundaries', 'Service boundaries', 'A good boundary follows business capability and data ownership.', 'Хорошая boundary следует business capability и data ownership.', [
        point('Do not split by controller/service/repository layers. Split by capabilities such as Orders, Payments, Shipping.', 'Не split-ьте по controller/service/repository layers. Split-ьте по capabilities: Orders, Payments, Shipping.'),
        point('If two services must change and deploy together constantly, the boundary is probably wrong.', 'Если два services постоянно должны меняться и deploy-иться вместе, boundary вероятно неправильная.'),
      ]),
      chapter('Failure design', 'Failure design', 'Every remote dependency needs timeout, retry policy, fallback or failure policy, and observability.', 'Каждая remote dependency требует timeout, retry policy, fallback/failure policy и observability.', [
        point('Timeouts should be shorter than caller deadlines and coordinated across the request chain.', 'Timeouts должны быть короче caller deadlines и coordinated по request chain.'),
        point('Fallbacks must be correct. Serving stale data is sometimes okay; accepting unpaid orders is not.', 'Fallbacks должны быть correct. Отдать stale data иногда нормально; принять unpaid orders - нет.'),
      ]),
      chapter('Consistency', 'Consistency', 'Distributed consistency is a business decision, not only a technical one.', 'Distributed consistency - business decision, не только technical one.', [
        point('Strong consistency is simpler for users but can reduce availability and increase coupling.', 'Strong consistency проще для users, но может снижать availability и увеличивать coupling.'),
        point('Eventual consistency needs user experience, reconciliation, monitoring, and compensation design.', 'Eventual consistency требует UX, reconciliation, monitoring и compensation design.'),
      ]),
    ],
    faq: [
      faq('When should you avoid microservices?', 'Когда избегать microservices?', 'When the domain is unclear, team is small, deployment maturity is low, or boundaries are not stable.', 'Когда domain неясен, команда маленькая, deployment maturity низкая или boundaries нестабильны.'),
      faq('What is CAP theorem in practice?', 'Что CAP theorem значит на практике?', 'During a network partition, a distributed system must choose between availability and strong consistency for affected operations.', 'Во время network partition distributed system выбирает между availability и strong consistency для affected operations.'),
      faq('Why is idempotency critical?', 'Почему idempotency критична?', 'Clients and services retry after uncertain failures. Idempotency prevents duplicate side effects.', 'Clients и services retry-ят после uncertain failures. Idempotency предотвращает duplicate side effects.'),
    ],
  },
  {
    id: 'caching-redis-strategies',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'Caching & Redis Strategies', ru: 'Caching и Redis strategies' },
    intro: {
      en: 'Caching improves latency and load only when freshness, invalidation, memory, and failure behavior are designed explicitly.',
      ru: 'Caching улучшает latency и load только когда freshness, invalidation, memory и failure behavior спроектированы явно.',
    },
    deepDive: {
      en: 'A cache stores derived or duplicated data closer to the application. Common patterns are cache-aside, read-through, write-through, write-behind, and refresh-ahead. Redis is often used for shared caching, rate limiting, sessions, locks, and queues, but it is not magic persistence. Senior work includes TTL choice, key design, serialization, stampede protection, eviction policy, consistency, metrics, and graceful degradation when cache is down.',
      ru: 'Cache хранит derived или duplicated data ближе к application. Common patterns: cache-aside, read-through, write-through, write-behind и refresh-ahead. Redis часто используют для shared caching, rate limiting, sessions, locks и queues, но это не magic persistence. Senior work включает TTL choice, key design, serialization, stampede protection, eviction policy, consistency, metrics и graceful degradation при падении cache.',
    },
    mechanics: [
      mechanics('Cache hit returns fast; cache miss pays lookup plus origin load plus cache write.', 'Cache hit возвращает fast; cache miss платит lookup плюс origin load плюс cache write.'),
      mechanics('Cache stampede happens when many requests miss the same key and overload the origin.', 'Cache stampede возникает, когда много requests miss-ят один key и перегружают origin.'),
      mechanics('Eviction can remove keys before TTL when memory policy requires it.', 'Eviction может удалить keys до TTL, когда memory policy этого требует.'),
    ],
    details: seniorDetails('caching systems', 'caching systems'),
    diagram: `sequenceDiagram
participant App
participant Cache
participant DB
App->>Cache: get key
alt hit
Cache-->>App: value
else miss
App->>DB: query
DB-->>App: value
App->>Cache: set key + TTL
end`,
    methods: [
      method('TTL', 'Limits how long cached data is considered usable.', 'Ограничивает, как долго cached data usable.'),
      method('cache-aside', 'Application reads cache, loads origin on miss, then populates cache.', 'Application читает cache, loads origin on miss и populates cache.'),
      method('SET NX PX', 'Redis primitive for conditional set with expiry, often used in simple locks.', 'Redis primitive для conditional set with expiry, часто используется в simple locks.'),
      method('eviction policy', 'Defines which keys Redis removes under memory pressure.', 'Определяет, какие keys Redis удаляет при memory pressure.'),
    ],
    examples: [
      `UserProfile getProfile(long userId) {
    String key = "profile:" + userId;
    return cache.get(key)
        .map(json::deserializeProfile)
        .orElseGet(() -> {
            UserProfile profile = repository.loadProfile(userId);
            cache.set(key, json.serialize(profile), Duration.ofMinutes(10));
            return profile;
        });
}`,
      `// Redis-style lock must have expiry and a unique token.
SET order:42:lock 8f9b... NX PX 30000`,
    ],
    chapters: [
      chapter('Cache patterns', 'Cache patterns', 'Choose a caching pattern based on freshness and write behavior.', 'Выбирайте caching pattern по freshness и write behavior.', [
        point('Cache-aside is simple and common but can produce stale data after writes unless invalidation is handled.', 'Cache-aside простой и common, но может давать stale data после writes без invalidation.'),
        point('Write-through keeps cache updated but adds latency to writes.', 'Write-through держит cache updated, но добавляет latency к writes.'),
      ]),
      chapter('Invalidation and consistency', 'Invalidation и consistency', 'Invalidation is the hard part because cached data duplicates source truth.', 'Invalidation сложна, потому что cached data дублирует source truth.', [
        point('Use TTL as a safety net, not the only correctness mechanism for critical data.', 'Используйте TTL как safety net, а не единственный correctness mechanism для critical data.'),
        point('For permissions, balances, and inventory, stale cache can become a security or money bug.', 'Для permissions, balances и inventory stale cache может стать security или money bug.'),
      ]),
      chapter('Failure modes', 'Failure modes', 'A cache outage should not automatically become total service outage unless cache is source of truth.', 'Cache outage не должен автоматически становиться total service outage, если cache не source of truth.', [
        point('Protect origin from stampedes with request coalescing, locks, jittered TTL, and rate limits.', 'Защищайте origin от stampedes через request coalescing, locks, jittered TTL и rate limits.'),
        point('Monitor hit rate, latency, memory, evictions, errors, and hot keys.', 'Monitor-ьте hit rate, latency, memory, evictions, errors и hot keys.'),
      ]),
    ],
    faq: [
      faq('What is cache stampede?', 'Что такое cache stampede?', 'Many callers miss the same key at once and overload the database or origin service.', 'Много callers одновременно miss-ят один key и перегружают database или origin service.'),
      faq('Can Redis be used as a database?', 'Можно ли использовать Redis как database?', 'Sometimes, but only with deliberate persistence, backup, memory, eviction, and data-loss decisions.', 'Иногда да, но только с deliberate решениями по persistence, backup, memory, eviction и data-loss.'),
      faq('How do you choose TTL?', 'Как выбрать TTL?', 'Based on freshness requirements, origin cost, update frequency, user risk, and memory pressure.', 'По freshness requirements, origin cost, update frequency, user risk и memory pressure.'),
    ],
  },
);
