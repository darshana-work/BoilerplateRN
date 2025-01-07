import {
    Dimensions,
    ImageSourcePropType,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import {AuthContext} from '../../utils/authProvider';
import {FlatList} from 'react-native-gesture-handler';
import Indicators from '../../components/indicators';
import Slide from '../../components/slide';

export type SlideDataItem = {
    id: string;
    title: string;
    image: ImageSourcePropType;
    description: string;
  };
  
  const slideData = [
    {
      id: '1',
      title: 'Slide content 1',
      image: require('../../assets/images/logo.png'),
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    },
    {
      id: '2',
      title: 'Slide content 2',
      image: require('../../assets/images/logo.png'),
      description:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.',
    },
    {
      id: '3',
      title: 'Slide content 3',
      image: require('../../assets/images/logo.png'),
      description:
        "Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    },
  ];
  
  const ITEM_WIDTH = Dimensions.get('window').width;
  
  const IntroSlider = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextButtonPressed, setNextButtonPressed] = useState(false);
    const authContext = useContext(AuthContext);
  
    useEffect(() => {
      flatlistRef.current?.scrollToIndex({index: currentIndex});
      // setNextButtonPressed(false);
    }, [currentIndex]);
  
    const flatlistRef = useRef<FlatList<SlideDataItem>>(null);
  
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (nextButtonPressed == true) {
        return;
      }
      const offset = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offset / ITEM_WIDTH);
      setCurrentIndex(newIndex);
    };
  
    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setNextButtonPressed(false);
    };
  
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          ref={flatlistRef}
          data={slideData}
          renderItem={({item}) => <Slide item={item} />}
          keyExtractor={item => item.id}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={Dimensions.get('window').width}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEnd}
          horizontal
          disableIntervalMomentum
        />
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            width: '100%',
            alignItems: 'center',
          }}>
          <Indicators count={slideData.length} activeCount={currentIndex + 1} />
          <Pressable
            onPress={() => {
              setNextButtonPressed(true);
              if (currentIndex == slideData.length - 1) {
                // TODO: Go to Login Screen
                authContext?.setSeenIntroStatus(true);
                // navigation.navigate('Login');
              } else {
                setCurrentIndex(prev => prev + 1);
              }
            }}
            style={{
              paddingVertical: 16,
              width: '75%',
              backgroundColor: '#1F4FB1',
              borderRadius: 30,
            }}>
            <Text style={{textAlign: 'center', color: '#FFFFFF'}}>
              {currentIndex == slideData.length - 1 ? 'OK, GET STARTED' : 'NEXT'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  
  export default IntroSlider;
  