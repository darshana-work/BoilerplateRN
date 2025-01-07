import * as COLORS from '../utils/colors.js';

import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {SlideDataItem} from '../screens/introslider/introslider';

type SlideProps = {
  item: SlideDataItem;
};

const Slide = ({item}: SlideProps) => {
  return (

    <View style={{backgroundColor: COLORS.white}}>
      <SafeAreaView style={{backgroundColor: COLORS.white}}>
        <Text
          style={{
            marginTop: 50,
            textAlign: 'center',
            fontSize: 25,
            color: '#1F4FB1',
            paddingHorizontal: '20%',
          }}>
          {item.title}
        </Text>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 16,
            textAlign: 'center',
            fontSize: 15,
            color: COLORS.themeColor,
          }}>
          {item.description}
        </Text>
      </SafeAreaView>
      </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Slide;
