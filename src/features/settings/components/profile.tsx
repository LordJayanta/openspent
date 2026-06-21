import { useUserStore } from '@/src/features/user/store/useUserStore';
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    // Styles
    const { COLORS } = useThemeStore();
    const styles = useStyle();

    const { name } = useUserStore();


    return (
        <View style={styles.profile}>
            <View style={styles.info}>
                <View style={[styles.iconContainer]}>
                    <Ionicons name={'person-outline'} color={COLORS.text.secondary} size={20} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>Local Account</Text>
                </View>
            </View>
            <Ionicons name='chevron-forward' size={24} color={COLORS.text.primary} />
        </View>
    )
}


const useStyle = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        profile: {
            paddingHorizontal: 14,
            paddingVertical: 16,
            backgroundColor: COLORS.surface.lv1,
            borderColor: COLORS.border.subtle,
            borderRadius: 14,
            borderWidth: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        info: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
        },
        iconContainer: {
            width: 48,
            height: 48,
            borderRadius: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.surface.lv4,
            borderColor: COLORS.border.default,
            borderWidth: 1,
        },
        textContainer: {
            display: "flex",
            flexDirection: "column",
            gap: 2,
        },
        title: {
            fontSize: TYPOGRAPHY.body.lg,
            color: COLORS.text.primary,
        },
        subtitle: {
            fontSize: TYPOGRAPHY.body.caption,
            color: COLORS.text.secondary,
        },
    });
};
