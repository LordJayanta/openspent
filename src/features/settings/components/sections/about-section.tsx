import { OpenWebBrowser } from '@/src/features/web-browser/utils/web-browser';
import Container from '@/src/shared/components/ui/container';
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { IoniconsName } from '@/src/shared/type/type';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ExternalPathString, Href } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Items = {
  text: string;
  iconName: IoniconsName;
  herf?: Href,
  children?: React.ReactNode;
}



export default function AboutSection() {
  const styles = useStyles();
  const { COLORS } = useThemeStore();
  const appVersion = Constants.expoConfig?.version || "0.0.0";

  const items: Items[] = [
    {
      text: 'Version',
      iconName: 'information-circle-outline',
      children: (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>v{appVersion}</Text>
        </View>
      )
    },
    {
      text: 'Privacy Policy',
      iconName: 'shield-half',
      herf: 'https://lordjayanta.github.io/openspent.site/#/privacy'
    },
    {
      text: 'Terms of Service',
      iconName: 'document-text-outline',
      herf: 'https://lordjayanta.github.io/openspent.site/#/terms'
    },
    {
      text: 'Github',
      iconName: 'logo-github',
      herf: 'https://github.com/LordJayanta/openspent'
    }
  ]


  return (
    <Container style={styles.container}>
      {items.map((item: Items) => (
        <TouchableOpacity key={item.text} onPress={item.herf && (() => OpenWebBrowser(item?.herf as ExternalPathString))}>
          <View style={styles.items}>
            <View style={styles.info}>
              <Ionicons name={item.iconName} size={20} color={COLORS.text.primary} />
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
            {item.children && item.children}
            {item.herf && <Ionicons name={'chevron-forward'} size={20} color={COLORS.text.primary} />}
          </View>
        </TouchableOpacity>
      ))}
    </Container>
  )
}

const useStyles = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();
  return StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      gap: 8
    },
    items: {
      paddingVertical: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    info: {
      flexDirection: 'row',
      gap: 16,
    },
    infoText: {
      color: COLORS.text.primary,
      fontSize: TYPOGRAPHY.body.caption,
    },
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 1000,
      backgroundColor: COLORS.surface.lv5,
      overflow: 'hidden',
    },
    badgeText: {
      color: COLORS.text.primary,
      fontSize: TYPOGRAPHY.body.tiny,
    },
  })
}