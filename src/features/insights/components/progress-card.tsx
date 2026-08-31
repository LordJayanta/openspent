import { useTransactionStore } from '@/features/transactions/store/useTransactionStore';
import Amount from '@/shared/components/Amount';
import Container from '@/shared/components/ui/container';
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';

type Props = {
    balance: number;
    percentageChange: number;
}

export default function ProgressCard({ balance, percentageChange }: Props) {
    const { COLORS } = useThemeStore();
    const { summary } = useTransactionStore();
    const { width } = useWindowDimensions();
    const styles = useStyles();

    // Scale chart radius off screen width, clamped for small phones / tablets.
    const chartRadius = useMemo(() => {
        const scaled = width * 0.13;
        return Math.min(Math.max(scaled, 40), 64);
    }, [width]);

    const pieChartData: pieDataItem[] = useMemo(() => ([
        { value: Math.abs(summary.balance), color: COLORS.text.accent },
        { value: Math.abs(summary.income), color: COLORS.text.secondary },
        { value: Math.abs(summary.expense), color: COLORS.text.disabled },
    ]), [summary.balance, summary.income, summary.expense, COLORS]);

    // Force PieChart to remount/redraw when the underlying values actually change —
    // gifted-charts doesn't always re-animate reliably on a pure data prop change.
    const chartKey = `${summary.balance}-${summary.income}-${summary.expense}`;

    return (
        <Container style={styles.container}>
            {/* Data */}
            <View style={styles.dataColumn}>
                <Text style={styles.dataLabel}>Available Balance</Text>

                <View style={{ gap: 4 }}>
                    <Amount style={styles.balanceAmount}>{balance}</Amount>

                    <View style={styles.deltaRow}>
                        <Ionicons
                            name={percentageChange > 0 ? 'arrow-up' : 'arrow-down'}
                            size={18}
                            color={percentageChange > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base}
                        />
                        <View style={styles.deltaTextRow}>
                            <Text
                                style={[
                                    styles.deltaPercent,
                                    { color: percentageChange > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base },
                                ]}
                            >
                                {percentageChange}%
                            </Text>
                            <Text style={styles.deltaLabel}>from last month</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Chart */}
            <View style={styles.reportCardChartContainer}>
                <PieChart
                    key={chartKey}
                    donut
                    radius={chartRadius}
                    innerRadius={chartRadius * 0.8}
                    data={pieChartData}
                    backgroundColor={COLORS.surface.lv1}
                    centerLabelComponent={() => <View style={styles.centerLabel} />}
                />
            </View>
        </Container>
    );
}

const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();
    const { width } = useWindowDimensions();

    const scale = Math.min(Math.max(width / 390, 0.85), 1.15);

    return StyleSheet.create({
        container: {
            paddingHorizontal: 16,
            paddingVertical: 16,
            minHeight: 136 * scale,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
        },
        dataColumn: {
            gap: 12,
            paddingTop: 12,
            flexShrink: 1,
            minWidth: 140,
        },
        dataLabel: {
            fontSize: TYPOGRAPHY.body.sm,
            color: COLORS.text.secondary,
        },
        balanceAmount: {
            fontSize: 29 * scale,
            color: COLORS.text.primary,
        },
        deltaRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        deltaTextRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        deltaPercent: {
            fontSize: TYPOGRAPHY.body.sm,
        },
        deltaLabel: {
            fontSize: TYPOGRAPHY.body.sm,
            color: COLORS.text.secondary,
        },
        reportCardChartContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
        },
        centerLabel: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        StatsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        StatsDataContainer: {
            gap: 6,
        },
        StatsText: {
            fontSize: TYPOGRAPHY.body.sm,
            color: COLORS.text.secondary,
            textTransform: 'uppercase',
        },
        StatsAmount: {
            fontSize: TYPOGRAPHY.heading.h4 * scale,
        },
    });
};