import { useCallback, useState } from 'react';

import MusicSearchAPI from 'api/MusicSearchAPI';
import OpenAIAPI from 'api/OpenAIAPI';

import XMLParser from 'react-xml-parser';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function useMusicSearch() {
  const [music, setMusic] = useState({ title: '', artist: '', img: '' });

  const fetchMusicSearch = useCallback(async (keyword: string) => {
    const params = { keyword, sr: 'album', display: 1, v: 0.5 };
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; // eslint-disable-line

    try {
      await MusicSearchAPI.fetchMusicSearch(params)
        .then((response) => response.text())
        .then((str) => new XMLParser().parseFromString(str))
        .then((data) => {
          const { children } = data.children[0];
          const item = children.filter((child) => child.name === 'item')[0]
            .children;

          const text = item.filter((el) => el.name === 'title')[0].value;
          const img = item
            .filter((el) => el.name === 'image')[0]
            .value.replace('>', '');
          const [artist, title] = text.split(regExp);

          setMusic({ title, artist, img });
        });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }, []);

  const fetchOpenAI = useCallback(async (prompt: string) => {
    try {
      await OpenAIAPI.fetchOpenAI({
        apiKey: OPENAI_API_KEY,
        prompt,
      }).then((res) => {
        const { choices } = res.data;
        const [title] = choices[0].text.split('by');

        fetchMusicSearch(title);
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }, []);

  return { fetchOpenAI, music } as const;
}

export default useMusicSearch;
