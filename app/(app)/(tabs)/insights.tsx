import { BarChartSection } from '@/src/features/insights/components/BarChartSection'
import CategoryOverview from '@/src/features/insights/components/category-overview'
import ProgressCard from '@/src/features/insights/components/progress-card'
import SummaryCard from '@/src/features/insights/components/summary-card'
import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore'
import { getGroupedMonthlyTransactions } from '@/src/features/transactions/utils/get-grouped-monthly-transactions'
import AppBar from '@/src/shared/components/ui/app-bar'
import Section from '@/src/shared/components/ui/section'
import { useGlobalStyle } from '@/src/shared/styles/globalStyle'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

const Analytics = () => {
  const { summary, transactions } = useTransactionStore();
  const globalStyles = useGlobalStyle();

  const grupMonthlyData = getGroupedMonthlyTransactions(transactions);
  const currentMonth = grupMonthlyData[0];
  const lastMonth = grupMonthlyData[1];

  const [summaryCardData, setSummaryCardData] = useState({
    income: {
      amount: 0,
      percentage: 0,
    },
    expense: {
      amount: 0,
      percentage: 0
    },
    balance: {
      amount: 0,
      percentage: 0
    }
  })

  useEffect(() => {
    const incomePercentage = Math.round(((currentMonth.totalIncome - lastMonth.totalIncome) / lastMonth.totalIncome) * 100)
    const expensePercentage = Math.round(((currentMonth.totalExpense - lastMonth.totalExpense) / lastMonth.totalExpense) * 100)

    const currentMonthBalance = currentMonth.totalIncome - currentMonth.totalExpense;
    const lastMonthBalance = lastMonth.totalIncome - lastMonth.totalExpense;
    const balancePercentage = Math.round(((currentMonthBalance - lastMonthBalance) / lastMonthBalance) * 100)

    setSummaryCardData({
      income: {
        amount: currentMonth.totalIncome,
        percentage: incomePercentage
      },
      expense: {
        amount: currentMonth.totalExpense,
        percentage: expensePercentage
      },
      balance: {
        amount: currentMonthBalance,
        percentage: balancePercentage
      }
    })
  }, [currentMonth, lastMonth])
  return (
    <View style={[globalStyles.baseScreen]}>
      {/* Header Tab*/}
      <AppBar title='Insights' />

      <ScrollView style={{ flex: 1 }}>
        <Section style={{ gap: 32 }}>

          {/* Summary Card */}
          <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
            <SummaryCard
              title='Total Income'
              amount={summaryCardData.income.amount}
              iconName='infinite'
              percentageChange={summaryCardData.income.percentage}
            />
            <SummaryCard
              title='Total Expense'
              amount={summaryCardData.expense.amount}
              iconName='infinite'
              percentageChange={summaryCardData.expense.percentage}
              inverse
            />
          </View>

          <ProgressCard
            balance={summary.balance}
            percentageChange={summaryCardData.balance.percentage}
          />
          <CategoryOverview />
          <BarChartSection />

        </Section>
      </ScrollView>
    </View>
  )
}

export default Analytics