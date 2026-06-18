import React from 'react';
import { Switch } from 'react-native';
import { useThemeStore } from '../../theme/store/useThemeStore';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function OSSwitch({ value, onValueChange }: Props) {
  const { COLORS } = useThemeStore();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: COLORS.surface.lv3,
        true: COLORS.semantic.success.base,
      }}
      thumbColor={COLORS.background.inverse}
      ios_backgroundColor={COLORS.surface.lv2}
    />
  )
}

