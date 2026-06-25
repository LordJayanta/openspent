import Container from '@/src/shared/components/ui/container'
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore'
import { IoniconsName } from '@/src/shared/type/type'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  iconName: IoniconsName;
  title: string;
  children?: React.ReactNode,
  transparent?: boolean
}
export default function SettingContainer({
  iconName,
  title,
  children,
  transparent
}: Props) {
  const styles = useStyles();
   const { COLORS } = useThemeStore();

  return (
    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Ionicons name={iconName} size={16} color={COLORS.text.accent} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Container>
        {children}
      </Container>
    </View>
  )
}

const useStyles = () => {
  const { COLORS } = useThemeStore();

  return StyleSheet.create({
  section: {
    display: 'flex',
    gap: 16,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textTransform: 'uppercase'
  },
  container: {
    borderRadius: 16,
  }
})
}