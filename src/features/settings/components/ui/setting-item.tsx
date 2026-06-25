import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { IoniconsName } from '@/src/shared/type/type';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  iconName: IoniconsName;
  title: string;
  description?: string;
  onPress?: () => void;
  actionText?: string;
  children?: React.ReactNode;
  sparator?: boolean;
}

export const SettingItem = ({ iconName, title, description, onPress, actionText, children, sparator }: Props) => {
  const styles = useStyles();
  const { COLORS } = useThemeStore();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { paddingHorizontal: 16 },
        sparator && { borderBottomWidth: 1, borderBottomColor: COLORS.border.subtle }
      ]}>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.iconContainer}>
            <Ionicons name={iconName} size={16} color={COLORS.text.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
          </View>
        </View>



        {(actionText && !children) ? (
          <View style={styles.action}>
            {(actionText !== 'transprent') && <Text style={styles.actionText}>{actionText}</Text>}
            <View style={styles.iconContainer}>
              <Ionicons name='chevron-forward' size={16} color={COLORS.text.tertiary} />
            </View>
          </View>
        ) : null}

        {children && (children)}
      </View>
    </TouchableOpacity>
  )
}

const useStyles = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return StyleSheet.create({
    container: {
      minHeight: 52,
      paddingVertical: 14,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    iconContainer: {},
    textContainer: {
      gap: 1,
    },
    title: {
      fontFamily: 'Inter',
      textTransform: 'capitalize',
      fontSize: TYPOGRAPHY.body.caption,
      color: COLORS.text.primary,
    },
    description: {
      fontSize: TYPOGRAPHY.body.caption,
      fontFamily: 'Inter',
      color: COLORS.text.tertiary,
    },
    action: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    actionText: {
      fontSize: TYPOGRAPHY.body.caption,
      fontFamily: 'Inter',
      color: COLORS.text.tertiary,
    }
  })
}