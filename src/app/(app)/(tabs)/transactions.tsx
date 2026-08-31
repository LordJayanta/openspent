
import TransactionItem from '@/features/transactions/components/transaction-item'
import { useTransactionStore } from '@/features/transactions/store/useTransactionStore'
import { getGroupedMonthlyTransactions, MonthlyGroup } from '@/features/transactions/utils/get-grouped-monthly-transactions'
import NoTransactionsFound from '@/shared/components/no-data-found'
import AppBar from '@/shared/components/ui/app-bar'
import Container from '@/shared/components/ui/container'
import Section from '@/shared/components/ui/section'
import { useThemeStore } from '@/shared/theme/store/useThemeStore'
import { FlashList } from "@shopify/flash-list"
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Transactions() {
  const [groupedMonthlyTransactions, setGroupedMonthlyTransactions] = useState<MonthlyGroup[]>([])

  const { COLORS, TYPOGRAPHY } = useThemeStore();
  const { transactions } = useTransactionStore();


  const styles = useStyle();


  useEffect(() => {
    const res = getGroupedMonthlyTransactions(transactions)
    setGroupedMonthlyTransactions(res)
  }, [transactions])

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background.base }}>
      <AppBar title='TRANSACTIONS' />

      {
        (transactions.length === 0)
          ? (
            <Section style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              <NoTransactionsFound
                grow={70}
                title='No Transaction Found'
                description='Create your first transaction, by clicking the add button below'
              />
            </Section>
          )
          : (
            <Section style={{ flex: 1, gap: 32 }} >
              {/* Transaction List */}
              <FlashList
                data={groupedMonthlyTransactions}
                contentContainerStyle={{ gap: 20 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={{ gap: 16, marginBottom: 20 }}>
                      <View style={styles.transactionsReportContainer}>
                        <Text style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.body.sm }}>{item.month}</Text>
                        <Text style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.body.sm }}>-${item.totalExpense}</Text>
                      </View>

                      <Container style={{ paddingHorizontal: 12, gap: 4 }}>
                        {item.transactions.map((tx, index) => (
                          <TransactionItem
                            key={tx.id}
                            transaction={tx}
                            sparator={index !== item.transactions.length - 1}
                          />
                        ))}
                      </Container>
                    </View>
                  )
                }}
              />
            </Section>
          )
      }
    </View>
  )
}


const useStyle = () => {
  const { COLORS } = useThemeStore();

  return StyleSheet.create({
    cardContainer: {
      backgroundColor: COLORS.surface.lv1,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 12,
    },
    transactionsReportContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10
    },
    dateFilter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 4,
    }
  })
}