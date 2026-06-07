import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Href, router } from 'expo-router';
import { useThemeStore } from '../../theme/store/useThemeStore';


type Props = {
    title: string;
    linkText?: string;
    redirectPath?: Href;
}
export default function SectionHeader({ title, linkText='See All', redirectPath = '/' }: Props) {
    const styles = useStyle();
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return (
        <View style={styles.transactionsReportContainer}>
            <Text style={{ color: COLORS.text.primary, fontSize: TYPOGRAPHY.body.md }}>{title}</Text>
            <TouchableOpacity onPress={() => router.push(redirectPath)}>
                <Text style={{ color: COLORS.text.accent, fontSize: TYPOGRAPHY.body.md }}>{linkText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const useStyle = () => {
    return StyleSheet.create({
        transactionsReportContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10
        },
    })
}