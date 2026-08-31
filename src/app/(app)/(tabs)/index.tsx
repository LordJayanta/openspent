import RecentTransactions from "@/features/dashboard/components/sections/recent-transactions";
import ReportCard from "@/features/dashboard/components/sections/report-card";
import { useTransactionStore } from "@/features/transactions/store/useTransactionStore";
import FooterBranding from "@/shared/components/footer-branding";

import { getGreetingMessage } from "@/features/dashboard/utils/get-greeting-message";
import AppBar from "@/shared/components/ui/app-bar";
import Section from "@/shared/components/ui/section";
import { useGlobalStyle } from "@/shared/styles/globalStyle";
import { useThemeStore } from "@/shared/theme/store/useThemeStore";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";



export default function Index() {
  const [greetingMessage, setGreetingMessage] = useState<string>("Welcome.!👋");
  // Styles
  const { COLORS, TYPOGRAPHY } = useThemeStore();
  const globalStyles = useGlobalStyle();

  // Global States
  const { loadDatabase, summary } = useTransactionStore();
  const [refreshTransactions, setRefreshTransactions] = useState<boolean>(false);

  const handleRefreshTransactions = async () => {
    setRefreshTransactions(true);
    loadDatabase();
    setRefreshTransactions(false);
  }

  useEffect(() => {
    const message = getGreetingMessage();
    setGreetingMessage(message);
  }, []);
  return (
    <ScrollView
      style={[globalStyles.baseScreen]} //contentContainerStyle
      refreshControl={
        <RefreshControl
          refreshing={refreshTransactions}
          onRefresh={handleRefreshTransactions}
        />
      }
    >
      <AppBar
        title="OpenSpent"
        centerAction={{ type: "LOGO", size: 32 }}
      />
      <Section style={{ flex: 1, gap: 32 }}>
        {/* Greeting */}
        <View>
          <Text
            style={{
              fontSize: TYPOGRAPHY.heading.h3,
              color: COLORS.text.primary,
            }}
          >{greetingMessage}</Text>
          <Text
            style={{
              fontSize: TYPOGRAPHY.body.md,
              color: COLORS.text.secondary,
              width: 200,
            }}
          >Track your expenses and save more</Text>
        </View>

        {/* Report Card */}
        <ReportCard summary={summary} />

        {/* Recent Transactions */}
        <RecentTransactions limit={5} />

        <FooterBranding />
      </Section>
    </ScrollView>
  );
}
