import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo } from './utils/helpers';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { white } from './utils/colors'
import DateHeader from './components/DateHeader'

import reducer from './reducers'

import AddEntry from './components/AddEntry'
import History from './components/History'

export default class App extends React.Component {
  render() {
    return (
			<Provider store={createStore(reducer)} >
				<View style={styles.container}>
					<View style={{height: 20}} />
					<History />
				</View>
			</Provider>
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
