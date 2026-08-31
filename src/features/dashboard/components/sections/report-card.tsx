import { useInsightsStore } from '@/features/insights/store/useInsightsStore';
import { useTransactionStore } from '@/features/transactions/store/useTransactionStore';
import { SummaryType } from '@/shared/common.types';
import Amount from '@/shared/components/Amount';
import Container from '@/shared/components/ui/container';
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';

type Props = {
    summary: SummaryType;
}

export default function ReportCard({ summary }: Props) {
    const { width } = useWindowDimensions();
    const styles = useStyles();
    const { COLORS } = useThemeStore();
    const { transactions } = useTransactionStore();
    const { selectedMonth, balance, expense, income, loadMonthlySummary } = useInsightsStore();

    // Scale chart radius off screen width instead of a fixed px value.
    // Clamped so it doesn't blow up on tablets or shrink too far on small phones.
    const chartRadius = useMemo(() => {
        const scaled = width * 0.13;
        return Math.min(Math.max(scaled, 40), 64);
    }, [width]);

    React.useEffect(() => {
        loadMonthlySummary({ month: selectedMonth, transactions: transactions });
    }, [selectedMonth, transactions, loadMonthlySummary]);

    // Note:
    // Build chart data from the SAME source as the on-screen numbers (the store),
    // not the `summary` prop — otherwise the chart can visually lag behind the
    // real balance/income/expense after loadMonthlySummary updates.
    const pieChartData: pieDataItem[] = useMemo(() => ([
        { value: Math.abs(balance.amount), color: COLORS.text.accent },
        { value: Math.abs(income.amount), color: COLORS.text.secondary },
        { value: Math.abs(expense.amount), color: COLORS.text.disabled },
    ]), [balance.amount, income.amount, expense.amount, COLORS]);

    // Note:
    // gifted-charts' PieChart doesn't always re-animate purely on prop change;
    // remounting via `key` when the underlying values change guarantees the
    // chart actually redraws to the new values.
    const chartKey = `${balance.amount}-${income.amount}-${expense.amount}`;

    return (
        <Container>
            <View style={styles.reportCard}>
                {/* Filter */}
                <View style={styles.filterRow}>
                    <Text style={styles.filterLabel}>This Month</Text>

                    <View style={styles.filterSelector}>
                        <Text style={styles.filterSelectorText}>{selectedMonth}</Text>
                        <Ionicons name="chevron-down" size={20} color={COLORS.text.secondary} />
                    </View>
                </View>

                {/* Report */}
                <View style={styles.reportCardWrapper}>
                    {/* Data */}
                    <View style={styles.dataColumn}>
                        <Text style={styles.dataLabel}>Available Balance</Text>

                        <View style={{ gap: 4 }}>
                            <Amount style={styles.balanceAmount}>{balance.amount}</Amount>

                            {balance.percentage !== 0 && (
                                <View style={styles.deltaRow}>
                                    <Ionicons
                                        name={balance.percentage > 0 ? 'arrow-up' : 'arrow-down'}
                                        size={18}
                                        color={balance.percentage > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base}
                                    />
                                    <View style={styles.deltaTextRow}>
                                        <Text
                                            style={[
                                                styles.deltaPercent,
                                                { color: balance.percentage > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base },
                                            ]}
                                        >
                                            {balance.percentage}%
                                        </Text>
                                        <Text style={styles.deltaLabel}>from last month</Text>
                                    </View>
                                </View>
                            )}
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
                </View>

                {/* Stats */}
                <View style={styles.StatsContainer}>
                    <View style={styles.StatsDataContainer}>
                        <Text style={styles.StatsText}>income</Text>
                        <Amount style={styles.StatsAmount} >
                            {income.amount}
                        </Amount>
                    </View>
                    <View style={styles.StatsDataContainer}>
                        <Text style={styles.StatsText}>expense</Text>
                        <Amount style={styles.StatsAmount}>
                            {-expense.amount}
                        </Amount>
                    </View>
                </View>
            </View>
        </Container>
    );
}

const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();
    const { width } = useWindowDimensions();

    // Note:
    // Simple width-based scale so text/gaps ease down on narrow phones
    // without needing a separate scaling lib.
    const scale = Math.min(Math.max(width / 390, 0.85), 1.15);

    return StyleSheet.create({
        reportCard: {
            padding: 16,
            gap: 16,
        },
        filterRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        filterLabel: {
            fontWeight: '600',
            fontSize: TYPOGRAPHY.body.sm,
            color: COLORS.text.secondary,
        },
        filterSelector: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        filterSelectorText: {
            fontSize: TYPOGRAPHY.body.sm,
            color: COLORS.text.secondary,
        },
        reportCardWrapper: {
            minHeight: 132 * scale,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
        },
        dataColumn: {
            gap: 8,
            paddingTop: 8,
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
            flexWrap: 'wrap',
            gap: 12,
        },
        StatsDataContainer: {
            gap: 6,
            flexShrink: 1,
            minWidth: 100,
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