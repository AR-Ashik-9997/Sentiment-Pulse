/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { OutputPanelProps } from '@/types';

export default function OutputPanel({
    inferenceTimestamp,
    analysisResult,
    copyAutoReply,
    copyStatus
}: OutputPanelProps) {
    return (
        <section className="lg:col-span-7 glass-panel rounded-2xl p-5 lg:p-6 shadow-xl flex flex-col gap-6 border border-slate-800/80 light:border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-3">
                <h2 className="text-base font-semibold text-white light:text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-microchip text-cyan-400"></i> AI Inference Engine Outputs
                </h2>
                <span className="text-xs font-mono text-slate-400">{inferenceTimestamp}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-obsidian-900/80 light:bg-slate-100 rounded-xl p-4 border border-slate-800 light:border-slate-200 flex flex-col justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600 mb-2">Overall Sentiment Classification</span>

                    <div className="flex items-center gap-3 my-2">
                        {!analysisResult ? (
                            <>
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl text-slate-400">
                                    <i className="fa-solid fa-equals"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-300 light:text-slate-700">Neutral / Unanalyzed</h3>
                                    <p className="text-xs text-slate-400">Run analysis to obtain predictions</p>
                                </div>
                            </>
                        ) : analysisResult.verdict === 'Positive' ? (
                            <>
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30">
                                    <i className="fa-solid fa-face-smile"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-emerald-400">Positive Sentiment</h3>
                                    <p className="text-xs text-slate-400">High customer satisfaction detected</p>
                                </div>
                            </>
                        ) : analysisResult.verdict === 'Negative' ? (
                            <>
                                <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl border border-rose-500/30">
                                    <i className="fa-solid fa-face-frown"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-rose-400">Negative Sentiment</h3>
                                    <p className="text-xs text-slate-400">Requires immediate attention or escalation</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl border border-amber-500/30">
                                    <i className="fa-solid fa-face-meh"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-amber-400">Neutral / Mixed</h3>
                                    <p className="text-xs text-slate-400">Balanced pros and cons expressed</p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/60 light:border-slate-200 text-xs text-slate-400">
                        <span>Dominant Polarity:</span>
                        <span className="font-mono font-semibold text-slate-200 light:text-slate-800">
                            {analysisResult ? (analysisResult.polarity > 0 ? `+${analysisResult.polarity}` : analysisResult.polarity) : '0.00'}
                        </span>
                    </div>
                </div>

                <div className="bg-obsidian-900/80 light:bg-slate-100 rounded-xl p-4 border border-slate-800 light:border-slate-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600">Model Confidence</span>
                        <span className="text-sm font-bold font-mono text-indigo-400">
                            {analysisResult ? `${analysisResult.confidence}%` : '0.0%'}
                        </span>
                    </div>
                    <div className="space-y-2 my-auto">
                        <div className="w-full h-3 bg-slate-800 light:bg-slate-300 rounded-full overflow-hidden p-0.5 border border-slate-700 light:border-slate-300">
                            <div
                                className="h-full bg-linear-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${analysisResult ? analysisResult.confidence : 0}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>50% Baseline</span>
                            <span>99.9% High Certainty</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-400 light:text-slate-500 mt-2">Softmax activation score from final Bi-LSTM dense layer.</p>
                </div>
            </div>

            {/* <div className="bg-obsidian-900/80 light:bg-slate-100 rounded-xl p-4 border border-slate-800 light:border-slate-200">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600">Bi-LSTM Attention Weight Heatmap</span>
                        <i className="fa-solid fa-circle-info text-slate-500 text-xs" title="Green highlights indicate positive word weights; Red indicates negative weights."></i>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-medium">
                        <span className="flex items-center gap-1 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-500 inline-block"></span> Positive</span>
                        <span className="flex items-center gap-1 text-rose-400"><span className="w-2.5 h-2.5 rounded-full bg-rose-500/40 border border-rose-500 inline-block"></span> Negative</span>
                    </div>
                </div>
                <div className="p-3 bg-obsidian-950/80 light:bg-white rounded-lg border border-slate-800 light:border-slate-300 min-h-22.5 text-sm leading-relaxed text-slate-300 light:text-slate-700">
                    {!analysisResult ? (
                        <p className="text-slate-500 italic text-xs">Run analysis to view word-level attention weights overlay...</p>
                    ) : (
                        <div className="flex flex-wrap gap-1">
                            {analysisResult.tokens.map((t: any, idx: number) => {
                                let bgStyle: React.CSSProperties = {};
                                let textColor = "text-slate-200 light:text-slate-800";

                                if (t.weight > 0.2) {
                                    const intensity = Math.min(1, t.weight);
                                    bgStyle = {
                                        backgroundColor: `rgba(16, 185, 129, ${0.15 + intensity * 0.35})`,
                                        border: '1px solid rgba(16, 185, 129, 0.4)'
                                    };
                                    textColor = "text-emerald-300 light:text-emerald-800";
                                } else if (t.weight < -0.2) {
                                    const intensity = Math.min(1, Math.abs(t.weight));
                                    bgStyle = {
                                        backgroundColor: `rgba(244, 63, 94, ${0.15 + intensity * 0.35})`,
                                        border: '1px solid rgba(244, 63, 94, 0.4)'
                                    };
                                    textColor = "text-rose-300 light:text-rose-800";
                                }

                                return (
                                    <span
                                        key={idx}
                                        className={`token-highlight ${textColor}`}
                                        style={bgStyle}
                                    >
                                        {t.word}
                                        <span className="token-tooltip bg-obsidian-900 light:bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg border border-slate-700">
                                            Weight: {t.weight > 0 ? '+' : ''}{t.weight.toFixed(3)}
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-obsidian-900/80 light:bg-slate-100 rounded-xl p-3 border border-slate-800 light:border-slate-200">
                    <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-2">Emotion Detection</span>
                    <div className="flex flex-wrap gap-1.5">
                        {!analysisResult ? (
                            <span className="text-xs text-slate-500 italic">No data</span>
                        ) : analysisResult.verdict === 'Positive' ? (
                            <>
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-500/30">Joy</span>
                                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[11px] font-medium border border-indigo-500/30">Trust</span>
                            </>
                        ) : analysisResult.verdict === 'Negative' ? (
                            <>
                                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] font-medium border border-rose-500/30">Frustration</span>
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-medium border border-amber-500/30">Urgency</span>
                            </>
                        ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 text-[11px] font-medium">Neutral</span>
                        )}
                    </div>
                </div>

                <div className="bg-obsidian-900/80 light:bg-slate-100 rounded-xl p-3 border border-slate-800 light:border-slate-200">
                    <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-2">Aspect Impact</span>
                    <div className="flex flex-wrap gap-1.5">
                        {!analysisResult ? (
                            <span className="text-xs text-slate-500 italic">No data</span>
                        ) : analysisResult.verdict === 'Positive' ? (
                            <>
                                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[11px] font-medium">Quality (+0.9)</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-medium">Shipping (+0.8)</span>
                            </>
                        ) : analysisResult.verdict === 'Negative' ? (
                            <>
                                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] font-medium">Support (-0.85)</span>
                                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] font-medium">Delivery (-0.92)</span>
                            </>
                        ) : (
                            <>
                                <span className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 text-[11px] font-medium">Feature (+0.2)</span>
                                <span className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 text-[11px] font-medium">Battery (-0.3)</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-obsidian-900/80 light:bg-slate-100 rounded-xl p-3 border border-slate-800 light:border-slate-200">
                    <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-2">Priority Level</span>
                    <div>
                        {!analysisResult ? (
                            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-semibold">Standard</span>
                        ) : analysisResult.verdict === 'Positive' ? (
                            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">Low Priority</span>
                        ) : analysisResult.priority === 'Critical' ? (
                            <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30 flex items-center gap-1">
                                <i className="fa-solid fa-triangle-exclamation animate-bounce"></i> Critical Risk
                            </span>
                        ) : analysisResult.verdict === 'Negative' ? (
                            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">High Priority</span>
                        ) : (
                            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium">Standard</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-obsidian-900/80 light:bg-slate-100 rounded-xl p-4 border border-slate-800 light:border-slate-200 relative">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600 flex items-center gap-1.5">
                        <i className="fa-solid fa-robot text-indigo-400"></i> AI Contextual Auto-Reply Generator
                    </span>
                    <button
                        onClick={copyAutoReply}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all flex items-center gap-1.5"
                    >
                        <i className="fa-regular fa-copy"></i>
                        <span>{copyStatus}</span>
                    </button>
                </div>
                <div className="p-3 bg-obsidian-950/80 light:bg-white rounded-lg border border-slate-800 light:border-slate-300 text-xs text-slate-300 light:text-slate-700 font-sans min-h-15 flex items-center">
                    {!analysisResult ? (
                        <p className="text-slate-500 italic">Contextual resolution draft will be automatically synthesized here after analysis...</p>
                    ) : (
                        <p className="leading-relaxed">{analysisResult.autoReply}</p>
                    )}
                </div>
            </div>

        </section>
    );
}