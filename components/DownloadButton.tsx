"use client";

import React from 'react';

export function DownloadButton({ filename, text }: { filename: string; text: string }) {
  const onDownload = () => {
    const blob = new Blob([text || ""], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'plan.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={onDownload} title="Download Markdown">Download</button>
  );
}
