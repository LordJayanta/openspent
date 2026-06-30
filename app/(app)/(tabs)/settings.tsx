import Profile from '@/src/features/settings/components/profile'
import AboutSection from '@/src/features/settings/components/sections/about-section'
import DataSection from '@/src/features/settings/components/sections/data-section'
import PreferencesSection from '@/src/features/settings/components/sections/preferences-section'
import SecuritySection from '@/src/features/settings/components/sections/security-section'
import FooterBranding from '@/src/shared/components/footer-branding'
import AppBar from '@/src/shared/components/ui/app-bar'
import Section from '@/src/shared/components/ui/section'
import { useGlobalStyle } from '@/src/shared/styles/globalStyle'
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