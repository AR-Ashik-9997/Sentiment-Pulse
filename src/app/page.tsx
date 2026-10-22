/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { ApiResponse, PresetData } from '@/types';
import Header from '@/componets/Navbar/Navbar';
import InputPanel from '@/componets/InputSection/InputSection';
import AnalyticsSection from '@/componets/AnalyticsSection/AnalyticsSection';
import Footer from '@/componets/Footer/Footer';
import OutputPanel from '@/componets/OutputSection/OutputSection';

// Backend API Response structure


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

export default function SentimentPulseApp() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [domain, setDomain] = useState<string>('electronics');
  const [inputText, setInputText] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [isDictating, setIsDictating] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const [telemetryLatency, setTelemetryLatency] = useState<string>('0ms');
  const [inferenceTimestamp, setInferenceTimestamp] = useState<string>('Awaiting Input...');

  // Storing pure dynamic response from API
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [copyStatus, setCopyStatus] = useState<string>('Copy Reply');

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
    setApiResult(null);
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

  // Real API Call Implementation
  const executeAnalysis = async () => {
    if (!inputText.trim()) {
      alert("Please enter or select a text review to analyze.");
      return;
    }

    setIsAnalyzing(true);
    const startTime = Date.now();
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/analyze';

    try {
      const response = await fetch(`${apiUrl}/inference/review-dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts: [inputText]
        }),
      });

      if (!response.ok) {
        throw new Error(`API Request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      // Setting pure API response into state
      setApiResult(data);
      setInferenceTimestamp(`Processed at ${new Date().toLocaleTimeString()}`);
      setTelemetryLatency(`${Date.now() - startTime}ms`);

    } catch (error) {
      console.error("API Call Error:", error);
      alert("Failed to analyze sentiment from API. Please check backend connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyAutoReply = () => {
    const replyText = apiResult?.detailed_results?.[0]?.auto_replay;
    if (!replyText) return;

    navigator.clipboard.writeText(replyText);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus("Copy Reply"), 2000);
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

  return (
    <div className="text-slate-200 antialiased min-h-screen flex flex-col transition-colors duration-300 dark:bg-[#060911] light:bg-slate-50 light:text-slate-800" id="body-app">
      <Header
        telemetryLatency={telemetryLatency}
      // isDark={isDark}
      // toggleTheme={toggleTheme}
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
            analysisResult={apiResult}
            copyAutoReply={copyAutoReply}
            copyStatus={copyStatus}
          />
        </div>

        <AnalyticsSection
          trendChartRef={trendChartRef}
          aspectChartRef={aspectChartRef}
        />
      </main>

      <Footer />
    </div>
  );
}