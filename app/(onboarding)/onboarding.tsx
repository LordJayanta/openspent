import EnterApp from '@/src/features/onboarding/components/EnterApp';
import Input from '@/src/features/onboarding/components/Input';
import OnboardScreen, { type OnboardingData } from '@/src/features/onboarding/components/OnboardScreen';
import OnbordForm from '@/src/features/onboarding/components/OnbordForm';
import Select from '@/src/features/onboarding/components/Select';
import { useUserStore } from '@/src/features/user/store/useUserStore';
import { COLORS } from '@/src/shared/constant/colors';
import { CURRENCIES } from '@/src/shared/constant/CURRENCIES';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ExpandingDot } from "react-native-animated-pagination-dots";
import PagerView from 'react-native-pager-view';


export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputData, setInputData] = useState({
    name: "",
    currency: ""
  })
  const { width } = useWindowDimensions();
  const pagerRef = React.useRef<PagerView>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const { id, loadUser, updateUser } = useUserStore();


  const onboardingData: OnboardingData[] = [
    {
      id: 1,
      title: "Completly Offline Frist",
      description: "Works 100% offline first. No internet connection required.",
      image: require("@/src/features/onboarding/assets/img/wifi-offline-1x1.png"),
      message: {
        type: "secure",
        text: "All your data stays, secure only on this device ",
      },
    },
    {
      id: 2,
      title: "High Security",
      description: "Your data is encrypted and protected with strong Security.",
      image: require("@/src/features/onboarding/assets/img/privacy-shield-1x1.png"),
      message: {
        type: "secure",
        text: "Bult for privacy, Build for you.",
      },
    },
    {
      id: 3,
      title: "No Data Colocation & Share",
      description: "Your data is encrypted and protected with strong Security.",
      image: require("@/src/features/onboarding/assets/img/no-data-colocation-1x1.png"),
      message: {
        type: "secure",
        text: "Your data. Your Control. Always.",
      },
    },
    {
      id: 4,
      title: "What We Call You ?",
      description: "Enter you name to personalize you experience",
      image: require("@/src/features/onboarding/assets/img/user-1x1.png"),
      imageHeight: 255,
      message: {
        type: "database",
        text: "Loading Existing Database, Select Local db file",
      },
      form: (
        <OnbordForm
          label='What we call You ?'
          action={() => {
            if (inputData.name.length === 0) return Alert.alert("Oops!", "What we call You !");
            pagerRef.current?.setPage(currentPage + 1)
          }}
        >
          <Input
            value={inputData.name}
            onChange={(name) => setInputData({ ...inputData, name })}
          />
        </OnbordForm>
      )
    },
    {
      id: 5,
      title: "Set Currency",
      description: "Select Your preferred currency to continue",
      image: require("@/src/features/onboarding/assets/img/choose-currency-INR-1x1.png"),
      imageHeight: 255,
      message: {
        type: "database",
        text: "Loading Existing Database, Select Local db file",
      },
      form: (
        <OnbordForm
          label='Currency'
          action={() => {
            if (inputData.currency.length === 0) return Alert.alert("Oops!", "Choose Currency !");
            pagerRef.current?.setPage(currentPage + 1)
          }}
        >
          <Select
            // value={}
            onChange={(currency) => setInputData({ ...inputData, currency })}
            options={CURRENCIES}
          />
        </OnbordForm>
      )
    },
    {
      id: 6,
      title: "Welcome! Let’s get started",
      description: "You’re All Set! You are Ready to Go And Enjoy....",
      image: require("@/src/features/onboarding/assets/img/success-1x1.png"),
      message: {
        type: "database",
        text: "Loading Existing Database, Select Local db file",
      },
      form: <EnterApp onPress={async () => {
        Alert.alert("Success", `Hi, ${inputData.name}! You choose ${inputData.currency} As your Currency`);

        if (!id || id === undefined) await loadUser();

        await updateUser({
          id,
          name: inputData.name,
          currency: inputData.currency,
          hasFinishedOnboarding: true,
        });

        router.replace("/(app)/(tabs)");
      }} />
    },
  ];

  useEffect(() => {
    if (currentPage === 4 && inputData.name.length === 0) {
      Alert.alert("Oops!", "Enter Your Name !")
      pagerRef.current?.setPage(currentPage - 1)
    }
    if (currentPage === 5 && inputData.currency.length === 0) {
      Alert.alert("Oops!", "Set Currency !")
      pagerRef.current?.setPage(currentPage - 1)
    }
  }, [currentPage, inputData])

  return (
    <View style={{ flex: 1, backgroundColor: '#0E0E0D' }}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageScroll={(event) => {
          const { position, offset } = event.nativeEvent;
          const value = (position + offset) * width;
          scrollX.setValue(value);
          setCurrentPage(position)
        }}
      >
        {onboardingData.map((item) => (
          <OnboardScreen key={item.id} data={item} />
        ))}
      </PagerView>

      {/* Footer */}
      <View style={{ position: 'relative' }}>
        <ExpandingDot
          data={onboardingData}
          expandingDotWidth={30}
          scrollX={scrollX}
          inActiveDotOpacity={1}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5
          }}
          containerStyle={{
            bottom: 20
          }}
          activeDotColor={COLORS.primary}
          inActiveDotColor={COLORS.text}
        />
      </View>

    </View>
  )
}

export const style = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5
  }
})