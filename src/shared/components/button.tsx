import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../theme/store/useThemeStore';
import { IoniconsName } from '../type/type';

type ButtonVariants = keyof ReturnType<typeof useStyles>['buttonVariants'];

type Props = {
    text: string;
    iconName?: IoniconsName;
    onPress?: () => void;
    variant?: ButtonVariants;
}

export default function Button({ text, onPress, iconName, variant = 'natural' }: Props) {
    const { COLORS } = useThemeStore();
    const { styles, buttonVariants, buttonText } = useStyles();

    return (
        <TouchableOpacity style={[styles.button, buttonVariants[variant]]} onPress={onPress}>
            {iconName && <Ionicons name={iconName} size={20} color={COLORS.text.primary} />}
            <Text style={[styles.text, buttonText[variant]]}>{text}</Text>
        </TouchableOpacity>
    )
}

function useStyles() {
    const { COLORS } = useThemeStore();

    const styles = StyleSheet.create({
        button: {
            flex: 1,
            minWidth: 0,
            paddingHorizontal: 'auto',
            paddingVertical: 16,
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
        },
        text: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: 'Inter',
            fontWeight: 'semibold',
        },
    })

    const buttonVariants = StyleSheet.create({
        natural: {
            backgroundColor: COLORS.background.base,
        },
        destructive: {
            backgroundColor: COLORS.semantic.danger.bg
        },
    })
    const buttonText = StyleSheet.create({
        natural: {
            color: COLORS.text.primary
        },
        destructive: {
            color: COLORS.semantic.danger.base
        },
    })


    return { styles, buttonVariants, buttonText }
}






