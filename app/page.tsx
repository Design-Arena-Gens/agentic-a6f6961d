"use client";

import React, { useMemo, useState } from 'react';
import { generatePlan, type AgentInput } from "../lib/agentEngine";
import { DownloadButton } from "../components/DownloadButton";
import { CopyButton } from "../components/CopyButton";

export default function Page() {
  const [input, setInput] = useState<AgentInput>({
    strategyName: "",
    targetAudience: "",
    riskLevel: "medium",
    timeHorizon: "3-5 years",
    uniqueSellingProposition: "",
    proofPoints: "",
    budgetLevel: "medium",
    complianceRegion: "US",
    channels: ["Facebook Ads", "Google Search", "Email"],
    tone: "authoritative",
    constraints: ""
  });

  const [markdown, setMarkdown] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: keyof AgentInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiToggle = (channel: string) => {
    setInput(prev => {
      const has = prev.channels.includes(channel);
      return { ...prev, channels: has ? prev.channels.filter(c => c !== channel) : [...prev.channels, channel] };
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    const md = generatePlan(input);
    setMarkdown(md);
    setIsGenerating(false);
  };

  const filename = useMemo(() => {
    const base = input.strategyName?.trim() ? input.strategyName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'plan';
    return `${base}-sales-plan.md`;
  }, [input.strategyName]);

  return (
    <div className="page">
      <header className="header">
        <h1>Investment Strategy Sales Agent</h1>
        <p className="tagline">Psychology-driven sales & advertising suggestions. Educational use only ? not financial advice.</p>
      </header>

      <section className="card grid">
        <div>
          <label>Strategy name</label>
          <input value={input.strategyName} onChange={e => handleChange('strategyName', e.target.value)} placeholder="e.g., AlphaEdge Income Strategy" />
        </div>
        <div className="full">
          <label>Target audience</label>
          <textarea value={input.targetAudience} onChange={e => handleChange('targetAudience', e.target.value)} placeholder="Who are they? Demographics, psychographics, pain points." />
        </div>
        <div>
          <label>Risk level</label>
          <select value={input.riskLevel} onChange={e => handleChange('riskLevel', e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Time horizon</label>
          <input value={input.timeHorizon} onChange={e => handleChange('timeHorizon', e.target.value)} placeholder="e.g., 3-5 years" />
        </div>
        <div className="full">
          <label>Unique selling proposition</label>
          <textarea value={input.uniqueSellingProposition} onChange={e => handleChange('uniqueSellingProposition', e.target.value)} placeholder="What makes it different and valuable?" />
        </div>
        <div className="full">
          <label>Proof points</label>
          <textarea value={input.proofPoints} onChange={e => handleChange('proofPoints', e.target.value)} placeholder="Audits, backtests, case studies, testimonials (if compliant)." />
        </div>
        <div>
          <label>Budget</label>
          <select value={input.budgetLevel} onChange={e => handleChange('budgetLevel', e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Compliance region</label>
          <select value={input.complianceRegion} onChange={e => handleChange('complianceRegion', e.target.value)}>
            <option value="US">US</option>
            <option value="EU">EU</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="full">
          <label>Channels</label>
          <div className="chips">
            {['Facebook Ads','Google Search','LinkedIn','YouTube','Twitter/X','Email','Landing Page','Webinar'].map(c => (
              <button key={c} type="button" className={input.channels.includes(c) ? 'chip active' : 'chip'} onClick={() => handleMultiToggle(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div>
          <label>Tone</label>
          <select value={input.tone} onChange={e => handleChange('tone', e.target.value)}>
            <option value="authoritative">Authoritative</option>
            <option value="empathetic">Empathetic</option>
            <option value="direct">Direct</option>
            <option value="storytelling">Storytelling</option>
          </select>
        </div>
        <div className="full">
          <label>Constraints</label>
          <textarea value={input.constraints} onChange={e => handleChange('constraints', e.target.value)} placeholder="Disallowed claims, compliance notes, brand guidelines." />
        </div>
        <div className="actions full">
          <button className="primary" onClick={handleGenerate} disabled={isGenerating}>{isGenerating ? 'Generating?' : 'Generate plan'}</button>
        </div>
      </section>

      <section className="card">
        <div className="result-header">
          <h2>Generated plan</h2>
          <div className="result-actions">
            <CopyButton text={markdown} />
            <DownloadButton filename={filename} text={markdown} />
          </div>
        </div>
        <textarea className="result" value={markdown} readOnly placeholder="Generated plan will appear here as Markdown." />
      </section>

      <footer className="footer">
        <p>Disclaimer: This tool provides marketing suggestions only and does not provide investment advice. Always ensure compliance with applicable regulations.</p>
      </footer>
    </div>
  );
}
