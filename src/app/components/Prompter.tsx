'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { Prompt } from './Prompt';
import { genrePrompts, perspectivePrompts, eraPrompts, tonePrompts, settingPrompts, povPrompts } from '../helpers/constants';

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

  return <div>
    Writing prompt
    <Prompt prompt={genre ?? ""} onClick={() => { }} />
    <Prompt prompt={perspective ?? ""} onClick={() => { }} />
    <Prompt prompt={era ?? ""} onClick={() => { }} />
    <Prompt prompt={tone ?? ""} onClick={() => { }} />
    <Prompt prompt={setting ?? ""} onClick={() => { }} />
    <Prompt prompt={pov ?? ""} onClick={() => { }} />
  </div>
}

