'use client';

import { AnalyticsSectionProps } from '@/types';

export default function AnalyticsSection({
    trendChartRef,
    aspectChartRef,
    analysisResult,
}: AnalyticsSectionProps) {
    const totalAnalyzedReviews = analysisResult?.summary?.['Total Analyzed Reviews'] ?? 0;
    const avgConfidenceScore = analysisResult?.summary?.['Avg Confidence Score']
        ? `${(Number(analysisResult.summary['Avg Confidence Score']) * 100).toFixed(2)}%`
        : '0.00%';
    const positiveSentimentRatio = analysisResult?.summary?.['Positive Sentiment Ratio'] ?? '0%';
    const highRiskEscalations = analysisResult?.summary?.['High Risk Escalations'] ?? 0;
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
                        {/* <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+14.2%</span> */}
                    </div>
                    <div className="text-2xl font-extrabold text-white light:text-slate-900 font-mono">{totalAnalyzedReviews}</div>
                    <p className="text-[11px] text-slate-500 mt-1">Across all active domain pipelines</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 light:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-slate-400">Avg Confidence Score</span>
                        {/* <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">+1.8%</span> */}
                    </div>
                    <div className="text-2xl font-extrabold text-white light:text-slate-900 font-mono">{avgConfidenceScore}</div>
                    <p className="text-[11px] text-slate-500 mt-1">High inference certainty threshold</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 light:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-slate-400">Positive Sentiment Ratio</span>
                        {/* <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+5.4%</span> */}
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">{positiveSentimentRatio}</div>
                    <p className="text-[11px] text-slate-500 mt-1">Favorable customer ratings</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 light:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-slate-400">High Risk Escalations</span>
                        {/* <span className="px-1.5 py-0.5 text-[10px] rounded font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">-3.1%</span> */}
                    </div>
                    <div className="text-2xl font-extrabold text-rose-400 font-mono">{highRiskEscalations}</div>
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

        </section>
    );
}