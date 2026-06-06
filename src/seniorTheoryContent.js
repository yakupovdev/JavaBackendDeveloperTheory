const text = (en, ru) => ({ en, ru });

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

export const seniorInterviewTopics = [
  {
    id: 'jvm-jre-jdk',
    groupId: 'runtime',
    stage: 'Beginner',
    title: { en: 'JVM, JRE, JDK', ru: 'JVM, JRE, JDK' },
    intro: {
      en: 'JVM, JRE, and JDK are three layers of the Java platform: execution engine, runtime distribution, and developer toolkit.',
      ru: 'JVM, JRE и JDK - три слоя Java-платформы: механизм выполнения, runtime-дистрибутив и набор инструментов разработчика.',
    },
    deepDive: {
      en: 'JVM is the specification and implementation that executes bytecode, manages memory, verifies classes, runs the JIT compiler, and performs garbage collection. JRE is the runtime environment needed to run Java applications: JVM plus standard libraries and runtime files. JDK is the development kit: JRE-like runtime plus tools such as javac, jar, javadoc, jshell, jcmd, jmap, jstack, jlink, and keytool. In modern Java distributions the old separate end-user JRE packaging is less visible, but the conceptual difference remains crucial.',
      ru: 'JVM - это спецификация и реализация, которая исполняет bytecode, управляет памятью, проверяет классы, запускает JIT-компилятор и выполняет garbage collection. JRE - runtime environment, достаточный для запуска Java-приложений: JVM плюс стандартные библиотеки и runtime-файлы. JDK - development kit: runtime плюс инструменты javac, jar, javadoc, jshell, jcmd, jmap, jstack, jlink, keytool и другие. В современных Java-дистрибутивах отдельная JRE-упаковка менее заметна, но концептуальное различие обязательно понимать.',
    },
    mechanics: [
      mechanics('The JDK contains tools for building and diagnosing programs; the JRE contains what is needed to run them; the JVM is the engine inside the runtime.', 'JDK содержит инструменты для сборки и диагностики программ; JRE содержит необходимое для запуска; JVM - движок внутри runtime.'),
      mechanics('Bytecode is platform-independent, but JVM implementations are platform-specific native programs.', 'Bytecode платформо-независим, но реализации JVM - platform-specific native programs.'),
      mechanics('The Java standard library is part of the runtime contract: collections, concurrency, I/O, reflection, networking, security, and more.', 'Стандартная библиотека Java - часть runtime contract: collections, concurrency, I/O, reflection, networking, security и многое другое.'),
    ],
    diagram: `flowchart TB
JDK["JDK: tools + runtime"] --> tools["javac / jar / jcmd / jlink / jshell"]
JDK --> JRE["Runtime image / JRE concept"]
JRE --> libs["Java standard libraries"]
JRE --> JVM["JVM"]
JVM --> bytecode["Executes .class bytecode"]`,
    methods: [
      method('javac', 'Compiles .java source files into .class bytecode files.', 'Компилирует .java source files в .class bytecode files.'),
      method('java', 'Starts the JVM and launches a class, module, or jar.', 'Запускает JVM и class, module или jar.'),
      method('jar', 'Packages class files and resources into an archive.', 'Упаковывает class files и resources в archive.'),
      method('jcmd', 'Inspects and controls a running JVM process.', 'Инспектирует и управляет running JVM process.'),
    ],
    examples: [
      `javac src/main/java/com/example/App.java
java -cp src/main/java com.example.App

jar --create --file app.jar -C target/classes .
java -jar app.jar`,
    ],
    chapters: [
      chapter('JVM: execution engine', 'JVM: движок выполнения', 'The JVM is responsible for loading classes, verifying bytecode safety, interpreting or compiling bytecode, managing threads, memory, and GC.', 'JVM отвечает за загрузку классов, проверку безопасности bytecode, интерпретацию или компиляцию bytecode, управление threads, memory и GC.', [
        p('It has runtime memory areas: heap, stacks, metaspace, code cache, program counters, native areas.', 'У JVM есть runtime memory areas: heap, stacks, metaspace, code cache, program counters, native areas.'),
        p('It enforces type safety and access rules before code can run.', 'Она enforced type safety и access rules до выполнения кода.'),
        p('It can optimize hot code at runtime because it sees real execution profiles.', 'Она может optimize hot code в runtime, потому что видит реальные execution profiles.'),
      ]),
      chapter('JRE: runtime environment', 'JRE: среда выполнения', 'The JRE is the runtime package needed for executing Java programs. It includes the JVM and libraries, but not development tools like javac.', 'JRE - runtime package для выполнения Java-программ. Включает JVM и libraries, но не development tools вроде javac.', [
        p('If you only run an app, conceptually you need JRE/runtime image.', 'Если вы только запускаете app, концептуально нужен JRE/runtime image.'),
        p('If you compile, package, debug, profile, or generate docs, you need JDK tools.', 'Если вы compile, package, debug, profile или generate docs, нужны JDK tools.'),
        p('Modern Java often ships full JDKs or custom runtime images built with jlink instead of a separate public JRE download.', 'Modern Java часто поставляет full JDK или custom runtime images через jlink вместо отдельной public JRE.'),
      ]),
      chapter('JDK: developer toolkit', 'JDK: toolkit разработчика', 'The JDK is what backend developers install because it contains compilers, launchers, diagnostics, packaging, and security tools.', 'JDK устанавливают backend-разработчики, потому что он содержит compilers, launchers, diagnostics, packaging и security tools.', [
        p('javac creates bytecode; java launches the VM; jar packages artifacts.', 'javac создает bytecode; java запускает VM; jar packages artifacts.'),
        p('jstack, jmap, jcmd, jfr, and related tools help diagnose production JVMs.', 'jstack, jmap, jcmd, jfr и related tools помогают diagnose production JVMs.'),
        p('Build tools like Maven/Gradle orchestrate JDK tools but do not replace the JDK.', 'Build tools вроде Maven/Gradle orchestrate JDK tools, но не заменяют JDK.'),
      ]),
    ],
    faq: [
      faq('Can Java run without the JDK?', 'Может ли Java запускаться без JDK?', 'Yes, conceptually an application only needs a runtime image/JRE. Developers need the JDK to compile, package, and diagnose.', 'Да, концептуально приложению нужен только runtime image/JRE. Разработчику нужен JDK для compile, package и diagnosis.'),
      faq('Is JVM the same as JDK?', 'JVM и JDK - одно и то же?', 'No. JVM is the execution engine. JDK is the full developer kit that contains a JVM plus tools.', 'Нет. JVM - движок выполнения. JDK - полный developer kit, содержащий JVM и tools.'),
      faq('Why is bytecode portable?', 'Почему bytecode переносим?', 'The same .class format can be executed by JVM implementations built for different operating systems and CPUs.', 'Один и тот же .class format может исполняться JVM implementations для разных OS и CPU.'),
    ],
  },
  {
    id: 'java-compilation-classloading',
    groupId: 'runtime',
    stage: 'Beginner',
    title: { en: 'Compilation, Bytecode & Class Loading', ru: 'Компиляция, bytecode и class loading' },
    intro: {
      en: 'Java source code goes through compilation, bytecode verification, class loading, linking, initialization, interpretation, and JIT compilation.',
      ru: 'Java source code проходит compilation, bytecode verification, class loading, linking, initialization, interpretation и JIT compilation.',
    },
    deepDive: {
      en: 'The javac compiler translates .java files into .class files containing bytecode, constant pool data, fields, methods, descriptors, annotations, and debug metadata. At runtime the JVM loads classes lazily through classloaders, verifies bytecode, links symbolic references, initializes static state, and then executes bytecode through interpreter and JIT-compiled native code. This two-stage model is why Java is both portable and able to optimize at runtime.',
      ru: 'Компилятор javac переводит .java files в .class files, содержащие bytecode, constant pool, fields, methods, descriptors, annotations и debug metadata. В runtime JVM лениво загружает classes через classloaders, verifies bytecode, links symbolic references, initializes static state и затем исполняет bytecode интерпретатором и JIT-compiled native code. Эта двухступенчатая модель делает Java переносимой и одновременно способной optimize-иться в runtime.',
    },
    mechanics: [
      mechanics('javac checks syntax, types, generics, annotations, lambdas, and produces bytecode, not machine code.', 'javac проверяет syntax, types, generics, annotations, lambdas и производит bytecode, а не machine code.'),
      mechanics('The JVM loads classes on demand: a class may not be loaded until first active use.', 'JVM загружает classes on demand: class может не загрузиться до первого active use.'),
      mechanics('JIT compiles hot bytecode into native machine code after observing runtime behavior.', 'JIT компилирует hot bytecode в native machine code после наблюдения runtime behavior.'),
    ],
    diagram: `flowchart LR
java[".java source"] --> javac["javac"]
javac --> class[".class bytecode"]
class --> loader["ClassLoader"]
loader --> verify["Verify"]
verify --> link["Link: prepare + resolve"]
link --> init["Initialize static state"]
init --> interp["Interpreter"]
interp --> jit["JIT native code"]`,
    methods: [
      method('javac -d', 'Compiles sources and writes class files to an output directory.', 'Компилирует sources и пишет class files в output directory.'),
      method('javap -c', 'Disassembles bytecode so you can inspect JVM instructions.', 'Disassemble-ит bytecode, чтобы inspect JVM instructions.'),
      method('ClassLoader.loadClass()', 'Loads a class by name, typically using parent delegation.', 'Загружает class по name, обычно через parent delegation.'),
      method('static initializer', 'Runs class initialization code once per classloader.', 'Запускает class initialization code один раз на classloader.'),
    ],
    examples: [
      `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}

// javac Hello.java
// javap -c Hello`,
      `Compiled from "Hello.java"
public class Hello {
  public static void main(java.lang.String[]);
    Code:
       0: getstatic     #2
       3: ldc           #3
       5: invokevirtual #4
       8: return
}`,
    ],
    chapters: [
      chapter('What javac does', 'Что делает javac', 'javac is a static compiler: it turns source into JVM bytecode and catches compile-time errors.', 'javac - static compiler: превращает source в JVM bytecode и ловит compile-time errors.', [
        p('It resolves imports and classpath/module path types.', 'Он resolves imports и classpath/module path types.'),
        p('It performs type checking, overload resolution, generic checks, annotation processing, and desugaring of some language features.', 'Он выполняет type checking, overload resolution, generic checks, annotation processing и desugaring некоторых language features.'),
        p('It does not usually optimize like a C++ compiler because heavy optimization is delayed to JIT runtime.', 'Он обычно не optimize-ит как C++ compiler, потому что heavy optimization отложена до JIT runtime.'),
      ]),
      chapter('What is inside a .class file', 'Что внутри .class file', 'A .class file is a binary format understood by the JVM.', '.class file - binary format, понятный JVM.', [
        p('It contains magic number, version, constant pool, access flags, fields, methods, attributes, annotations, and bytecode instructions.', 'Он содержит magic number, version, constant pool, access flags, fields, methods, attributes, annotations и bytecode instructions.'),
        p('The constant pool stores symbolic references to classes, methods, fields, strings, and numeric constants.', 'Constant pool хранит symbolic references на classes, methods, fields, strings и numeric constants.'),
        p('Debug info can include line numbers and local variable tables if compiled with debug metadata.', 'Debug info может включать line numbers и local variable tables, если compiled с debug metadata.'),
      ]),
      chapter('Class loading phases', 'Фазы class loading', 'Loading is not just reading bytes. The JVM loads, verifies, prepares, resolves, and initializes.', 'Loading - не просто чтение bytes. JVM loads, verifies, prepares, resolves и initializes.', [
        p('Loading finds bytes and creates a Class object.', 'Loading находит bytes и создает Class object.'),
        p('Verification proves bytecode is structurally safe: no stack underflow, invalid casts, illegal access, or corrupted control flow.', 'Verification доказывает structural safety bytecode: no stack underflow, invalid casts, illegal access или corrupted control flow.'),
        p('Preparation allocates static fields with default values; initialization runs static initializers and explicit static field assignments.', 'Preparation allocates static fields default values; initialization запускает static initializers и explicit static field assignments.'),
      ]),
      chapter('Interpreter, JIT, and code cache', 'Interpreter, JIT и code cache', 'The JVM starts by interpreting bytecode, profiles execution, then JIT-compiles hot methods into native code stored in code cache.', 'JVM начинает с interpretation bytecode, профилирует execution, затем JIT-compiles hot methods в native code, stored in code cache.', [
        p('JIT can inline methods, remove locks, eliminate allocations, and optimize based on real branch/type profiles.', 'JIT может inline methods, remove locks, eliminate allocations и optimize по real branch/type profiles.'),
        p('If assumptions become invalid, JVM can deoptimize and return to interpreted or recompiled code.', 'Если assumptions invalid, JVM может deoptimize и вернуться к interpreted или recompiled code.'),
        p('This explains warmup: first requests can be slower than steady-state performance.', 'Это объясняет warmup: первые requests могут быть slower, чем steady-state performance.'),
      ]),
    ],
    faq: [
      faq('Does javac compile to machine code?', 'javac компилирует в machine code?', 'No. javac produces JVM bytecode. The JVM interpreter and JIT execute and optimize it at runtime.', 'Нет. javac производит JVM bytecode. JVM interpreter и JIT исполняют и optimize-ят его в runtime.'),
      faq('When does class initialization happen?', 'Когда происходит class initialization?', 'On active use: creating an instance, calling static method, reading/writing non-constant static field, reflection, or subclass initialization rules.', 'При active use: создание instance, static method call, read/write non-constant static field, reflection или subclass initialization rules.'),
      faq('Why can Java get faster after startup?', 'Почему Java может ускоряться после startup?', 'The JIT needs runtime profiles. Hot paths are compiled and optimized after the JVM observes enough executions.', 'JIT нужны runtime profiles. Hot paths compile/optimize-ятся после достаточного числа executions.'),
    ],
  },
  {
    id: 'async-basics-java',
    groupId: 'runtime',
    stage: 'Fundamentals',
    title: { en: 'Asynchronous Programming Basics', ru: 'Базовая асинхронность' },
    intro: {
      en: 'Asynchronous programming lets work continue without blocking the caller, but it introduces callbacks, futures, scheduling, cancellation, and error propagation complexity.',
      ru: 'Асинхронность позволяет продолжать работу без блокировки caller, но добавляет complexity: callbacks, futures, scheduling, cancellation и error propagation.',
    },
    deepDive: {
      en: 'Synchronous code blocks the current thread until a result is available. Asynchronous code represents a future result and usually runs work on another thread, event loop, or non-blocking I/O mechanism. In Java, common tools are Future, CompletableFuture, ExecutorService, virtual threads in modern Java, reactive libraries, and message queues. Senior understanding means knowing the difference between concurrency and asynchrony, avoiding blocking the wrong pool, propagating context, handling cancellation, timeouts, and failures.',
      ru: 'Synchronous code блокирует текущий thread до появления результата. Asynchronous code представляет будущий результат и обычно выполняет work на другом thread, event loop или non-blocking I/O mechanism. В Java common tools: Future, CompletableFuture, ExecutorService, virtual threads в modern Java, reactive libraries и message queues. Senior understanding - различать concurrency и asynchrony, не blocking wrong pool, propagating context, handling cancellation, timeouts и failures.',
    },
    mechanics: [
      mechanics('Async does not mean faster automatically; it improves resource usage when waiting dominates.', 'Async не означает автоматически faster; он улучшает resource usage, когда dominates waiting.'),
      mechanics('CompletableFuture chains run stages on either the completing thread or a chosen executor depending on method variant.', 'CompletableFuture chains выполняют stages либо на completing thread, либо на выбранном executor в зависимости от method variant.'),
      mechanics('Blocking inside a small async executor can starve all other tasks.', 'Blocking внутри маленького async executor может starve all other tasks.'),
    ],
    diagram: `sequenceDiagram
participant Caller
participant Executor
participant Task
Caller->>Executor: submit async work
Executor->>Task: run later/on another thread
Caller-->>Caller: continues without blocking
Task-->>Caller: completes Future with result/error`,
    methods: [
      method('CompletableFuture.supplyAsync()', 'Starts asynchronous computation and returns a future result.', 'Запускает asynchronous computation и возвращает future result.'),
      method('thenApply()', 'Transforms a successful result, often on the completing thread.', 'Transforms successful result, часто на completing thread.'),
      method('thenCompose()', 'Flattens dependent asynchronous operations.', 'Flatten-ит dependent asynchronous operations.'),
      method('exceptionally()', 'Recovers from failure by producing fallback value.', 'Recover-ится от failure через fallback value.'),
      method('orTimeout()', 'Completes future exceptionally if timeout expires.', 'Completes future exceptionally при timeout.'),
    ],
    examples: [
      `CompletableFuture<User> userFuture =
    CompletableFuture.supplyAsync(() -> userClient.load(userId), ioExecutor)
        .orTimeout(500, TimeUnit.MILLISECONDS)
        .exceptionally(error -> User.anonymous());

CompletableFuture<OrderSummary> summary =
    userFuture.thenCompose(user ->
        CompletableFuture.supplyAsync(() -> orders.loadFor(user.id()), ioExecutor)
            .thenApply(orders -> new OrderSummary(user, orders))
    );`,
    ],
    chapters: [
      chapter('Concurrency vs asynchrony', 'Concurrency vs asynchrony', 'Concurrency means multiple tasks are in progress. Asynchrony means the caller does not wait synchronously for completion.', 'Concurrency означает, что несколько tasks in progress. Asynchrony означает, что caller не ждет synchronously completion.', [
        p('You can have concurrency without async: multiple blocking threads.', 'Можно иметь concurrency без async: несколько blocking threads.'),
        p('You can have async on one thread with an event loop if work is non-blocking.', 'Можно иметь async на одном thread через event loop, если work non-blocking.'),
        p('Backend Java often mixes both: request threads, executor pools, futures, messaging, and non-blocking clients.', 'Backend Java часто смешивает оба: request threads, executor pools, futures, messaging и non-blocking clients.'),
      ]),
      chapter('CompletableFuture rules', 'Правила CompletableFuture', 'CompletableFuture is powerful because it models result, failure, composition, and callbacks.', 'CompletableFuture powerful, потому что моделирует result, failure, composition и callbacks.', [
        p('thenApply transforms a value; thenCompose chains another future; thenCombine joins independent futures.', 'thenApply transforms value; thenCompose chains another future; thenCombine joins independent futures.'),
        p('Async suffix methods use an executor; without executor they use common pool by default, which can be dangerous for blocking I/O.', 'Async suffix methods используют executor; без executor они используют common pool by default, что опасно для blocking I/O.'),
        p('Always design error path: exceptionally, handle, whenComplete, timeout, cancellation.', 'Всегда проектируйте error path: exceptionally, handle, whenComplete, timeout, cancellation.'),
      ]),
      chapter('Senior pitfalls', 'Senior pitfalls', 'Most async bugs come from wrong executor, lost errors, missing timeout, context loss, or accidental blocking.', 'Большинство async bugs идут от wrong executor, lost errors, missing timeout, context loss или accidental blocking.', [
        p('Logging/security/trace context may not automatically cross thread boundaries.', 'Logging/security/trace context может не переходить automatically через thread boundaries.'),
        p('join() and get() block; using them inside async chains can destroy the benefit.', 'join() и get() block; использование внутри async chains может destroy benefit.'),
        p('Async code still needs backpressure. Unlimited tasks can overload DB, HTTP dependencies, or memory.', 'Async code все равно требует backpressure. Unlimited tasks могут overload DB, HTTP dependencies или memory.'),
      ]),
    ],
    faq: [
      faq('Is async the same as multithreading?', 'Async и multithreading - одно и то же?', 'No. Async is about not waiting synchronously. It may use threads, event loops, non-blocking I/O, or queues.', 'Нет. Async про отсутствие synchronous waiting. Он может использовать threads, event loops, non-blocking I/O или queues.'),
      faq('Why is common ForkJoinPool risky?', 'Почему common ForkJoinPool рискован?', 'Blocking tasks can starve unrelated CompletableFuture or parallel stream work sharing the same pool.', 'Blocking tasks могут starve unrelated CompletableFuture или parallel stream work, разделяющие тот же pool.'),
      faq('What must every async call have in production?', 'Что должно быть у каждого async call в production?', 'Timeout, error handling, executor ownership, cancellation/backpressure story, and observability.', 'Timeout, error handling, executor ownership, cancellation/backpressure story и observability.'),
    ],
  },
  {
    id: 'spring-mvc-deep',
    groupId: 'backend',
    stage: 'Fundamentals',
    title: { en: 'Spring MVC Deep Dive', ru: 'Spring MVC подробно' },
    intro: {
      en: 'Spring MVC maps HTTP requests to controller methods through DispatcherServlet, handler mappings, adapters, argument resolvers, validation, message converters, and exception handlers.',
      ru: 'Spring MVC связывает HTTP requests с controller methods через DispatcherServlet, handler mappings, adapters, argument resolvers, validation, message converters и exception handlers.',
    },
    deepDive: {
      en: 'Spring MVC is built around the Front Controller pattern. DispatcherServlet receives every request, asks HandlerMapping to find the matching handler, uses HandlerAdapter to invoke it, resolves method arguments, validates input, converts request/response bodies through HttpMessageConverter, and maps exceptions through HandlerExceptionResolver or @ControllerAdvice. Understanding this flow explains why annotations like @RequestBody, @PathVariable, @Valid, @ExceptionHandler, and @ResponseStatus work.',
      ru: 'Spring MVC построен вокруг Front Controller pattern. DispatcherServlet принимает request, спрашивает HandlerMapping о matching handler, использует HandlerAdapter для invoke, resolves method arguments, validates input, converts request/response bodies через HttpMessageConverter и maps exceptions через HandlerExceptionResolver или @ControllerAdvice. Понимание этого flow объясняет работу @RequestBody, @PathVariable, @Valid, @ExceptionHandler и @ResponseStatus.',
    },
    mechanics: [
      mechanics('DispatcherServlet is the central entry point for Spring MVC requests.', 'DispatcherServlet - central entry point для Spring MVC requests.'),
      mechanics('HandlerMapping finds which controller method should handle the request.', 'HandlerMapping находит, какой controller method должен обработать request.'),
      mechanics('HttpMessageConverter converts JSON/XML/text bodies to Java objects and back.', 'HttpMessageConverter converts JSON/XML/text bodies в Java objects и обратно.'),
    ],
    diagram: `sequenceDiagram
participant Client
participant DispatcherServlet
participant HandlerMapping
participant HandlerAdapter
participant Controller
participant Converter
Client->>DispatcherServlet: HTTP request
DispatcherServlet->>HandlerMapping: find handler
DispatcherServlet->>HandlerAdapter: invoke handler
HandlerAdapter->>Converter: read @RequestBody
HandlerAdapter->>Controller: call method
Controller-->>HandlerAdapter: return DTO
HandlerAdapter->>Converter: write response
DispatcherServlet-->>Client: HTTP response`,
    methods: [
      method('@RestController', 'Combines @Controller and @ResponseBody for REST endpoints.', 'Объединяет @Controller и @ResponseBody для REST endpoints.'),
      method('@RequestMapping', 'Maps HTTP method/path/headers/params to handlers.', 'Maps HTTP method/path/headers/params к handlers.'),
      method('@RequestBody', 'Binds request body through message converters.', 'Binds request body через message converters.'),
      method('@Valid', 'Triggers bean validation on method arguments.', 'Triggers bean validation на method arguments.'),
      method('@ControllerAdvice', 'Centralizes exception handling and binding advice.', 'Centralizes exception handling и binding advice.'),
    ],
    examples: [
      `@RestController
@RequestMapping("/api/orders")
class OrderController {
    private final OrderService service;

    @PostMapping
    ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest request) {
        Order order = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(OrderResponse.from(order));
    }

    @GetMapping("/{id}")
    OrderResponse get(@PathVariable long id) {
        return OrderResponse.from(service.get(id));
    }
}`,
      `@ControllerAdvice
class ApiExceptionHandler {
    @ExceptionHandler(OrderNotFoundException.class)
    ResponseEntity<ApiError> notFound(OrderNotFoundException ex) {
        return ResponseEntity.status(404).body(new ApiError("ORDER_NOT_FOUND", ex.getMessage()));
    }
}`,
    ],
    chapters: [
      chapter('DispatcherServlet flow', 'Flow DispatcherServlet', 'DispatcherServlet is the front controller. It coordinates routing, invocation, conversion, view/response rendering, and exception handling.', 'DispatcherServlet - front controller. Он координирует routing, invocation, conversion, view/response rendering и exception handling.', [
        p('Request enters servlet container, passes filters, then reaches DispatcherServlet.', 'Request входит в servlet container, проходит filters, затем попадает в DispatcherServlet.'),
        p('HandlerMapping picks handler based on path, method, params, headers, consumes, and produces.', 'HandlerMapping выбирает handler по path, method, params, headers, consumes и produces.'),
        p('HandlerAdapter knows how to call the selected handler method.', 'HandlerAdapter знает, как вызвать selected handler method.'),
      ]),
      chapter('Binding, validation, conversion', 'Binding, validation, conversion', 'Spring MVC converts untyped HTTP data into typed Java parameters.', 'Spring MVC превращает untyped HTTP data в typed Java parameters.', [
        p('@PathVariable comes from URI template; @RequestParam from query/form params; @RequestBody from body.', '@PathVariable приходит из URI template; @RequestParam из query/form params; @RequestBody из body.'),
        p('Jackson is commonly used by MappingJackson2HttpMessageConverter for JSON.', 'Jackson обычно используется MappingJackson2HttpMessageConverter для JSON.'),
        p('@Valid triggers Bean Validation; validation errors should be mapped to stable API errors.', '@Valid triggers Bean Validation; validation errors должны map-иться в stable API errors.'),
      ]),
      chapter('Exception and response design', 'Exception и response design', 'A senior API does not leak Java exceptions directly to clients.', 'Senior API не leak-ит Java exceptions directly clients.', [
        p('Use @ControllerAdvice for central error mapping.', 'Используйте @ControllerAdvice для central error mapping.'),
        p('Return consistent error shape: code, message, details, trace/correlation id.', 'Возвращайте consistent error shape: code, message, details, trace/correlation id.'),
        p('Separate transport validation from business rule failures.', 'Отделяйте transport validation от business rule failures.'),
      ]),
    ],
    faq: [
      faq('What is DispatcherServlet?', 'Что такое DispatcherServlet?', 'The central Spring MVC servlet that receives requests and coordinates handler lookup, invocation, conversion, and exception handling.', 'Центральный servlet Spring MVC, который принимает requests и координирует handler lookup, invocation, conversion и exception handling.'),
      faq('How does @RequestBody become a Java object?', 'Как @RequestBody становится Java object?', 'Spring selects an HttpMessageConverter based on Content-Type and target type, often Jackson for JSON.', 'Spring выбирает HttpMessageConverter по Content-Type и target type, часто Jackson для JSON.'),
      faq('Where should API errors be handled?', 'Где обрабатывать API errors?', 'Centrally through @ControllerAdvice plus specific exception types and stable error DTOs.', 'Центрально через @ControllerAdvice плюс specific exception types и stable error DTOs.'),
    ],
  },
  {
    id: 'http-https-rest-soap-formats',
    groupId: 'backend',
    stage: 'Fundamentals',
    title: { en: 'HTTP, HTTPS, REST, SOAP, XML, JSON, JWT', ru: 'HTTP, HTTPS, REST, SOAP, XML, JSON, JWT' },
    intro: {
      en: 'Backend developers must understand web protocols and data formats deeply enough to design secure, compatible, observable APIs.',
      ru: 'Backend-разработчик должен глубоко понимать web protocols и data formats, чтобы проектировать secure, compatible, observable APIs.',
    },
    deepDive: {
      en: 'HTTP is an application protocol built around requests and responses. HTTPS is HTTP protected by TLS: encryption, integrity, and server authentication. REST is an architectural style using resources, representations, HTTP methods, status codes, cache semantics, and statelessness. SOAP is a protocol with XML envelopes, WSDL contracts, and WS-* standards. JSON is lightweight and common for REST APIs; XML is stricter, namespaced, and common in enterprise/SOAP integrations. JWT is a compact signed token format often used for stateless authentication and authorization claims.',
      ru: 'HTTP - application protocol вокруг requests и responses. HTTPS - HTTP, защищенный TLS: encryption, integrity и server authentication. REST - architectural style: resources, representations, HTTP methods, status codes, cache semantics и statelessness. SOAP - protocol с XML envelopes, WSDL contracts и WS-* standards. JSON легковесен и common для REST APIs; XML строже, namespaced и common в enterprise/SOAP integrations. JWT - compact signed token format, часто используемый для stateless authentication и authorization claims.',
    },
    mechanics: [
      mechanics('HTTP is plaintext unless protected by TLS; HTTPS prevents passive reading and tampering in transit.', 'HTTP plaintext без TLS; HTTPS предотвращает passive reading и tampering in transit.'),
      mechanics('REST uses HTTP semantics; SOAP defines its own XML-based messaging protocol often over HTTP.', 'REST использует HTTP semantics; SOAP определяет собственный XML-based messaging protocol, часто over HTTP.'),
      mechanics('JWT is signed by default, not encrypted; claims are readable unless JWE/encryption is used.', 'JWT signed by default, не encrypted; claims readable, если не используется JWE/encryption.'),
    ],
    diagram: `flowchart TB
client["Client"] --> tls["TLS handshake"]
tls --> http["HTTP request"]
http --> api["API endpoint"]
api --> json["JSON response"]
api --> xml["XML/SOAP response"]
auth["JWT bearer token"] --> http`,
    methods: [
      method('GET/POST/PUT/PATCH/DELETE', 'HTTP methods with different semantics for safe/idempotent operations.', 'HTTP methods с разной semantics для safe/idempotent operations.'),
      method('Status codes', 'Communicate result category and failure meaning.', 'Передают result category и failure meaning.'),
      method('TLS', 'Protects transport with encryption, integrity, and certificate-based identity.', 'Защищает transport encryption, integrity и certificate-based identity.'),
      method('WSDL', 'SOAP contract description for operations and messages.', 'SOAP contract description для operations и messages.'),
      method('JWT claims', 'Token fields such as sub, iss, aud, exp, scopes/roles.', 'Token fields: sub, iss, aud, exp, scopes/roles.'),
    ],
    examples: [
      `GET /api/orders/42 HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGciOi...`,
      `{
  "id": 42,
  "status": "PAID",
  "total": "199.90"
}`,
      `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetOrderRequest>
      <id>42</id>
    </GetOrderRequest>
  </soap:Body>
</soap:Envelope>`,
    ],
    chapters: [
      chapter('HTTP fundamentals', 'Основы HTTP', 'HTTP request contains method, path, query, headers, and optional body. Response contains status, headers, and optional body.', 'HTTP request содержит method, path, query, headers и optional body. Response содержит status, headers и optional body.', [
        p('GET should be safe; PUT and DELETE should be idempotent; POST is not guaranteed idempotent.', 'GET должен быть safe; PUT и DELETE idempotent; POST не guaranteed idempotent.'),
        p('Headers carry metadata: Content-Type, Accept, Authorization, Cache-Control, ETag, correlation IDs.', 'Headers несут metadata: Content-Type, Accept, Authorization, Cache-Control, ETag, correlation IDs.'),
        p('Status codes are part of contract: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500.', 'Status codes - часть contract: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500.'),
      ]),
      chapter('HTTPS and TLS', 'HTTPS и TLS', 'HTTPS is HTTP over TLS. TLS gives encryption, integrity, and endpoint authentication.', 'HTTPS - HTTP over TLS. TLS дает encryption, integrity и endpoint authentication.', [
        p('Server certificate proves the server identity to the client if trusted chain validation passes.', 'Server certificate доказывает identity server client-у, если trusted chain validation passes.'),
        p('TLS protects data in transit, not data at rest or application-level authorization.', 'TLS защищает data in transit, но не data at rest и не application-level authorization.'),
        p('mTLS can authenticate both client and server using certificates.', 'mTLS может authenticate both client and server через certificates.'),
      ]),
      chapter('REST vs SOAP', 'REST vs SOAP', 'REST is an architectural style; SOAP is a formal XML messaging protocol.', 'REST - architectural style; SOAP - formal XML messaging protocol.', [
        p('REST is usually simpler, resource-oriented, JSON-friendly, and uses HTTP semantics directly.', 'REST обычно проще, resource-oriented, JSON-friendly и использует HTTP semantics directly.'),
        p('SOAP has strict contracts, XML envelopes, WSDL, and enterprise standards for security/reliability.', 'SOAP имеет strict contracts, XML envelopes, WSDL и enterprise standards для security/reliability.'),
        p('Choose based on ecosystem, contract needs, tooling, legacy systems, and interoperability requirements.', 'Выбирайте по ecosystem, contract needs, tooling, legacy systems и interoperability requirements.'),
      ]),
      chapter('JSON, XML, and JWT', 'JSON, XML и JWT', 'Formats are contracts. Their shape, validation, compatibility, and security implications matter.', 'Formats - contracts. Их shape, validation, compatibility и security implications важны.', [
        p('JSON is compact and natural for web clients, but lacks built-in schema unless you add JSON Schema/OpenAPI contracts.', 'JSON compact и natural для web clients, но не имеет built-in schema без JSON Schema/OpenAPI contracts.'),
        p('XML supports namespaces, schemas, attributes, mixed content, and is common in SOAP/enterprise integrations.', 'XML supports namespaces, schemas, attributes, mixed content и common в SOAP/enterprise integrations.'),
        p('JWT should have issuer, audience, expiration, signature validation, and careful claim design.', 'JWT должен иметь issuer, audience, expiration, signature validation и careful claim design.'),
      ]),
    ],
    faq: [
      faq('Is REST a protocol?', 'REST - это protocol?', 'No. REST is an architectural style. HTTP is the protocol commonly used to implement REST APIs.', 'Нет. REST - architectural style. HTTP - protocol, часто используемый для REST APIs.'),
      faq('Is JWT encrypted?', 'JWT encrypted?', 'Not by default. JWS tokens are signed and readable. Use JWE if encryption is required.', 'Не по умолчанию. JWS tokens signed и readable. Используйте JWE, если нужна encryption.'),
      faq('What does HTTPS protect?', 'Что защищает HTTPS?', 'It protects data in transit from eavesdropping and tampering and authenticates the server certificate chain.', 'Он защищает data in transit от eavesdropping/tampering и authenticates server certificate chain.'),
    ],
  },
  {
    id: 'postgresql-sql-senior',
    groupId: 'backend',
    stage: 'Specialization',
    title: { en: 'PostgreSQL & SQL Senior Deep Dive', ru: 'PostgreSQL и SQL senior deep dive' },
    intro: {
      en: 'PostgreSQL knowledge for senior Java backend work: SQL language groups, schema design, indexes, MVCC, WAL, locks, transactions, isolation, migrations, performance, and Spring integration.',
      ru: 'PostgreSQL для senior Java backend: группы SQL, проектирование схемы, индексы, MVCC, WAL, locks, transactions, isolation, migrations, performance и интеграция со Spring.',
    },
    deepDive: {
      en: 'A senior developer treats PostgreSQL as an execution engine and consistency boundary, not as a passive data dump. PostgreSQL parses SQL, rewrites it, chooses a plan from statistics, reads pages through shared buffers, protects concurrent work with MVCC and locks, records changes in WAL, and makes data durable on commit. Application correctness depends on constraints, transaction boundaries, isolation level, index design, migration strategy, and retry policy. Spring does not invent database transactions: @Transactional asks a PlatformTransactionManager to configure a JDBC connection, and PostgreSQL provides the real isolation and locking behavior.',
      ru: 'Senior-разработчик воспринимает PostgreSQL как execution engine и consistency boundary, а не как пассивное хранилище. PostgreSQL парсит SQL, rewrite-ит запрос, выбирает plan по statistics, читает pages через shared buffers, защищает конкурирующую работу через MVCC и locks, пишет изменения в WAL и делает данные durable на commit. Корректность приложения зависит от constraints, transaction boundaries, isolation level, index design, migration strategy и retry policy. Spring не изобретает транзакции: @Transactional просит PlatformTransactionManager настроить JDBC connection, а реальное поведение isolation и locking дает PostgreSQL.',
    },
    mechanics: [
      mechanics('PostgreSQL uses MVCC: readers usually do not block writers, and writers usually do not block readers because each statement/transaction sees a snapshot.', 'PostgreSQL использует MVCC: readers обычно не блокируют writers, а writers обычно не блокируют readers, потому что statement/transaction видит snapshot.'),
      mechanics('Every UPDATE creates a new row version and leaves an old version until VACUUM can remove it.', 'Каждый UPDATE создает новую версию строки и оставляет старую версию, пока VACUUM не сможет ее убрать.'),
      mechanics('Commit durability is based on WAL: changes are logged before data pages must be flushed.', 'Durability commit основана на WAL: changes логируются до того, как data pages обязаны попасть на диск.'),
      mechanics('Spring isolation = DEFAULT means use the database default; for PostgreSQL the default is READ COMMITTED.', 'Spring isolation = DEFAULT означает использовать default database; для PostgreSQL default - READ COMMITTED.'),
      mechanics('PostgreSQL READ UNCOMMITTED behaves as READ COMMITTED, so dirty reads are not actually allowed.', 'PostgreSQL READ UNCOMMITTED ведет себя как READ COMMITTED, поэтому настоящие dirty reads не допускаются.'),
    ],
    diagram: `flowchart TB
client["Java app / JDBC pool"] --> parser["SQL parser + rewriter"]
parser --> planner["Planner + statistics"]
planner --> executor["Executor"]
executor --> locks["Locks + MVCC snapshots"]
executor --> buffers["Shared buffers"]
buffers --> pages["Table and index pages"]
executor --> wal["WAL records"]
wal --> commit["COMMIT durability"]
vacuum["VACUUM / autovacuum"] --> pages`,
    methods: [
      method('CREATE TABLE', 'DDL command that defines table structure, columns, constraints, defaults, and identity strategy.', 'DDL-команда, которая задает структуру таблицы, columns, constraints, defaults и identity strategy.'),
      method('ALTER TABLE', 'DDL command for evolving schema; can take strong locks and must be planned carefully in production.', 'DDL-команда для изменения schema; может брать сильные locks и требует аккуратного production-плана.'),
      method('CREATE INDEX CONCURRENTLY', 'Builds an index with less write blocking, but cannot run inside a transaction block.', 'Строит index с меньшей блокировкой writes, но не может выполняться внутри transaction block.'),
      method('EXPLAIN (ANALYZE, BUFFERS)', 'Shows actual query execution, timing, row estimates, and buffer usage.', 'Показывает реальное выполнение query, timing, row estimates и buffer usage.'),
      method('SELECT ... FOR UPDATE', 'Locks selected rows for update until transaction end.', 'Блокирует выбранные rows для update до конца transaction.'),
      method('INSERT ... ON CONFLICT', 'PostgreSQL upsert for insert-or-update conflict handling.', 'PostgreSQL upsert для insert-or-update conflict handling.'),
      method('VACUUM / ANALYZE', 'Cleans dead tuples and refreshes optimizer statistics.', 'Очищает dead tuples и обновляет optimizer statistics.'),
      method('@Transactional(isolation = ...)', 'Spring annotation that maps desired isolation to the JDBC connection when a transaction starts.', 'Spring-аннотация, которая при старте transaction маппит нужный isolation на JDBC connection.'),
    ],
    examples: [
      `-- DDL: schema with constraints, not just columns.
create table app_user (
    id bigint generated always as identity primary key,
    email text not null,
    status text not null default 'ACTIVE',
    balance numeric(19, 2) not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint uq_app_user_email unique (email),
    constraint ck_app_user_status check (status in ('ACTIVE', 'BLOCKED', 'DELETED')),
    constraint ck_app_user_balance_non_negative check (balance >= 0)
);`,
      `-- Indexes for real access patterns.
create index concurrently idx_order_user_created
    on customer_order (user_id, created_at desc)
    include (status, total);

create unique index concurrently uq_active_email
    on app_user (lower(email))
    where status <> 'DELETED';

create index concurrently idx_audit_payload_gin
    on audit_log using gin (payload jsonb_path_ops);`,
      `-- Explain the query you actually run.
explain (analyze, buffers, verbose)
select id, status, total
from customer_order
where user_id = 42
order by created_at desc
limit 20;`,
      `-- Atomic upsert.
insert into inventory_item (sku, quantity)
values ('BOOK-1', 10)
on conflict (sku)
do update set
    quantity = inventory_item.quantity + excluded.quantity,
    updated_at = now()
returning id, sku, quantity;`,
      `-- Worker queue pattern with row locking.
begin;

select id
from outbox_event
where status = 'NEW'
order by created_at
for update skip locked
limit 50;

update outbox_event
set status = 'PROCESSING'
where id = any(:ids);

commit;`,
      `@Service
class PaymentService {
    @Transactional(
        isolation = Isolation.READ_COMMITTED,
        timeout = 3
    )
    public void capture(long paymentId) {
        Payment payment = payments.findById(paymentId).orElseThrow();
        payment.capture();
    }

    @Transactional(
        isolation = Isolation.SERIALIZABLE,
        rollbackFor = BusinessCheckedException.class
    )
    public void closeAccountingPeriod(long periodId) throws BusinessCheckedException {
        // must be retried by caller on serialization failure
        ledger.closePeriod(periodId);
    }
}`,
      `-- Production-safe migration sketch.
-- 1. Expand: nullable column, no heavy rewrite.
alter table app_user add column phone text;

-- 2. Backfill in small batches from application/job.
update app_user
set phone = ''
where phone is null
  and id between 1 and 10000;

-- 3. Add constraint without blocking validation work.
alter table app_user
    add constraint ck_phone_not_null check (phone is not null) not valid;

alter table app_user validate constraint ck_phone_not_null;`,
    ],
    chapters: [
      chapter('SQL command groups: DDL, DML, DQL, DCL, TCL', 'Группы SQL: DDL, DML, DQL, DCL, TCL', 'SQL is not one kind of command. Different groups affect schema, data, permissions, and transactions.', 'SQL - это не один тип команд. Разные группы влияют на schema, data, permissions и transactions.', [
        p('DDL: CREATE, ALTER, DROP, TRUNCATE. Defines and changes database objects: tables, indexes, schemas, views, constraints, functions.', 'DDL: CREATE, ALTER, DROP, TRUNCATE. Определяет и меняет database objects: tables, indexes, schemas, views, constraints, functions.'),
        p('DML: INSERT, UPDATE, DELETE, MERGE. Changes rows and participates in transactions.', 'DML: INSERT, UPDATE, DELETE, MERGE. Меняет rows и участвует в transactions.'),
        p('DQL: SELECT. Reads data, but in PostgreSQL SELECT can also lock rows with FOR UPDATE/FOR SHARE.', 'DQL: SELECT. Читает data, но в PostgreSQL SELECT также может lock-ить rows через FOR UPDATE/FOR SHARE.'),
        p('DCL: GRANT, REVOKE. Controls permissions and should follow least privilege.', 'DCL: GRANT, REVOKE. Управляет permissions и должен следовать least privilege.'),
        p('TCL: BEGIN, COMMIT, ROLLBACK, SAVEPOINT. Controls transaction boundaries explicitly.', 'TCL: BEGIN, COMMIT, ROLLBACK, SAVEPOINT. Явно управляет transaction boundaries.'),
      ], [
        `begin;

insert into app_user(email) values ('a@site.com');
savepoint before_order;

insert into customer_order(user_id, total) values (1, 100.00);
rollback to savepoint before_order;

commit;`,
      ]),
      chapter('PostgreSQL architecture under the hood', 'PostgreSQL под капотом', 'PostgreSQL is a process-based database with shared memory, WAL, background workers, and per-connection backends.', 'PostgreSQL - process-based database с shared memory, WAL, background workers и backend process на connection.', [
        p('Client connections are handled by backend processes. A connection pool is important because each connection has memory and process cost.', 'Client connections обслуживаются backend processes. Connection pool важен, потому что каждое connection имеет memory и process cost.'),
        p('Shared buffers cache table and index pages inside PostgreSQL. The OS page cache also matters.', 'Shared buffers кешируют table и index pages внутри PostgreSQL. OS page cache тоже важен.'),
        p('WAL records changes before data pages are flushed, enabling crash recovery and replication.', 'WAL записывает changes до flush data pages, обеспечивая crash recovery и replication.'),
        p('Background writer, checkpointer, autovacuum, and WAL writer affect latency and cleanup.', 'Background writer, checkpointer, autovacuum и WAL writer влияют на latency и cleanup.'),
      ]),
      chapter('DDL and schema design best practices', 'DDL и лучшие практики схемы', 'DDL should encode invariants and evolve safely. A senior schema makes invalid states hard or impossible.', 'DDL должен кодировать invariants и безопасно развиваться. Senior schema делает invalid states сложными или невозможными.', [
        p('Use NOT NULL for required fields. Nullable columns should mean a real third state, not developer uncertainty.', 'Используйте NOT NULL для required fields. Nullable columns должны означать реальное третье состояние, а не неопределенность разработчика.'),
        p('Use UNIQUE for business uniqueness. Application-level unique checks race under concurrency.', 'Используйте UNIQUE для business uniqueness. Application-level unique checks проигрывают при concurrency.'),
        p('Use CHECK for local row rules: positive amount, allowed status, valid date range.', 'Используйте CHECK для local row rules: positive amount, allowed status, valid date range.'),
        p('Use FOREIGN KEY when referential integrity must be protected across all writers, not only one service.', 'Используйте FOREIGN KEY, когда referential integrity должна защищаться для всех writers, а не только одного service.'),
        p('Prefer timestamptz for moments in time. Store business local dates separately when the domain needs them.', 'Предпочитайте timestamptz для моментов времени. Business local dates храните отдельно, когда домену это нужно.'),
        p('Avoid money for most application logic; numeric with explicit scale is usually clearer.', 'Избегайте money для большинства application logic; numeric с явным scale обычно понятнее.'),
      ]),
      chapter('Data types senior choices', 'Выбор типов данных', 'Column types are part of the domain contract and performance model.', 'Типы columns - часть domain contract и performance model.', [
        p('bigint identity is simple and index-friendly. UUID is useful for distributed ID generation and public identifiers, but has larger indexes.', 'bigint identity прост и index-friendly. UUID полезен для distributed ID generation и public identifiers, но увеличивает indexes.'),
        p('text is usually fine in PostgreSQL. varchar(n) is useful only when the length is a real domain rule.', 'text обычно нормален в PostgreSQL. varchar(n) полезен только если length - реальное domain rule.'),
        p('jsonb is useful for flexible attributes and integration payloads, but not a replacement for relational modeling.', 'jsonb полезен для flexible attributes и integration payloads, но не заменяет relational modeling.'),
        p('Enums are convenient but harder to evolve in migrations than lookup tables or checked text in some systems.', 'Enums удобны, но иногда сложнее развиваются migrations, чем lookup tables или checked text.'),
        p('Arrays can be useful for small contained values, but many-to-many relations usually deserve a join table.', 'Arrays полезны для small contained values, но many-to-many relations обычно требуют join table.'),
      ]),
      chapter('MVCC: why readers and writers coexist', 'MVCC: почему readers и writers сосуществуют', 'PostgreSQL avoids many read/write blocks by storing multiple row versions and giving transactions snapshots.', 'PostgreSQL избегает многих read/write blocks через multiple row versions и snapshots для transactions.', [
        p('A row version has visibility metadata. A transaction sees only versions visible to its snapshot.', 'Row version имеет visibility metadata. Transaction видит только versions, visible для ее snapshot.'),
        p('UPDATE is internally closer to insert new version plus mark old version obsolete.', 'UPDATE внутренне ближе к insert new version плюс mark old version obsolete.'),
        p('DELETE marks a version as deleted; space is reclaimed later by VACUUM.', 'DELETE помечает version deleted; место позже reclaim-ит VACUUM.'),
        p('Long transactions keep old snapshots alive, preventing cleanup and causing table/index bloat.', 'Long transactions держат old snapshots alive, мешают cleanup и вызывают table/index bloat.'),
      ]),
      chapter('Transactions and ACID in practice', 'Transactions и ACID на практике', 'A transaction is a business-consistency boundary backed by database mechanisms.', 'Transaction - business-consistency boundary, подкрепленный database mechanisms.', [
        p('Atomicity: all statements commit or roll back together. This protects multi-row invariants.', 'Atomicity: все statements commit или roll back вместе. Это защищает multi-row invariants.'),
        p('Consistency: constraints and transaction logic move the database from one valid state to another.', 'Consistency: constraints и transaction logic переводят database из одного valid state в другой.'),
        p('Isolation: concurrent transactions observe each other according to isolation level and locks.', 'Isolation: concurrent transactions видят друг друга согласно isolation level и locks.'),
        p('Durability: after commit, WAL and fsync policy determine crash safety guarantees.', 'Durability: после commit WAL и fsync policy определяют crash safety guarantees.'),
        p('Keep transactions short. Do not wait for remote HTTP, user input, or long CPU work while holding DB locks.', 'Держите transactions short. Не ждите remote HTTP, user input или long CPU work, пока держите DB locks.'),
      ]),
      chapter('Isolation levels in PostgreSQL', 'Уровни isolation в PostgreSQL', 'Isolation controls anomalies. PostgreSQL implements the SQL names with PostgreSQL-specific behavior.', 'Isolation управляет anomalies. PostgreSQL реализует SQL-названия со своим поведением.', [
        p('READ COMMITTED: default. Every statement sees a fresh committed snapshot. Non-repeatable reads and phantoms are possible.', 'READ COMMITTED: default. Каждый statement видит свежий committed snapshot. Non-repeatable reads и phantoms возможны.'),
        p('READ UNCOMMITTED: accepted syntax, but PostgreSQL treats it as READ COMMITTED. Dirty reads are still not allowed.', 'READ UNCOMMITTED: синтаксис принимается, но PostgreSQL treats it as READ COMMITTED. Dirty reads все равно не допускаются.'),
        p('REPEATABLE READ: one transaction snapshot. It prevents non-repeatable reads and ordinary phantom reads in PostgreSQL, but write skew can still happen.', 'REPEATABLE READ: один snapshot на transaction. В PostgreSQL предотвращает non-repeatable reads и обычные phantom reads, но write skew все еще возможен.'),
        p('SERIALIZABLE: strongest level. PostgreSQL uses Serializable Snapshot Isolation and may abort transactions with serialization failure, so retry is required.', 'SERIALIZABLE: strongest level. PostgreSQL использует Serializable Snapshot Isolation и может abort-ить transactions с serialization failure, поэтому нужен retry.'),
        p('Higher isolation is not always better. It can reduce throughput, increase conflicts, and force retry logic.', 'Higher isolation не всегда лучше. Он может снижать throughput, увеличивать conflicts и требовать retry logic.'),
      ], [
        `-- Two transactions at READ COMMITTED can observe different values
-- between statements because each statement gets a new snapshot.
begin isolation level read committed;

select balance from account where id = 1;
-- another transaction commits an update here
select balance from account where id = 1;

commit;`,
      ]),
      chapter('Spring @Transactional and PostgreSQL isolation', 'Spring @Transactional и PostgreSQL isolation', 'Spring configures transactions through a transaction manager. PostgreSQL executes the real isolation behavior.', 'Spring настраивает transactions через transaction manager. PostgreSQL исполняет реальное isolation behavior.', [
        p('Isolation.DEFAULT in Spring means no explicit isolation override. With PostgreSQL this usually becomes READ COMMITTED.', 'Isolation.DEFAULT в Spring означает no explicit isolation override. С PostgreSQL это обычно READ COMMITTED.'),
        p('Isolation.READ_UNCOMMITTED maps to JDBC level, but PostgreSQL behaves like READ COMMITTED.', 'Isolation.READ_UNCOMMITTED маппится на JDBC level, но PostgreSQL ведет себя как READ COMMITTED.'),
        p('Isolation.REPEATABLE_READ is useful for stable multi-statement reads, reports, and logic that must not see changing snapshots.', 'Isolation.REPEATABLE_READ полезен для stable multi-statement reads, reports и logic, которая не должна видеть changing snapshots.'),
        p('Isolation.SERIALIZABLE is useful for critical invariants when explicit locks are hard, but every caller must be ready to retry serialization failures.', 'Isolation.SERIALIZABLE полезен для critical invariants, когда explicit locks сложны, но каждый caller должен быть готов retry-ить serialization failures.'),
        p('readOnly = true communicates intent and can adjust flush behavior in ORM, but it is not a permission system and does not replace a read-only database user.', 'readOnly = true communicates intent и может менять flush behavior в ORM, но это не permission system и не замена read-only database user.'),
      ], [
        `@Transactional(readOnly = true)
public OrderReport loadReport(long userId) {
    return reports.loadForUser(userId);
}

@Retryable(
    retryFor = CannotSerializeTransactionException.class,
    maxAttempts = 3
)
@Transactional(isolation = Isolation.SERIALIZABLE)
public void reserveUniqueResource(long resourceId, long userId) {
    reservations.reserve(resourceId, userId);
}`,
      ]),
      chapter('Propagation trade-offs in Spring', 'Propagation в Spring: плюсы и минусы', 'Propagation defines whether a method joins, creates, suspends, or requires a transaction.', 'Propagation определяет, join-ит ли method transaction, создает новую, suspends или требует существующую.', [
        p('REQUIRED is the default and usually correct for service use cases. It joins existing transaction or creates one.', 'REQUIRED - default и обычно правильный для service use cases. Он joins existing transaction или создает новую.'),
        p('REQUIRES_NEW commits or rolls back independently. Good for audit/outbox attempts, but can break consistency if abused and consumes another connection.', 'REQUIRES_NEW commits/rollbacks independently. Полезен для audit/outbox attempts, но может ломать consistency при abuse и берет еще одно connection.'),
        p('MANDATORY fails if no transaction exists. Good when a lower-level method must never run outside a business transaction.', 'MANDATORY падает, если transaction нет. Полезен, когда lower-level method не должен работать вне business transaction.'),
        p('NOT_SUPPORTED suspends transaction. Useful for slow reads or non-transactional work that must not hold locks.', 'NOT_SUPPORTED suspends transaction. Полезен для slow reads или non-transactional work, который не должен держать locks.'),
        p('NESTED uses savepoints when supported. It is not the same as an independent transaction.', 'NESTED использует savepoints, если supported. Это не независимая transaction.'),
      ]),
      chapter('Locks: row, table, advisory, deadlocks', 'Locks: row, table, advisory, deadlocks', 'MVCC reduces blocking, but locks still protect writes, DDL, constraints, and explicit coordination.', 'MVCC снижает blocking, но locks все еще защищают writes, DDL, constraints и explicit coordination.', [
        p('UPDATE/DELETE take row-level locks. Competing writers wait or fail depending on timeout/nowait behavior.', 'UPDATE/DELETE берут row-level locks. Competing writers ждут или fail-ятся в зависимости от timeout/nowait behavior.'),
        p('SELECT FOR UPDATE locks rows you plan to change. It is useful for queues, inventory, and critical state transitions.', 'SELECT FOR UPDATE locks rows, которые планируется менять. Полезно для queues, inventory и critical state transitions.'),
        p('DDL can take table locks. Even quick ALTER statements can block or be blocked by long transactions.', 'DDL может брать table locks. Даже быстрые ALTER statements могут block-ить или быть blocked by long transactions.'),
        p('Advisory locks are application-defined locks. They are powerful, but require strict discipline because the database does not know the business meaning.', 'Advisory locks - application-defined locks. Они powerful, но требуют discipline, потому что database не знает business meaning.'),
        p('Deadlocks are detected and one transaction is aborted. Correct response is rollback, retry if safe, and improve lock ordering.', 'Deadlocks detected, и одна transaction aborted. Правильный response: rollback, retry if safe и улучшить lock ordering.'),
      ], [
        `-- Fail fast instead of waiting forever.
set local lock_timeout = '2s';
set local statement_timeout = '5s';

select *
from inventory_item
where sku = 'BOOK-1'
for update nowait;`,
      ]),
      chapter('Indexes: B-tree, GIN, GiST, BRIN, partial, expression', 'Индексы: B-tree, GIN, GiST, BRIN, partial, expression', 'Indexes are separate data structures. They speed selected reads but slow writes and consume storage.', 'Indexes - отдельные data structures. Они ускоряют selected reads, но замедляют writes и занимают storage.', [
        p('B-tree is the default and fits equality, ranges, ordering, joins, and most foreign keys.', 'B-tree - default и подходит для equality, ranges, ordering, joins и большинства foreign keys.'),
        p('GIN is useful for jsonb, arrays, full-text search, and containment queries.', 'GIN полезен для jsonb, arrays, full-text search и containment queries.'),
        p('GiST supports more flexible strategies such as geometric/range search and some extensions.', 'GiST поддерживает более flexible strategies: geometric/range search и некоторые extensions.'),
        p('BRIN is small and useful for huge naturally ordered tables, for example append-only events by timestamp.', 'BRIN маленький и полезен для huge naturally ordered tables, например append-only events по timestamp.'),
        p('Partial index indexes only rows matching a predicate. Great for active rows, non-deleted records, queues, and sparse columns.', 'Partial index индексирует только rows по predicate. Отличен для active rows, non-deleted records, queues и sparse columns.'),
        p('Expression index supports queries like lower(email) or date_trunc on a timestamp, but the query expression must match.', 'Expression index поддерживает queries типа lower(email) или date_trunc по timestamp, но expression в query должен match-иться.'),
      ]),
      chapter('Composite indexes and left-prefix rules', 'Composite indexes и left-prefix rules', 'Column order in a composite index is a design decision tied to WHERE, JOIN, ORDER BY, and selectivity.', 'Порядок columns в composite index - design decision, привязанная к WHERE, JOIN, ORDER BY и selectivity.', [
        p('An index on (user_id, created_at desc) is strong for filtering by user and sorting recent rows.', 'Index на (user_id, created_at desc) силен для filtering by user и sorting recent rows.'),
        p('The same index is usually not enough for filtering only by created_at without user_id.', 'Тот же index обычно недостаточен для filtering только по created_at без user_id.'),
        p('Put equality columns first, then range/sort columns as a common starting heuristic.', 'Частая эвристика: equality columns first, затем range/sort columns.'),
        p('INCLUDE columns can enable index-only scans without affecting the search key order.', 'INCLUDE columns могут enabling index-only scans, не влияя на search key order.'),
        p('Too many indexes hurt writes, vacuum, disk usage, and planner choices. Remove unused indexes with evidence.', 'Слишком много indexes вредят writes, vacuum, disk usage и planner choices. Удаляйте unused indexes только по evidence.'),
      ]),
      chapter('Query planner and EXPLAIN reading', 'Planner и чтение EXPLAIN', 'The planner estimates costs from statistics and chooses a plan. Senior developers compare estimates with actual execution.', 'Planner оценивает costs по statistics и выбирает plan. Senior developers сравнивают estimates с actual execution.', [
        p('Seq Scan is not always bad. For small tables or low-selectivity predicates it can be cheaper than an index scan.', 'Seq Scan не всегда плох. Для small tables или low-selectivity predicates он может быть дешевле index scan.'),
        p('Bad row estimates usually mean missing/stale statistics, correlated columns, expression mismatch, or skewed data.', 'Bad row estimates обычно означают missing/stale statistics, correlated columns, expression mismatch или skewed data.'),
        p('Nested Loop is good for small outer input with indexed inner lookup. It can be disastrous for large unexpected inputs.', 'Nested Loop хорош для small outer input с indexed inner lookup. Он может быть катастрофой для large unexpected inputs.'),
        p('Hash Join builds a hash table for one side. It is common for larger joins when memory allows.', 'Hash Join builds hash table for one side. Часто используется для larger joins, когда memory allows.'),
        p('Use EXPLAIN ANALYZE only when executing the query is safe. It really runs the query.', 'Используйте EXPLAIN ANALYZE только когда выполнение query safe. Он реально запускает query.'),
      ]),
      chapter('Joins, CTEs, windows, and pagination', 'Joins, CTE, windows и pagination', 'Advanced SQL lets you move set logic to the database, but it must remain readable and measurable.', 'Advanced SQL переносит set logic в database, но должен оставаться readable и measurable.', [
        p('INNER JOIN returns matching rows. LEFT JOIN preserves left rows and fills missing right side with nulls.', 'INNER JOIN возвращает matching rows. LEFT JOIN сохраняет left rows и заполняет missing right side nulls.'),
        p('CTEs improve readability. In modern PostgreSQL they are often inlined unless materialization is requested or required.', 'CTE улучшают readability. В modern PostgreSQL они часто inlined, если materialization не requested/required.'),
        p('Window functions compute rank, row_number, running totals, and partitioned aggregates without collapsing rows.', 'Window functions считают rank, row_number, running totals и partitioned aggregates без collapsing rows.'),
        p('Offset pagination gets slower for deep pages and can miss/duplicate rows under concurrent writes. Keyset pagination is usually better.', 'Offset pagination замедляется на deep pages и может miss/duplicate rows при concurrent writes. Keyset pagination обычно лучше.'),
      ], [
        `-- Keyset pagination.
select id, created_at, total
from customer_order
where user_id = :userId
  and (created_at, id) < (:lastCreatedAt, :lastId)
order by created_at desc, id desc
limit 50;`,
      ]),
      chapter('Vacuum, bloat, and autovacuum', 'Vacuum, bloat и autovacuum', 'MVCC needs cleanup. Vacuum removes dead tuples, updates visibility maps, and helps prevent transaction ID wraparound.', 'MVCC требует cleanup. Vacuum удаляет dead tuples, обновляет visibility maps и помогает избежать transaction ID wraparound.', [
        p('Autovacuum is not optional for write-heavy systems. Disabling it usually creates future incidents.', 'Autovacuum не optional для write-heavy systems. Его отключение обычно создает будущие incidents.'),
        p('Long-running transactions and idle in transaction sessions prevent cleanup.', 'Long-running transactions и idle in transaction sessions мешают cleanup.'),
        p('High update/delete tables may need tuned autovacuum thresholds and fillfactor.', 'High update/delete tables могут требовать tuned autovacuum thresholds и fillfactor.'),
        p('Index bloat can make queries slower even when indexes exist.', 'Index bloat может замедлять queries, даже когда indexes есть.'),
        p('Monitor pg_stat_user_tables, dead tuples, vacuum times, and transaction age.', 'Мониторьте pg_stat_user_tables, dead tuples, vacuum times и transaction age.'),
      ]),
      chapter('Migrations with Flyway or Liquibase', 'Migrations через Flyway или Liquibase', 'Schema changes are deployment work. They must survive rolling deploys, retries, locks, and existing data.', 'Schema changes - deployment work. Они должны переживать rolling deploys, retries, locks и existing data.', [
        p('Use expand-contract: add compatible schema, deploy code that writes/reads both if needed, backfill, switch reads, then remove old schema.', 'Используйте expand-contract: add compatible schema, deploy code writing/reading both if needed, backfill, switch reads, then remove old schema.'),
        p('Avoid large table rewrites during peak time. Know which ALTER TABLE forms rewrite or lock heavily.', 'Избегайте large table rewrites в peak time. Знайте, какие ALTER TABLE формы rewrite-ят или сильно lock-ят.'),
        p('Create large indexes concurrently in PostgreSQL and configure migration tooling because this cannot run inside a transaction block.', 'Создавайте large indexes concurrently в PostgreSQL и настройте migration tooling, потому что это не работает внутри transaction block.'),
        p('Backfill in small batches with progress tracking, lock timeout, statement timeout, and restartability.', 'Backfill делайте small batches с progress tracking, lock timeout, statement timeout и restartability.'),
        p('Never edit an already applied migration in shared environments. Add a new migration.', 'Никогда не редактируйте уже applied migration в shared environments. Добавляйте новую migration.'),
      ]),
      chapter('Partitioning and large tables', 'Partitioning и большие таблицы', 'Partitioning splits one logical table into physical partitions, usually by range or list.', 'Partitioning делит одну logical table на physical partitions, обычно by range или list.', [
        p('Good use cases: time-series events, audit logs, huge append-only tables, tenant isolation with careful planning.', 'Хорошие use cases: time-series events, audit logs, huge append-only tables, tenant isolation with careful planning.'),
        p('Partition pruning can skip irrelevant partitions when the WHERE clause includes the partition key.', 'Partition pruning может skip irrelevant partitions, когда WHERE содержит partition key.'),
        p('Partitioning is not a magic performance button. It adds operational complexity and index/constraint considerations.', 'Partitioning - не magic performance button. Он добавляет operational complexity и index/constraint considerations.'),
        p('Old partitions can be detached or dropped much faster than deleting rows from a giant table.', 'Old partitions можно detach/drop намного быстрее, чем delete rows из giant table.'),
      ]),
      chapter('JSONB and relational modeling trade-offs', 'JSONB и relational modeling trade-offs', 'jsonb is powerful for flexible payloads, but seniors decide what must remain relational.', 'jsonb мощный для flexible payloads, но seniors решают, что должно остаться relational.', [
        p('Use jsonb for external payloads, rare optional attributes, audit snapshots, and flexible metadata.', 'Используйте jsonb для external payloads, rare optional attributes, audit snapshots и flexible metadata.'),
        p('Do not hide core queryable business fields in jsonb when they need constraints, joins, and indexes.', 'Не прячьте core queryable business fields в jsonb, когда им нужны constraints, joins и indexes.'),
        p('GIN indexes help containment queries but increase write cost and can be large.', 'GIN indexes помогают containment queries, но увеличивают write cost и могут быть large.'),
        p('Validate jsonb shape at application boundary or with check constraints when required.', 'Validate jsonb shape на application boundary или через check constraints, когда требуется.'),
      ], [
        `select id, payload ->> 'eventType' as event_type
from audit_log
where payload @> '{"source":"mobile"}'::jsonb;`,
      ]),
      chapter('Connection pool and Spring Boot production settings', 'Connection pool и Spring Boot настройки', 'A PostgreSQL connection is expensive. Backend services should use a bounded pool and timeouts.', 'PostgreSQL connection expensive. Backend services должны использовать bounded pool и timeouts.', [
        p('Pool size should reflect database capacity, request concurrency, transaction duration, and number of service instances.', 'Pool size должен учитывать database capacity, request concurrency, transaction duration и number of service instances.'),
        p('Too many connections can reduce throughput by increasing context switching, memory usage, and lock pressure.', 'Слишком много connections может снижать throughput через context switching, memory usage и lock pressure.'),
        p('Set connection timeout, validation, leak detection in lower environments, statement timeout, and lock timeout for dangerous jobs.', 'Настраивайте connection timeout, validation, leak detection in lower environments, statement timeout и lock timeout для dangerous jobs.'),
        p('Use read-only replicas only when stale reads are acceptable and routing is explicit.', 'Используйте read-only replicas только когда stale reads acceptable и routing explicit.'),
      ], [
        `spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.connection-timeout=1000
spring.datasource.hikari.validation-timeout=500

spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.open-in-view=false`,
      ]),
      chapter('Senior best practices checklist', 'Senior checklist лучших практик', 'Good PostgreSQL usage is a set of habits around correctness, performance, operability, and change safety.', 'Хорошее использование PostgreSQL - набор привычек вокруг correctness, performance, operability и change safety.', [
        p('Put invariants into constraints where possible. Application validation is useful but not final.', 'Кладите invariants в constraints, где возможно. Application validation полезна, но не final.'),
        p('Design indexes from real queries, not from every foreign key and every column by habit.', 'Проектируйте indexes от реальных queries, а не по привычке на каждый foreign key и каждую column.'),
        p('Read EXPLAIN plans before and after optimization. Do not guess.', 'Читайте EXPLAIN plans до и после optimization. Не угадывайте.'),
        p('Keep transactions short, explicit, and service-level. Avoid transaction work in controllers.', 'Держите transactions short, explicit и service-level. Избегайте transaction work в controllers.'),
        p('Have retry policy for deadlocks, serialization failures, and transient connection errors when operation is idempotent.', 'Имейте retry policy для deadlocks, serialization failures и transient connection errors, когда operation idempotent.'),
        p('Make migrations reversible in practice: backup, rollout plan, monitoring, and rollback/forward-fix decision.', 'Делайте migrations reversible на практике: backup, rollout plan, monitoring и rollback/forward-fix decision.'),
        p('Monitor slow queries, query count per endpoint, connection pool saturation, locks, dead tuples, replication lag, and disk growth.', 'Мониторьте slow queries, query count per endpoint, connection pool saturation, locks, dead tuples, replication lag и disk growth.'),
      ]),
    ],
    faq: [
      faq('Why is READ COMMITTED usually the default choice?', 'Почему READ COMMITTED обычно default?', 'It gives good concurrency and prevents dirty reads. Many business operations are safe with constraints plus explicit locks or optimistic locking where needed.', 'Он дает хорошую concurrency и предотвращает dirty reads. Многие business operations безопасны с constraints плюс explicit locks или optimistic locking там, где нужно.'),
      faq('When should I use SERIALIZABLE?', 'Когда использовать SERIALIZABLE?', 'Use it for critical multi-row invariants when simpler unique constraints or explicit locks are not enough. It must be paired with retry on serialization failure.', 'Используйте для critical multi-row invariants, когда простых unique constraints или explicit locks недостаточно. Обязательно нужен retry при serialization failure.'),
      faq('Why can adding an index be dangerous?', 'Почему добавление index может быть опасным?', 'A large index can take time, consume I/O, block if not concurrent, slow writes after creation, and still be unused if it does not match query shape.', 'Большой index может долго строиться, потреблять I/O, block-ить если не concurrent, замедлять writes после создания и все равно не использоваться, если не match-ит query shape.'),
      faq('What is the biggest migration mistake?', 'Какая самая большая ошибка в migrations?', 'Deploying a breaking schema change in one step. Production usually needs expand, backfill, switch, and contract phases.', 'Выкатить breaking schema change одним шагом. Production обычно требует expand, backfill, switch и contract phases.'),
      faq('Does @Transactional guarantee correctness by itself?', 'Гарантирует ли @Transactional correctness само по себе?', 'No. It defines a boundary. Correctness also needs proper isolation, constraints, locking strategy, rollback rules, retry policy, and short transaction scope.', 'Нет. Он задает boundary. Correctness также требует proper isolation, constraints, locking strategy, rollback rules, retry policy и short transaction scope.'),
    ],
  },
];

export const seniorChapterExpansions = {
  'jvm-memory': [
    chapter('Heap, stack, metaspace, code cache', 'Heap, stack, metaspace, code cache', 'JVM memory is split by purpose. Knowing the purpose helps diagnose errors and performance.', 'JVM memory разделена по назначению. Понимание назначения помогает diagnose errors и performance.', [
      p('Heap stores objects and arrays. It is managed by GC and shared by threads.', 'Heap хранит objects и arrays. Он managed by GC и shared by threads.'),
      p('Each thread has its own stack with frames for method calls, local variables, operand stack, and return data.', 'У каждого thread свой stack с frames для method calls, local variables, operand stack и return data.'),
      p('Metaspace stores class metadata in native memory; classloader leaks can grow metaspace.', 'Metaspace хранит class metadata в native memory; classloader leaks могут grow metaspace.'),
      p('Code cache stores JIT-compiled native code.', 'Code cache хранит JIT-compiled native code.'),
    ]),
    chapter('References and object reachability', 'References и reachability objects', 'A Java variable of object type stores a reference. Reachability determines whether GC can collect the object.', 'Java variable object type хранит reference. Reachability определяет, может ли GC collect object.', [
      p('Strong references keep objects alive while reachable from roots.', 'Strong references keep objects alive while reachable from roots.'),
      p('Soft references may survive until memory pressure and are sometimes used for memory-sensitive caches.', 'Soft references могут survive до memory pressure и иногда используются для memory-sensitive caches.'),
      p('Weak references do not prevent collection and are useful for canonical maps/listeners.', 'Weak references не prevent collection и полезны для canonical maps/listeners.'),
      p('Phantom references are used with ReferenceQueue for cleanup after finalization-like reachability without resurrection.', 'Phantom references используются с ReferenceQueue для cleanup после finalization-like reachability без resurrection.'),
    ]),
    chapter('JIT, escape analysis, and performance', 'JIT, escape analysis и performance', 'The JIT uses runtime profile data to optimize hot code.', 'JIT использует runtime profile data для optimization hot code.', [
      p('Inlining removes call overhead and exposes more optimization opportunities.', 'Inlining removes call overhead и opens больше optimization opportunities.'),
      p('Escape analysis can remove allocation or lock when object does not escape a scope.', 'Escape analysis может remove allocation или lock, когда object не escapes scope.'),
      p('Deoptimization happens when JIT assumptions become invalid, for example new class type appears at a call site.', 'Deoptimization происходит, когда JIT assumptions invalid, например новый class type появляется at call site.'),
    ]),
  ],
  'garbage-collection': [
    chapter('GC Roots graph', 'Граф GC Roots', 'GC sees memory as a graph. Roots are starting nodes; references are edges; reachable objects are alive.', 'GC видит memory как graph. Roots - starting nodes; references - edges; reachable objects alive.', [
      p('Roots include local variables in active stack frames, static fields, JNI references, monitors, and JVM internal references.', 'Roots включают local variables active stack frames, static fields, JNI references, monitors и JVM internal references.'),
      p('Unreachable cycles are collectible because Java GC is not simple reference counting.', 'Unreachable cycles collectable, потому что Java GC не simple reference counting.'),
      p('A Java memory leak is usually unwanted reachability from a root.', 'Java memory leak обычно unwanted reachability from root.'),
    ]),
    chapter('Young and old generations', 'Young и old generations', 'Generational GC is based on the observation that most objects die young.', 'Generational GC основан на observation, что большинство objects die young.', [
      p('New objects are usually allocated in Eden.', 'New objects обычно allocated in Eden.'),
      p('Minor GC copies surviving objects to Survivor spaces and eventually promotes long-lived objects to Old generation.', 'Minor GC copies surviving objects to Survivor spaces и eventually promotes long-lived objects to Old generation.'),
      p('Old generation collections are more expensive because the live set is larger.', 'Old generation collections дороже, потому что live set больше.'),
    ]),
    chapter('GC algorithms and collectors', 'GC algorithms и collectors', 'Collectors combine marking, copying, sweeping, compacting, concurrency, and regional memory management differently.', 'Collectors по-разному combine marking, copying, sweeping, compacting, concurrency и regional memory management.', [
      p('Serial GC is simple and stop-the-world, useful for small heaps or single-core environments.', 'Serial GC simple и stop-the-world, полезен для small heaps или single-core environments.'),
      p('Parallel GC maximizes throughput with multiple GC threads but can have larger pauses.', 'Parallel GC maximizes throughput через multiple GC threads, но pauses могут быть larger.'),
      p('G1 splits heap into regions and targets pause goals by collecting selected regions.', 'G1 splits heap into regions и targets pause goals через collecting selected regions.'),
      p('ZGC and Shenandoah target very low pauses by doing more work concurrently.', 'ZGC и Shenandoah target very low pauses, делая больше work concurrently.'),
    ]),
  ],
  'strings-immutability': [
    chapter('String vs StringBuilder vs StringBuffer', 'String vs StringBuilder vs StringBuffer', 'Choose by mutability and threading needs.', 'Выбирайте по mutability и threading needs.', [
      p('String is immutable and safe to share; every modification conceptually creates a new String.', 'String immutable и safe to share; каждая modification conceptually creates new String.'),
      p('StringBuilder is mutable and not synchronized, best for local single-threaded construction.', 'StringBuilder mutable и not synchronized, лучший для local single-threaded construction.'),
      p('StringBuffer is synchronized legacy mutable builder, useful only when the same builder is actually shared across threads.', 'StringBuffer synchronized legacy mutable builder, полезен только когда same builder shared across threads.'),
      p('Do not use StringBuffer just because code is multithreaded; local variables are thread-confined.', 'Не используйте StringBuffer просто потому что code multithreaded; local variables thread-confined.'),
    ]),
    chapter('String pool internals', 'String pool internals', 'The String Pool stores canonical strings so literals and interned strings can share references.', 'String Pool хранит canonical strings, чтобы literals и interned strings могли share references.', [
      p('String literals are interned automatically.', 'String literals interned automatically.'),
      p('intern() returns canonical pooled instance for the same content.', 'intern() returns canonical pooled instance for same content.'),
      p('The pool saves memory for repeated constants but can hurt if you intern unlimited dynamic values.', 'Pool saves memory для repeated constants, но может hurt, если intern unlimited dynamic values.'),
    ]),
    chapter('Under the hood of concatenation', 'Под капотом concatenation', 'Modern Java may use invokedynamic/StringConcatFactory for concatenation, while repeated loop assembly still needs care.', 'Modern Java может использовать invokedynamic/StringConcatFactory для concatenation, но repeated loop assembly требует care.', [
      p('Compile-time constants can be folded into one literal.', 'Compile-time constants могут folded into one literal.'),
      p('Runtime concatenation may allocate temporary builders/strings depending on JDK strategy.', 'Runtime concatenation может allocate temporary builders/strings в зависимости от JDK strategy.'),
      p('For large loops, use StringBuilder, StringJoiner, or Collectors.joining.', 'Для large loops используйте StringBuilder, StringJoiner или Collectors.joining.'),
    ]),
  ],
  collections: [
    chapter('Collection hierarchy', 'Иерархия Collections', 'The root interfaces are Collection and Map. Collection splits into List, Set, Queue/Deque; Map is separate.', 'Root interfaces - Collection и Map. Collection splits into List, Set, Queue/Deque; Map separate.', [
      p('List preserves order and allows duplicates.', 'List preserves order и allows duplicates.'),
      p('Set enforces uniqueness using equals/hashCode or comparator rules.', 'Set enforces uniqueness через equals/hashCode или comparator rules.'),
      p('Queue/Deque model processing order; Map stores key-value associations.', 'Queue/Deque model processing order; Map stores key-value associations.'),
    ]),
    chapter('ArrayList Big O and internals', 'ArrayList Big O и internals', 'ArrayList is a resizable array of references.', 'ArrayList - resizable array references.', [
      p('get by index: O(1).', 'get by index: O(1).'),
      p('append at end: amortized O(1), but resize is O(n).', 'append at end: amortized O(1), но resize O(n).'),
      p('insert at beginning or middle: O(n) because references must shift right.', 'insert в beginning или middle: O(n), потому что references shift right.'),
      p('remove from beginning or middle: O(n) because references shift left.', 'remove из beginning или middle: O(n), потому что references shift left.'),
      p('contains: O(n) because it scans and uses equals.', 'contains: O(n), потому что scans и uses equals.'),
    ]),
    chapter('LinkedList Big O and internals', 'LinkedList Big O и internals', 'LinkedList is a doubly linked list of nodes. Each node stores item, previous, and next references.', 'LinkedList - doubly linked list nodes. Каждый node хранит item, previous и next references.', [
      p('addFirst/addLast/removeFirst/removeLast: O(1).', 'addFirst/addLast/removeFirst/removeLast: O(1).'),
      p('get by index: O(n) traversal from head or tail.', 'get by index: O(n) traversal from head или tail.'),
      p('insert/remove at a known node is O(1), but finding that node is usually O(n).', 'insert/remove at known node O(1), но finding node обычно O(n).'),
      p('In practice LinkedList often loses to ArrayList because of memory overhead and poor CPU cache locality.', 'На практике LinkedList часто проигрывает ArrayList из-за memory overhead и poor CPU cache locality.'),
    ]),
    chapter('HashMap buckets and tree bins', 'HashMap buckets и tree bins', 'HashMap uses an array where each slot is a bucket containing nodes with same bucket index.', 'HashMap использует array, где каждый slot - bucket с nodes, имеющими same bucket index.', [
      p('Index is computed as (capacity - 1) & spread(hash), so capacity is power of two.', 'Index computes as (capacity - 1) & spread(hash), поэтому capacity power of two.'),
      p('Collisions form a linked list first.', 'Collisions сначала form linked list.'),
      p('When collision chain becomes too long and table is large enough, bucket becomes a red-black tree.', 'Когда collision chain too long и table large enough, bucket becomes red-black tree.'),
      p('Average get/put/remove is O(1), but bad collisions can become O(log n) in tree bins or O(n) in small/non-treeified bins.', 'Average get/put/remove O(1), но bad collisions can become O(log n) in tree bins или O(n) in small/non-treeified bins.'),
    ]),
    chapter('Red-black tree basics', 'Основы red-black tree', 'A red-black tree is a self-balancing binary search tree used to keep operations O(log n).', 'Red-black tree - self-balancing binary search tree для O(log n) operations.', [
      p('Each node is red or black.', 'Each node red или black.'),
      p('Root is black; red nodes cannot have red children.', 'Root black; red nodes cannot have red children.'),
      p('Every path from node to leaves has same number of black nodes.', 'Every path from node to leaves has same number of black nodes.'),
      p('Insert/delete may rotate and recolor nodes to restore balance.', 'Insert/delete may rotate and recolor nodes to restore balance.'),
    ]),
  ],
  exceptions: [
    chapter('Throwable hierarchy', 'Иерархия Throwable', 'Throwable is the root. It splits into Error and Exception. RuntimeException is a branch under Exception.', 'Throwable - root. Он splits into Error и Exception. RuntimeException - branch under Exception.', [
      p('Error represents serious problems usually not handled by application logic: OutOfMemoryError, StackOverflowError, NoClassDefFoundError.', 'Error represents serious problems, usually not handled application logic: OutOfMemoryError, StackOverflowError, NoClassDefFoundError.'),
      p('Checked exceptions are Exception subclasses excluding RuntimeException. Compiler forces catch or throws.', 'Checked exceptions - Exception subclasses excluding RuntimeException. Compiler forces catch or throws.'),
      p('Unchecked exceptions are RuntimeException and Error branches; compiler does not force declaration.', 'Unchecked exceptions - RuntimeException и Error branches; compiler не force declaration.'),
      p('NullPointerException is unchecked RuntimeException and usually indicates a programming bug or missing invariant.', 'NullPointerException unchecked RuntimeException и обычно indicates programming bug или missing invariant.'),
    ]),
    chapter('try, catch, finally, final, finalize', 'try, catch, finally, final, finalize', 'These words are often confused but mean different things.', 'Эти слова часто путают, но они означают разное.', [
      p('final is a modifier: variable cannot be reassigned, method cannot be overridden, class cannot be extended.', 'final - modifier: variable cannot be reassigned, method cannot be overridden, class cannot be extended.'),
      p('finally is a block that runs after try/catch for cleanup, except in extreme cases like JVM crash or System.exit.', 'finally - block after try/catch для cleanup, кроме extreme cases JVM crash или System.exit.'),
      p('finalize was a GC-related callback, deprecated/removed path because it is unpredictable, slow, unsafe, and can resurrect objects.', 'finalize был GC-related callback, deprecated/removed path, потому что unpredictable, slow, unsafe и can resurrect objects.'),
      p('try-with-resources is preferred for AutoCloseable cleanup and preserves suppressed exceptions.', 'try-with-resources preferred для AutoCloseable cleanup и preserves suppressed exceptions.'),
    ]),
    chapter('Senior exception design', 'Senior exception design', 'Exception strategy should preserve cause, express domain meaning, and map cleanly at boundaries.', 'Exception strategy должен preserve cause, express domain meaning и map cleanly at boundaries.', [
      p('Do not swallow exceptions; log and continue only when continuing is correct.', 'Не swallow exceptions; log and continue только когда continuing correct.'),
      p('Wrap low-level exceptions with domain/application context and keep original cause.', 'Wrap low-level exceptions with domain/application context и keep original cause.'),
      p('Map exceptions to stable HTTP error DTOs at controller boundary.', 'Map exceptions to stable HTTP error DTOs at controller boundary.'),
    ]),
  ],
  concurrency: [
    chapter('Race condition and visibility problems', 'Race condition и visibility problems', 'Race condition happens when result depends on timing between threads. Visibility problems happen when one thread does not see another thread’s writes.', 'Race condition возникает, когда result depends on timing between threads. Visibility problems - когда один thread не видит writes другого.', [
      p('Use synchronized/locks to protect compound invariants.', 'Use synchronized/locks для compound invariants.'),
      p('Use volatile for visibility of simple state flags, not compound increments.', 'Use volatile для visibility simple state flags, не compound increments.'),
      p('Use AtomicInteger/AtomicReference for lock-free single-variable atomic updates.', 'Use AtomicInteger/AtomicReference для lock-free single-variable atomic updates.'),
      p('Use immutable objects to avoid shared mutable state.', 'Use immutable objects to avoid shared mutable state.'),
    ]),
    chapter('synchronized under the hood', 'synchronized под капотом', 'synchronized uses object monitors. Entering acquires monitor; exiting releases it and creates happens-before relationship.', 'synchronized uses object monitors. Entering acquires monitor; exiting releases и creates happens-before relationship.', [
      p('Only one thread can own a monitor at a time.', 'Only one thread can own monitor at a time.'),
      p('It is reentrant: same thread can acquire the same monitor multiple times.', 'It is reentrant: same thread can acquire same monitor multiple times.'),
      p('Monitor release publishes changes; monitor acquire sees changes published by previous release.', 'Monitor release publishes changes; monitor acquire sees changes from previous release.'),
    ]),
    chapter('Deadlock, livelock, starvation', 'Deadlock, livelock, starvation', 'Threading problems have names and standard solutions.', 'Threading problems have names and standard solutions.', [
      p('Deadlock: threads wait forever in a cycle. Solution: fixed lock ordering, timeouts, avoid nested locks.', 'Deadlock: threads wait forever in cycle. Solution: fixed lock ordering, timeouts, avoid nested locks.'),
      p('Livelock: threads keep reacting but no progress. Solution: randomized backoff, simpler coordination.', 'Livelock: threads keep reacting but no progress. Solution: randomized backoff, simpler coordination.'),
      p('Starvation: a thread rarely gets CPU/lock/resource. Solution: fair locks, bounded work, correct pool sizing.', 'Starvation: thread rarely gets CPU/lock/resource. Solution: fair locks, bounded work, correct pool sizing.'),
      p('Thread pool exhaustion: all workers blocked waiting for tasks that cannot run. Solution: separate pools, avoid blocking, bounded queues.', 'Thread pool exhaustion: all workers blocked waiting for tasks that cannot run. Solution: separate pools, avoid blocking, bounded queues.'),
    ]),
  ],
  functional: [
    chapter('Stream API operator groups', 'Группы операторов Stream API', 'Stream operations are source, intermediate operations, and terminal operations.', 'Stream operations: source, intermediate operations и terminal operations.', [
      p('Creation: stream(), of(), generate(), iterate(), Files.lines().', 'Creation: stream(), of(), generate(), iterate(), Files.lines().'),
      p('Stateless intermediate: map, filter, flatMap, peek.', 'Stateless intermediate: map, filter, flatMap, peek.'),
      p('Stateful intermediate: distinct, sorted, limit, skip.', 'Stateful intermediate: distinct, sorted, limit, skip.'),
      p('Terminal: collect, reduce, forEach, count, min, max, anyMatch, allMatch, findFirst.', 'Terminal: collect, reduce, forEach, count, min, max, anyMatch, allMatch, findFirst.'),
    ]),
    chapter('Lazy execution and pitfalls', 'Lazy execution и pitfalls', 'Intermediate stream operations are lazy and do nothing until terminal operation.', 'Intermediate stream operations lazy и ничего не делают до terminal operation.', [
      p('peek is for debugging, not business side effects.', 'peek for debugging, not business side effects.'),
      p('Streams are single-use; reusing consumed stream throws IllegalStateException.', 'Streams single-use; reusing consumed stream throws IllegalStateException.'),
      p('Parallel streams need CPU-bound independent work and good splitting; avoid blocking I/O.', 'Parallel streams need CPU-bound independent work и good splitting; avoid blocking I/O.'),
    ]),
  ],
  'spring-framework-essentials': [
    chapter('IoC and DI in depth', 'IoC и DI подробно', 'Inversion of Control means object creation and wiring are delegated to the container. Dependency Injection is the way dependencies are provided.', 'Inversion of Control означает, что object creation и wiring delegated to container. Dependency Injection - способ передать dependencies.', [
      p('Without DI, classes construct dependencies directly and become tightly coupled.', 'Without DI classes construct dependencies directly и become tightly coupled.'),
      p('With DI, classes declare dependencies through constructor or methods and container supplies implementations.', 'With DI classes declare dependencies through constructor/methods and container supplies implementations.'),
      p('Constructor injection is best for required dependencies and immutability.', 'Constructor injection best for required dependencies и immutability.'),
    ]),
    chapter('How Spring finds components', 'Как Spring находит компоненты', 'Spring scans classpath packages for stereotype annotations and registers BeanDefinitions.', 'Spring scans classpath packages for stereotype annotations и registers BeanDefinitions.', [
      p('@Component is generic stereotype; @Service, @Repository, @Controller are specialized stereotypes.', '@Component generic stereotype; @Service, @Repository, @Controller specialized stereotypes.'),
      p('@SpringBootApplication includes component scanning from its package downward by default.', '@SpringBootApplication includes component scanning from its package downward by default.'),
      p('Spring does not instantiate every class. It creates beans from definitions discovered by scanning/configuration/imports.', 'Spring не instantiate every class. Он creates beans from definitions discovered by scanning/configuration/imports.'),
    ]),
    chapter('Bean lifecycle and scopes', 'Bean lifecycle и scopes', 'Bean lifecycle includes definition, instantiation, dependency injection, initialization callbacks, post-processors, proxies, use, and destruction.', 'Bean lifecycle включает definition, instantiation, dependency injection, initialization callbacks, post-processors, proxies, use и destruction.', [
      p('singleton: one bean instance per Spring container, default scope.', 'singleton: one bean instance per Spring container, default scope.'),
      p('prototype: new instance every request from container, destruction not fully managed like singleton.', 'prototype: new instance every request from container, destruction not fully managed like singleton.'),
      p('request/session/application/websocket scopes exist in web contexts.', 'request/session/application/websocket scopes exist in web contexts.'),
      p('BeanPostProcessor is how many framework features wrap or modify beans.', 'BeanPostProcessor - how many framework features wrap/modify beans.'),
    ]),
    chapter('@Transactional under the hood', '@Transactional под капотом', '@Transactional is Spring AOP around a method call. It obtains a connection, starts or joins a transaction, invokes the method, then commits or rolls back.', '@Transactional - это Spring AOP вокруг вызова method. Он получает connection, starts или joins transaction, вызывает method, затем commit или rollback.', [
      p('The call must pass through a Spring proxy. Self-invocation inside the same class bypasses the proxy and can skip transaction advice.', 'Call должен пройти через Spring proxy. Self-invocation внутри того же class bypass-ит proxy и может пропустить transaction advice.'),
      p('DataSourceTransactionManager works with JDBC connections. JpaTransactionManager also coordinates EntityManager and persistence context.', 'DataSourceTransactionManager работает с JDBC connections. JpaTransactionManager также координирует EntityManager и persistence context.'),
      p('Spring binds transactional resources to the current thread. That is why transaction context does not automatically move to another thread or async task.', 'Spring binds transactional resources к current thread. Поэтому transaction context не переходит автоматически в другой thread или async task.'),
      p('Default rollback is RuntimeException and Error. Checked exceptions need rollbackFor when they should roll back.', 'Default rollback - RuntimeException и Error. Checked exceptions требуют rollbackFor, если должны rollback-иться.'),
    ], [
      `@Service
class UserService {
    @Transactional
    public void changeEmail(long id, String email) {
        User user = users.findById(id).orElseThrow();
        user.changeEmail(email);
    }

    public void outer(long id) {
        changeEmail(id, "self@call.com"); // self-invocation: proxy is bypassed
    }
}`,
    ]),
    chapter('Spring isolation levels and PostgreSQL', 'Spring isolation levels и PostgreSQL', 'Spring isolation values are requests to the database connection. The database decides what those levels mean.', 'Spring isolation values - это requests к database connection. Database решает, что эти уровни реально означают.', [
      p('DEFAULT uses the database default. PostgreSQL default is READ COMMITTED.', 'DEFAULT использует database default. PostgreSQL default - READ COMMITTED.'),
      p('READ_UNCOMMITTED is not useful with PostgreSQL because PostgreSQL treats it as READ COMMITTED.', 'READ_UNCOMMITTED бесполезен с PostgreSQL, потому что PostgreSQL treats it as READ COMMITTED.'),
      p('READ_COMMITTED gives a new snapshot per statement and is usually the best throughput/default choice.', 'READ_COMMITTED дает new snapshot per statement и обычно лучший throughput/default choice.'),
      p('REPEATABLE_READ gives one stable snapshot per transaction. It is stronger for reports and multi-step reads, but can still allow serialization anomalies.', 'REPEATABLE_READ дает one stable snapshot per transaction. Он сильнее для reports и multi-step reads, но все еще может allow serialization anomalies.'),
      p('SERIALIZABLE is strongest and can abort with serialization failure. Use only when you also implement retry.', 'SERIALIZABLE strongest и может abort-иться с serialization failure. Используйте только вместе с retry.'),
    ], [
      `@Transactional(isolation = Isolation.READ_COMMITTED)
public void updateProfile(long id, ProfilePatch patch) {
    profiles.getRequired(id).apply(patch);
}

@Retryable(retryFor = CannotSerializeTransactionException.class, maxAttempts = 3)
@Transactional(isolation = Isolation.SERIALIZABLE)
public void allocateSeat(long eventId, long userId) {
    seats.allocate(eventId, userId);
}`,
    ]),
    chapter('Transaction propagation best practices', 'Best practices propagation', 'Propagation changes transaction composition. It can fix boundaries or create subtle consistency bugs.', 'Propagation меняет composition transactions. Он может починить boundaries или создать тонкие consistency bugs.', [
      p('Use REQUIRED for most service methods. It keeps one business use case inside one transaction.', 'Используйте REQUIRED для большинства service methods. Он держит один business use case внутри одной transaction.'),
      p('Use REQUIRES_NEW sparingly. It needs another connection and commits independently, so outer rollback will not undo it.', 'Используйте REQUIRES_NEW редко. Он требует еще одно connection и commits independently, поэтому outer rollback его не откатит.'),
      p('Use MANDATORY when a repository/helper method must only run inside an existing transaction.', 'Используйте MANDATORY, когда repository/helper method должен работать только внутри existing transaction.'),
      p('Use NOT_SUPPORTED to intentionally avoid holding a transaction around slow non-critical work.', 'Используйте NOT_SUPPORTED, чтобы намеренно не держать transaction вокруг slow non-critical work.'),
      p('Avoid transaction boundaries in controllers. Put them around service-level use cases where business consistency is visible.', 'Избегайте transaction boundaries в controllers. Ставьте их вокруг service-level use cases, где видна business consistency.'),
      p('Never keep a database transaction open while waiting for remote HTTP if the workflow can be split with outbox, saga, or explicit state machine.', 'Не держите database transaction open во время remote HTTP, если workflow можно разделить через outbox, saga или explicit state machine.'),
    ]),
  ],
  'spring-framework-essentials-extra-boot': [],
  'spring-boot-production-internals': [
    chapter('Spring vs Spring Boot', 'Spring vs Spring Boot', 'Spring is the framework ecosystem; Spring Boot is an opinionated layer that simplifies configuration and production setup.', 'Spring - framework ecosystem; Spring Boot - opinionated layer, упрощающий configuration и production setup.', [
      p('Spring provides IoC container, MVC, AOP, transactions, data integration, security integration, etc.', 'Spring provides IoC container, MVC, AOP, transactions, data integration, security integration и т.д.'),
      p('Spring Boot adds auto-configuration, starters, embedded server, actuator, externalized config conventions, and executable jars.', 'Spring Boot adds auto-configuration, starters, embedded server, actuator, externalized config conventions и executable jars.'),
      p('Boot does not replace Spring; it configures Spring based on classpath, properties, and conditions.', 'Boot не replaces Spring; it configures Spring based on classpath, properties and conditions.'),
    ]),
    chapter('Bean creation in Boot', 'Создание бинов в Boot', 'Boot creates beans through the same Spring container, but adds auto-configuration classes and conditional bean definitions.', 'Boot creates beans through same Spring container, но добавляет auto-configuration classes и conditional bean definitions.', [
      p('Starters bring dependencies and auto-configuration metadata.', 'Starters bring dependencies and auto-configuration metadata.'),
      p('@ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty control when beans are created.', '@ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty control when beans created.'),
      p('Your own bean usually overrides Boot default because auto-config backs off on missing-bean conditions.', 'Your own bean usually overrides Boot default because auto-config backs off on missing-bean conditions.'),
    ]),
  ],
  'orm-jpa-hibernate': [
    chapter('Hibernate vs JPA mental model', 'Hibernate vs JPA: ментальная модель', 'JPA is the specification: EntityManager, annotations, JPQL, lifecycle states, persistence context, transactions. Hibernate is a concrete ORM implementation with its own engine, caches, proxies, SQL generation, dirty checking, fetch strategies, and extra features.', 'JPA - спецификация: EntityManager, annotations, JPQL, lifecycle states, persistence context, transactions. Hibernate - конкретная ORM-реализация со своим engine, caches, proxies, SQL generation, dirty checking, fetch strategies и дополнительными features.', [
      p('ORM is not “SQL disappears”. ORM translates object state transitions into SQL and manages identity, relationships, flushing, and caching.', 'ORM не означает “SQL исчез”. ORM переводит object state transitions в SQL и управляет identity, relationships, flushing и caching.'),
      p('Senior-level Hibernate means you can predict generated SQL, know when it runs, know what is cached, and know when entity state is tracked.', 'Senior-level Hibernate означает: вы можете предсказать generated SQL, когда он выполнится, что cached и когда entity state tracked.'),
      p('A JPA entity is not a DTO. It is a persistence-aware domain/data object with identity, lifecycle, lazy associations, and transaction-sensitive behavior.', 'JPA entity - не DTO. Это persistence-aware domain/data object с identity, lifecycle, lazy associations и transaction-sensitive behavior.'),
    ]),
    chapter('Entity states: transient, managed, detached, removed', 'Состояния сущностей: transient, managed, detached, removed', 'Entity lifecycle states define whether Hibernate tracks the object and whether changes can become SQL automatically.', 'Lifecycle states сущности определяют, отслеживает ли Hibernate объект и могут ли изменения автоматически стать SQL.', [
      p('Transient/new: ordinary Java object, not associated with persistence context, no database identity managed by Hibernate yet.', 'Transient/new: обычный Java object, не связан с persistence context, database identity еще не managed Hibernate-ом.'),
      p('Managed/persistent: object is inside persistence context. Hibernate tracks it, guarantees identity map semantics, and dirty checking can produce SQL.', 'Managed/persistent: object внутри persistence context. Hibernate tracks it, гарантирует identity map semantics, dirty checking может создать SQL.'),
      p('Detached: object has database identity but is no longer associated with current persistence context. Changes are not tracked automatically.', 'Detached: object имеет database identity, но больше не связан с текущим persistence context. Changes не tracked automatically.'),
      p('Removed: managed entity scheduled for DELETE. Actual SQL usually happens on flush.', 'Removed: managed entity scheduled for DELETE. Реальный SQL обычно происходит на flush.'),
      p('merge does not reattach the same detached instance. It copies detached state into a managed instance and returns that managed instance.', 'merge не reattach-ит тот же detached instance. Он копирует detached state в managed instance и возвращает managed instance.'),
    ], [
      `@Transactional
void lifecycle(EntityManager em) {
    User user = new User("a@site.com");     // transient

    em.persist(user);                       // managed, INSERT scheduled
    user.changeEmail("b@site.com");         // tracked by dirty checking

    em.flush();                             // INSERT/UPDATE sent to DB
    em.detach(user);                        // detached
    user.changeEmail("c@site.com");         // not tracked

    User managedCopy = em.merge(user);      // copies state into managed instance
    em.remove(managedCopy);                 // removed, DELETE scheduled
}`,
    ]),
    chapter('Persistence context as L1 cache, Identity Map, Unit of Work', 'Persistence context как L1 cache, Identity Map, Unit of Work', 'The persistence context is the first-level cache. It exists inside an EntityManager/Session and stores managed entities by entity type and identifier.', 'Persistence context - это first-level cache. Он живет внутри EntityManager/Session и хранит managed entities по entity type и identifier.', [
      p('L1 cache is mandatory and cannot be disabled. Every EntityManager/Session has its own L1 cache.', 'L1 cache обязателен и не отключается. У каждого EntityManager/Session свой L1 cache.'),
      p('Identity Map guarantee: within one persistence context, loading the same row twice returns the same Java object reference.', 'Identity Map guarantee: в одном persistence context загрузка одной row дважды возвращает ту же Java object reference.'),
      p('Unit of Work: Hibernate accumulates changes and synchronizes them with the database during flush instead of executing every field change immediately.', 'Unit of Work: Hibernate накапливает changes и synchronizes их с database during flush, а не выполняет SQL на каждое изменение поля.'),
      p('L1 cache is not a query result cache. JPQL can still hit DB, but returned rows are resolved to existing managed instances when already present.', 'L1 cache - не query result cache. JPQL может снова сходить в DB, но returned rows resolves to existing managed instances, если они уже есть.'),
      p('clear() removes all managed entities from the context; detach(entity) removes one; refresh(entity) reloads state from database.', 'clear() removes all managed entities from context; detach(entity) removes one; refresh(entity) reloads state from database.'),
    ], [
      `@Transactional
void identityMap(EntityManager em) {
    User first = em.find(User.class, 1L);    // SELECT
    User second = em.find(User.class, 1L);   // no SELECT, returned from L1 cache

    System.out.println(first == second);     // true
}`,
      `@Transactional
void staleDataExample(EntityManager em) {
    User user = em.find(User.class, 1L);

    jdbcTemplate.update("update users set email = ? where id = ?", "external@site.com", 1L);

    System.out.println(user.getEmail());     // old value from L1 cache
    em.refresh(user);                        // SELECT and overwrite managed state
    System.out.println(user.getEmail());     // external@site.com
}`,
    ]),
    chapter('Dirty checking: snapshots, flush, SQL generation', 'Dirty checking: snapshots, flush, SQL generation', 'Dirty checking is Hibernate’s mechanism for detecting changes in managed entities and converting those changes into SQL UPDATE statements.', 'Dirty checking - механизм Hibernate для обнаружения изменений managed entities и превращения этих изменений в SQL UPDATE.', [
      p('When an entity becomes managed, Hibernate stores a loaded-state snapshot of its persistent fields.', 'Когда entity становится managed, Hibernate stores loaded-state snapshot persistent fields.'),
      p('At flush time, Hibernate compares current state with the snapshot. If values differ, entity is dirty.', 'Во время flush Hibernate compares current state with snapshot. Если values differ, entity dirty.'),
      p('Dirty checking works only for managed entities inside an open persistence context.', 'Dirty checking работает только для managed entities внутри open persistence context.'),
      p('Flush can happen before transaction commit, before JPQL/Criteria queries that need synchronization, or when EntityManager.flush() is called.', 'Flush может произойти before transaction commit, before JPQL/Criteria queries needing synchronization, или при EntityManager.flush().'),
      p('Hibernate usually updates columns according to mapping strategy; @DynamicUpdate can generate UPDATE only for changed columns but has SQL plan/cache trade-offs.', 'Hibernate обычно updates columns согласно mapping strategy; @DynamicUpdate может generate UPDATE only changed columns, но имеет SQL plan/cache trade-offs.'),
    ], [
      `@Transactional
void dirtyChecking(UserRepository users) {
    User user = users.findById(1L).orElseThrow(); // managed entity

    user.changeEmail("new@site.com");            // no repository.save required

    // On flush/commit Hibernate detects dirty state:
    // update users set email = ? where id = ?
}`,
      `@Entity
@DynamicUpdate
class User {
    @Id
    private Long id;

    private String email;
    private String displayName;

    void changeEmail(String email) {
        this.email = email;
    }
}`,
    ]),
    chapter('Flush is not commit', 'Flush не равен commit', 'Flush synchronizes SQL statements with the database transaction, but commit makes the transaction durable and visible according to isolation rules.', 'Flush synchronizes SQL statements с database transaction, но commit делает transaction durable и visible согласно isolation rules.', [
      p('flush sends INSERT/UPDATE/DELETE to DB but transaction can still roll back.', 'flush sends INSERT/UPDATE/DELETE to DB, но transaction can still roll back.'),
      p('commit triggers flush if needed, then commits the database transaction.', 'commit triggers flush if needed, затем commits database transaction.'),
      p('FlushMode.AUTO can flush before queries to keep query results consistent with pending changes.', 'FlushMode.AUTO может flush before queries, чтобы query results были consistent with pending changes.'),
      p('FlushMode.COMMIT delays flush until commit where possible, but provider can still flush earlier for constraints/queries.', 'FlushMode.COMMIT delays flush until commit where possible, но provider can still flush earlier for constraints/queries.'),
      p('Manual flush is useful for batch processing, early constraint detection, and controlling memory with clear().', 'Manual flush полезен для batch processing, early constraint detection и memory control через clear().'),
    ], [
      `@Transactional
void batchInsert(EntityManager em, List<User> users) {
    for (int i = 0; i < users.size(); i++) {
        em.persist(users.get(i));

        if (i % 50 == 0) {
            em.flush();  // send SQL batch
            em.clear();  // detach entities, free L1 cache memory
        }
    }
}`,
    ]),
    chapter('L2 cache: shared cache across sessions', 'L2 cache: общий cache между sessions', 'The second-level cache is optional. Unlike L1 cache, it is shared across EntityManager/Session instances through a cache provider such as Ehcache, Infinispan, Hazelcast, or Caffeine integrations.', 'Second-level cache optional. В отличие от L1 cache, он shared across EntityManager/Session instances через cache provider: Ehcache, Infinispan, Hazelcast, Caffeine integrations.', [
      p('L2 cache stores entity data by identifier, not arbitrary query results by default.', 'L2 cache stores entity data by identifier, не arbitrary query results by default.'),
      p('It helps for mostly-read reference data: countries, permissions, dictionaries, product categories.', 'Он полезен для mostly-read reference data: countries, permissions, dictionaries, product categories.'),
      p('It can hurt for frequently updated data because invalidation, stale reads, and cluster coordination become expensive.', 'Он может hurt для frequently updated data из-за invalidation, stale reads и cluster coordination.'),
      p('Concurrency strategies matter: READ_ONLY, NONSTRICT_READ_WRITE, READ_WRITE, TRANSACTIONAL.', 'Concurrency strategies важны: READ_ONLY, NONSTRICT_READ_WRITE, READ_WRITE, TRANSACTIONAL.'),
      p('L2 cache does not replace application cache design. It is tied to entity identity and Hibernate session behavior.', 'L2 cache не заменяет application cache design. Он tied to entity identity и Hibernate session behavior.'),
    ], [
      `// build.gradle / dependencies need a cache provider, for example hibernate-jcache + provider.

@Entity
@Cacheable
@org.hibernate.annotations.Cache(
    usage = CacheConcurrencyStrategy.READ_ONLY,
    region = "countries"
)
class Country {
    @Id
    private String code;

    private String name;
}`,
      `spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory
spring.jpa.properties.hibernate.javax.cache.provider=org.ehcache.jsr107.EhcacheCachingProvider`,
    ]),
    chapter('Query cache: what it caches and why it is dangerous', 'Query cache: что кеширует и почему опасен', 'Hibernate query cache is separate from L2 entity cache. It usually stores query result identifiers and parameter/result metadata, not full hydrated entities.', 'Hibernate query cache separate from L2 entity cache. Обычно он stores query result identifiers и parameter/result metadata, а не fully hydrated entities.', [
      p('Query cache requires second-level cache to be useful because entity IDs must be resolved to entity data.', 'Query cache requires second-level cache to be useful, потому что entity IDs resolve to entity data.'),
      p('It is useful only for stable, repeated queries over data that does not change often.', 'Он полезен только для stable repeated queries over data that does not change often.'),
      p('Any update to related tables can invalidate query cache regions and destroy hit rate.', 'Update related tables может invalidate query cache regions и destroy hit rate.'),
      p('For business APIs, explicit application-level caching is often easier to reason about than Hibernate query cache.', 'Для business APIs explicit application-level caching часто easier to reason about, чем Hibernate query cache.'),
    ], [
      `@QueryHints({
    @QueryHint(name = org.hibernate.jpa.HibernateHints.HINT_CACHEABLE, value = "true"),
    @QueryHint(name = org.hibernate.jpa.HibernateHints.HINT_CACHE_REGION, value = "active-users")
})
@Query("select u from User u where u.active = true")
List<User> findActiveUsersCached();`,
    ]),
    chapter('Lazy loading, proxies, and LazyInitializationException', 'Lazy loading, proxies и LazyInitializationException', 'Lazy loading delays fetching associations until they are accessed. Hibernate implements it with proxies, persistent collections, or bytecode enhancement.', 'Lazy loading откладывает fetching associations до доступа. Hibernate implements it через proxies, persistent collections или bytecode enhancement.', [
      p('ManyToOne/OneToOne lazy associations can be represented by proxy objects containing only identifier until initialized.', 'ManyToOne/OneToOne lazy associations могут быть represented proxy objects with only identifier until initialized.'),
      p('OneToMany/ManyToMany are represented by persistent collection wrappers.', 'OneToMany/ManyToMany represented by persistent collection wrappers.'),
      p('Accessing lazy association outside an open persistence context causes LazyInitializationException.', 'Access lazy association outside open persistence context causes LazyInitializationException.'),
      p('Open Session in View hides this error but can move SQL into view/serialization layer and create N+1 in production.', 'Open Session in View hides this error, но может move SQL into view/serialization layer и create N+1 in production.'),
      p('Preferred solution: fetch exactly what use case needs inside transaction with fetch join, entity graph, DTO projection, or explicit query.', 'Preferred solution: fetch exactly what use case needs inside transaction через fetch join, entity graph, DTO projection или explicit query.'),
    ], [
      `@Transactional(readOnly = true)
OrderDetails getOrderDetails(long orderId) {
    Order order = orderRepository.findWithLines(orderId)
        .orElseThrow();

    // lines are loaded inside transaction, mapping is safe
    return OrderDetails.from(order);
}

@Query("""
    select o
    from Order o
    join fetch o.lines
    where o.id = :id
""")
Optional<Order> findWithLines(long id);`,
    ]),
    chapter('N+1 problem and fetch strategies', 'N+1 problem и fetch strategies', 'N+1 means one query loads root entities, then one additional query is executed for each root when a lazy association is accessed.', 'N+1 означает: один query загружает root entities, затем один дополнительный query выполняется для каждого root при доступе к lazy association.', [
      p('Example: select 100 orders, then access order.customer for each order -> 101 queries.', 'Example: select 100 orders, then access order.customer for each order -> 101 queries.'),
      p('JOIN FETCH solves many cases but can duplicate rows and explode result size for multiple collections.', 'JOIN FETCH solves many cases, но can duplicate rows и explode result size for multiple collections.'),
      p('@EntityGraph is a declarative way to specify fetch plan for repository methods.', '@EntityGraph - declarative way specify fetch plan for repository methods.'),
      p('@BatchSize or hibernate.default_batch_fetch_size can reduce N+1 by loading lazy associations in batches.', '@BatchSize или hibernate.default_batch_fetch_size reduce N+1 by loading lazy associations in batches.'),
      p('DTO projections are often best for read APIs because they fetch exactly needed columns.', 'DTO projections often best for read APIs, потому что fetch exactly needed columns.'),
    ], [
      `// Bad: can produce N+1
List<Order> orders = orderRepository.findAll();
for (Order order : orders) {
    System.out.println(order.getCustomer().getName());
}`,
      `// Option 1: EntityGraph
@EntityGraph(attributePaths = {"customer", "lines"})
List<Order> findByStatus(OrderStatus status);

// Option 2: DTO projection
@Query("""
    select new com.example.OrderRow(o.id, c.name, o.total)
    from Order o
    join o.customer c
    where o.status = :status
""")
List<OrderRow> findRows(OrderStatus status);`,
    ]),
    chapter('Transactions in Spring + JPA', 'Транзакции в Spring + JPA', '@Transactional opens a database transaction and binds an EntityManager/persistence context to the current thread through a Spring proxy.', '@Transactional opens database transaction и binds EntityManager/persistence context to current thread through Spring proxy.', [
      p('The annotation works when the call enters through a Spring proxy. Self-invocation can bypass transaction advice.', 'Annotation works when call enters through Spring proxy. Self-invocation can bypass transaction advice.'),
      p('readOnly = true can optimize flush behavior and communicates intent, but it is not a database security guarantee.', 'readOnly = true can optimize flush behavior and communicates intent, но это не database security guarantee.'),
      p('Propagation.REQUIRED joins existing transaction or creates a new one. REQUIRES_NEW suspends existing transaction and opens a new one.', 'Propagation.REQUIRED joins existing transaction or creates new one. REQUIRES_NEW suspends existing transaction and opens new one.'),
      p('Rollback defaults to RuntimeException/Error. Checked exceptions need rollbackFor if they should roll back.', 'Rollback defaults to RuntimeException/Error. Checked exceptions need rollbackFor if they should roll back.'),
      p('Keep transactions short. Do not hold DB transaction while doing slow remote HTTP calls if avoidable.', 'Keep transactions short. Do not hold DB transaction while doing slow remote HTTP calls if avoidable.'),
    ], [
      `@Service
class OrderService {
    @Transactional
    public void pay(long orderId) {
        Order order = orders.getReferenceById(orderId);
        order.markPaid();       // dirty checking
        events.save(order.paidEvent());
    }
}`,
    ]),
    chapter('Database-aware Hibernate best practices', 'Hibernate best practices с учетом database', 'Hibernate is productive only when the team still owns SQL shape, schema evolution, indexes, constraints, and transaction cost.', 'Hibernate productive только когда команда все равно владеет SQL shape, schema evolution, indexes, constraints и transaction cost.', [
      p('Use Flyway or Liquibase for production schema. Hibernate ddl-auto should usually be validate in real environments, not update.', 'Используйте Flyway или Liquibase для production schema. Hibernate ddl-auto в real environments обычно должен быть validate, а не update.'),
      p('Do not rely on JPA annotations alone for indexes and constraints. Create and review production DDL migrations explicitly.', 'Не полагайтесь только на JPA annotations для indexes и constraints. Создавайте и review-ьте production DDL migrations явно.'),
      p('Every important repository method should have known SQL shape, expected query count, and matching indexes.', 'У каждого важного repository method должны быть known SQL shape, expected query count и matching indexes.'),
      p('Prefer DTO projections for read-heavy endpoints. Entities are best when you need lifecycle, dirty checking, and domain state changes.', 'Предпочитайте DTO projections для read-heavy endpoints. Entities лучше, когда нужны lifecycle, dirty checking и domain state changes.'),
      p('Use @Version for optimistic locking on rows edited by multiple users or processes.', 'Используйте @Version для optimistic locking на rows, которые редактируют несколько users или processes.'),
      p('Keep Open Session in View disabled for APIs unless there is a deliberate reason. Map DTOs inside service transaction.', 'Держите Open Session in View disabled для APIs, если нет осознанной причины. Map-ьте DTOs внутри service transaction.'),
      p('Batch writes require Hibernate batching settings and ID strategy awareness. IDENTITY generation can limit batching.', 'Batch writes требуют Hibernate batching settings и понимания ID strategy. IDENTITY generation может ограничивать batching.'),
    ], [
      `spring.jpa.hibernate.ddl-auto=validate
spring.jpa.open-in-view=false
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true`,
      `-- Migration, not hidden runtime schema update.
create unique index concurrently uq_user_active_email
    on app_user (lower(email))
    where status <> 'DELETED';`,
    ]),
    chapter('Optimistic and pessimistic locking', 'Optimistic и pessimistic locking', 'Locking protects consistency when concurrent transactions update the same data.', 'Locking protects consistency, когда concurrent transactions update same data.', [
      p('Optimistic locking uses @Version. UPDATE includes version in WHERE clause; if no row updated, Hibernate throws OptimisticLockException.', 'Optimistic locking uses @Version. UPDATE includes version in WHERE clause; if no row updated, Hibernate throws OptimisticLockException.'),
      p('Optimistic locking is good when conflicts are rare and you prefer retry/user conflict handling.', 'Optimistic locking good when conflicts rare and prefer retry/user conflict handling.'),
      p('Pessimistic locking uses database locks such as SELECT FOR UPDATE and blocks competing transactions.', 'Pessimistic locking uses DB locks like SELECT FOR UPDATE and blocks competing transactions.'),
      p('Pessimistic locking is useful for high-contention critical resources but can cause deadlocks and throughput loss.', 'Pessimistic locking useful for high-contention critical resources, but can cause deadlocks and throughput loss.'),
    ], [
      `@Entity
class Product {
    @Id
    private Long id;

    @Version
    private long version;

    private int stock;

    void reserve(int quantity) {
        if (stock < quantity) {
            throw new IllegalStateException("Not enough stock");
        }
        stock -= quantity;
    }
}`,
      `@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("select p from Product p where p.id = :id")
Optional<Product> findForUpdate(long id);`,
    ]),
    chapter('equals/hashCode for entities', 'equals/hashCode для entities', 'Entity equality is subtle because identifiers can be generated after persist, proxies can subclass entities, and mutable fields can break collections.', 'Entity equality сложна, потому что identifiers могут generate after persist, proxies могут subclass entities, mutable fields могут break collections.', [
      p('Never base hashCode on mutable fields used inside HashSet/HashMap.', 'Never base hashCode on mutable fields used inside HashSet/HashMap.'),
      p('For generated IDs, equality before persist is tricky because id is null.', 'For generated IDs equality before persist tricky because id null.'),
      p('Business key equality works only if the business key is immutable and truly unique.', 'Business key equality works only if business key immutable and truly unique.'),
      p('Hibernate proxies can make getClass() equality checks fail; many teams use careful id-based equality or avoid putting entities in hash collections.', 'Hibernate proxies can make getClass() equality checks fail; many teams use careful id-based equality or avoid putting entities in hash collections.'),
    ], [
      `// Often safest for generated-id entities: do not use mutable business fields.
@Override
public boolean equals(Object other) {
    if (this == other) return true;
    if (!(other instanceof User user)) return false;
    return id != null && id.equals(user.id);
}

@Override
public int hashCode() {
    return getClass().hashCode();
}`,
    ]),
    chapter('Spring Data JPA repositories and save semantics', 'Spring Data JPA repositories и save semantics', 'Spring Data JPA creates repository implementations from interfaces using proxies and delegates persistence work to EntityManager.', 'Spring Data JPA creates repository implementations from interfaces using proxies и delegates persistence work to EntityManager.', [
      p('Method names can derive queries: findByEmailAndStatus.', 'Method names can derive queries: findByEmailAndStatus.'),
      p('@Query defines JPQL/native queries explicitly.', '@Query defines JPQL/native queries explicitly.'),
      p('save on a new entity usually calls persist; save on an existing/detached entity may call merge depending on isNew detection.', 'save on new entity usually calls persist; save on existing/detached entity may call merge depending on isNew detection.'),
      p('Inside a transaction, managed entity changes do not require save. Calling save repeatedly on managed entities is often noise.', 'Inside transaction, managed entity changes do not require save. Calling save repeatedly on managed entities often noise.'),
      p('Repositories are convenient but can hide query costs. Always inspect generated SQL for important paths.', 'Repositories convenient but can hide query costs. Always inspect generated SQL for important paths.'),
    ], [
      `@Transactional
void changeName(long userId, String name) {
    User user = userRepository.findById(userId).orElseThrow();
    user.rename(name);

    // userRepository.save(user) is not required here.
    // Managed entity will be flushed by dirty checking.
}`,
    ]),
    chapter('Specifications and Criteria API', 'Specifications и Criteria API', 'Specification is a composable predicate used by Spring Data JPA to build dynamic Criteria queries.', 'Specification - composable predicate, который Spring Data JPA использует для dynamic Criteria queries.', [
      p('Useful when filters are optional and can be combined.', 'Useful when filters optional and can be combined.'),
      p('Good for admin/search screens with many optional filters.', 'Good for admin/search screens with many optional filters.'),
      p('Can become hard to read if business query language grows too large.', 'Can become hard to read if business query language grows too large.'),
      p('Still requires SQL/index awareness because generated SQL can be inefficient.', 'Still requires SQL/index awareness because generated SQL can be inefficient.'),
    ], [
      `static Specification<User> emailContains(String email) {
    return (root, query, cb) ->
        email == null ? cb.conjunction() :
        cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%");
}

static Specification<User> activeOnly(Boolean active) {
    return (root, query, cb) ->
        active == null ? cb.conjunction() : cb.equal(root.get("active"), active);
}

List<User> result = userRepository.findAll(
    emailContains(filter.email()).and(activeOnly(filter.active()))
);`,
    ]),
    chapter('Production checklist: what seniors check first', 'Production checklist: что senior проверяет первым', 'Hibernate issues in production are usually query shape, transaction scope, fetch plan, cache misuse, locking, or entity modeling problems.', 'Hibernate issues в production обычно связаны с query shape, transaction scope, fetch plan, cache misuse, locking или entity modeling problems.', [
      p('Enable SQL logging carefully in dev/test; use p6spy/datasource-proxy or Hibernate statistics for analysis.', 'Enable SQL logging carefully in dev/test; use p6spy/datasource-proxy or Hibernate statistics for analysis.'),
      p('Watch query count per request. N+1 often hides until data grows.', 'Watch query count per request. N+1 often hides until data grows.'),
      p('Avoid exposing entities directly from REST. Map to DTOs inside transaction with explicit fetch plan.', 'Avoid exposing entities directly from REST. Map to DTOs inside transaction with explicit fetch plan.'),
      p('Use pagination for collections. Never load unbounded associations into memory.', 'Use pagination for collections. Never load unbounded associations into memory.'),
      p('Choose cache only after measuring read patterns, update frequency, staleness tolerance, and cluster invalidation cost.', 'Choose cache only after measuring read patterns, update frequency, staleness tolerance, and cluster invalidation cost.'),
      p('Use database constraints and indexes. ORM annotations do not replace database correctness/performance design.', 'Use database constraints and indexes. ORM annotations do not replace database correctness/performance design.'),
    ]),
  ],
  'spring-security-application-security': [
    chapter('Authentication and JWT flow', 'Authentication и JWT flow', 'JWT authentication usually validates Authorization Bearer token, signature, issuer, audience, expiration, and authorities claims.', 'JWT authentication обычно validates Authorization Bearer token, signature, issuer, audience, expiration и authorities claims.', [
      p('Authentication answers who the user/client is.', 'Authentication answers who user/client is.'),
      p('Authorization answers whether that principal may perform this action on this resource.', 'Authorization answers whether principal may perform action on resource.'),
      p('JWT should be short-lived; refresh tokens need stronger storage and rotation strategy.', 'JWT should be short-lived; refresh tokens need stronger storage and rotation strategy.'),
    ]),
    chapter('SecurityContext and filters', 'SecurityContext и filters', 'Spring Security stores authentication in SecurityContext for the current request/thread.', 'Spring Security stores authentication in SecurityContext for current request/thread.', [
      p('Filters run before Spring MVC controller methods.', 'Filters run before Spring MVC controller methods.'),
      p('A resource server validates token and creates Authentication object.', 'Resource server validates token and creates Authentication object.'),
      p('Method security can apply @PreAuthorize after HTTP filter authorization.', 'Method security can apply @PreAuthorize after HTTP filter authorization.'),
    ]),
  ],
};
