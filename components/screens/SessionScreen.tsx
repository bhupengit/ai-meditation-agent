import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useConversation } from '@elevenlabs/react-native'
import { useUser } from '@clerk/clerk-expo';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { sessions } from '@/utils/sessions';
import { Gradient } from '../gradient';
import Button from '../Button';
import * as Brightness from "expo-brightness";

export default function SessionScreen() {
    const { user } = useUser()
    const { sessionId } = useLocalSearchParams();
    const session = sessions.find((s) => s.id === Number(sessionId)) ?? sessions[0]

    const [isStarting, setIsStarting] = useState(false)
    const [conversationId, setConversationId] = useState<string | null>(null)

    // if(!sessionId){
    //     return <Redirect href={"/"} />
    // }
    const conversation = useConversation({
        onConnect: ({conversationId}) => setConversationId(conversationId),
        onDisconnect: () => console.log('Disconnected from conversation'),
        onMessage: (message) => console.log('Received message:', message),
        onError: (error) => console.error('Conversation error:', error),
        onModeChange: (mode) => console.log('Conversation mode changed:', mode),
        onStatusChange: (prop) => console.log('Conversation status changed:', prop.status),
        onCanSendFeedbackChange: (prop) =>
            console.log('Can send feedback changed:', prop.canSendFeedback),
        onUnhandledClientToolCall: (params) => console.log('Unhandled client tool call:', params),

        clientTools:{
            handleSetBrightness: async (parameters: unknown) => {
                const { brightnessValue } = parameters as { brightnessValue: number }
                console.log('Setting brightness to, ',{brightnessValue})

                const { status } = await Brightness.requestPermissionsAsync();
                if(status === "granted"){
                    await Brightness.setSystemBrightnessAsync(brightnessValue)
                    return brightnessValue
                }
            }
        }
    });

    const startConversation = async () => {
        if(isStarting) return

        try {
            setIsStarting(true)
            await conversation.startSession({
                agentId: process.env.EXPO_PUBLIC_AGENT_ID,
                dynamicVariables: {
                    user_name: user?.username ?? "Bhupen",
                    session_title: session.title,
                    sessionDescription: session.description,
                }
            })
        } catch (error) {
            console.log(error)
        }finally{
            setIsStarting(false)
        }
    }

    const endConversation = async () => {
        try {
            await conversation.endSession()
        } catch (error) {
            console.log(error)
        }
    }

    const canStart = conversation.status === 'disconnected' && !isStarting
    const canEnd = conversation.status === 'connected'

    return (
        <>
            <Gradient position='top' isSpeaking={
                conversation.status === 'connected' ||
                conversation.status === 'connecting'
            } />
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
            }}>
                <Text>SessionScreen</Text>
                <Text style={{ fontSize: 32, fontWeight: 'bold'}}>{session.title}</Text>
                <Text style={{ fontSize: 16, fontWeight: 500, opacity: 0.5}}>{session.description}</Text>
                <Button onPress={canStart ? startConversation : endConversation} 
                disabled= {!canStart && !canEnd}>{canStart ? 'Start Conversation' : 'End Conversation'}</Button>
            </View>
        </>
    )
}