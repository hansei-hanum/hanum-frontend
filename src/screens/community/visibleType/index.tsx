import React, { useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useRecoilState } from 'recoil';

import { CreatePostSettingForm, VisibleTypeCard } from 'src/components';
import { VISIBLE_TYPE_LIST } from 'src/constants';
import { visibleTypeAtom } from 'src/atoms';
import { useGetUser } from 'src/hooks';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

export const VisibleTypeScreen: React.FC = () => {
  const { userType } = useGetUser();
  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);

  const navigation = useNavigation();

  const filteredVisibleType = (text: LimitedArticleScopeOfDisclosure) => {
    switch (userType()) {
      case '졸업생':
        return text === LimitedArticleScopeOfDisclosure.Public || text === 'Alumni';
      case '재학생':
        return (
          text === LimitedArticleScopeOfDisclosure.Public || text === 'Student' || text === 'Peer'
        );
      case '교직원':
        return text === LimitedArticleScopeOfDisclosure.Public || text === 'Faculty';
      default:
        return text === LimitedArticleScopeOfDisclosure.Public;
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(
    VISIBLE_TYPE_LIST.map((item) => item.text === visibleType),
  );

  const onPressCategory = (index: number) => {
    setSelectedCategory((prev) => prev.map((_, i) => (i === index ? true : false)));
  };

  const onComplete = () => {
    const selectedType = VISIBLE_TYPE_LIST.find((_, index) => selectedCategory[index]);
    if (selectedType) {
      setVisibleType(selectedType.text);
    }
    navigation.goBack();
  };

  return (
    <CreatePostSettingForm headerTitle="공개 범위" onButtonPress={onComplete}>
      {VISIBLE_TYPE_LIST.map((props, index) => (
        <View
          style={{
            opacity: filteredVisibleType(props.text) ? 1 : 0.3,
          }}
          key={index}
        >
          <VisibleTypeCard
            key={index}
            index={index}
            isActive={filteredVisibleType(props.text) && selectedCategory[index]}
            onOptionClick={() => filteredVisibleType(props.text) && onPressCategory(index)}
            {...props}
          />
        </View>
      ))}
    </CreatePostSettingForm>
  );
};
