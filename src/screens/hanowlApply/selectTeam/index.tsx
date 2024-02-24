import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { hanowlApplyAtom } from 'src/atoms';
import { AppLayout, SelectBox, SelectLayout } from 'src/components';
import { HANOWL_APPLY } from 'src/constants';
import { useNavigate } from 'src/hooks';

export const SelectTeamScreen: React.FC = () => {
  const teams = HANOWL_APPLY.TEAMS;

  const navigate = useNavigate();

  const setHanowlApplyAtom = useSetRecoilState(hanowlApplyAtom);

  const [isSelected, setIsSelected] = useState(teams.map(() => false));

  const handleSelect = (index: number) => {
    const newSelected = isSelected.map((_, i) => (i === index ? true : false));
    setIsSelected(newSelected);
    setHanowlApplyAtom((prev) => ({ ...prev, team: teams[index] }));
  };

  return (
    <AppLayout
      headerText={`지원할 부서를\n선택해 주세요`}
      bottomText="다음"
      onPress={() => navigate('ApplyDetails')}
    >
      <SelectLayout>
        {teams.map((item, index) => (
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
