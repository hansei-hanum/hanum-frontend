import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { useRecoilState } from 'recoil';

import { hanowlApplyAtom } from 'src/atoms';
import { AppLayout, HanowlApplySkeleton, SelectBox, SelectLayout } from 'src/components';
import { useNavigate } from 'src/hooks';
import { useGetHanowlTeams } from 'src/hooks/query/hanowlApply';

export const SelectTeamScreen: React.FC = () => {
  const { data, isLoading } = useGetHanowlTeams();
  const teamsData = data?.data;

  const navigate = useNavigate();

  const [hanowlApply, setHanowlApply] = useRecoilState(hanowlApplyAtom);

  const [isSelected, setIsSelected] = useState(teamsData ? teamsData.items.map(() => false) : []);

  const handleSelect = (index: number) => {
    if (!teamsData) return;
    const newSelected = isSelected.map((_, i) => (i === index ? true : false));
    setIsSelected(newSelected);
    setHanowlApply((prev) => ({
      ...prev,
      team: { name: teamsData.items[index].name, id: teamsData.items[index].id },
    }));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && hanowlApply.team) {
      if (!teamsData) return;
      const index = teamsData.items.findIndex(({ name }) => name === hanowlApply.team.name);
      const newSelected = isSelected.map((_, i) => (i === index ? true : false));
      setIsSelected(newSelected);
    }
  }, [isFocused]);

  return (
    <AppLayout
      headerText={`지원할 부서를\n선택해 주세요`}
      bottomText="다음"
      onPress={() => navigate('HanowlApplyDetails')}
    >
      <SelectLayout>
        {isLoading && !teamsData ? (
          <HanowlApplySkeleton.TeamsSelect />
        ) : (
          teamsData?.items.map(({ name }, index) => (
            <SelectBox
              key={index}
              name={name}
              isSelect={isSelected[index]}
              onPress={() => handleSelect(index)}
            />
          ))
        )}
      </SelectLayout>
    </AppLayout>
  );
};
