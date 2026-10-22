export interface HeaderProps {
  telemetryLatency: string;
}

export interface TokenWeight {
  word: string;
  weight: number;
}

export interface AnalysisResult {
  verdict: 'Positive' | 'Negative' | 'Neutral';
  confidence: number;
  polarity: number;
  tokens: TokenWeight[];
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  autoReply: string;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  domain: string;
  preview: string;
  verdict: string;
  confidence: number;
  priority: string;
}

export interface PresetData {
  text: string;
  domain: string;
}

export interface InputPanelProps {
  inputText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  loadPreset: (type: 'positive' | 'negative' | 'neutral') => void;
  clearInput: () => void;
  toggleVoiceDictation: () => void;
  isDictating: boolean;
  wordCount: number;
  charCount: number;
  executeAnalysis: () => void;
  isAnalyzing: boolean;
}

export interface OutputPanelProps {
  inferenceTimestamp: string;
  ApiResult: ApiResponse | null;
  copyAutoReply: () => void;
  copyStatus: string;
}

export interface AnalyticsSectionProps {
  trendChartRef: React.RefObject<HTMLCanvasElement | null>;
  aspectChartRef: React.RefObject<HTMLCanvasElement | null>;
  analysisResult: ApiResponse | null;
}

export interface ApiResponse {
  summary: {
    "Total Analyzed Reviews": number;
    "Avg Confidence Score": number;
    "Positive Sentiment Ratio": string;
    "High Risk Escalations": number;
    "Aspect-Wise Sentiment Breakdown": Record<string, number>;
  };
  detailed_results: Array<{
    text: string;
    prediction: string;
    confidence: number;
    emotion: string;
    aspect_impact: Record<string, number>;
    priority_level: string;
    high_risk: boolean;
    auto_replay: string;
  }>;
}
