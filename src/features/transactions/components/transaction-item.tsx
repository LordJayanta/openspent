import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Ionicons, } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Transaction } from '../../../shared/db/schema';
import { formatDisplayDate, formatDisplayTime } from '../../../shared/utils/formatTime';
import { CATEGORIES_ICONS, CategoryKey } from '../constant/Category';

type Props = {
  transaction: Transaction;
  sparator?: boolean;
};

export default function TransactionItem({ transaction, sparator }: Props) {
  const styles = useStyle();
  const { COLORS } = useThemeStore();

  const isIncome = transaction.amount > 0;
  const iconName = CATEGORIES_ICONS[transaction.category as CategoryKey]

  // Check if created_at is valid; fallback to current date if not
  const createdAtStr = String(transaction?.created_at || '');
  const date = createdAtStr && !isNaN(Date.parse(createdAtStr)) ? new Date(createdAtStr) : new Date();


  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: `/(app)/transaction/[id]`,
        params: { id: String(transaction.id) }
      })}
      activeOpacity={0.8}
      style={[
        styles.containter,
        sparator && { borderBottomWidth: 1, borderColor: COLORS.border.subtle }
      ]}>

      <View style={styles.subContainter}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: COLORS.surface.lv4 }]}>
          <Ionicons name={iconName} color={COLORS.text.secondary} size={20} />
        </View>

        {/* Info */}
        <View style={{ gap: 6 }}>
          <Text style={styles.title}>{transaction.title}</Text>

          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>{formatDisplayDate(date)}</Text>
            <View style={styles.dot}>
              <Ionicons name="ellipse" color={COLORS.text.tertiary} size={4.75} />
            </View>
            <Text style={styles.subText}>{formatDisplayTime(date)}</Text>
          </View>
        </View>

      </View>

      {/* Amount */}
      <Text
        style={[
          styles.amount,
          isIncome ? { color: '#4AE183' } : { color: '#FFB4A9' }
        ]}
      >{isIncome ? '+' : '-'} ${Math.abs(transaction.amount)}</Text>
    </TouchableOpacity>
  )
}


const useStyle = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return StyleSheet.create({
    containter: {
      paddingVertical: 12,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subContainter: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    iconContainer: {
      width: 42,
      height: 42,
      borderRadius: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: TYPOGRAPHY.body.md,
      color: COLORS.text.primary
    },
    subTextContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    subText: {
      color: COLORS.text.secondary,
      fontSize: TYPOGRAPHY.body.sm,
    },
    dot: {
      width: 15,
      height: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    amount: {
      fontSize: TYPOGRAPHY.body.md,
    },
  })
};