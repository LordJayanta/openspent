import { useUserStore } from '@/src/features/user/store/useUserStore'
import { Ionicons } from '@expo/vector-icons'
import { Href, router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeStore } from '../theme/store/useThemeStore'
import Avater from './avater'


type Props = {
    title: string;
    redirectPath?: Href;
    avater?: boolean
}

export default function Tab({ title, redirectPath = '/', avater }: Props) {

    const { name } = useUserStore();
    const { COLORS } = useThemeStore();
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.push(redirectPath)}>
                    <Ionicons name="chevron-back" color={COLORS.text.primary} size={32} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
            {avater && <View style={styles.right}>
                <Avater name={name} />
            </View>}
        </View>
    )
}

const useStyles = () => {
    const { COLORS } = useThemeStore();

    return StyleSheet.create({
        container: {
            // height: 64,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 24,
        },
        left: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 16,
        },
        title: {
            fontFamily: 'Inter',
            fontWeight: 'bold',
            fontSize: 20,
            lineHeight: 28,
            color: COLORS.text.primary
        },
        right: {
            flex: 1,
            alignItems: 'flex-end',
        },
    })
}