import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyB6vjr8RV9gmpS-F4B0G7OoI4GGsnCW9QA",
  authDomain: "instaclone-2e142.firebaseapp.com",
  projectId: "instaclone-2e142",
  storageBucket: "instaclone-2e142.appspot.com",
  messagingSenderId: "676835362291",
  appId: "1:676835362291:web:90755f241b722106b17e86",
  measurementId: "G-GM8X2TTHCX"
};

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './components/auth/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/Home'
import addPicture from './components/Pictures/addPicture'

const Stack = createStackNavigator();

export class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false
        }
    }
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) =>{
            if(!user){
                this.setState({
                    loggedIn: false,
                    loaded: true
                })
            }
            this.setState({
                    loggedIn: true,
                    loaded: true
                })
        })    
    }
    
    render() {
        const { loggedIn, loaded } = this.state;
        if (!loaded){
            return(
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>
                );
        }
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name="Landing" component={Landing} options={ {headerShown: false}}/>
                    <Stack.Screen name="Register" component={Register} options={ {headerShown: false}}/>
                    <Stack.Screen name="Login" component={Login} options={ {headerShown: false}}/>
                    <Stack.Screen name="Home" component={Home} options={ {headerShown: false}}/>
                    <Stack.Screen name="addPicture" component={addPicture} options={ {headerShown: false}}/>
                </Stack.Navigator>
        </NavigationContainer>
        );
    }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
