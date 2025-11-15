"use client";

import React, { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button onClick={onCopy} title="Copy Markdown">{copied ? 'Copied' : 'Copy'}</button>
  );
}
