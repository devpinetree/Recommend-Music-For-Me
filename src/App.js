import { useCallback, useEffect } from 'react';
import './App.css';

import useMusicSearch from 'hooks/useMusicSearch';

function App() {
  const { fetchOpenAI, music } = useMusicSearch();

  const recommendMusic = useCallback(() => {
    fetchOpenAI('recommend me one male indie song');
  }, [fetchOpenAI]);

  useEffect(() => {
    recommendMusic(); // Mount 시 호출한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
