import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AIChatWrapper from "@/components/AIChatWrapper";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { TaskQueueProvider } from "@/contexts/TaskQueueContext";
import { PageContextProvider } from "@/contexts/PageContext";
import { AIChatProvider } from "@/contexts/AIChatContext";

export const metadata = {
  title: "GTM Workspace",
  description: "Advanced Go-To-Market strategy tool for sales teams",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') ||
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <ChatProvider>
            <TaskQueueProvider>
              <PageContextProvider>
                <AIChatProvider>
                  <Sidebar />
                  <main style={{ marginLeft: 'var(--sidebar-width)', minHeight: '100dvh' }}>
                    <AIChatWrapper>
                      {children}
                    </AIChatWrapper>
                  </main>
                </AIChatProvider>
              </PageContextProvider>
            </TaskQueueProvider>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
