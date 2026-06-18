import { useUserStore } from '@/src/features/user/store/useUserStore';
import { IoniconsName } from '@/src/shared/type/type';
import React from 'react';
import { Alert } from 'react-native';
import { CURRENCIES } from '../../../shared/constant/CURRENCIES';
import SettingContainer from './setting-container';
import { SettingItem } from './setting-item';



type SettingsListType = {
    title: string;
    description?: string;
    iconName: IoniconsName;
    onPress?: () => void;
    actionText?: string;
    children?: React.ReactNode;
    options: string[]
}

export default function PreferencesSection() {
    const { currency } = useUserStore();
    const preferenceItems: SettingsListType[] = [
        {
            title: 'Primary Currency',
            iconName: 'cash-outline',
            options: currency ? [currency] : CURRENCIES.map((item) => item.code),
        },
        {
            title: 'App Theme',
            options: ['Dark'],
            iconName: 'color-palette-outline',
        },
    ]

    return (
        <SettingContainer iconName='options-outline' title='Preferences'>
            {preferenceItems.map((item, index) => (
                <SettingItem
                    key={item.title + index}
                    iconName={item.iconName}
                    title={item.title}
                    sparator={index !== preferenceItems.length - 1}
                    onPress={item.onPress || (() => Alert.alert('Option Comming Soon...!'))}
                    actionText={item.options[0]}
                >
                    {item.children}
                </SettingItem>
            ))}
        </SettingContainer>
    )
}