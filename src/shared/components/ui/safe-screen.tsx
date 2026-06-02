import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../../theme/store/useThemeStore';

export default function SafeScreen({children}:{children:React.ReactNode}) {
    const {top} = useSafeAreaInsets();
    const {COLORS} = useThemeStore();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        // paddingBottom: bottom,
        backgroundColor: COLORS.background.base
      }}
    >
      {children}
    </View>
  )
}