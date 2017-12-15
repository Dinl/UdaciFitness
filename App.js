import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddEntry from './components/AddEntry'
import { getMetricMetaInfo } from './utils/helpers';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.containe}>
		<AddEntry />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		alignItems: "stretch",
		justifyContent: "center"
	}
})
