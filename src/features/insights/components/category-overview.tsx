import { CATEGORIES, CATEGORIES_ICONS, CategoryKey } from '@/features/transactions/constant/Category'
import { useTransactionStore } from '@/features/transactions/store/useTransactionStore'
import Amount from '@/shared/components/Amount'
import Container from '@/shared/components/ui/container'
import ProgressBar from '@/shared/components/ui/progress-bar'
import SectionHeader from '@/shared/components/ui/section-header'
import { useThemeStore } from '@/shared/theme/store/useThemeStore'
import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'


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

  const data = useMemo(() => {
    const expense = transactions.filter(item => item.amount < 0);

    const grouped = expense.reduce((acc: Record<string, DataType>, trnx) => {
      const amount = Math.abs(trnx.amount);
      const color = CATEGORIES.filter(t => t.name === trnx.category)[0].color;

      if (acc[trnx.category]) {
        acc[trnx.category].amount += amount;
      } else {
        acc[trnx.category] = {
          amount: amount,
          title: trnx.category,
          color: color,
          percentage: 0,
        }
      }

      return acc;
    }, {})

    return Object.values(grouped).map(item => ({
      ...item,
      percentage: summary.expense > 0 ? Math.round((item.amount / summary.expense) * 100) : 0,
    }));
  }, [transactions, summary]);

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
              <Ionicons
                name={CATEGORIES_ICONS[item?.title as CategoryKey]}
                size={24}
                color={COLORS.text.accent} />
            </View>

            <View style={{ gap: 12, flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Amount style={styles.itemAmount}>{item.amount}</Amount>
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
      paddingVertical: 10,
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