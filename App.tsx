import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import AppStackNavigator from './src/navigation/AppNavigator'
import { navigationRef } from './src/utils/NavigationHelper'
import { StoreProvider } from './src/store/StoreProvider'
import SubscribedModal from './src/components/SubscribedModal'


const App = () => {
  return (
    <StoreProvider  >
    <NavigationContainer ref={navigationRef} >
      <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
      <AppStackNavigator />
    </NavigationContainer>
    </StoreProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})