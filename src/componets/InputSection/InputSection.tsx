'use client';


import { InputPanelProps } from '@/types';



export default function InputPanel({
    inputText,
    handleInputChange,
    loadPreset,
    clearInput,
    // toggleVoiceDictation,
    isDictating,
    wordCount,
    charCount,
    executeAnalysis,
    isAnalyzing
}: InputPanelProps) {
    return (
        <section className="lg:col-span-5 glass-panel rounded-2xl p-5 lg:p-6 shadow-xl flex flex-col gap-5 border border-slate-800/80 light:border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-3">
                <h2 className="text-base font-semibold text-white light:text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-sliders text-indigo-400"></i> Input & Configuration
                </h2>
                <span className="text-xs text-slate-400">Neural Pipeline Ready</span>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600">Quick Review Presets</label>
                    <span className="text-[10px] text-indigo-400 font-mono">Sample input</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => loadPreset('positive')}
                        className="px-2.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-all text-left flex flex-col gap-1"
                    >
                        <span className="font-bold flex items-center gap-1"><i className="fa-solid fa-star text-[10px]"></i> 5-Star</span>
                        <span className="text-[10px] text-emerald-300/70 truncate">Glowing Review</span>
                    </button>
                    <button
                        onClick={() => loadPreset('negative')}
                        className="px-2.5 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-medium transition-all text-left flex flex-col gap-1"
                    >
                        <span className="font-bold flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation text-[10px]"></i> 1-Star</span>
                        <span className="text-[10px] text-rose-300/70 truncate">Delivery Rant</span>
                    </button>
                    <button
                        onClick={() => loadPreset('neutral')}
                        className="px-2.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 text-xs font-medium transition-all text-left flex flex-col gap-1"
                    >
                        <span className="font-bold flex items-center gap-1"><i className="fa-solid fa-scale-balanced text-[10px]"></i> Mixed</span>
                        <span className="text-[10px] text-amber-300/70 truncate">Feature Feedback</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor="review-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600">Text Corpus Input</label>
                    <div className="flex items-center gap-2">
                        {/* <button
                            onClick={toggleVoiceDictation}
                            className="text-xs text-slate-400 hover:text-indigo-400 transition-colors p-1"
                            title="Voice Dictation"
                        >
                            <i className={isDictating ? "fa-solid fa-microphone-lines text-rose-500 animate-pulse" : "fa-solid fa-microphone"}></i>
                        </button> */}
                        <button
                            onClick={clearInput}
                            className="text-xs text-slate-400 hover:text-rose-400 transition-colors p-1"
                            title="Clear Text"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className="relative flex-1">
                    <textarea
                        id="review-input"
                        rows={6}
                        value={inputText}
                        onChange={handleInputChange}
                        className="w-full h-full min-h-40 bg-obsidian-900/90 light:bg-white text-slate-200 light:text-slate-800 border border-slate-700 light:border-slate-300 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans resize-none"
                        placeholder={isDictating ? "Listening... Speak clearly into your microphone..." : "Paste or type customer review text here for deep neural sentiment analysis..."}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 light:text-slate-600 font-mono">
                    <span>{wordCount} words</span>
                    <span>{charCount} / 2000 chars</span>
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600 mb-2">Active Neural Analysis Heads</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-200 cursor-pointer hover:border-slate-700">
                        <input type="checkbox" checked disabled className="rounded text-indigo-500 focus:ring-0 bg-slate-800" />
                        <span className="text-slate-300 light:text-slate-700 font-medium">Bi-LSTM Sentiment</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-200 cursor-pointer hover:border-slate-700">
                        <input type="checkbox" defaultChecked className="rounded text-indigo-500 focus:ring-0 bg-slate-800" />
                        <span className="text-slate-300 light:text-slate-700 font-medium">Intent Classifier</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-200 cursor-pointer hover:border-slate-700">
                        <input type="checkbox" defaultChecked className="rounded text-indigo-500 focus:ring-0 bg-slate-800" />
                        <span className="text-slate-300 light:text-slate-700 font-medium">Emotion Detection</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-200 cursor-pointer hover:border-slate-700">
                        <input type="checkbox" defaultChecked className="rounded text-indigo-500 focus:ring-0 bg-slate-800" />
                        <span className="text-slate-300 light:text-slate-700 font-medium">Aspect Risk Score</span>
                    </label>
                </div>
            </div>

            <button
                onClick={executeAnalysis}
                disabled={isAnalyzing}
                className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg glow-indigo transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
            >
                <i className={isAnalyzing ? "fa-solid fa-circle-notch animate-spin" : "fa-solid fa-wand-magic-sparkles"}></i>
                <span>{isAnalyzing ? "Processing Bi-LSTM Layers..." : "Run Deep Neural Analysis"}</span>
            </button>
        </section>
    );
}