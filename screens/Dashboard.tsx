import { Text } from 'native-base';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  processColor
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';

const BarChartScreen = ({ navigation }: any) => {

  useEffect(()=>{
    navigation.closeDrawer();
  },[])

  const chartData = {
    legend: {
      enabled: true,
      textSize: 14,
      form: 'SQUARE',
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      formToTextSpace: 5,
      wordWrapEnabled: true,
      maxSizePercent: 0.5
    },
    data: {
      dataSets: [{
        values: [{ y: 100 }, { y: 105 }, { y: 102 }, { y: 110 }, { y: 114 }, { y: 109 }, { y: 105 }, { y: 99 }, { y: 95 }],
        label: 'Bar dataSet',
        config: {
          color: processColor('teal'),
          barShadowColor: processColor('lightgrey'),
          highlightAlpha: 90,
          highlightColor: processColor('red'),
        }
      }],

      config: {
        barWidth: 0.7,
      }
    },
    highlights: [{ x: 3 }, { x: 6 }],
    xAxis: {
      valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      granularityEnabled: true,
      granularity: 1,
    }
  };

  return (
    <View style={{ flex: 1,backgroundColor:'white' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'Welcome To H.G. & Sons'}</Text>
        </View>
        <BarChart
          style={styles.chart}
          data={chartData.data}
          xAxis={chartData.xAxis}
          animation={{ durationX: 2000 }}
          legend={chartData.legend}
          gridBackgroundColor={processColor('#ffffff')}
          visibleRange={{ x: { min: 5, max: 5 } }}
          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={true}
          // onSelect={this.handleSelect.bind(this)}
          highlights={chartData.highlights}
        // onChange={(event) => console.log(event.nativeEvent)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#28282B',
    display:'flex',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    height:50
  },
  title:{
    fontSize:22,
    color:'#FDBD01',
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    width:'100%',
    paddingBottom:50,
    display:'flex',
    justifyContent:'center',
    alignItems:"center"
  },
  chart: {
    flex: 1,
    width:'80%',
    height:'50%'
  }
});

export default BarChartScreen;