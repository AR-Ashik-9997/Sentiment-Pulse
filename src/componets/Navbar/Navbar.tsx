'use client';

import { HeaderProps } from "@/types";


export default function Header({ telemetryLatency }: HeaderProps) {
  return (
    <header className="border-b border-slate-800/80 bg-obsidian-800/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3 transition-colors duration-300 light:bg-white/90 light:border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-obsidian-900 rounded-[10px] flex items-center justify-center light:bg-white">
                <i className="fa-solid font-bold fa-brain text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 text-lg"></i>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight text-white light:text-slate-900">
                  Sentiment Pulse 
                </h1>
              </div>
              <p className="text-xs text-slate-400 light:text-slate-500">Enterprise Deep Neural Analytics Platform</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Bi-LSTM Engine v2.4 Online</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 text-xs text-slate-400 overflow-x-auto w-full md:w-auto py-1 md:py-0 justify-center light:text-slate-600">
          <div className="flex items-center gap-2 bg-obsidian-900/60 light:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-800 light:border-slate-200">
            <i className="fa-solid fa-bolt text-amber-400"></i>
            <span>Latency: <strong className="text-slate-200 light:text-slate-800">{telemetryLatency}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-obsidian-900/60 light:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-800 light:border-slate-200">
            <i className="fa-solid fa-bullseye text-cyan-400"></i>
            <span>Accuracy: <strong className="text-slate-200 light:text-slate-800">82.56%</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-obsidian-900/60 light:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-800 light:border-slate-200">
            <i className="fa-solid fa-book-bookmark text-indigo-400"></i>
            <span>Vocab: <strong className="text-slate-200 light:text-slate-800">77000+</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}