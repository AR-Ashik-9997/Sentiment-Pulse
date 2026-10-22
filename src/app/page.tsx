/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import Header from '@/componets/Navbar/Navbar';
import InputPanel from '@/componets/InputSection/InputSection';
import AnalyticsSection from '@/componets/AnalyticsSection/AnalyticsSection';
import Footer from '@/componets/Footer/Footer';
import OutputPanel from '@/componets/OutputSection/OutputSection';

import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';
import { useSentimentCharts } from '@/hooks/useSentimentCharts';

export default function SentimentPulseApp() {
  const {
    breakDownResult,
    inputText,
    wordCount,
    charCount,
    isDictating,
    isAnalyzing,
    telemetryLatency,
    inferenceTimestamp,
    apiResult,
    copyStatus,
    handleInputChange,
    loadPreset,
    clearInput,
    toggleVoiceDictation,
    executeAnalysis,
    copyAutoReply,
  } = useSentimentAnalysis();

  const { trendChartRef, aspectChartRef } = useSentimentCharts(breakDownResult);

  useEffect(() => {
    loadPreset('positive');
  }, []);

  return (
    <div className="text-slate-200 antialiased min-h-screen flex flex-col transition-colors duration-300 dark:bg-[#060911] light:bg-slate-50 light:text-slate-800" id="body-app">
      <Header telemetryLatency={telemetryLatency} />

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
            ApiResult={apiResult}
            copyAutoReply={copyAutoReply}
            copyStatus={copyStatus}
          />
        </div>

        <AnalyticsSection
          trendChartRef={trendChartRef}
          aspectChartRef={aspectChartRef}
          analysisResult={apiResult}
        />
      </main>

      <Footer />
    </div>
  );
}