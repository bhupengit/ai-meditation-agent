import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gradient } from '../gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ConversationResponse } from '@/utils/types';
import Button from '../Button';
import { appwriteConfig, database } from '@/utils/appwrite';
import { ID } from 'react-native-appwrite';
import { useUser } from '@clerk/clerk-expo';

export default function SummaryScreen() {
    const { conversationId } = useLocalSearchParams();
    const [conversation, setConversation] = useState<ConversationResponse>()
    const router = useRouter()
    const {user} = useUser()
    const [isSaving, setIsSaving] = useState(false)
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

    async function saveAndContinue() {
        try {
            setIsSaving(true)
            await database.createDocument(appwriteConfig.db,
                appwriteConfig.tables.session,
                ID.unique(),
                {
                    user_id: user?.id,
                    status: conversation?.status,
                    conv_id: conversationId,
                    tokens: Number(conversation?.metadata?.cost),
                    call_duration_secs: Number(
                        conversation?.metadata?.call_duration_secs
                    ),
                    transcript: conversation?.transcript.map((t) => t.message).join("\n"),
                    call_summary_title: conversation?.analysis?.call_summary_title,
                }
            )

            router.dismissAll()
        } catch (error) {
            console.log(error)
        }finally{
            setIsSaving(false)
        }
    }
    return (
        <>
            <Gradient position='bottom' isSpeaking={false} />
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {conversation?.status !== "done" && (
                    <View style={{ gap: 16, paddingBottom: 16 }}>
                        <Text style={styles.title}>We are processing your call...</Text>
                        <Text style={styles.subtitle}>This may take a few minutes.</Text>
                        <Text style={styles.subtitle}>
                            Current status: {conversation?.status}
                        </Text>
                        <Button onPress={getSummary}>Refresh</Button>
                    </View>
                )}
                {conversation?.status === "done" && (
                    <View style={{ gap: 16, paddingBottom: 16 }}>
                        <Text style={styles.caption}>{conversationId}</Text>
                        <Text style={styles.title}>
                            {conversation?.analysis?.call_summary_title}
                        </Text>
                        <Text style={styles.subtitle}>
                            {conversation?.analysis?.transcript_summary.trim()}
                        </Text>

                        <Text style={styles.title}>Stats</Text>
                        <Text style={styles.subtitle}>
                            {conversation?.metadata?.call_duration_secs} seconds
                        </Text>
                        <Text style={styles.subtitle}>
                            {conversation?.metadata?.cost} tokens
                        </Text>
                        <Text style={styles.subtitle}>
                            {new Date(
                                conversation?.metadata.start_time_unix_secs! * 1000
                            ).toLocaleString()}
                        </Text>

                        <Text style={styles.title}>Transcript</Text>
                        <Text style={styles.subtitle}>
                            {conversation?.transcript.map((t) => t.message).join("\n")}
                        </Text>
                    </View>
                )}
                <View style={{ alignItems: "center" }} >

                    <Button onPress={saveAndContinue}>{isSaving ? "Saving..." : "Save and continue" }</Button>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 16
    },
    caption: {
        fontSize: 12,
        color: "gray",
    }
});