import SelectItem from 'components/common/SelectItem';
import { keywordData } from 'utils/constants';
import { keywordType } from 'utils/types';

interface MusicSearchPageProps {}

const MusicSearchPage = (props: MusicSearchPageProps) => {
  const selectItemList = Object.keys(keywordData) as keywordType[];

  return (
    <div>
      <span>Get a song recommendation that suits you today!</span>
      {selectItemList.map((keyword, idx) => {
        return <SelectItem key={idx} keyword={keyword} />;
      })}
    </div>
  );
};

export default MusicSearchPage;
