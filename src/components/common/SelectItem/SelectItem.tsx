import { useState } from 'react';
import { keywordData } from 'utils/constants';
import { keywordType } from 'utils/types';

interface SelectItemProps {
  keyword: keywordType;
}

const SelectItem = (props: SelectItemProps) => {
  const { keyword } = props;
  const list = keywordData[keyword];

  const [selectedItem, setSelectedItem] = useState<
    { keyword: keywordType; item: string }[] | []
  >([]);

  const selectItem = (keyword: keywordType, item: string) => {
    // TODO: 아이템 선택
  };

  return (
    <section>
      {keyword}
      <ul>
        {list.map((item, idx) => {
          return (
            <li key={idx} onClick={(e) => selectItem(keyword, item)}>
              {item}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SelectItem;
