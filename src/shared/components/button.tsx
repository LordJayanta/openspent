import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/colors';
import { IoniconsName } from '../type/type';

type Props = {
    text: string;
    iconName?: IoniconsName;
    onPress?: () => void;
    // variant?: 'primary' | 'destructive' | 'natural';
    variant?: keyof typeof buttonVariants;
}

export default function Button({ text, onPress, iconName, variant = 'natural' }: Props) {
    return (
        <TouchableOpacity style={[styles.button, buttonVariants[variant]]} onPress={onPress}>
            {iconName && <Ionicons name={iconName} size={20} color={COLORS.light} />}
            <Text style={[styles.text, buttonText[variant]]}>{text}</Text>
        </TouchableOpacity>
    )
}

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
        backgroundColor: COLORS.gray,
    },
    destructive: {
        backgroundColor: COLORS.secondary,
    },
})
const buttonText = StyleSheet.create({
    natural: {
        color: COLORS.light
    },
    destructive: {
        color: COLORS.light
    },
})

