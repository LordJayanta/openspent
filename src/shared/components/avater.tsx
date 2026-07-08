import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../theme/store/useThemeStore';

type Props = {
    name?: string;
}

const getInitials = (name: string) => {
    // Clean up the string and split by spaces
    const parts = name.trim().split(/\s+/);

    /** 
     * # Alternative approuch
     * 
    // Take the first letter of each word
    const firstInitial = parts[0].charAt(0).toUpperCase();

    // Take the first letter of the last word if there is one
    const secondInitial = parts.length > 1 ? parts[1].charAt(0).toUpperCase() : '';
    
    return (firstInitial + secondInitial).trim();

    */

    let initial = parts[0].charAt(0).toUpperCase();

    if (parts.length > 1) {
        initial += parts[1].charAt(0).toUpperCase();
    }
    return initial;
}

export default function Avater({ name = "Guest" }: Props) {

    const word = getInitials(name);
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.word}>{word}</Text>
        </View>
    )
}




const useStyles = () => {
    const { COLORS } = useThemeStore();

    return StyleSheet.create({
        container: {
            width: 32,
            height: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.background.tertiary,
            borderRadius: 1000,
            overflow: 'hidden',
        },
        word: {
            color: COLORS.text.primary,
        }
    });
}