
import { insightsDb } from '@/features/insights/db/insightsDb';
import { useTransactionStore } from '@/features/transactions/store/useTransactionStore';
import Container from '@/shared/components/ui/container';
import SectionHeader from '@/shared/components/ui/section-header';
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart, barDataItem } from 'react-native-gifted-charts';
import { useUserStore } from '../../user/store/useUserStore';


export const BarChartSection = () => {
    const styles = useStyle();
    const { COLORS } = useThemeStore();
    const { summary } = useTransactionStore();
    const [barData, setBarData] = useState<barDataItem[]>([]);
    const { currencySymbol } = useUserStore();

    const loadMonthlyData = async () => {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const data = await insightsDb.getIncomeData();
        if (!data) return;

        const finalData = data.map((item) => ({ value: item.totalIncome, label: months[Number(item.month.charAt(6))] }))
        setBarData(finalData);
    }


    useEffect(() => { loadMonthlyData() }, [])

    return (

        <View>
            <View style={styles.ChartHeaderContainer}>
                <SectionHeader title='Cash Flow' linkText={`Total : ${ currencySymbol } ${summary.income}`} />
            </View>
            <Container style={{ paddingVertical: 16 }}>
                <BarChart
                    data={barData}
                    barWidth={35}
                    spacing={20}
                    hideRules
                    hideYAxisText
                    yAxisThickness={0}
                    xAxisThickness={0}
                    noOfSections={3}
                    barBorderRadius={12}
                    frontColor={COLORS.background.inverse}
                    xAxisLabelTextStyle={{ color: COLORS.text.secondary, fontSize: 10 }}
                    yAxisTextStyle={{ color: COLORS.text.secondary }}
                />
            </Container>
        </View>
    )
}


const useStyle = () => {
    return StyleSheet.create({
        ChartHeaderContainer: {
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingVertical: 16,
        },
    })
}