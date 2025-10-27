import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Gradient } from '../gradient'
import { useLocalSearchParams } from 'expo-router'

export default function SummaryScreen() {
    const { conversationId } = useLocalSearchParams();
    const [conversation, setConversation] = useState<ConversationResponse>()
    return (
        <>
            <Gradient position='bottom' isSpeaking={false} />
            <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            contentContainerStyle={{paddingHorizontal: 16}}
            >

            </ScrollView>
        </>
    )
}