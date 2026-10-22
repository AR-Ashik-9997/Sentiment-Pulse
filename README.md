# Sentiment Pulse

Sentiment Pulse is a web dashboard for analyzing customer review sentiment. Enter a review or choose a sample preset, send it to a sentiment-analysis API, and inspect the returned classification, confidence, emotion, aspect impact, priority, and suggested response.

The repository contains the Next.js frontend. Sentiment inference is provided by a separate backend service.

## Features

- Review input with word and character counts, plus positive, negative, and mixed sample presets.
- Sentiment classification and confidence display.
- Emotion, aspect impact, and priority results returned by the backend.
- Contextual reply display with a copy action.
- Summary metrics and aspect-wise analytics charts.
- Responsive dashboard layout with dark and light theme styling.

> **Analytics note:** The seven-day sentiment trend chart currently uses sample data. It is not connected to historical backend results. The aspect-wise chart and summary metrics use the latest API response.

## Technology stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) for analytics charts
- [TanStack Query](https://tanstack.com/query/latest) for app-level query provider setup

## Requirements

- Node.js 20.9 or newer
- [Yarn](https://yarnpkg.com/) 4.12.0 (the version declared by this project)
- Access to a compatible sentiment-analysis API to run analyses

## Getting started

Install dependencies and start the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create and run a production build:

```bash
yarn build
yarn start
```

Run the linter with:

```bash
yarn lint
```

## Backend configuration

Set `NEXT_PUBLIC_API_BASE_URL` to the base URL of the backend service. Create a `.env.local` file in the project root:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

The frontend sends a `POST` request to:

```text
${NEXT_PUBLIC_API_BASE_URL}/inference/review-dashboard
```

If `NEXT_PUBLIC_API_BASE_URL` is unset or empty, the request is sent to `/inference/review-dashboard` on the same origin as the frontend. Configure a same-origin route or proxy in that case. When the API is hosted on a different origin, the backend must allow requests from the frontend origin.

### Request

The request body contains the review text in a one-element `texts` array:

```json
{
  "texts": ["The product arrived quickly and works exactly as expected."]
}
```

### Response

The API should return a JSON object with a `summary` and a `detailed_results` array. Confidence values are decimal scores between `0` and `1`; the interface displays them as percentages.

```json
{
  "summary": {
    "Total Analyzed Reviews": 1,
    "Avg Confidence Score": 0.94,
    "Positive Sentiment Ratio": "100%",
    "High Risk Escalations": 0,
    "Aspect-Wise Sentiment Breakdown": {
      "Product Quality": 0.92,
      "Shipping Speed": 0.88,
      "Customer Support": 0.75,
      "Pricing / Value": 0.8
    }
  },
  "detailed_results": [
    {
      "text": "The product arrived quickly and works exactly as expected.",
      "prediction": "Positive",
      "confidence": 0.94,
      "emotion": "satisfaction, trust",
      "aspect_impact": {
        "Product Quality": 0.92,
        "Shipping Speed": 0.88
      },
      "priority_level": "Low",
      "high_risk": false,
      "auto_replay": "Thank you for sharing your feedback. We're glad you're enjoying your purchase."
    }
  ]
}
```

The dashboard displays the first item in `detailed_results`. The response field names and summary keys must match the contract above.

## Project structure

```text
src/
├── app/                         # App Router entry point, layout, and global styles
├── componets/                   # Dashboard UI sections
│   ├── AnalyticsSection/
│   ├── Footer/
│   ├── InputSection/
│   ├── Navbar/
│   └── OutputSection/
├── hooks/                       # Sentiment request and chart lifecycle hooks
└── types/                       # Shared TypeScript interfaces
```

## Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the local development server |
| `yarn build` | Build the application for production |
| `yarn start` | Serve the production build |
| `yarn lint` | Run ESLint |
