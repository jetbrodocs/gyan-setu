"use client";

import { useState } from "react";
import { FileText, Network, HelpCircle } from "lucide-react";

interface BookDetailTabsProps {
  summaryText: string | null;
  description: string | null;
}

type Tab = "overview" | "mindmap" | "quiz";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
  { key: "mindmap", label: "Mind Map", icon: <Network className="h-4 w-4" /> },
  { key: "quiz", label: "Quiz", icon: <HelpCircle className="h-4 w-4" /> },
];

export function BookDetailTabs({ summaryText, description }: BookDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTab === "overview" && (
          <div>
            {summaryText ? (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-navy uppercase tracking-wide">
                  AI Summary
                </h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {summaryText}
                </p>
              </div>
            ) : description ? (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-navy uppercase tracking-wide">
                  Description
                </h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No summary available.</p>
            )}
          </div>
        )}

        {activeTab === "mindmap" && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Network className="h-12 w-12 mb-4" />
            <p className="text-sm font-medium text-slate-500">
              Click to generate a mind map using AI (coming soon)
            </p>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <HelpCircle className="h-12 w-12 mb-4" />
            <p className="text-sm font-medium text-slate-500">
              Click to generate a quiz using AI (coming soon)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
