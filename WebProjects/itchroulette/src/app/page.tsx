"use client";

import { useState, useCallback } from "react";
import { Button, Card, ProgressBar } from "pixel-retroui";

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

type JamFilter = "active" | "upcoming";

const JAM_FILTERS: { value: JamFilter; label: string }[] = [
  { value: "active", label: "ACTIVE" },
  { value: "upcoming", label: "UPCOMING" },
];

export default function Home() {
  const [filter, setFilter] = useState<JamFilter>("active");
  const [currentItem, setCurrentItem] = useState<FeedItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinProgress, setSpinProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const getFeedType = () => {
    return filter === "active" ? "jams-active" : "jams-upcoming";
  };

  const spin = useCallback(async () => {
    setIsSpinning(true);
    setError(null);
    setSpinProgress(0);

    const feedType = getFeedType();

    try {
      const res = await fetch(`/api/feed?type=${feedType}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      if (data.items.length === 0) {
        throw new Error("No jams found");
      }

      // Simulate spinning with multiple quick changes
      const spinCount = 12 + Math.floor(Math.random() * 6);
      for (let i = 0; i < spinCount; i++) {
        const randomIndex = Math.floor(Math.random() * data.items.length);
        setCurrentItem(data.items[randomIndex]);
        setSpinProgress(Math.floor((i / spinCount) * 100));
        await new Promise((r) => setTimeout(r, 60 + i * 25));
      }

      // Final selection
      const finalIndex = Math.floor(Math.random() * data.items.length);
      setCurrentItem(data.items[finalIndex]);
      setSpinProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSpinning(false);
    }
  }, [filter]);

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").slice(0, 200);
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: "var(--parchment)" }}
    >
      <main className="max-w-xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1
            className="text-xl md:text-2xl mb-1"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              color: "var(--viking-teal)",
              textShadow: `
                -2px -2px 0 var(--deep-ink),
                2px -2px 0 var(--deep-ink),
                -2px 2px 0 var(--deep-ink),
                2px 2px 0 var(--deep-ink),
                4px 4px 0 var(--hearth-orange)
              `,
            }}
          >
            JAM ROULETTE
          </h1>
          <p
            className="text-xs"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              color: "var(--deep-ink)",
              fontSize: "8px",
            }}
          >
            Discover your next game jam!
          </p>
        </header>

        {/* Filter Selection */}
        <Card
          bg="#E8DCC8"
          textColor="#2A2520"
          borderColor="#2A2520"
          shadowColor="#7A5040"
          className="p-4 mb-4"
        >
          <div className="flex gap-2 justify-center">
            {JAM_FILTERS.map((f) => (
              <Button
                key={f.value}
                bg={filter === f.value ? "#3B8D9A" : "#E8DCC8"}
                textColor={filter === f.value ? "#F5EDE0" : "#7A5040"}
                borderColor="#2A2520"
                shadow="#7A5040"
                onClick={() => setFilter(f.value)}
                disabled={isSpinning}
                className="px-4 py-2"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Spin Button */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <Button
            bg="#E07040"
            textColor="#F5EDE0"
            borderColor="#2A2520"
            shadow="#7A5040"
            onClick={spin}
            disabled={isSpinning}
            className="px-10 py-4"
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "14px" }}
          >
            {isSpinning ? "SPINNING..." : "🎰 SPIN!"}
          </Button>

          {/* Progress Bar during spin */}
          {isSpinning && (
            <div className="w-full max-w-xs">
              <ProgressBar
                progress={spinProgress}
                color="#3B8D9A"
                borderColor="#2A2520"
                size="md"
              />
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <Card
            bg="#C85548"
            textColor="#F5EDE0"
            borderColor="#2A2520"
            shadowColor="#7A5040"
            className="p-4 mb-4 text-center"
          >
            <p
              className="text-xs"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
            >
              ERROR: {error}
            </p>
          </Card>
        )}

        {/* Result Card */}
        {currentItem && (
          <Card
            bg="#E8DCC8"
            textColor="#2A2520"
            borderColor="#2A2520"
            shadowColor="#7A5040"
            className={`p-5 transition-all ${isSpinning ? "animate-pulse" : ""}`}
          >
            <div className="mb-4">
              <span
                className="inline-block px-2 py-1 mb-3"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: "8px",
                  background: "var(--viking-teal)",
                  color: "var(--parchment)",
                }}
              >
                GAME JAM
              </span>

              <h2
                className="text-sm md:text-base mb-3 leading-relaxed"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: "var(--deep-ink)",
                  lineHeight: "1.6",
                }}
              >
                {currentItem.title}
              </h2>

              {currentItem.description && (
                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{
                    fontFamily: "monospace",
                    color: "var(--fur-brown)",
                    fontSize: "11px",
                    lineHeight: "1.5",
                  }}
                >
                  {stripHtml(currentItem.description)}...
                </p>
              )}
            </div>

            <a
              href={currentItem.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                bg="#3B8D9A"
                textColor="#F5EDE0"
                borderColor="#2A2520"
                shadow="#7A5040"
                className="w-full py-3"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px" }}
              >
                CHECK IT OUT →
              </Button>
            </a>
          </Card>
        )}

        {/* Initial State */}
        {!currentItem && !error && (
          <Card
            bg="#E8DCC8"
            textColor="#2A2520"
            borderColor="#2A2520"
            shadowColor="#7A5040"
            className="p-6 text-center"
          >
            <div className="text-3xl mb-3">🎰</div>
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                color: "var(--fur-brown)",
                fontSize: "8px",
                lineHeight: "1.8",
              }}
            >
              PICK A FILTER
              <br />
              AND HIT SPIN!
            </p>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center mt-6">
          <p
            style={{
              fontFamily: '"Press Start 2P", monospace',
              color: "var(--fog)",
              fontSize: "6px",
            }}
          >
            POWERED BY{" "}
            <a
              href="https://x.com/WaltMakes"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--viking-teal)" }}
              className="hover:underline"
            >
              WaltMakes
            </a>{" "}
          </p>
        </footer>
      </main>
    </div>
  );
}
