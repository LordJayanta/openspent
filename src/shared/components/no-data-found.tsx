import { useGlobalStyle } from '@/shared/styles/globalStyle';
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  type?: 'no-data' | 'analysis';
  grow?: number;
  title?: string;
  description?: string;
};

export default function NoTransactionsFound({ 
  type='no-data', 
  grow=0, 
  title='No Data Found', 
  description='Create your first transaction, by clicking the add button below'
}: Props) {
  const { COLORS } = useThemeStore();
  const styles = useStyle();
  const globalStyles = useGlobalStyle();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: `${100+grow}%`, height: `${100+grow}%`, justifyContent: 'center', alignItems: 'center' }}
          source={type === 'no-data' ? require('@/assets/images/No data-bro.svg') : require('@/assets/images/Dark analytics-bro.svg')}
          contentFit='contain'
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Text style={styles.titel}>{title}</Text>
        <Text style={styles.subText}>{description}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={globalStyles.primaryButton} onPress={() => router.push(`/(app)/transaction/create`)}>
            <Ionicons name='add-circle-outline' size={24} color={COLORS.text.primary} />
            <Text style={[globalStyles.primaryButtonText, { textTransform: "uppercase", color: COLORS.text.primary }]}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const useStyle = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();
  return StyleSheet.create({
    container: {
      height: 400,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      flex: 1,
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    titel: {
      fontSize: TYPOGRAPHY.heading.h3,
      fontWeight: 'semibold',
      color: COLORS.text.primary,
      marginBottom: 12,
    },
    subText: {
      fontSize: TYPOGRAPHY.body.md,
      fontWeight: 'semibold',
      color: COLORS.text.tertiary,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop: 20,
      paddingHorizontal: 24,
      paddingVertical: 16,
    }
  })
}