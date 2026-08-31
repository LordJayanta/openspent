import Profile from '@/features/settings/components/profile'
import AboutSection from '@/features/settings/components/sections/about-section'
import DataSection from '@/features/settings/components/sections/data-section'
import PreferencesSection from '@/features/settings/components/sections/preferences-section'
import SecuritySection from '@/features/settings/components/sections/security-section'
import FooterBranding from '@/shared/components/footer-branding'
import AppBar from '@/shared/components/ui/app-bar'
import Section from '@/shared/components/ui/section'
import { useGlobalStyle } from '@/shared/styles/globalStyle'
import React from 'react'
import { ScrollView, View } from 'react-native'

export default function Settings() {
  // Styles
  const globalStyles = useGlobalStyle();

  return (
    <View style={[globalStyles.baseScreen]}>
      <AppBar title='Settings' />

      {/* Main */}
      <ScrollView style={{ flex: 1 }}>
        <Section>
          <View style={{ paddingBottom: 32 }}>
            <Profile />
          </View>
        </Section>
        <Section style={{ flex: 1, gap: 22, paddingBottom: 32 }}>
          {/* <Experiment /> */}
          <PreferencesSection />
          <SecuritySection />
          <DataSection />
          <AboutSection />
          <FooterBranding />
        </Section>
      </ScrollView>
    </View>
  )
}