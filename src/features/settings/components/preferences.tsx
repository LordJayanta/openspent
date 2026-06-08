import { COLORS } from '@/src/shared/constant/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CURRENCIES } from '../../../shared/constant/CURRENCIES';
import { useUserStore } from '../../user/store/useUserStore';
import Container from './container';

type PreferencesType = {
    title: string;
    options: string[]
}

export default function Preferences() {
    const {currency} = useUserStore();
    const preferenceItems: PreferencesType[] = [
        {
            title: 'Primary Currency',
            options: currency? [currency] : CURRENCIES.map((item) => item.code),
        },
        {
            title: 'App Theme',
            options: ['Dark'],
        },
        {
            title: 'Language',
            options: ['English'],
        }
    ]

    return (
        <Container iconName='shield-outline' title='Preferences'>
            {preferenceItems.map((item, index) => (
                <View key={item.title} style={[styles.container, index > 0 && {
                    borderTopWidth: 1,
                    borderTopColor: '#252525'
                }]}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.title}>{item.options[0]}</Text>
                        <Ionicons name='chevron-forward' size={20} color={COLORS.text} />
                    </View>
                </View>
            ))}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: "semibold",
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Inter',
        color: COLORS.text
    },
})