import React from 'react';
import { View } from 'react-native';
import { useThemeStore } from '../../theme/store/useThemeStore';

type Props = {
    percentage: number;
}
export default function ProgressBar({percentage}: Props) {
    const { COLORS } = useThemeStore();
    return (
        <View>
            <View style={{
                height: 6,
                flex: 1,
                backgroundColor: COLORS.surface.lv3,
                borderRadius: 100,
                overflow: 'hidden',
            }}>
                <View
                    style={{
                        width: `${percentage}%`,
                        height: 6,
                        backgroundColor: COLORS.text.accent,
                        borderRadius: 6,
                    }}
                />
            </View>
        </View>
    )
}