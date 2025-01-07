import {View} from 'react-native';

type IndicatorsProps = {
  count: number;
  activeCount: number;
};

const Indicators = ({count, activeCount}: IndicatorsProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {Array(count)
        .fill(true)
        .map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: index < activeCount ? 14 : 8,
                height: index < activeCount ? 14 : 8,
                borderRadius: index < activeCount ? 7 : 4,
                backgroundColor: index < activeCount ? '#1F4FB1' : 'grey',
                marginBottom: 16,
                marginHorizontal: 2,
              }}
            />
          );
        })}
    </View>
  );
};

export default Indicators;
