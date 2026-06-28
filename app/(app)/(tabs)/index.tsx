import RecentTransactions from "@/src/features/dashboard/components/sections/recent-transactions";
import ReportCard from "@/src/features/dashboard/components/sections/report-card";
import { useTransactionStore } from "@/src/features/transactions/store/useTransactionStore";

import AppBar from "@/src/shared/components/ui/app-bar";
import Section from "@/src/shared/components/ui/section";
import { useGlobalStyle } from "@/src/shared/styles/globalStyle";
import { useThemeStore } from "@/src/shared/theme/store/useThemeStore";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";



export default function Index() {
  // Styles
  const { COLORS, TYPOGRAPHY } = useThemeStore();
  const globalStyles = useGlobalStyle();

  // Global States
  const { loadDatabase, summary } = useTransactionStore()
  const [refreshTransactions, setRefreshTransactions] = useState<boolean>(false);

  const handleRefreshTransactions = async () => {
    setRefreshTransactions(true);
    loadDatabase();
    setRefreshTransactions(false);
  }

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
        centerAction={{ Icon: 'reorder-three' }}
      />
      <Section style={{ flex: 1, gap: 32 }}>
        {/* Greeting */}
        <View>
          <Text
            style={{
              fontSize: TYPOGRAPHY.heading.h3,
              color: COLORS.text.primary,
            }}
          >Good Morning! 👋</Text>
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

      </Section>
    </ScrollView>
  );
}
