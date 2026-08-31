import Amount from '@/shared/components/Amount';
import Container from '@/shared/components/ui/container';
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import { IoniconsName } from '@/shared/type/type';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type SummaryCardType = {
    iconName: IoniconsName;
    title: string;
    amount: number;
    percentageChange: number;
    tenure?: 'Week' | 'Month' | 'Year';
    inverse?: boolean;
}

export default function SummaryCard({ amount, iconName, percentageChange, tenure = 'Month', title, inverse = false }: SummaryCardType) {
    const { COLORS } = useThemeStore();
    const styles = useStyle();

    const baseColor = inverse ? COLORS.semantic.warning.base : COLORS.semantic.success.base;
    const alterColor = inverse ? COLORS.semantic.success.base : COLORS.semantic.warning.base;

    return (
        <Container style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name={iconName} size={16} color={COLORS.text.accent} />
            </View>
            <View style={{ gap: 7 }}>
                <Text style={styles.title}>{title}</Text>
                <View style={{ gap: 6 }}>
                    <View>
                        <Amount style={styles.amount}>{amount}</Amount>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name={percentageChange > 0 ? 'arrow-up' : 'arrow-down'}
                            size={12} color={percentageChange > 0 ? baseColor : alterColor}
                        />
                        <View style={{ flexDirection: 'row', gap: 2 }}>
                            <Text style={[
                                styles.subText,
                                { color: percentageChange > 0 ? baseColor : alterColor }
                            ]}
                            >{percentageChange}%</Text>
                            <Text style={styles.subText}> from last {tenure}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Container>
    )
}

export const useStyle = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        container: {
            flex: 1,
            borderRadius: 12,
            padding: 10,
            gap: 14,
        },
        iconContainer: {
            width: 31,
            height: 31,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.border.accent,
            backgroundColor: '#3B6F3A4D',
        },
        title: {
            fontSize: TYPOGRAPHY.body.caption,
            color: COLORS.text.primary
        },
        amount: {
            fontSize: TYPOGRAPHY.body.lg,
            color: COLORS.text.primary
        },
        subText: {
            fontSize: TYPOGRAPHY.body.caption,
            color: COLORS.text.secondary
        },
    });
};
