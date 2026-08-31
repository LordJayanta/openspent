import { BarChartSection } from '@/features/insights/components/BarChartSection'
import CategoryOverview from '@/features/insights/components/category-overview'
import ProgressCard from '@/features/insights/components/progress-card'
import SummaryCard from '@/features/insights/components/summary-card'
import { useInsightsStore } from '@/features/insights/store/useInsightsStore'
import { useTransactionStore } from '@/features/transactions/store/useTransactionStore'
import FooterBranding from '@/shared/components/footer-branding'
import NoTransactionsFound from '@/shared/components/no-data-found'
import AppBar from '@/shared/components/ui/app-bar'
import Section from '@/shared/components/ui/section'
import { useGlobalStyle } from '@/shared/styles/globalStyle'
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

              <FooterBranding />
            </Section>
          </ScrollView>
        )}
    </View>
  )
}

export default Analytics