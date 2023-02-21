import { useCallback, useEffect, useState } from 'react';
import './App.css';

const XMLParser = require('react-xml-parser');
const { Configuration, OpenAIApi } = require('openai');

function App() {
  const [music, setMusic] = useState({ title: '', artist: '', img: '' });
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; // eslint-disable-line

  // Mania search API 호출
  const fetchMusicSearchApi = useCallback(
    (keyword) => {
      const sr = 'album';

      fetch(`/api/search/${keyword}/?sr=${sr}&display=1&v=0.5`)
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
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    },
    [regExp]
  );

  // OpenAI API 호출
  const fetchOpenAIApi = useCallback(() => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const testPrompt = 'recommend me one male indie song';

    new OpenAIApi(configuration)
      .createCompletion({
        model: 'text-davinci-003',
        prompt: testPrompt,
        temperature: 0,
        max_tokens: 150,
      })
      .then((res) => {
        const { choices } = res.data;
        const [title] = choices[0].text.split('by');

        fetchMusicSearchApi(title);
      });
  }, [fetchMusicSearchApi]);

  useEffect(() => {
    fetchOpenAIApi(); // Mount 시 호출한다.
  }, [fetchOpenAIApi]);

  const { title, artist, img } = music;

  return (
    <div className="App">
      <img className="Thumbnail" src={img} alt="Thumbnail" />
      {title} {artist}
    </div>
  );
}

export default App;
