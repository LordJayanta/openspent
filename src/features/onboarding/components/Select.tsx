import { COLORS } from '@/src/shared/constant/colors'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Select({ value, onChange, options }: {
    value?: string,
    onChange: (text: string) => void,
    options: { code: string; symbol: string; name: string }[]
}) {
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

const styles = StyleSheet.create({
    pickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surface,
        borderRadius: 1000,
        paddingHorizontal: 16,
    },
    picker: {
        flex: 1,
        width: 'auto',
        color: COLORS.light,
    },
})