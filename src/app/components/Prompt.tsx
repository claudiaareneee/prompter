'use client';

import React, { useCallback, useEffect, useState } from 'react';

import "./Prompt.css";
import { Button, ColorValue } from '@itwin/itwinui-react';

export interface PromptProps {
  prompt: string,
  onClick: () => void;
  color?: string
  styles?: React.CSSProperties;
};

export const Prompt = ({ prompt, color, styles, onClick }: PromptProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(color ?? "000000");
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

    const background = ColorValue.fromString(newBackground).toTbgr();
    const grey = ColorValue.fromString("#777777").toTbgr();
    const newText = background > grey ? "#FFFFFF" : "#000000";

    setBackgroundColor(newBackground);
    setTextColor(newText);
  }, [color, getRandomColor]);

  useEffect(setColors, [setColors]);

  const handleClick = useCallback(() => {
    onClick();
    setColors();
  }, [onClick, setColors]);

  return <Button onClick={handleClick} className='prompt' style={{ backgroundColor, color: textColor, ...styles }}>{prompt}</Button>
}