import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../theme/store/useThemeStore';

export default function FooterBranding() {
    const styles = useStyles();
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={{ width: 43, height: 43 }}
                    source={require('@/assets/images/icon.png')}
                />
                <Text style={styles.logoText}>OpenSpent</Text>
            </View>
            <View>
                <Text style={styles.description}>A Privacy focused, open-source personal finance tracker, designed for your eyes only. </Text>
            </View>
        </View>
    )
}

const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        container: {
            marginVertical: 54,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logoContainer: {
            flexDirection: 'row',
            gap: 6,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6,
        },
        logoText: {
            fontSize: TYPOGRAPHY.heading.h3,
            color: COLORS.text.primary,
        },
        description: {
            textAlign: 'center',
            fontSize: TYPOGRAPHY.body.sm,
            color: COLORS.text.secondary,
        }
    })
}