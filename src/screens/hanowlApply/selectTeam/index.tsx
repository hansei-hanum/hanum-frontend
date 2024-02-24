import React, { useState } from 'react';

import { AppLayout, SelectBox, SelectLayout } from 'src/components';
import { TEAMS_LIST } from 'src/constants';

export const SelectTeamScreen: React.FC = () => {
  const [isSelected, setIsSelected] = useState(TEAMS_LIST.map(() => false));

  const handleSelect = (index: number) => {
    const newSelected = isSelected.map((_, i) => (i === index ? true : false));
    setIsSelected(newSelected);
  };
  return (
    <AppLayout
      headerText={`지원할 부서를\n선택해 주세요`}
      bottomText="다음"
      isLoading={false}
      onPress={() => {}}
      isNotAuth
    >
      <SelectLayout>
        {TEAMS_LIST.map((item, index) => (
          <SelectBox
            key={index}
            name={item}
            isSelect={isSelected[index]}
            onPress={() => handleSelect(index)}
          />
        ))}
      </SelectLayout>
    </AppLayout>
  );
};
