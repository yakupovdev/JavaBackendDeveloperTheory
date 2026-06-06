import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import Fuse from 'fuse.js';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  BookOpen,
  Check,
  ChevronDown,
  Clipboard,
  Code2,
  Database,
  GitBranch,
  Languages,
  Layers3,
  Menu,
  Moon,
  Network,
  ShieldCheck,
  Search,
  Sun,
  X,
} from 'lucide-react';
import './styles.css';
import { content, groups } from './theoryContent';

const UI = {
  en: {
    appTitle: 'Java Backend Developer Theory',
    subtitle: 'Senior-oriented Java backend knowledge base with deep internals.',
    search: 'Search all Java backend topics...',
    noResults: 'No topics found',
    keyMethods: 'Core Methods',
    examples: 'Code Examples',
    interview: 'Interview Questions',
    underHood: 'Deep Dive & Under the Hood',
    mechanics: 'What Really Happens Under the Hood',
    detailedNotes: 'Detailed Study Notes',
    chapters: 'Complete Knowledge Map',
    diagram: 'Visual Schema',
    methodsHint: 'API surface and mental model',
    roadmapStage: 'Roadmap stage',
    chaptersCount: 'Chapters',
    examplesCount: 'Examples',
    faqCount: 'FAQ',
    methodsCount: 'Methods',
    copy: 'Copy code',
    copied: 'Copied',
    openMenu: 'Open navigation',
    closeMenu: 'Close navigation',
    light: 'Light mode',
    dark: 'Dark mode',
  },
  ru: {
    appTitle: 'Теория Java Backend Developer',
    subtitle: 'Senior-oriented база знаний по Java backend с глубокими internals.',
    search: 'Поиск по всем Java backend темам...',
    noResults: 'Темы не найдены',
    keyMethods: 'Ключевые методы',
    examples: 'Примеры кода',
    interview: 'Вопросы на собеседовании',
    underHood: 'Глубокое погружение',
    mechanics: 'Что реально происходит под капотом',
    detailedNotes: 'Подробный разбор',
    chapters: 'Полная карта знаний',
    diagram: 'Визуальная схема',
    methodsHint: 'API и ментальная модель',
    roadmapStage: 'Уровень roadmap',
    chaptersCount: 'Главы',
    examplesCount: 'Примеры',
    faqCount: 'FAQ',
    methodsCount: 'Методы',
    copy: 'Скопировать код',
    copied: 'Скопировано',
    openMenu: 'Открыть навигацию',
    closeMenu: 'Закрыть навигацию',
    light: 'Светлая тема',
    dark: 'Темная тема',
  },
};

const AppContext = createContext(null);

function useApp() {
  return useContext(AppContext);
}

function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeId, setActiveId] = useState(content[0].id);
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const searchIndex = useMemo(() => {
    const records = content.map((topic) => ({
      id: topic.id,
      groupId: topic.groupId,
      title: topic.title[language],
      intro: topic.intro[language],
      deepDive: topic.deepDive[language],
      mechanics: topic.mechanics?.map((item) => item[language]).join(' ') || '',
      details: topic.details?.map((section) => `${section.title[language]} ${section.points.map((point) => point[language]).join(' ')}`).join(' ') || '',
      chapters: topic.chapters?.map((chapter) => [
        chapter.title[language],
        chapter.body?.[language],
        chapter.points?.map((point) => point[language]).join(' '),
        chapter.examples?.join(' '),
      ].filter(Boolean).join(' ')).join(' ') || '',
      methods: topic.methods.map((item) => `${item.name} ${item.description[language]}`).join(' '),
      questions: topic.faq.map((item) => `${item.question[language]} ${item.answer[language]}`).join(' '),
    }));

    return new Fuse(records, {
      keys: ['title', 'intro', 'deepDive', 'mechanics', 'details', 'chapters', 'methods', 'questions'],
      threshold: 0.32,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [language]);

  const filteredIds = useMemo(() => {
    if (!query.trim()) return content.map((topic) => topic.id);
    return searchIndex.search(query.trim()).map((result) => result.item.id);
  }, [query, searchIndex]);

  const value = {
    activeId,
    filteredIds,
    language,
    query,
    sidebarOpen,
    t: UI[language],
    theme,
    setActiveId,
    setLanguage,
    setQuery,
    setSidebarOpen,
    setTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function Header() {
  const { language, setLanguage, setQuery, query, setTheme, theme, t, setSidebarOpen } = useApp();

  return (
    <header className="app-header">
      <div className="header-inner">
        <button
          className="icon-button lg:hidden"
          aria-label={t.openMenu}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
        <div className="brand-block">
          <span className="brand-icon">
            <BookOpen size={20} />
          </span>
          <div className="min-w-0">
            <h1>{t.appTitle}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>
        <label className="search-shell hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="search-input"
            placeholder={t.search}
          />
        </label>
        <div className="header-actions">
          <button
            className="control-button"
            onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
            aria-label="Change language"
          >
            <Languages size={17} />
            <span>{language.toUpperCase()}</span>
          </button>
          <button
            className="icon-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? t.light : t.dark}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </div>
      <div className="mobile-search sm:hidden">
        <label className="search-shell block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="search-input"
            placeholder={t.search}
          />
        </label>
      </div>
    </header>
  );
}

function Sidebar() {
  const { activeId, filteredIds, language, setActiveId, sidebarOpen, setSidebarOpen, t } = useApp();
  const visible = new Set(filteredIds);
  const grouped = groups
    .map((group) => ({
      ...group,
      topics: content.filter((topic) => topic.groupId === group.id && visible.has(topic.id)),
    }))
    .filter((group) => group.topics.length > 0);

  const panel = (
    <aside className="sidebar-shell">
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-neutral-800 lg:hidden">
        <span className="font-semibold text-slate-950 dark:text-white">{t.appTitle}</span>
        <button className="icon-button" aria-label={t.closeMenu} onClick={() => setSidebarOpen(false)}>
          <X size={19} />
        </button>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {grouped.length === 0 ? (
          <p className="px-3 text-sm text-slate-500 dark:text-slate-400">{t.noResults}</p>
        ) : (
          grouped.map((group) => (
            <section key={group.id} className="mb-5">
              <h2 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {group.title[language]}
              </h2>
              <div className="space-y-1.5">
                {group.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveId(topic.id);
                      setSidebarOpen(false);
                    }}
                    className={`nav-item ${activeId === topic.id ? 'nav-item-active' : ''}`}
                  >
                    <span>{topic.title[language]}</span>
                    {topic.stage && <span className="nav-stage">{topic.stage}</span>}
                  </button>
                ))}
              </div>
            </section>
          ))
        )}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{panel}</div>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/45 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              className="h-full"
              initial={{ x: -340 }}
              animate={{ x: 0 }}
              exit={{ x: -340 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(event) => event.stopPropagation()}
            >
              {panel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MermaidDiagram({ chart }) {
  const { theme } = useApp();
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let mounted = true;
    const diagramId = `diagram-${Math.random().toString(36).slice(2)}`;
    const cleanupMermaidArtifacts = () => {
      const selectors = [
        `#d${diagramId}`,
        `[id="d${diagramId}"]`,
        '[id^="dmermaid-"]',
        '[id^="ddiagram-"]',
        '.mermaidTooltip',
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((node) => {
          if (!node.closest('.diagram')) node.remove();
        });
      });
    };

    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      flowchart: { curve: 'basis' },
    });

    cleanupMermaidArtifacts();

    mermaid.render(diagramId, chart).then(({ svg: rendered }) => {
      if (mounted) setSvg(rendered);
      requestAnimationFrame(cleanupMermaidArtifacts);
    }).catch(() => {
      if (mounted) setSvg('');
      requestAnimationFrame(cleanupMermaidArtifacts);
    });

    return () => {
      mounted = false;
      cleanupMermaidArtifacts();
    };
  }, [chart, theme]);

  return <div className="diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}

function CodeBlock({ code }) {
  const { t, theme } = useApp();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-shell">
      <div className="code-toolbar">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
          <Code2 size={15} /> Java
        </span>
        <button className="copy-button" onClick={copy}>
          {copied ? <Check size={15} /> : <Clipboard size={15} />}
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <SyntaxHighlighter
        language="java"
        style={theme === 'dark' ? oneDark : oneLight}
        customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.9rem' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

function Accordion({ items }) {
  const { language } = useApp();
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.question.en} className="faq-item">
          <button
            className="faq-trigger"
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            <span>{item.question[language]}</span>
            <ChevronDown className={`shrink-0 transition ${open === index ? 'rotate-180' : ''}`} size={18} />
          </button>
          <AnimatePresence initial={false}>
            {open === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="faq-answer">
                  {item.answer[language]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ChapterList({ chapters }) {
  const { language } = useApp();

  return (
    <div className="chapter-list">
      {chapters.map((chapter, index) => (
        <section className="chapter-panel" key={chapter.title.en}>
          <div className="chapter-index">{String(index + 1).padStart(2, '0')}</div>
          <div className="min-w-0 flex-1">
            <h4>{chapter.title[language]}</h4>
            {chapter.body && <p>{chapter.body[language]}</p>}
            {chapter.points?.length > 0 && (
              <ul>
                {chapter.points.map((item) => (
                  <li key={item.en}>{item[language]}</li>
                ))}
              </ul>
            )}
            {chapter.examples?.map((example) => (
              <CodeBlock key={example.slice(0, 40)} code={example} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TopicStats({ topic }) {
  const { t } = useApp();
  const examplesCount = topic.examples.length + (topic.chapters?.reduce((sum, chapter) => sum + (chapter.examples?.length || 0), 0) || 0);
  const stats = [
    { label: t.chaptersCount, value: topic.chapters?.length || 0, icon: Layers3 },
    { label: t.examplesCount, value: examplesCount, icon: Code2 },
    { label: t.faqCount, value: topic.faq.length, icon: BookOpen },
    { label: t.methodsCount, value: topic.methods.length, icon: Database },
  ];

  return (
    <div className="topic-stats">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div className="topic-stat" key={stat.label}>
            <Icon size={17} />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function TopicPage() {
  const { activeId, language, t } = useApp();
  const topic = content.find((item) => item.id === activeId) || content[0];
  const group = groups.find((item) => item.id === topic.groupId);
  const stageIcons = {
    Basic: GitBranch,
    Beginner: BookOpen,
    Fundamentals: Layers3,
    Specialization: ShieldCheck,
  };
  const StageIcon = stageIcons[topic.stage] || Network;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeId]);

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={`${topic.id}-${language}`}
        initial={{ opacity: 0.96, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.92, y: -6 }}
        transition={{ duration: 0.16 }}
        className="page-shell"
      >
        <div className="topic-hero">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="topic-pill">
                <StageIcon size={15} />
                {topic.stage ? `${t.roadmapStage}: ${topic.stage}` : group?.title[language]}
              </span>
              <span className="topic-pill muted">{group?.title[language]}</span>
            </div>
            <h2>{topic.title[language]}</h2>
            <p>{topic.intro[language]}</p>
          </div>
          <TopicStats topic={topic} />
        </div>

        <div className="learning-grid">
          <section className="content-section">
            <h3>{t.underHood}</h3>
            <p>{topic.deepDive[language]}</p>
          </section>

          {topic.mechanics?.length > 0 && (
            <section className="content-section">
              <h3>{t.mechanics}</h3>
              <div className="mechanics-grid">
                {topic.mechanics.map((item, index) => (
                  <div className="mechanic-card" key={item.en}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item[language]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {topic.details?.length > 0 && (
          <section className="content-section">
            <h3>{t.detailedNotes}</h3>
            <div className="details-stack">
              {topic.details.map((section) => (
                <div className="detail-panel" key={section.title.en}>
                  <h4>{section.title[language]}</h4>
                  <ul>
                    {section.points.map((point) => (
                      <li key={point.en}>{point[language]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {topic.chapters?.length > 0 && (
          <section className="content-section">
            <h3>{t.chapters}</h3>
            <ChapterList chapters={topic.chapters} />
          </section>
        )}

        <section className="content-section">
          <h3>{t.diagram}</h3>
          <MermaidDiagram chart={topic.diagram} />
        </section>

        <section className="content-section">
          <h3>{t.keyMethods}</h3>
          <div className="table-shell">
            <table className="method-table">
              <tbody>
                {topic.methods.map((method) => (
                  <tr key={method.name}>
                    <th>
                      {method.name}
                    </th>
                    <td>{method.description[language]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section">
          <h3>{t.examples}</h3>
          {topic.examples.map((example) => (
            <CodeBlock key={example.slice(0, 30)} code={example} />
          ))}
        </section>

        <section className="content-section">
          <h3>{t.interview}</h3>
          <Accordion items={topic.faq} />
        </section>
      </motion.article>
    </AnimatePresence>
  );
}

function Shell() {
  return (
    <AppProvider>
      <div className="app-shell">
        <Sidebar />
        <div className="lg:pl-[21.5rem]">
          <Header />
          <main>
            <TopicPage />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

createRoot(document.getElementById('root')).render(<Shell />);
