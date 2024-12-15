'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { Prompt } from './Prompt';
import { genrePrompts, perspectivePrompts, eraPrompts, tonePrompts, settingPrompts, povPrompts } from '../helpers/constants';

import "./Prompter.css";
import { IconButton, Text, ThemeProvider } from '@itwin/itwinui-react';
import { SvgCheckmark, SvgCopy, SvgRefresh } from '@itwin/itwinui-icons-react';

export const Prompter = () => {
  const [genre, setGenre] = useState<string>();
  const [perspective, setPerspective] = useState<string>();
  const [era, setEra] = useState<string>();
  const [tone, setTone] = useState<string>();
  const [setting, setSetting] = useState<string>();
  const [pov, setPov] = useState<string>();
  const [copied, setCopied] = useState<boolean>(false);

  const getPrompt = useCallback((prompts: string[]) => {
    return prompts[Math.floor(Math.random() * (prompts.length))];
  }, []);

  const generatePrompts = useCallback(() => {
    setGenre(getPrompt(genrePrompts));
    setPerspective(getPrompt(perspectivePrompts));
    setEra(getPrompt(eraPrompts));
    setTone(getPrompt(tonePrompts));
    setSetting(getPrompt(settingPrompts));
    setPov(getPrompt(povPrompts));
  }, [getPrompt])

  useEffect(() => {
    generatePrompts()
  }, [generatePrompts]);

  const data = [
    ["Genre", genre],
    ["Perspective", perspective],
    ["Era", era],
    ["Tone", tone],
    ["Setting", setting],
    ["Pov", pov],
  ];

  const copyToClipboard = () => {
    const div = document.createElement("div");
    const ul = document.createElement("ul");

    data.forEach(category => {
      const li = document.createElement("li");
      li.innerHTML = `<b>${category[0]}:</b> ${category[1]}`;
      ul.appendChild(li);
    })

    div.appendChild(ul);

    if (navigator.clipboard) {
      const htmlBlob = new Blob([div.getHTML()], { type: 'text/html' });
      const text = data.map(category => `${category[0]}: ${category[1]}`).join("\n");
      const textBlob = new Blob([text], { type: 'text/plain' });
      const htmlItem = new ClipboardItem({ [htmlBlob.type]: htmlBlob, [textBlob.type]: textBlob });

      navigator.clipboard.write([htmlItem]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return <ThemeProvider theme='os' themeOptions={{ applyBackground: false }} className="client-app">
    <div className='prompter-page'>
      <Text className="header">Writing Prompts</Text>
      <div className='prompter'>
        <Prompt title="Genre" prompt={genre ?? ""} onClick={() => { setGenre(getPrompt(genrePrompts)) }} />
        <Prompt title="Perspective" prompt={perspective ?? ""} onClick={() => { setPerspective(getPrompt(perspectivePrompts)) }} />
        <Prompt title="Era" prompt={era ?? ""} onClick={() => { setEra(getPrompt(eraPrompts)) }} />
        <Prompt title="Tone" prompt={tone ?? ""} onClick={() => { setTone(getPrompt(tonePrompts)) }} />
        <Prompt title="Setting" prompt={setting ?? ""} onClick={() => { setSetting(getPrompt(settingPrompts)) }} />
        <Prompt title="Pov" prompt={pov ?? ""} onClick={() => { setPov(getPrompt(povPrompts)) }} />
      </div>
      <div className='buttons'>
        <IconButton label="Copy" onClick={copyToClipboard}>{copied ? <SvgCheckmark /> : <SvgCopy />}</IconButton>
        <IconButton label="Generate" onClick={generatePrompts}><SvgRefresh /></IconButton>
      </div>
    </div>
  </ThemeProvider>
}
