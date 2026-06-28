import { BarChartSection } from '@/src/features/insights/components/BarChartSection'
import CategoryOverview from '@/src/features/insights/components/category-overview'
import ProgressCard from '@/src/features/insights/components/progress-card'
import SummaryCard from '@/src/features/insights/components/summary-card'
import { useInsightsStore } from '@/src/features/insights/store/useInsightsStore'
import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore'
import NoTransactionsFound from '@/src/shared/components/no-data-found'
import AppBar from '@/src/shared/components/ui/app-bar'
import Section from '@/src/shared/components/ui/section'
import { useGlobalStyle } from '@/src/shared/styles/globalStyle'
import React from 'react'
import { ScrollView, View } from 'react-native'

const Analytics = () => {
  const { summary, transactions } = useTransactionStore();
  const globalStyles = useGlobalStyle();

  const {balance,income,expense} = useInsightsStore();

  return (
    <View style={[globalStyles.baseScreen]}>
      {/* Header Tab*/}
      <AppBar title='Insights' />

      {(transactions.length === 0)
        ? (
          <Section style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <NoTransactionsFound type='analysis' grow={20} />
          </Section>
        )
        : (
          <ScrollView style={{ flex: 1 }}>
            <Section style={{ gap: 32 }}>

              {/* Summary Card */}
              <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                <SummaryCard
                  title='Total Income'
                  amount={income.amount}
                  iconName='infinite'
                  percentageChange={income.percentage}
                />
                <SummaryCard
                  title='Total Expense'
                  amount={expense.amount}
                  iconName='infinite'
                  percentageChange={expense.percentage}
                  inverse
                />
              </View>

              <ProgressCard
                balance={summary.balance}
                percentageChange={balance.percentage}
              />
              <CategoryOverview />
              <BarChartSection />

            </Section>
          </ScrollView>
        )}
    </View>
  )
}

export default Analytics