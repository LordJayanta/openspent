import { useInsightsStore } from '@/src/features/insights/store/useInsightsStore';
import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore';
import { useUserStore } from '@/src/features/user/store/useUserStore';
import { SummaryType } from '@/src/shared/common.types';
import Container from '@/src/shared/components/ui/container';
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';

type Props = {
    summary: SummaryType;
}


export default function ReportCard({ summary }: Props) {
    // const [selectedMonth, setSelectedMonth] = React.useState('All');

    const styles = useStyles();
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    const { currencySymbol } = useUserStore();
    const { transactions } = useTransactionStore();
    const { selectedMonth, balance, expense, income, loadMonthlySummary } = useInsightsStore();

    const pieChartData: pieDataItem[] = [
        { value: summary.balance, color: COLORS.text.accent },
        { value: summary.income, color: COLORS.text.secondary },
        { value: summary.expense, color: COLORS.text.disabled }
    ]

    React.useEffect(() => {
        loadMonthlySummary({ month: selectedMonth, transactions: transactions })
    }, [selectedMonth, transactions, loadMonthlySummary]);

    return (
        <Container>
            <View style={styles.reportCard}>
                {/* Filter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text
                        style={{
                            fontWeight: 'semibold',
                            fontSize: TYPOGRAPHY.body.sm,
                            color: COLORS.text.secondary,
                        }}
                    >This Month</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                    }}>
                        <Text
                            style={{
                                fontSize: TYPOGRAPHY.body.sm,
                                color: COLORS.text.secondary,
                            }}
                        >{selectedMonth}</Text>
                        <Ionicons name="chevron-down" size={23} color={COLORS.text.secondary} />
                    </View>
                </View>

                {/* Report */}
                <View style={styles.reportCardWrraper}>
                    {/* Data */}
                    <View style={{ gap: 8, paddingTop: 8 }}>
                        <Text
                            style={{
                                fontSize: TYPOGRAPHY.body.sm,
                                color: COLORS.text.secondary,
                            }}
                        >Available Balance</Text>

                        <View style={{ gap: 4 }}>
                            <Text
                                style={{
                                    fontSize: 29,
                                    color: COLORS.text.primary,
                                }}
                            >{currencySymbol}{Math.abs(balance.amount)}</Text>

                            {(balance.percentage!==0) && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name={balance.percentage > 0 ? 'arrow-up' : 'arrow-down'} size={20} color={balance.percentage > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text
                                        style={{
                                            fontSize: TYPOGRAPHY.body.sm,
                                            color: balance.percentage > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base,
                                        }}
                                    >{balance.percentage}%</Text>
                                    <Text
                                        style={{
                                            fontSize: TYPOGRAPHY.body.sm,
                                            color: COLORS.text.secondary,
                                        }}
                                    >from last month</Text>
                                </View>
                            </View>}
                        </View>
                    </View>

                    {/* Chart */}
                    <View style={styles.reportCardChartContainer}>
                        <PieChart
                            donut
                            radius={50}
                            innerRadius={40}
                            data={pieChartData}
                            backgroundColor={COLORS.surface.lv1}
                            centerLabelComponent={() => (
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                            )}
                        />
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.StatsContainer}>
                    <View style={styles.StatsDataContainer}>
                        <Text style={styles.StatsText}>income</Text>
                        <Text style={[styles.StatsAmount, { color: COLORS.text.accent }]}>+{currencySymbol}{Math.abs(income.amount)}</Text>
                    </View>
                    <View style={styles.StatsDataContainer}>
                        <Text style={styles.StatsText}>expense</Text>
                        <Text style={[styles.StatsAmount, { color: COLORS.text.primary }]}>-{currencySymbol}{Math.abs(expense.amount)}</Text>
                    </View>
                </View>
            </View>
        </Container>
    )
}


const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        reportCard: {
            padding: 16,
            gap: 16,
        },
        reportCardWrraper: {
            height: 132,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        reportCardChartContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        StatsContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        StatsDataContainer: {
            display: "flex",
            gap: 6,
        },
        StatsText: {
            fontSize: TYPOGRAPHY.body.sm,
            color: COLORS.text.secondary,
            textTransform: "uppercase",
        },
        StatsAmount: {
            fontSize: TYPOGRAPHY.heading.h4,
        },
    });
};
