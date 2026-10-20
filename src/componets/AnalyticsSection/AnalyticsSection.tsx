'use client';

import { AnalyticsSectionProps } from '@/types';

export default function AnalyticsSection({
    trendChartRef,
    aspectChartRef,
    searchQuery,
    setSearchQuery,
    activeLogFilter,
    setActiveLogFilter,
    exportCSV,
    filteredAuditLogs
}: AnalyticsSectionProps) {
    return (
        <section className="space-y-6 pt-4">

            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white light:text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-chart-line text-emerald-400"></i> Platform Analytics & Live Audit Dashboard
                </h2>
                <span className="text-xs text-slate-400">Live Telemetry & Historical Trends</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="glass-panel p-4 rounded-xl border border-slate-800 light:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-slate-400">Total Analyzed Reviews</span>
                        <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+14.2%</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white light:text-slate-900 font-mono">1,428</div>
                    <p className="text-[11px] text-slate-500 mt-1">Across all active domain pipelines</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 light:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-slate-400">Avg Confidence Score</span>
                        <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">+1.8%</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white light:text-slate-900 font-mono">96.4%</div>
                    <p className="text-[11px] text-slate-500 mt-1">High inference certainty threshold</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 light:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-slate-400">Positive Sentiment Ratio</span>
                        <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+5.4%</span>
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">71.8%</div>
                    <p className="text-[11px] text-slate-500 mt-1">Favorable customer ratings</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 light:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-slate-400">High Risk Escalations</span>
                        <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">-3.1%</span>
                    </div>
                    <div className="text-2xl font-extrabold text-rose-400 font-mono">42</div>
                    <p className="text-[11px] text-slate-500 mt-1">Tickets flagged for support priority</p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-slate-800 light:border-slate-200 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white light:text-slate-900">Sentiment Dynamics Over Time</h3>
                        <span className="text-xs text-slate-400 font-mono">7-Day Aggregation</span>
                    </div>
                    <div className="h-65 w-full">
                        <canvas ref={trendChartRef}></canvas>
                    </div>
                </div>

                <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 light:border-slate-200 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white light:text-slate-900">Aspect-Wise Sentiment Breakdown</h3>
                        <span className="text-xs text-slate-400 font-mono">By Category</span>
                    </div>
                    <div className="h-65 w-full">
                        <canvas ref={aspectChartRef}></canvas>
                    </div>
                </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800 light:border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base font-semibold text-white light:text-slate-900">Live Audit & Inference Log</h3>
                        <p className="text-xs text-slate-400">Real-time session prediction stream and audit records</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-48">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search logs..."
                                className="w-full bg-obsidian-900 light:bg-white text-xs text-slate-200 light:text-slate-800 rounded-lg pl-8 pr-3 py-2 border border-slate-700 light:border-slate-300 focus:outline-none focus:border-indigo-500"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                        </div>

                        <div className="flex bg-obsidian-900 light:bg-slate-200 p-1 rounded-lg border border-slate-800 light:border-slate-300 text-xs">
                            <button
                                onClick={() => setActiveLogFilter('ALL')}
                                className={`px-2.5 py-1 rounded-md font-medium transition-all ${activeLogFilter === 'ALL' ? 'text-white bg-indigo-600' : 'text-slate-400 hover:text-white'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveLogFilter('Positive')}
                                className={`px-2.5 py-1 rounded-md font-medium transition-all ${activeLogFilter === 'Positive' ? 'text-white bg-indigo-600' : 'text-slate-400 hover:text-white'}`}
                            >
                                Positive
                            </button>
                            <button
                                onClick={() => setActiveLogFilter('Negative')}
                                className={`px-2.5 py-1 rounded-md font-medium transition-all ${activeLogFilter === 'Negative' ? 'text-white bg-indigo-600' : 'text-slate-400 hover:text-white'}`}
                            >
                                Negative
                            </button>
                            <button
                                onClick={() => setActiveLogFilter('Critical')}
                                className={`px-2.5 py-1 rounded-md font-medium transition-all ${activeLogFilter === 'Critical' ? 'text-white bg-indigo-600' : 'text-slate-400 hover:text-white'}`}
                            >
                                Critical
                            </button>
                        </div>

                        <button
                            onClick={exportCSV}
                            className="px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                            <i className="fa-solid fa-file-csv"></i>
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 light:border-slate-200 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-obsidian-900/40 light:bg-slate-100">
                                <th className="p-3">Timestamp</th>
                                <th className="p-3">Domain Context</th>
                                <th className="p-3">Corpus Preview</th>
                                <th className="p-3">Verdict</th>
                                <th className="p-3 text-right">Confidence</th>
                                <th className="p-3 text-center">Priority Risk</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-slate-800/60 light:divide-slate-200 font-sans">
                            {filteredAuditLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-slate-500 italic">No matching prediction records found.</td>
                                </tr>
                            ) : (
                                filteredAuditLogs.map(log => {
                                    let badgeClass = "bg-slate-800 text-slate-300";
                                    if (log.verdict === 'Positive') badgeClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
                                    if (log.verdict === 'Negative') badgeClass = "bg-rose-500/20 text-rose-400 border border-rose-500/30";
                                    if (log.verdict === 'Neutral') badgeClass = "bg-amber-500/20 text-amber-400 border border-amber-500/30";

                                    let priorityClass = "text-slate-400";
                                    if (log.priority === 'Critical') priorityClass = "text-rose-400 font-bold";
                                    if (log.priority === 'High') priorityClass = "text-amber-400 font-semibold";

                                    return (
                                        <tr key={log.id} className="hover:bg-obsidian-900/60 light:hover:bg-slate-100 transition-colors">
                                            <td className="p-3 font-mono text-slate-400 text-[11px]">{log.timestamp}</td>
                                            <td className="p-3 font-medium text-slate-300 light:text-slate-700">{log.domain}</td>
                                            <td className="p-3 text-slate-300 light:text-slate-600 max-w-xs truncate">{log.preview}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${badgeClass}`}>{log.verdict}</span>
                                            </td>
                                            <td className="p-3 text-right font-mono font-medium text-slate-200 light:text-slate-800">{log.confidence}%</td>
                                            <td className={`p-3 text-center text-[11px] ${priorityClass}`}>{log.priority}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    );
}