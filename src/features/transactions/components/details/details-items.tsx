import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import { IoniconsName } from '@/shared/type/type';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ExtraDetailsTtpe = {
    name: string;
    value: string;
    icon: IoniconsName;
    onPress?: () => void;
    sparator?: boolean;
}

export default function DetailItem({ icon, name, value, onPress,sparator=false }: ExtraDetailsTtpe) {
    const styles = useStyles();
    const { COLORS } = useThemeStore();

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, sparator && styles.border]}>
            <View style={styles.leftContainer}>
                <Ionicons name={icon} size={20} color={COLORS.text.primary} />
                <Text style={styles.text}>{name}</Text>
            </View>
            <View>
                <Text style={styles.subText}>{value}</Text>
            </View>
        </TouchableOpacity>
    )
}

const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 14,
        },
        leftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        border: {
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border.subtle
        },
        text: {
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.body.md,
        },
        subText: {
            color: COLORS.text.tertiary,
            fontSize: TYPOGRAPHY.body.md,
        }
    })
}