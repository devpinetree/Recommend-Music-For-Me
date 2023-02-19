import { useCallback, useEffect, useState } from 'react';

const { Configuration, OpenAIApi } = require('openai');

function App() {
  const [music, setMusic] = useState({ title: '', singer: '' });

  // Mania search API 호출
  const fetchMusicSearchApi = useCallback(() => {
    const { title, singer } = music;
    const searchKeyword = 'Poker Face'; // FIXME: 추후 수정 예정

    fetch(`/api/search/${searchKeyword}/?sr=song&display=10&v=0.5`)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then((data) => {
        console.log(data);
        const items = data.querySelectorAll('item');

        let html = ``;
        items.forEach((el) => {
          html += `
            <article>
              <img src="${
                el.querySelector('link').innerHTML
              }/image/large.png" alt="">
              <h2>
                <a href="${
                  el.querySelector('link').innerHTML
                }" target="_blank" rel="noopener">
                  ${el.querySelector('title').innerHTML}
                </a>
              </h2>
            </article>
          `;
        });
        document.body.insertAdjacentHTML('beforeend', html);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }, []);

  // OpenAI API 호출
  const fetchOpenAIApi = useCallback(() => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const testPrompt = 'recommend me one female indie song';

    new OpenAIApi(configuration)
      .createCompletion({
        model: 'text-davinci-003',
        prompt: testPrompt,
        temperature: 0,
        max_tokens: 150,
      })
      .then((res) => {
        const { choices } = res.data;
        const [title, singer] = choices[0].text.split('by');

        setMusic({ title, singer }); // 음악의 제목, 가수 데이터 저장
      });
  }, []);

  useEffect(() => {
    fetchOpenAIApi(); // Mount 시 호출한다.
    fetchMusicSearchApi();
  }, []);

  const { title, singer } = music;
  return (
    <div className="App">
      {title} - {singer}
    </div>
  );
}

export default App;
