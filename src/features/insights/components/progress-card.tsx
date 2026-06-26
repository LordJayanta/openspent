import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore';
import Container from '@/src/shared/components/ui/container';
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';
import { useUserStore } from '../../user/store/useUserStore';

type Props = {
    balance: number;
    percentageChange: number;
}

export default function ProgressCard({ balance, percentageChange }: Props) {
    const { COLORS, TYPOGRAPHY } = useThemeStore();
    const { summary } = useTransactionStore()
    const styles = useStyles();

    const { currencySymbol } = useUserStore();

    const pieChartData: pieDataItem[] = [
        { value: summary.balance, color: COLORS.text.accent },
        { value: summary.income, color: COLORS.text.secondary },
        { value: summary.expense, color: COLORS.text.disabled },
    ]

    return (
        <Container style={styles.container}>
            {/* Data */}
            <View style={{ gap: 12, paddingTop: 12 }}>
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
                    >{currencySymbol}{Math.abs(balance)}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name={percentageChange > 0 ? 'arrow-up' : 'arrow-down'} size={20} color={percentageChange > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text
                                style={{
                                    fontSize: TYPOGRAPHY.body.sm,
                                    color: percentageChange > 0 ? COLORS.semantic.success.base : COLORS.semantic.warning.base,
                                }}
                            >{percentageChange}%</Text>
                            <Text
                                style={{
                                    fontSize: TYPOGRAPHY.body.sm,
                                    color: COLORS.text.secondary,
                                }}
                            >from last month</Text>
                        </View>
                    </View>
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
        </Container>
    )
}


const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        container: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            height: 136,
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
