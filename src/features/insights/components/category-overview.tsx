import { CATEGORIES } from '@/src/features/transactions/constant/Category'
import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore'
import Container from '@/src/shared/components/ui/container'
import ProgressBar from '@/src/shared/components/ui/progress-bar'
import SectionHeader from '@/src/shared/components/ui/section-header'
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore'
import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useUserStore } from '../../user/store/useUserStore'


type DataType = {
  title: string;
  amount: number;
  percentage: number;
  color?: string
}

export default function CategoryOverview() {
  const { COLORS } = useThemeStore();
  const { transactions, summary } = useTransactionStore();
  const styles = useStyle();

  const [data, setData] = React.useState<DataType[]>([]);
  const { currencySymbol } = useUserStore();

  const generateChartData = () => {
    // Filter Expenses
    const expense = transactions.filter(item => item.amount < 0);

    // Group and sum by category
    const grouped = expense.reduce((acc: Record<string, DataType>, trnx) => {
      const amount = Math.abs(trnx.amount);
      const color = CATEGORIES.filter(t => t.name === trnx.category)[0].color;

      // if Category is present update value
      if (acc[trnx.category]) {
        acc[trnx.category].amount += amount;
      }
      // if Category dos't exist create new one
      else {
        acc[trnx.category] = {
          amount: amount,
          title: trnx.category,
          color: color,
          percentage: 0,
        }
      }

      return acc;
    }, {})

    // Recalculate percentage after grouping so totals are used
    return Object.values(grouped).map(item => ({
      ...item,
      percentage: summary.expense > 0 ? Math.round((item.amount / summary.expense) * 100) : 0,
    }));
  }

  useEffect(() => {
    // regenerate chart data whenever transactions or summary change
    const data = generateChartData();
    setData(data);
  }, [transactions, summary])


  return (
    <View>
      <SectionHeader title='Top Spending Categories' />
      {/* Category item */}
      <FlashList
        data={data}
        contentContainerStyle={{ marginTop: 8 }}
        renderItem={({ item, index }) => (
          <Container key={item.title + index} style={[styles.itemContainer, { marginTop: 12 }]}>
            <View style={styles.itemContainer}>
              <Ionicons name='infinite' size={30} color={COLORS.text.accent} />
            </View>

            <View style={{ gap: 12, flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Text style={styles.itemAmount}>{currencySymbol}{item.amount}</Text>
                  <Text style={styles.itemPercentage}>{item.percentage}%</Text>
                </View>
              </View>

              {/* Progress */}
              <ProgressBar percentage={item.percentage} />
            </View>
          </Container>
        )}
      />
    </View>
  )
}

export const useStyle = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return StyleSheet.create({
    itemContainer: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconContainer: {},
    itemTitle: {
      fontSize: TYPOGRAPHY.body.md,
      color: COLORS.text.primary,
    },
    itemAmount: {
      fontSize: TYPOGRAPHY.body.sm,
      color: COLORS.text.secondary,
    },
    itemPercentage: {
      fontSize: TYPOGRAPHY.body.sm,
      color: COLORS.text.tertiary,
    },
  })
}