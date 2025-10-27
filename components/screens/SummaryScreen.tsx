import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gradient } from '../gradient'
import { useLocalSearchParams } from 'expo-router'
import { ConversationResponse } from '@/utils/types';

export default function SummaryScreen() {
    const { conversationId } = useLocalSearchParams();
    const [conversation, setConversation] = useState<ConversationResponse>()

    useEffect(() => {
        getSummary()
    }, [])
    async function getSummary() {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_BASE_URL}/api/conversations?conversationId=${conversationId}`
        )
        const data: { conversation: ConversationResponse } =
            await response.json();
        setConversation(data.conversation)

    }
    return (
        <>
            <Gradient position='bottom' isSpeaking={false} />
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                <Text>{conversation?.agent_id}</Text>
            </ScrollView>
        </>
    )
}