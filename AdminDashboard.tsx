import { useState, type ChangeEvent } from 'react';
import type { FAQItem } from './data/faqData';
import { categories } from './data/faqData';
import type { SiteLinks } from './siteLinks';
import { LINK_LABELS, DEFAULT_LINKS } from './siteLinks';

export function AdminDashboard({
  faqs,
  setFaqs,
  logoSrc,
  setLogoSrc,
  links,
  setLinks,
  onClose
}: {
  faqs: FAQItem[];
  setFaqs: (faqs: FAQItem[]) => void;
  logoSrc: string;
  setLogoSrc: (logoSrc: string) => void;
  links: SiteLinks;
  setLinks: (links: SiteLinks) => void;
  onClose: () => void;
}) {
  // ── FAQ editing state ──────────────────────────────────────────────────────
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [filterCat, setFilterCat] = useState<string | null>(null);

  // ── Links editing state ────────────────────────────────────────────────────
  const [draftLinks, setDraftLinks] = useState<SiteLinks>({ ...links });
  const [linksSaved, setLinksSaved] = useState(false);

  // ── Active tab ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'faqs' | 'links' | 'logo'>('faqs');

  // ── FAQ handlers ───────────────────────────────────────────────────────────
  const startEdit = (item: FAQItem) => {
    setEditingItem(item);
    setQuestion(item.question);
    setAnswer(item.answer);
    setCategory(item.category);
    setIsAdding(false);
  };
  const startAdd = () => {
    setEditingItem(null);
    setQuestion('');
    setAnswer('');
    setCategory(categories[0]);
    setIsAdding(true);
  };
  const cancelEdit = () => { setEditingItem(null); setIsAdding(false); };
  const handleSave = () => {
    if (!question.trim() || !answer.trim()) return;
    if (isAdding) {
      const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
      setFaqs([...faqs, { id: newId, question, answer, category }]);
    } else if (editingItem) {
      setFaqs(faqs.map(f => f.id === editingItem.id ? { ...f, question, answer, category } : f));
    }
    setIsAdding(false);
    setEditingItem(null);
  };
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this FAQ? This cannot be undone.')) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  // ── Logo handlers ──────────────────────────────────────────────────────────
  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please upload a valid image file.'); return; }
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === 'string') setLogoSrc(reader.result); };
    reader.readAsDataURL(file);
    event.target.value = '';
  };
  const handleLogoReset = () => setLogoSrc('/logo.png');

  // ── Links handlers ─────────────────────────────────────────────────────────
  const handleLinkChange = (key: keyof SiteLinks, value: string) => {
    setDraftLinks(prev => ({ ...prev, [key]: value }));
    setLinksSaved(false);
  };
  const handleLinksSave = () => {
    setLinks(draftLinks);
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 2500);
  };
  const handleLinksReset = () => {
    setDraftLinks({ ...DEFAULT_LINKS });
    setLinks(DEFAULT_LINKS);
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 2500);
  };

  const displayedFaqs = filterCat ? faqs.filter(f => f.category === filterCat) : faqs;

  const tabBtn = (id: typeof activeTab, label: string, emoji: string) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
        activeTab === id
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/20'
          : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700'
      }`}
    >
      <span>{emoji}</span> {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col font-sans animate-fade-in">
      {/* ── Header ── */}
      <header className="bg-[#0d1117] border-b border-gray-800 px-6 py-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Vyxo Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage FAQs, Links & Content</p>
          </div>
        </div>
        <button onClick={onClose}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer border border-gray-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close Admin
        </button>
      </header>

      {/* ── Tab nav ── */}
      <div className="bg-[#0d1117] border-b border-gray-800 px-6 py-3 flex items-center gap-3 shrink-0 overflow-x-auto">
        {tabBtn('faqs', 'FAQs', '❓')}
        {tabBtn('links', 'Button Links', '🔗')}
        {tabBtn('logo', 'Logo', '🖼️')}
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto bg-[#0a0a0f]">

        {/* ══ TAB: BUTTON LINKS ══════════════════════════════════════════════ */}
        {activeTab === 'links' && (
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="bg-gray-900/60 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white">🔗 Button Link Manager</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Edit the destination URL for every button on the FAQ page. Changes are saved instantly.
                  </p>
                </div>
                {linksSaved && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold animate-fade-in shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </div>
                )}
              </div>

              <div className="divide-y divide-gray-800">
                {(Object.keys(LINK_LABELS) as (keyof SiteLinks)[]).map(key => {
                  const meta = LINK_LABELS[key];
                  return (
                    <div key={key} className="px-6 py-5 group">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl mt-0.5">{meta.icon}</span>
                        <div>
                          <div className="font-semibold text-white text-sm">{meta.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{meta.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <input
                            type="url"
                            value={draftLinks[key]}
                            onChange={e => handleLinkChange(key, e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-cyan-500 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-600"
                          />
                        </div>
                        <a
                          href={draftLinks[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Test this link"
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-cyan-500/20 text-gray-500 hover:text-cyan-400 border border-gray-700 hover:border-cyan-500/30 transition-all shrink-0"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                      {draftLinks[key] !== links[key] && (
                        <p className="text-xs text-amber-400 mt-2 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Unsaved change
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-5 border-t border-gray-800 flex items-center gap-3">
                <button
                  onClick={handleLinksSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Save All Links
                </button>
                <button
                  onClick={handleLinksReset}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-xl transition-colors cursor-pointer border border-gray-700"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>

            {/* Preview card */}
            <div className="bg-gray-900/60 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-widest">Live Preview of Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(LINK_LABELS) as (keyof SiteLinks)[]).map(key => {
                  const meta = LINK_LABELS[key];
                  const url = links[key];
                  const isDefault = url === DEFAULT_LINKS[key];
                  return (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0f] rounded-xl border border-gray-800 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group">
                      <span className="text-xl shrink-0">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-300 truncate">{meta.label}</div>
                        <div className="text-xs text-gray-600 truncate">{url}</div>
                      </div>
                      {!isDefault && (
                        <span className="shrink-0 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">Custom</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: LOGO ══════════════════════════════════════════════════════ */}
        {activeTab === 'logo' && (
          <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="bg-gray-900/60 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-800">
                <h2 className="text-lg font-bold text-white">🖼️ Logo Management</h2>
                <p className="text-sm text-gray-500 mt-1">Upload a logo image to replace the default V icon. It will appear in the header and footer.</p>
              </div>

              <div className="px-6 py-6">
                {/* Preview */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-sky-400/10 rounded-full blur-xl" />
                    <div className="relative w-36 h-36 rounded-3xl bg-[#0a0a0f] border border-gray-800 flex items-center justify-center overflow-hidden shadow-xl">
                      {logoSrc ? (
                        <img src={logoSrc} alt="Logo preview" className="w-full h-full object-contain p-3" />
                      ) : (
                        <span className="text-5xl font-black text-white">V</span>
                      )}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">Current logo</div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-sm text-gray-300 font-medium mb-3">Accepted formats: PNG, JPG, JPEG, SVG, WebP</p>
                      <label className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl text-sm font-semibold cursor-pointer shadow-lg shadow-cyan-500/20 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload New Logo
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-gray-800" />
                      <span className="text-xs text-gray-600">or</span>
                      <div className="h-px flex-1 bg-gray-800" />
                    </div>

                    <button onClick={handleLogoReset}
                      className="flex items-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl text-sm font-semibold border border-gray-700 transition-colors cursor-pointer">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset to Default (/logo.png)
                    </button>
                  </div>
                </div>

                <div className="bg-sky-500/5 border border-sky-500/15 rounded-xl px-4 py-3">
                  <p className="text-xs text-sky-400 leading-relaxed">
                    💡 <strong>Tip:</strong> Clicking the logo anywhere on the website takes visitors to your <strong>Logo Click Destination</strong> link — you can edit that URL in the <strong>Button Links</strong> tab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: FAQs ══════════════════════════════════════════════════════ */}
        {activeTab === 'faqs' && (
          <div className="flex flex-col md:flex-row h-full" style={{ minHeight: 'calc(100vh - 130px)' }}>
            {/* Left: form */}
            <div className="w-full md:w-2/5 p-6 border-r border-gray-800 bg-[#0d1117] overflow-y-auto space-y-4">
              <div className={`bg-gray-900/60 rounded-2xl p-6 border border-gray-800 ${!isAdding && !editingItem ? 'opacity-40 pointer-events-none select-none' : ''}`}>
                <h2 className="text-lg font-bold text-white mb-6">
                  {isAdding ? '✏️ Add New Question' : editingItem ? '📝 Edit Question' : 'Select a question to edit'}
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Question</label>
                    <input type="text" value={question} onChange={e => setQuestion(e.target.value)}
                      placeholder="Enter the question here..."
                      className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Answer</label>
                    <textarea value={answer} onChange={e => setAnswer(e.target.value)}
                      placeholder="Write the full answer here..." rows={10}
                      className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none placeholder-gray-600" />
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <button onClick={handleSave} disabled={!question.trim() || !answer.trim()}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-cyan-500/20">
                      {isAdding ? 'Add Question' : 'Save Changes'}
                    </button>
                    {(isAdding || editingItem) && (
                      <button onClick={cancelEdit}
                        className="px-6 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer border border-gray-700">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: list */}
            <div className="w-full md:w-3/5 p-6 overflow-y-auto bg-[#0a0a0f]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Existing Questions
                  <span className="bg-gray-800 text-gray-400 text-xs px-2.5 py-1 rounded-full border border-gray-700">{displayedFaqs.length} total</span>
                </h2>
                <button onClick={startAdd}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Question
                </button>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button onClick={() => setFilterCat(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filterCat === null ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-gray-800/60 text-gray-500 border border-gray-800 hover:text-gray-400"}`}>
                  All
                </button>
                {categories.map(c => (
                  <button key={c} onClick={() => setFilterCat(filterCat === c ? null : c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filterCat === c ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-gray-800/60 text-gray-500 border border-gray-800 hover:text-gray-400"}`}>
                    {c}
                  </button>
                ))}
              </div>

              <div className="grid gap-4">
                {displayedFaqs.map(item => (
                  <div key={item.id}
                    className={`bg-gray-900/60 border rounded-xl p-5 transition-all ${editingItem?.id === item.id ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(0,200,255,0.1)]' : 'border-gray-800 hover:border-gray-700'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="bg-gray-800 text-gray-500 text-xs px-2 py-0.5 rounded font-mono border border-gray-700">#{item.id}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded border border-cyan-500/20 text-cyan-400 bg-cyan-500/10">{item.category}</span>
                        </div>
                        <h3 className="text-gray-200 font-semibold mb-2 truncate" title={item.question}>{item.question}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{item.answer}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => startEdit(item)}
                          className="p-2 bg-gray-800/50 hover:bg-cyan-500/15 text-gray-500 hover:text-cyan-400 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-cyan-500/20" title="Edit">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536l12.232-12.232z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(item.id)}
                          className="p-2 bg-gray-800/50 hover:bg-red-500/15 text-gray-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-500/20" title="Delete">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {displayedFaqs.length === 0 && (
                  <div className="text-center py-12 text-gray-600">No FAQs available. Click "Add New Question" to create one.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
