import { useCallback, useEffect } from 'react';
import './App.css';

import useMusicSearch from 'hooks/useMusicSearch';

import MusicResultPage from 'components/MusicResultPage';
import MusicSearchPage from 'components/MusicSearchPage';

function App() {
  const { fetchOpenAI, music } = useMusicSearch();

  const recommendMusic = useCallback(() => {
    // fetchOpenAI('recommend me one male indie song');
  }, [fetchOpenAI]);

  useEffect(() => {
    recommendMusic(); // Mount 시 호출한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, artist, img } = music;

  return (
    <div className="App">
      <MusicSearchPage />
      <MusicResultPage title={title} artist={artist} img={img} />
    </div>
  );
}

export default App;
