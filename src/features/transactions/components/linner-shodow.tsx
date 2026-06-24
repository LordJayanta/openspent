import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

type Props = {
    startFrom: 'left' | 'right';
}

export default function LinnerShodow({ startFrom }: Props) {
    const { COLORS } = useThemeStore();

    const startColor = (startFrom === 'left') ? COLORS.background.base : 'transparent';
    const endColor = (startFrom === 'left') ? 'transparent' : COLORS.background.base;

    return (
        <View
            style={[{
                position: 'absolute',
                top: 0,
                height: 100,
                width: 30,
                overflow: 'hidden',
            },
            startFrom === 'left' ? { left: 0 } : { right: 0 }]}
        >
            <LinearGradient
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                }}
                colors={[startColor, endColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </View>
    )
}