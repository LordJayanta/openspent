import ImportButton from '@/src/features/import-data/component/import-button';
import AppBar from '@/src/shared/components/ui/app-bar';
import Container from '@/src/shared/components/ui/container';
import Section from '@/src/shared/components/ui/section';
import { useGlobalStyle } from '@/src/shared/styles/globalStyle';
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ImportData() {
  const globalStyles = useGlobalStyle();
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return (
    <View style={[globalStyles.baseScreen]}>
      <AppBar title='Import Data' />

      <Section style={{ flex: 1, gap: 36, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ gap: 8, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name='document-attach-outline' size={48} color={COLORS.semantic.info.base} />
          <View>
            <Text style={{
              color: COLORS.text.primary,
              fontSize: TYPOGRAPHY.body.lg,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>Restore Your Data!</Text>
            <Text style={{
              color: COLORS.text.primary,
              fontSize: TYPOGRAPHY.body.md,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>choose your Backup file</Text>
          </View>
        </View>

        <Container style={{ width: '100%', padding: 16, gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Ionicons name='information-circle' size={24} color={COLORS.semantic.info.base} />
            <Text style={{ color: COLORS.text.primary, fontSize: TYPOGRAPHY.body.lg }}>File must be in CSV Format</Text>
          </View>

          <View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Ionicons name='information' size={16} color={COLORS.semantic.info.base} />
              <Text style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.body.sm }}>Choose your Backup from your device</Text>
            </View>
          </View>
        </Container>

      </Section>

      <View style={{
        width: '100%',
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 16,
        flexDirection: 'row'
      }}>
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 14,
            backgroundColor: COLORS.surface.lv5
          }}
          onPress={() => router.back()}
        >
          <Ionicons name='chevron-back' size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        <ImportButton />
      </View>

    </View>
  )
}