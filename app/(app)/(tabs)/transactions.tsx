import { useThemeStore } from '@/src/shared/theme/store/useThemeStore'
import React from 'react'
import { View } from 'react-native'

export default function Transactions() {
  const {COLORS} = useThemeStore()
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background.base}}>
    </View>
  )
}