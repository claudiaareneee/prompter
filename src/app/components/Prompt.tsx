'use client';

import React, { useCallback, useEffect, useState } from 'react';

import "./Prompt.css";
import { Button, ColorValue } from '@itwin/itwinui-react';

export interface PromptProps {
  prompt: string,
  onClick: () => void;
  title?: string;
  color?: string
  styles?: React.CSSProperties;
};

export const Prompt = ({ prompt, color, styles, title, onClick }: PromptProps) => {
  const [background, setBackground] = useState<string>(color ?? "000000");
  const [textColor, setTextColor] = useState<string>("FFFFFF");

  const getRandomColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const setColors = useCallback(() => { 
    const newBackground = color ? color : getRandomColor();

    const bgValue = ColorValue.fromString(newBackground);
    const bg = bgValue.toHsvColor();
    const isDark = bg.s > 50 || bg.v < 50;

    // const isDark = bg.r < 128 && bg.b < 128 && bg.g < 128;
    const newText = isDark ? "#FFFFFF" : "#000000";

    setBackground(newBackground);
    setTextColor(newText);
  }, [color, getRandomColor]);

  useEffect(setColors, [setColors]);

  const handleClick = useCallback(() => {
    onClick();
    setColors();
  }, [onClick, setColors]);

  return <Button onClick={handleClick} className='prompt' style={{ background, color: textColor, ...styles }}><b>{title}</b>: {prompt}</Button>
}