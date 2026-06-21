import { IoniconsName } from '@/src/shared/type/type';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import SettingContainer from '../ui/setting-container';
import { SettingItem } from '../ui/setting-item';

type SettingsListType = {
    title: string;
    description?: string;
    iconName: IoniconsName;
    onPress?: () => void;
    actionText?: string;
    children?: React.ReactNode;
    options: string[]
}


export default function DataSection() {
    const SettingsListItem: SettingsListType[] = [
        {
            title: 'Export Data',
            description: 'Export data as JSON, CSV Formate',
            iconName: 'exit-outline',
            options: ['transprent'],
            onPress: () => router.push('/(app)/data/export-data'),
        },
        {
            title: 'Import Data',
            description: 'Choose File and import Your priviouse data',
            iconName: 'enter-outline',
            options: ['transprent'],
            onPress: () => router.push('/(app)/data/import-data'),
        },
        {
            title: 'Delete Data',
            description: 'Permanently delete All Data',
            iconName: 'ban-outline',
            options: ['transprent'],
            onPress: () => router.push('/(app)/data/delete-all-data'),
        },
    ]

    return (
        <SettingContainer iconName='cloud-download-outline' title='Preferences'>
            {SettingsListItem.map((item, index) => (
                <SettingItem
                    key={item.title + index}
                    iconName={item.iconName}
                    title={item.title}
                    sparator={index !== SettingsListItem.length - 1}
                    onPress={item.onPress || (() => Alert.alert('Option Comming Soon...!'))}
                    actionText={item.options[0]}
                >
                    {item.children}
                </SettingItem>
            ))}
        </SettingContainer>
    )
}