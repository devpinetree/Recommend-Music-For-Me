import { useCallback, useEffect, useState } from 'react';
import './App.css';

import useMusicSearch from 'hooks/useMusicSearch';

function App() {
  const { fetchOpenAI, music } = useMusicSearch();

  const recommendMusic = useCallback(async () => {
    fetchOpenAI('recommend me one male indie song');
  }, []);

  useEffect(() => {
    recommendMusic(); // Mount 시 호출한다.
  }, []);

  const { title, artist, img } = music;

  return (
    <div className="App">
      <img className="Thumbnail" src={img} alt="Thumbnail" />
      {title} {artist}
    </div>
  );
}

export default App;
