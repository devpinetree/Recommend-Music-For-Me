export default class MusicSearchAPI {
  // maniaDB 음악 키워드 검색
  static fetchMusicSearch(params) {
    const { keyword, sr, display, v } = params;

    return fetch(`/api/search/${keyword}/?sr=${sr}&display=${display}&v=${v}`);
  }
}
