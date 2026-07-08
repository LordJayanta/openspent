import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Select({ value, onChange, options }: {
    value?: string,
    onChange: (text: string) => void,
    options: { code: string; symbol: string; name: string }[]
}) {
    const styles = useStyles();
    
    return (
        <View style={styles.pickerContainer}>
            <Picker
                style={styles.picker}
                selectedValue={value}
                onValueChange={onChange}
            >
                <Picker.Item label="Select Currency" value="" />
                {options.map((item) => <Picker.Item
                    key={item.code}
                    label={item.code + ' - ' + item.name}
                    value={item.code}
                />)}
            </Picker>
        </View>
    )
}

const useStyles = () => {
    const { COLORS } = useThemeStore();

    return StyleSheet.create({
        pickerContainer: {
            flex: 1,
            borderWidth: 1,
            borderColor: COLORS.semantic.success.border,
            backgroundColor: COLORS.surface.lv1,
            borderRadius: 1000,
            paddingHorizontal: 16,
        },
        picker: {
            flex: 1,
            width: 'auto',
            color: COLORS.text.primary,
        },
    })
}