import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { getMetricMetaInfo } from './utils/helpers';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { white, purple } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import reducer from './reducers'

import DateHeader from './components/DateHeader'
import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'

function UdaciStatusBar ({ backgroundColor, ...props }) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}


const Tabs = TabNavigator({
	History: {
		screen: History,
		navigationOptions: {
			tabBarLabel: 'History',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
		}
	},
	AddEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarLabel: 'Add Entry',
			tabBarIcon: ({ tintColor }) => <Ionicons name='plus-square' size={30} color={tintColor} />
		}
	},
	Live: {
		screen: Live,
		navigationOptions: {
			tabBarLabel: 'Live',
			tabBarIcon: ({ tintColor }) => <Ionicons name='plus-speedometer' size={30} color={tintColor} />
		}
	}
}, {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : purple,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
});

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
	},
	EntryDetail: {
		screen: EntryDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	}
});

export default class App extends React.Component {
  render() {
    return (
			<Provider store={createStore(reducer)} >
				<View style={styles.container}>
					<UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
					<MainNavigator />
				</View>
			</Provider>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center"
	}
})
