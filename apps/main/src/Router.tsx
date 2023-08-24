import React, { useCallback, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {
    SpoqaHanSansNeoBold,
    SpoqaHanSansNeoMedium,
    SpoqaHanSansNeoRegular,
    SpoqaHanSansNeoLight,
    SpoqaHanSansNeoThin
} from './assets';
import { HomeScreen } from './screens';

const stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export const Router: React.FC = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    SpoqaHanSansNeoBold: SpoqaHanSansNeoBold,
                    SpoqaHanSansNeoMedium: SpoqaHanSansNeoMedium,
                    SpoqaHanSansNeoRegular: SpoqaHanSansNeoRegular,
                    SpoqaHanSansNeoLight: SpoqaHanSansNeoLight,
                    SpoqaHanSansNeoThin: SpoqaHanSansNeoThin
                });
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady) {
            await SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                <stack.Screen name="Home" component={HomeScreen} />
            </stack.Navigator>
        </NavigationContainer >
    );
};
