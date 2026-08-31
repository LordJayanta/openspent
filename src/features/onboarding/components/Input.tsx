import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function Input({ value, onChange }: {
    value: string,
    onChange: (text: string) => void,
}) {
    const { COLORS } = useThemeStore();
    const styles = useStyles();
    
    return (
        <>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                placeholderTextColor={COLORS.text.primary}
                cursorColor={COLORS.primary[500]}
                value={value}
                onChangeText={onChange}
            />
        </>
    )
}

const useStyles = () => {
    const { COLORS } = useThemeStore();
    return StyleSheet.create({
        input: {
            flex: 1,
            width: 'auto',
            borderWidth: 1,
            color: COLORS.text.primary,
            borderColor: COLORS.semantic.success.border,
            borderRadius: 1000,
            paddingHorizontal: 24,
            paddingVertical: 16
        },
    })
}