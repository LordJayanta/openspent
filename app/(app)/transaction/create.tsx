import { commonStyles } from '@/assets/styles/common.style'
import CategoryItem from '@/src/features/transactions/components/category-item'
import LinnerShodow from '@/src/features/transactions/components/linner-shodow'
import { CATEGORIES, CategoryKey } from '@/src/features/transactions/constant/Category'
import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore'
import { useStyle } from '@/src/features/transactions/styles/add-transaction-page.style'
import { useUserStore } from '@/src/features/user/store/useUserStore'
import AppBar from '@/src/shared/components/ui/app-bar'
import Container from '@/src/shared/components/ui/container'
import Section from '@/src/shared/components/ui/section'
import { Transaction } from '@/src/shared/db/schema'
import { useGlobalStyle } from '@/src/shared/styles/globalStyle'
import { TYPOGRAPHY } from '@/src/shared/theme/shared/typography'
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Create() {

  const { id } = useLocalSearchParams();

  const { COLORS } = useThemeStore();
  const styles = useStyle();

  const { currencySymbol } = useUserStore();


  const [amount, setAmount] = useState<string>('');
  const [SelectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const { transactions, addTransaction, updateTransaction } = useTransactionStore();
  const globalStyles = useGlobalStyle();

  const handleAddTransaction = async () => {
    const isIncome = SelectedCategory === "Income" || SelectedCategory === "Salary";

    // Validation
    setAmount(val => val.replace(/[^0-9]/g, ''));
    const formatedAmount = isIncome ? Math.abs(Number(amount)) : -Math.abs(Number(amount));

    if (!amount) return Alert.alert('Error', 'Please enter an amount.');
    if (!SelectedCategory) return Alert.alert('Error', 'Please select a category.');



    if (!id) {
      // add transaction on db
      await addTransaction({
        title: title || SelectedCategory as string,
        amount: formatedAmount,
        category: SelectedCategory as CategoryKey,
        note: note,
        id: 0
      });
    } else {
      // update transaction on db
      await updateTransaction({
        title: title || SelectedCategory as string,
        amount: formatedAmount,
        category: SelectedCategory as CategoryKey,
        id: Number(id),
        note: note,
        created_at: selectedDate.toISOString()
      });
    }

    // reset form
    setAmount('');
    setSelectedCategory('');
    setTitle('');
    setNote('');

    router.push("/");
  };

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const res: Transaction | undefined = transactions.find(t => t.id === Number(id));

        if (res) {
          setAmount(String(Math.abs(res.amount)));
          setSelectedCategory(res.category as CategoryKey);
          setTitle(String(res.title));
          setNote(String(res.note));
          setSelectedDate(res.created_at && !isNaN(Date.parse(res.created_at)) ? new Date(res.created_at) : new Date())
        }
      }
    }
    loadData()
  }, [id, transactions])

  return (
    <View style={[globalStyles.baseScreen, { position: 'relative' }]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraHeight={100}
      // style={{ flex: 1,position: 'relative'}}
      >
        {/* TAB */}
        <AppBar
          title='Add Transaction'
          leftAction={{
            Icon: 'close-outline',
            onPress: () => router.back(),
          }}
          rightAction={{
            Icon: 'checkmark-done-circle-outline',
            onPress: () => handleAddTransaction(),
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          <Section style={{ gap: 24, paddingBottom: 32 }}>
            {/* Amount */}
            <View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountSymbol}>{currencySymbol}</Text>
                <TextInput
                  placeholder='0.00'
                  style={[styles.amountInput]}
                  placeholderTextColor={COLORS.text.tertiary}
                  cursorColor={COLORS.text.accent}
                  maxLength={10}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))} // remove non-numeric characters
                />
              </View>
            </View>


            {/* Category */}
            <View style={styles.categoryContainer}>
              <ScrollView
                contentContainerStyle={styles.categoryContainerScroll}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {/* <LinnerShodow /> */}
                {CATEGORIES.map((category) => (
                  <TouchableOpacity key={category.id} onPress={() => setSelectedCategory(category.id)}>
                    <CategoryItem
                      active={category.id === SelectedCategory}
                      name={category.name}
                      icon={category.icon}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <LinnerShodow startFrom='left' />
              <LinnerShodow startFrom='right' />
            </View>

            {/* Options */}
            <View style={{ gap: 12 }}>
              {/* Title */}
              <Container style={styles.noteContainer}>
                <Ionicons name="pencil-sharp" color={COLORS.text.secondary} size={24} />
                <TextInput
                  placeholder='Title? What was for did ? (optional)'
                  style={{ color: COLORS.text.primary, fontSize: TYPOGRAPHY.body.sm }}
                  placeholderTextColor={COLORS.text.tertiary}
                  cursorColor={COLORS.text.accent}
                  maxLength={20}
                  value={title}
                  onChangeText={setTitle}
                />
              </Container>

              {/* Note */}
              <Container style={styles.noteContainer}>
                <Ionicons name="document-outline" color={COLORS.text.secondary} size={24} />
                <TextInput
                  placeholder='Add a note (optional)'
                  style={{ color: COLORS.text.primary, fontSize: TYPOGRAPHY.body.sm }}
                  placeholderTextColor={COLORS.text.tertiary}
                  cursorColor={COLORS.text.accent}
                  maxLength={20}
                  value={note}
                  onChangeText={setNote}
                />
              </Container>
            </View>


          </Section>
        </ScrollView>
      </KeyboardAwareScrollView>

      {/* Final Save Button */}
      <View style={styles.createButtonContainer}>
        <TouchableOpacity style={commonStyles.primaryButton} onPress={() => handleAddTransaction()}>
          <Text style={[commonStyles.clickableBtn, { textTransform: "uppercase", color: COLORS.text.primary }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}