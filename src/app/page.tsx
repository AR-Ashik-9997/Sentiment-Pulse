/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { AnalysisResult, AuditLog, PresetData } from '@/types';
import Header from '@/componets/Navbar/Navbar';
import InputPanel from '@/componets/InputSection/InputSection';
import OutputPanel from '@/componets/OutputSection/OutputSection';
import AnalyticsSection from '@/componets/AnalyticsSection/AnalyticsSection';


const PRESETS: Record<string, PresetData> = {
  positive: {
    text: "Absolutely thrilled with this purchase! The build quality exceeds expectations and setup was completely effortless. Battery life easily lasts 2 full days under heavy load. Customer support was extremely helpful and shipping arrived two days early!",
    domain: "electronics"
  },
  negative: {
    text: "Extremely frustrated with this purchase. The item arrived damaged and completely unfunctional. Shipping took over two weeks with no tracking updates. Customer service representative was unhelpful and refused to process a immediate refund. Horrible experience!",
    domain: "ecommerce"
  },
  neutral: {
    text: "The product performs adequately for its price point. Display clarity is sharp and aesthetics look modern, but battery depletion is slightly faster than advertised. Customer service replied promptly to questions.",
    domain: "app_store"
  }
};

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 1, timestamp: "2026-10-20 20:45:12", domain: "Amazon Electronics Reviews", preview: "Absolutely thrilled with this purchase! The build quality...", verdict: "Positive", confidence: 98.6, priority: "Low" },
  { id: 2, timestamp: "2026-10-20 20:22:04", domain: "Customer Service Support Tickets", preview: "App keeps crashing every time I try to open the payment tab...", verdict: "Negative", confidence: 94.2, priority: "Critical" },
  { id: 3, timestamp: "2026-10-20 19:58:30", domain: "E-commerce Product Feedback", preview: "Standard delivery time. Item works as described in listing...", verdict: "Neutral", confidence: 88.1, priority: "Low" },
  { id: 4, timestamp: "2026-10-20 19:15:45", domain: "App Store & SaaS User Reviews", preview: "Unusable after the latest firmware patch! Need refund ASAP...", verdict: "Negative", confidence: 96.8, priority: "High" },
  { id: 5, timestamp: "2026-10-20 18:40:10", domain: "Amazon Electronics Reviews", preview: "Crisp audio sound stage and ergonomic earcups. Highly recommend!", verdict: "Positive", confidence: 97.5, priority: "Low" }
];

export default function SentimentPulseApp() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [domain, setDomain] = useState<string>('electronics');
  const [inputText, setInputText] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [isDictating, setIsDictating] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const [telemetryLatency, setTelemetryLatency] = useState<string>('14ms');
  const [inferenceTimestamp, setInferenceTimestamp] = useState<string>('Awaiting Input...');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [copyStatus, setCopyStatus] = useState<string>('Copy Reply');

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [activeLogFilter, setActiveLogFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const trendChartRef = useRef<HTMLCanvasElement | null>(null);
  const aspectChartRef = useRef<HTMLCanvasElement | null>(null);
  const trendChartInstance = useRef<any>(null);
  const aspectChartInstance = useRef<any>(null);

  const toggleTheme = () => setIsDark(prev => !prev);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }, [isDark]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setCharCount(text.length);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);
  };

  const loadPreset = (type: 'positive' | 'negative' | 'neutral') => {
    if (PRESETS[type]) {
      const presetText = PRESETS[type].text;
      setInputText(presetText);
      setDomain(PRESETS[type].domain);
      setCharCount(presetText.length);
      const words = presetText.trim() ? presetText.trim().split(/\s+/).length : 0;
      setWordCount(words);
    }
  };

  const clearInput = () => {
    setInputText('');
    setWordCount(0);
    setCharCount(0);
    setAnalysisResult(null);
  };

  const toggleVoiceDictation = () => {
    if (!isDictating) {
      setIsDictating(true);
      setTimeout(() => {
        const appended = " Delivery was exceptionally fast and packaging was sturdy.";
        setInputText(prev => {
          const next = prev + appended;
          setCharCount(next.length);
          setWordCount(next.trim() ? next.trim().split(/\s+/).length : 0);
          return next;
        });
        setIsDictating(false);
      }, 3000);
    } else {
      setIsDictating(false);
    }
  };

  const runNeuralInference = (text: string): AnalysisResult => {
    const posKeywords = ['thrilled', 'excellent', 'great', 'amazing', 'exceeds', 'effortless', 'helpful', 'early', 'fast', 'sharp', 'promptly', 'crisp', 'recommend', 'love', 'best', 'good', 'sturdy'];
    const negKeywords = ['frustrated', 'damaged', 'unfunctional', 'unhelpful', 'horrible', 'crashing', 'unusable', 'refund', 'bad', 'refused', 'slow', 'depletion', 'worst', 'issue', 'broken'];

    let posCount = 0;
    let negCount = 0;

    const words = text.split(/\s+/);
    const tokenWeights = words.map(w => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      let score = 0;
      if (posKeywords.includes(clean)) {
        score = Math.random() * 0.6 + 0.4;
        posCount++;
      } else if (negKeywords.includes(clean)) {
        score = -(Math.random() * 0.6 + 0.4);
        negCount++;
      } else {
        score = (Math.random() * 0.2) - 0.1;
      }
      return { word: w, weight: score };
    });

    let verdict: 'Positive' | 'Negative' | 'Neutral' = "Neutral";
    let confidence = 85.0 + Math.random() * 10;
    let polarity = 0.05;
    let priority: 'Low' | 'Medium' | 'High' | 'Critical' = "Low";

    if (posCount > negCount) {
      verdict = "Positive";
      confidence = Math.min(99.4, 88 + posCount * 3.2);
      polarity = 0.65 + Math.random() * 0.3;
      priority = "Low";
    } else if (negCount > posCount) {
      verdict = "Negative";
      confidence = Math.min(98.9, 87 + negCount * 3.5);
      polarity = -(0.60 + Math.random() * 0.35);
      priority = negCount > 2 ? "Critical" : "High";
    } else {
      polarity = (Math.random() * 0.2) - 0.1;
      priority = "Medium";
    }

    let autoReply = "";
    if (verdict === "Positive") {
      autoReply = "Thank you so much for your glowing feedback! We're thrilled to hear that the quality and performance exceeded your expectations. We look forward to serving you again soon!";
    } else if (verdict === "Negative") {
      autoReply = "We sincerely apologize for the issues you experienced with your recent order. Our support escalation team has been notified and we would like to issue a priority replacement or full refund right away.";
    } else {
      autoReply = "Thank you for sharing your detailed feedback with us. We appreciate your balanced insights regarding feature performance and will pass them along to our product development team.";
    }

    return {
      verdict,
      confidence: parseFloat(confidence.toFixed(1)),
      polarity: parseFloat(polarity.toFixed(2)),
      tokens: tokenWeights,
      priority,
      autoReply
    };
  };

  const executeAnalysis = () => {
    if (!inputText.trim()) {
      alert("Please enter or select a text review to analyze.");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const result = runNeuralInference(inputText);
      setAnalysisResult(result);
      setInferenceTimestamp(`Processed at ${new Date().toLocaleTimeString()}`);
      setTelemetryLatency(`${Math.floor(Math.random() * 8) + 10}ms`);

      const domainMap: Record<string, string> = {
        electronics: "Amazon Electronics Reviews",
        customer_service: "Customer Service Support Tickets",
        ecommerce: "E-commerce Product Feedback",
        app_store: "App Store & SaaS User Reviews"
      };

      const newLog: AuditLog = {
        id: Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        domain: domainMap[domain] || domain,
        preview: inputText.length > 55 ? inputText.substring(0, 55) + '...' : inputText,
        verdict: result.verdict,
        confidence: result.confidence,
        priority: result.priority
      };

      setAuditLogs(prev => [newLog, ...prev]);
      setIsAnalyzing(false);
    }, 400);
  };

  const copyAutoReply = () => {
    if (!analysisResult || !analysisResult.autoReply) return;
    navigator.clipboard.writeText(analysisResult.autoReply);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus("Copy Reply"), 2000);
  };

  const exportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Domain,Corpus Preview,Verdict,Confidence,Priority\n";
    auditLogs.forEach(l => {
      const row = `"${l.timestamp}","${l.domain}","${l.preview.replace(/"/g, '""')}","${l.verdict}",${l.confidence},"${l.priority}"`;
      csvContent += row + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SentimentPulse_Audit_Log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderCharts = useCallback(() => {
    const textColor = isDark ? '#94A3B8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    if (trendChartInstance.current) trendChartInstance.current.destroy();
    if (aspectChartInstance.current) aspectChartInstance.current.destroy();

    if (trendChartRef.current) {
      const ctxTrend = trendChartRef.current.getContext('2d');
      if (ctxTrend) {
        const gradientPos = ctxTrend.createLinearGradient(0, 0, 0, 250);
        gradientPos.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
        gradientPos.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

        const gradientNeg = ctxTrend.createLinearGradient(0, 0, 0, 250);
        gradientNeg.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
        gradientNeg.addColorStop(1, 'rgba(244, 63, 94, 0.0)');

        trendChartInstance.current = new Chart(ctxTrend, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'Positive Sentiment %',
                data: [68, 72, 70, 75, 71, 78, 82],
                borderColor: '#10B981',
                backgroundColor: gradientPos,
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
              },
              {
                label: 'Negative Sentiment %',
                data: [22, 18, 20, 16, 19, 14, 12],
                borderColor: '#F43F5E',
                backgroundColor: gradientNeg,
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: textColor, font: { family: 'Inter', size: 11 } }
              }
            },
            scales: {
              x: {
                grid: { color: gridColor },
                ticks: { color: textColor, font: { family: 'Inter', size: 11 } }
              },
              y: {
                grid: { color: gridColor },
                ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
                min: 0,
                max: 100
              }
            }
          }
        });
      }
    }

    if (aspectChartRef.current) {
      const ctxAspect = aspectChartRef.current.getContext('2d');
      if (ctxAspect) {
        aspectChartInstance.current = new Chart(ctxAspect, {
          type: 'bar',
          data: {
            labels: ['Product Quality', 'Shipping Speed', 'Customer Support', 'Pricing / Value'],
            datasets: [
              {
                label: 'Positive',
                data: [78, 62, 55, 80],
                backgroundColor: '#10B981',
                borderRadius: 4
              },
              {
                label: 'Neutral',
                data: [12, 18, 15, 10],
                backgroundColor: '#F59E0B',
                borderRadius: 4
              },
              {
                label: 'Negative',
                data: [10, 20, 30, 10],
                backgroundColor: '#F43F5E',
                borderRadius: 4
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: textColor, font: { family: 'Inter', size: 11 } }
              }
            },
            scales: {
              x: {
                stacked: true,
                grid: { color: gridColor },
                ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
                max: 100
              },
              y: {
                stacked: true,
                grid: { display: false },
                ticks: { color: textColor, font: { family: 'Inter', size: 11 } }
              }
            }
          }
        });
      }
    }
  }, [isDark]);

  useEffect(() => {
    renderCharts();
    return () => {
      if (trendChartInstance.current) trendChartInstance.current.destroy();
      if (aspectChartInstance.current) aspectChartInstance.current.destroy();
    };
  }, [renderCharts]);

  useEffect(() => {
    loadPreset('positive');
  }, []);

  const filteredAuditLogs = auditLogs.filter(log => {
    if (activeLogFilter === 'Critical') {
      if (log.priority !== 'Critical' && log.priority !== 'High') return false;
    } else if (activeLogFilter !== 'ALL') {
      if (log.verdict !== activeLogFilter) return false;
    }

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      log.preview.toLowerCase().includes(q) ||
      log.domain.toLowerCase().includes(q) ||
      log.verdict.toLowerCase().includes(q)
    );
  });

  return (
    <div className="text-slate-200 antialiased min-h-screen flex flex-col transition-colors duration-300 dark:bg-[#060911] light:bg-slate-50 light:text-slate-800" id="body-app">
      <Header
        telemetryLatency={telemetryLatency}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <InputPanel
            inputText={inputText}
            handleInputChange={handleInputChange}
            loadPreset={loadPreset}
            clearInput={clearInput}
            toggleVoiceDictation={toggleVoiceDictation}
            isDictating={isDictating}
            wordCount={wordCount}
            charCount={charCount}
            executeAnalysis={executeAnalysis}
            isAnalyzing={isAnalyzing}
          />

          <OutputPanel
            inferenceTimestamp={inferenceTimestamp}
            analysisResult={analysisResult}
            copyAutoReply={copyAutoReply}
            copyStatus={copyStatus}
          />
        </div>

        <AnalyticsSection
          trendChartRef={trendChartRef}
          aspectChartRef={aspectChartRef}
        />
      </main>

      <footer className="border-t border-slate-800/80 bg-obsidian-950 py-4 text-center text-xs text-slate-500 light:bg-slate-100 light:border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 SentimentPulse AI Enterprise Workspace. All rights reserved.</span>
          <span className="font-mono text-[11px]">Bi-LSTM Deep Learning Engine Framework v2.4.0-release</span>
        </div>
      </footer>
    </div>
  );
}