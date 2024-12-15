'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { Prompt } from './Prompt';
import { genrePrompts, perspectivePrompts, eraPrompts, tonePrompts, settingPrompts, povPrompts } from '../helpers/constants';

import "./Prompter.css";
import { Text } from '@itwin/itwinui-react';

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

  return <div className='prompter'>
    <Text>Writing prompt</Text>
    <Prompt prompt={genre ?? ""} onClick={() => { setGenre(getPrompt(genrePrompts)) }} />
    <Prompt prompt={perspective ?? ""} onClick={() => { setPerspective(getPrompt(perspectivePrompts)) }} />
    <Prompt prompt={era ?? ""} onClick={() => { setEra(getPrompt(eraPrompts)) }} />
    <Prompt prompt={tone ?? ""} onClick={() => { setTone(getPrompt(tonePrompts)) }} />
    <Prompt prompt={setting ?? ""} onClick={() => { setSetting(getPrompt(settingPrompts)) }} />
    <Prompt prompt={pov ?? ""} onClick={() => { setPov(getPrompt(povPrompts)) }} />
  </div>
}

// color={"#8B1E3F"}
// color={"#3C153B"}
// color={"#89bd9e"}
// color={"#f0c987"}
// color={"#db4c40"}
// color={"#8ea8c3"}

