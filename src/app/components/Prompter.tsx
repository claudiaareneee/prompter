'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { Prompt } from './Prompt';
import { genrePrompts, perspectivePrompts, eraPrompts, tonePrompts, settingPrompts, povPrompts } from '../helpers/constants';

import "./Prompter.css";
import { IconButton, ThemeProvider } from '@itwin/itwinui-react';
import { SvgCopy, SvgRefresh } from '@itwin/itwinui-icons-react';

export const Prompter = () => {
  const [genre, setGenre] = useState<string>();
  const [perspective, setPerspective] = useState<string>();
  const [era, setEra] = useState<string>();
  const [tone, setTone] = useState<string>();
  const [setting, setSetting] = useState<string>();
  const [pov, setPov] = useState<string>();

  const getPrompt = useCallback((prompts: string[]) => {
    return prompts[Math.floor(Math.random() * (prompts.length))];
  }, []);

  useEffect(() => {
    setGenre(getPrompt(genrePrompts));
    setPerspective(getPrompt(perspectivePrompts));
    setEra(getPrompt(eraPrompts));
    setTone(getPrompt(tonePrompts));
    setSetting(getPrompt(settingPrompts));
    setPov(getPrompt(povPrompts));
  }, [getPrompt]);

  return <ThemeProvider theme='os' themeOptions={{ applyBackground: false }} className="client-app">
    <div className='prompter-page'>
      <div className='prompter'>
        <Prompt title="Genre" prompt={genre ?? ""} onClick={() => { setGenre(getPrompt(genrePrompts)) }} />
        <Prompt title="Perspective" prompt={perspective ?? ""} onClick={() => { setPerspective(getPrompt(perspectivePrompts)) }} />
        <Prompt title="Era" prompt={era ?? ""} onClick={() => { setEra(getPrompt(eraPrompts)) }} />
        <Prompt title="Tone" prompt={tone ?? ""} onClick={() => { setTone(getPrompt(tonePrompts)) }} />
        <Prompt title="Setting" prompt={setting ?? ""} onClick={() => { setSetting(getPrompt(settingPrompts)) }} />
        <Prompt title="Pov" prompt={pov ?? ""} onClick={() => { setPov(getPrompt(povPrompts)) }} />
      </div>
      <div className='buttons'>
        <IconButton label="Copy"><SvgCopy /></IconButton>
        <IconButton label="Generate"><SvgRefresh /></IconButton>
      </div>
    </div>
  </ThemeProvider>
}

