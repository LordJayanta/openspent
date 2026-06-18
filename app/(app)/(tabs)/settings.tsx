import AboutSection from '@/src/pages/settings/components/about-section'
import DataSection from '@/src/pages/settings/components/data-section'
import PreferencesSection from '@/src/pages/settings/components/preferences-section'
import Profile from '@/src/pages/settings/components/profile'
import SecuritySection from '@/src/pages/settings/components/security-section'
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
        </Section>


        {/* Main */}
        {/* <ScrollView style={{ flex: 1 }}>
          <View style={settingsStyles.container}>
            <Profile2 />

            <Preferences />

            <Security />

            <DataSection />

            <About />
          </View>
        </ScrollView> */}

      </ScrollView>
    </View>
  )
}