/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export function useSentimentCharts(breakDownResult: any) {
    const trendChartRef = useRef<HTMLCanvasElement | null>(null);
    const aspectChartRef = useRef<HTMLCanvasElement | null>(null);
    const trendChartInstance = useRef<any>(null);
    const aspectChartInstance = useRef<any>(null);

    // Trend Chart
    useEffect(() => {
        if (!trendChartRef.current) return;

        if (trendChartInstance.current) {
            trendChartInstance.current.destroy();
            trendChartInstance.current = null;
        }

        const ctxTrend = trendChartRef.current.getContext('2d');
        if (!ctxTrend) return;

        const textColor = '#94A3B8';
        const gridColor = 'rgba(255, 255, 255, 0.05)';

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
                    legend: { labels: { color: textColor, font: { family: 'Inter', size: 11 } } }
                },
                scales: {
                    x: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Inter', size: 11 } } },
                    y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Inter', size: 11 } }, min: 0, max: 100 }
                }
            }
        });

        return () => {
            if (trendChartInstance.current) {
                trendChartInstance.current.destroy();
                trendChartInstance.current = null;
            }
        };
    }, []);

    // Aspect Chart
    useEffect(() => {
        if (!aspectChartRef.current) return;

        if (aspectChartInstance.current) {
            aspectChartInstance.current.destroy();
            aspectChartInstance.current = null;
        }

        const ctxAspect = aspectChartRef.current.getContext('2d');
        if (!ctxAspect) return;

        const textColor = '#94A3B8';
        const gridColor = 'rgba(255, 255, 255, 0.05)';

        const aspectData =
            breakDownResult?.summary?.['Aspect-Wise Sentiment Breakdown'] ||
            breakDownResult?.summary ||
            {};

        const parseVal = (val: any) => {
            if (val === undefined || val === null) return 0;
            const num = Number(val);
            if (isNaN(num)) return 0;
            return num <= 1 ? Math.round(num * 100) : Math.round(num);
        };

        const getAspectValues = (aspectKey: string) => {
            const val = aspectData[aspectKey];

            if (typeof val === 'object' && val !== null) {
                return {
                    pos: parseVal(val.positive ?? val.Positive ?? 0),
                    neu: parseVal(val.neutral ?? val.Neutral ?? 0),
                    neg: parseVal(val.negative ?? val.Negative ?? 0)
                };
            }

            const posVal = parseVal(val);
            return {
                pos: posVal,
                neu: 0,
                neg: posVal > 0 ? Math.max(0, 100 - posVal) : 0
            };
        };

        const productQuality = getAspectValues('Product Quality');
        const shippingSpeed = getAspectValues('Shipping Speed');
        const customerSupport = getAspectValues('Customer Support');
        const pricingVal = getAspectValues('Pricing / Value');

        aspectChartInstance.current = new Chart(ctxAspect, {
            type: 'bar',
            data: {
                labels: ['Product Quality', 'Shipping Speed', 'Customer Support', 'Pricing / Value'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [productQuality.pos, shippingSpeed.pos, customerSupport.pos, pricingVal.pos],
                        backgroundColor: '#10B981',
                        borderRadius: 4
                    },
                    {
                        label: 'Neutral',
                        data: [productQuality.neu, shippingSpeed.neu, customerSupport.neu, pricingVal.neu],
                        backgroundColor: '#F59E0B',
                        borderRadius: 4
                    },
                    {
                        label: 'Negative',
                        data: [productQuality.neg, shippingSpeed.neg, customerSupport.neg, pricingVal.neg],
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
                    legend: { labels: { color: textColor, font: { family: 'Inter', size: 11 } } }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
                        min: 0,
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

        return () => {
            if (aspectChartInstance.current) {
                aspectChartInstance.current.destroy();
                aspectChartInstance.current = null;
            }
        };
    }, [breakDownResult]);

    return { trendChartRef, aspectChartRef };
}