import { View, Text, Button } from 'react-native'
import React from 'react'
import { useConversation } from '@elevenlabs/react-native'
import { useUser } from '@clerk/clerk-expo';

export default function SessionScreen() {
    const {user} = useUser()
    const conversation = useConversation({
        onConnect: () => console.log('Connected to conversation'),
        onDisconnect: () => console.log('Disconnected from conversation'),
        onMessage: (message) => console.log('Received message:', message),
        onError: (error) => console.error('Conversation error:', error),
        onModeChange: (mode) => console.log('Conversation mode changed:', mode),
        onStatusChange: (prop) => console.log('Conversation status changed:', prop.status),
        onCanSendFeedbackChange: (prop) =>
            console.log('Can send feedback changed:', prop.canSendFeedback),
        onUnhandledClientToolCall: (params) => console.log('Unhandled client tool call:', params),
    });

    const startConversation = async () => {
        try {
            await conversation.startSession({
                agentId: process.env.EXPO_PUBLIC_AGENT_ID,
                dynamicVariables:{
                    user_name: user?.username ?? "Bhupen",
                    session_title: "test",
                    sessionDescription:"test",
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const endConversation = async() => {
        try {
            await conversation.endSession()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text>SessionScreen</Text>
            <Button title='Start Conversation' onPress={startConversation} />
            <Button title='End Conversation' onPress={endConversation} />
        </View>
    )
}