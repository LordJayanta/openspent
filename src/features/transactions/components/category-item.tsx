import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { type IconName } from '@/src/features/transactions/constant/Category';
import { useThemeStore } from "@/src/shared/theme/store/useThemeStore";

export default function CategoryItem({ active = false, name, icon }: { active?: boolean, name: string, icon: IconName }) {
    const styles = useStyles();
    const { COLORS } = useThemeStore();

    return (
        <View style={styles.container}>
            <View style={[
                styles.icon,
                active ? styles.activeIcon : styles.defaultIcon
            ]}>
                <Ionicons 
                name={icon} 
                color={active ? COLORS.text.accent : COLORS.text.primary} 
                size={16} />
            </View>
            <Text
                style={[
                    styles.text,
                    { color: active ? COLORS.text.accent : COLORS.text.secondary }
                ]}
            >{name}</Text>
        </View>
    )
}



const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
        },
        text: {
            fontSize: TYPOGRAPHY.body.sm,
            textTransform: "capitalize",
        },
        icon: {
            width: 56,
            height: 56,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
        },
        defaultIcon: {
            borderRadius: 1000,
            borderColor: COLORS.border.subtle,
            backgroundColor: COLORS.surface.lv1,
        },
        activeIcon: {
            borderRadius: 16,
            borderColor: COLORS.border.accent,
            backgroundColor: 'rgba(59, 111, 58, 0.3)',
        }
    })
}