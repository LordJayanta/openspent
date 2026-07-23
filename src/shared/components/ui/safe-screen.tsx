import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../theme/store/useThemeStore';

export default function SafeScreen({ children }: { children: React.ReactNode }) {
  const { COLORS } = useThemeStore();
  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: COLORS.background.base }}
    >
      {children}
    </SafeAreaView>
  )
}