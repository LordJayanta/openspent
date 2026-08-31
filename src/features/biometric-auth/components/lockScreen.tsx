import IconImg from "@/assets/images/icon.png";
import { useLocalAuthStore } from '@/features/biometric-auth/store/useLocalAuthStore';
import { useGlobalStyle } from "@/shared/styles/globalStyle";
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUserStore } from '../../user/store/useUserStore';

export default function LockScreen() {
    const { toggleUnlock } = useLocalAuthStore();
    const { name } = useUserStore();
    const { COLORS } = useThemeStore();
    const styles = useStyles();
    const globalStyles = useGlobalStyle();

    return (
        <View style={globalStyles.baseScreen}>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image
                        source={IconImg}
                        style={{ width: 150, height: 150 }}
                    />

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.text}>Authenticate with Fingerprint</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={async () => await toggleUnlock()}>
                    <Ionicons name="finger-print-outline" size={40} color={COLORS.primary[500]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const useStyles = () => {
    const { COLORS } = useThemeStore();

    return StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        profile: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            paddingTop: 155,
            paddingBottom: 175,
        },
        textContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
        },
        title: {
            fontSize: 24,
            fontFamily: 'Inter',
            fontWeight: 'bold',
            color: COLORS.text.primary,
        },
        text: {
            fontSize: 14,
            fontFamily: 'Inter',
            fontWeight: 'regular',
            color: COLORS.text.secondary,
        }
    });
}