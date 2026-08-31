import { useUserStore } from '@/features/user/store/useUserStore';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { useThemeStore } from '../theme/store/useThemeStore';

interface AmountDisplayProps {
    /** Raw numeric value (e.g. 12500.5) */
    children: number;
    /** Locale for formatting, default 'en-US' */
    locale?: string;
    /** Custom text styling */
    style?: StyleProp<TextStyle>;
}

export default function Amount({ children, style, locale = 'en-US' }: AmountDisplayProps) {
    const { currency } = useUserStore();
    const styles = useStyles();

    // Check if the value is an integer (has no decimal remainder)
    const isInteger = Number.isInteger(children);

    const formattedAmount = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: isInteger ? 0 : 2,
        minimumFractionDigits: isInteger ? 0 : 2,
    }).format(children);

    return (
        <View style={styles.container}>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={[
                    styles.text,
                    children < 0 ? styles.positive : styles.negative,
                    style
                ]}
            >
                {children > 0 && '+'}{formattedAmount}
            </Text>
        </View>
    )
}

const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();
    return StyleSheet.create({
        container: {
            flexShrink: 1
        },
        text: {
            fontSize: TYPOGRAPHY.body.md
        },
        negative: {
            color: COLORS.semantic.success.base,
        },
        positive: {
            color: COLORS.semantic.danger.base,
        },
    })
};