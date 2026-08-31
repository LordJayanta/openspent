import ExportAndSaveButton from '@/features/export-data/components/export-and-save-button';
import ExportAndShareButton from '@/features/export-data/components/export-and-share-button';
import AppBar from '@/shared/components/ui/app-bar';
import Container from '@/shared/components/ui/container';
import Section from '@/shared/components/ui/section';
import { useGlobalStyle } from '@/shared/styles/globalStyle';
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ExportData() {
  const globalStyles = useGlobalStyle();
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return (
    <View style={[globalStyles.baseScreen]}>
      <AppBar title='Export Data' />

      <Section style={{ flex: 1, gap: 36, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ gap: 8, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name='document-attach-outline' size={48} color={COLORS.semantic.success.base} />
          <View>
            <Text style={{
              color: COLORS.text.primary,
              fontSize: TYPOGRAPHY.body.lg,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>Export Your Data!</Text>
            <Text style={{
              color: COLORS.text.primary,
              fontSize: TYPOGRAPHY.body.md,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>Backup your data to your device</Text>
          </View>
        </View>

        <Container style={{ width: '100%', padding: 16, gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Ionicons name='document' size={24} color={COLORS.semantic.success.base} />
            <Text style={{ color: COLORS.text.primary, fontSize: TYPOGRAPHY.body.lg }}>File Details</Text>
          </View>

          <View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Ionicons name='information' size={16} color={COLORS.semantic.success.base} />
              <Text style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.body.sm }}>File format: CSV</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Ionicons name='information' size={16} color={COLORS.semantic.success.base} />
              <Text style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.body.sm }}>All data will be on your device</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Ionicons name='information' size={16} color={COLORS.semantic.success.base} />
              <Text style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.body.sm }}>Backup your data to your devic</Text>
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
        
        <ExportAndSaveButton />
        <ExportAndShareButton />
      </View>

    </View>
  )
}