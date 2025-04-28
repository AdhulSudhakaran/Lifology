import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import PodCastList from '../screens/PodCastList';





export type AppStackParamList = {
    'PodCastList': any,
};

const AppStack = createStackNavigator<AppStackParamList>();

const AppStackNavigator: React.FC = () => {
    return (
        <AppStack.Navigator screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide from left animation
        }} >
            <AppStack.Screen name='PodCastList' component={PodCastList} />

        </AppStack.Navigator>
    )
}
export default AppStackNavigator