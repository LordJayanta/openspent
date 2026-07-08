import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useThemeStore } from '../theme/store/useThemeStore';


export default function PageLoader() {
    const { COLORS } = useThemeStore();
    
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.background.base
        }}>
            <ActivityIndicator size={'large'} color={COLORS.primary[500]} />
        </View>
    )
}