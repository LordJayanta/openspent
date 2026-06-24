import { COLORS } from "@/src/shared/constant/colors";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";


export default function AddButton() {
    return (
        <TouchableOpacity onPress={() => router.push("/(app)/transaction/create")}>
            <LinearGradient
                style={styles.container}
                colors={['#0BAE5D', '#3CD67B']}
            >
                <MaterialIcons name="add" size={25} color={COLORS.light} />
            </LinearGradient>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 1000,
        backgroundColor: COLORS.light,
    },
});