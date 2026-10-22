import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t border-slate-800/80 bg-obsidian-950 py-4 text-center text-xs text-slate-500 light:bg-slate-100 light:border-slate-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>&copy; 2026 SentimentPulse AI Enterprise Workspace. All rights reserved.</span>
                <span className="font-mono text-[11px]">Bi-LSTM Deep Learning Engine Framework v2.4.0-release</span>
            </div>
        </footer>
    )
}

export default Footer