'use client';

import React from 'react';

import "./Prompt.css";

export interface PromptProps {
  prompt: string,
  onClick: () => void;
  color?: string
  styles?: React.CSSProperties;
};

export const Prompt = ({ prompt, color, styles, onClick }: PromptProps) => {
  return <button onClick={onClick} className='prompt' style={{ backgroundColor: color, ...styles }}>{prompt}</button>
}