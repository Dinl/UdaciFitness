import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry'
import { getMetricMetaInfo } from './utils/helpers';

export default class App extends React.Component {
  render() {
    return (
      <View >
        {getMetricMetaInfo('bike').getIcon()}
      </View>
    );
  }
}
