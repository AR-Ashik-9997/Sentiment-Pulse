import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'SentimentPulse AI - Enterprise Neural Analytics',
  description: 'Enterprise Deep Neural Analytics Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}