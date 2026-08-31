import { IoniconsName } from '@/shared/type/type'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeStore } from '../../theme/store/useThemeStore'


type IconProps = {
    Icon?: IoniconsName;
    onPress?: () => void;
    size?: number;
}

type Props = {
    title: string;
    leftAction?: IconProps;
    rightAction?: IconProps;
    centerAction?: IconProps & { type?: 'LOGO' | 'ICON' };
}

export default function AppBar({
    title,
    leftAction,
    rightAction,
    centerAction

}: Props) {
    const { COLORS } = useThemeStore();
    const styles = useStyle();

    return (
        <View style={[styles.container,
        { justifyContent: (leftAction || rightAction || centerAction) ? 'space-between' : 'center' }
        ]}>

            {leftAction?.Icon &&
                <TouchableOpacity onPress={leftAction.onPress} style={styles.iconContainer}>
                    <Ionicons name={leftAction.Icon} size={leftAction.size || 30} color={COLORS.text.primary} />
                </TouchableOpacity>
            }



            {centerAction ?
                (<View style={{ flexDirection: 'row', alignItems: 'center', gap: centerAction?.type === 'ICON' ? 14 : 8 }}>
                    <TouchableOpacity onPress={centerAction.onPress} style={styles.iconContainer}>
                        {centerAction?.type === 'ICON' && <Ionicons name={centerAction.Icon} size={centerAction.size || 30} color={COLORS.text.primary} />}
                        {centerAction.type === 'LOGO' && <Image
                            style={{ width: 43, height: 43 }}
                            source={require('@/assets/images/icon.png')}
                        />}
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>
                )

                : <Text style={styles.title}>{title}</Text>
            }


            {rightAction?.Icon &&
                <TouchableOpacity onPress={rightAction.onPress} style={styles.iconContainer}>
                    <Ionicons name={rightAction.Icon} size={rightAction.size || 30} color={COLORS.text.primary} />
                </TouchableOpacity>
            }
        </View>
    )
}

const useStyle = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        container: {
            // height: 62,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingVertical: 16,
        },
        iconContainer: {
            width: 30,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontFamily: 'Inter',
            fontSize: TYPOGRAPHY.heading.h4,
            color: COLORS.text.primary,
            textTransform: 'uppercase',
        },
    })
}