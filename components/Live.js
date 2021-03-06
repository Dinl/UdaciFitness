import React, { Component } from 'react'
import { Platform, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Vibration } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Constants, Location, Permissions } from 'expo'
import { calculateDirection } from '../utils/helpers';

export default class Live extends Component {
	state= {
		registers: [],
		coords: 1,
		status: 1,
		direction: ''
	}

	componentDidMount () {
		Permissions.getAsync(Permissions.LOCATION)
		.then(({status}) => {
			if(status === 'granted') {
				return this.setLocation();
			}
			this.setState(() => ({ status }))
		})
		.catch((error) => {
			console.warn('Error getting location permission', error)
			this.setState(() => ({ status: 'undetermined' }))
		})
	}

	askPermission = () => {
		Permissions.askAsync(Permissions.LOCATION)
			.then(({ status }) => {
				
				if(status === 'granted') {
					return this.setLocation();
				}
				this.setState(() => ({status}));
			})
			.catch((error) => console.warn('Error asking location permission', error))
	}

	setLocation = () => {
		Location.watchPositionAsync({
			enableHighAccuracy: true,
			timeInterval: 1,
			distanceInterval: 1
		}, ({coords}) => {
			const newDirection = calculateDirection(coords.heading);
			const { direction } = this.state;
			this.setState(() => ({
				registers: [coords, ...this.state.registers],
				coords,
				status: 'granted',
				direction: newDirection
			}))
		})
	}

	render() {
		const { status, coords, direction, registers } = this.state;
		console.log(registers);
		if(status === null) {
			return <ActivityIndicator style={{marginTop: 30}}/>
		}

		if(status === 'denied') {
			return (
				<View style={styles.center}>
					<Foundation name='alert' size={50} />
					<Text>
					You denied your location. You can fix this by visiting your settings and enabling location services for this app
					</Text>
				</View>
			)
		}

		if(status === 'undetermined') {
			return (
				<View style={styles.center}>
					<Foundation name='alert' size={50} />
					<Text>You need to enable location services for this app</Text>
					<TouchableOpacity style={styles.button} onPress={this.askPermission}>
						<Text style={styles.buttonText}>
							Enable
						</Text>
					</TouchableOpacity>
				</View>
			)
		}

		return (
			<View style={styles.directionContainer}>
				 <View style={styles.directionContainer}>
				 	<Text style={styles.header}>You're heading</Text>
					 <Text style={styles.direction}>
					 	{direction}
					 </Text>
					 <View style={styles.metricContainer}>
					 	<View style={styles.metric}>
							<Text style={[styles.header, {color: white}]}>
								Altitude
							</Text>
							<Text style={[styles.subHeader, {color: white}]}>
								{Math.round(coords.altitude)} meters
							</Text>
						</View>
						<View style={styles.metric}>
							<Text style={[styles.header, {color: white}]}>
								Speed
							</Text>
							<Text style={[styles.subHeader, {color: white}]}>
								{(coords.speed * 2.2369).toFixed(1)} MPH
							</Text>
						</View>
					 </View>
					<View>
						{registers.map((register) => {
							<Text>{register}</Text>
						})}
					</View>
				 </View>
			</View>
		)


	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'space-between'
	},
	center: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  marginLeft: 30,
	  marginRight: 30,
	},
	button: {
	  padding: 10,
	  backgroundColor: purple,
	  alignSelf: 'center',
	  borderRadius: 5,
	  margin: 20,
	},
	buttonText :{
	  color: white,
	  fontSize: 20,
	},
	directionContainer: {
	  flex: 1,
	  justifyContent: 'center',
	},
	header: {
	  fontSize: 35,
	  textAlign: 'center',
	},
	direction: {
	  color: purple,
	  fontSize: 120,
	  textAlign: 'center',
	},
	metricContainer: {
	  flexDirection: 'row',
	  justifyContent: 'space-around',
	  backgroundColor: purple,
	},
	metric: {
	  flex: 1,
	  paddingTop: 15,
	  paddingBottom: 15,
	  backgroundColor: 'rgba(255, 255, 255, 0.1)',
	  marginTop: 20,
	  marginBottom: 20,
	  marginLeft: 10,
	  marginRight: 10,
	},
	subHeader: {
	  fontSize: 25,
	  textAlign: 'center',
	  marginTop: 5,
	},
  })