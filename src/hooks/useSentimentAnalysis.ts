/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { ApiResponse, PresetData } from '@/types';

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

export function useSentimentAnalysis() {
    const [breakDownResult, setBreakDownResult] = useState<any>(null);
    const [inputText, setInputText] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);
    const [isDictating, setIsDictating] = useState<boolean>(false);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [telemetryLatency, setTelemetryLatency] = useState<string>('0ms');
    const [inferenceTimestamp, setInferenceTimestamp] = useState<string>('Awaiting Input...');
    const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
    const [copyStatus, setCopyStatus] = useState<string>('Copy Reply');

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
        setBreakDownResult(null);
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

    const executeAnalysis = async () => {
        if (!inputText.trim()) {
            alert("Please enter or select a text review to analyze.");
            return;
        }

        setIsAnalyzing(true);
        const startTime = Date.now();
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

        try {
            const response = await fetch(`${apiUrl}/inference/review-dashboard`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texts: [inputText] }),
            });

            if (!response.ok) {
                throw new Error(`API Request failed with status ${response.status}`);
            }

            const data: ApiResponse = await response.json();
            setBreakDownResult(data);
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

    return {
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
        copyAutoReply
    };
}