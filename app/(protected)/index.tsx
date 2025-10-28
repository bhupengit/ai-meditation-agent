import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { SignOutButton } from '@/components/clerk/SignOutButton'
import SessionScreen from '@/components/screens/SessionScreen'
import { sessions } from '@/utils/sessions'
import { useRouter } from 'expo-router'
import ParallaxScrollView from "@/components/ParallaxScrollview";

export default function index() {
  const router = useRouter()
  return (
    <ParallaxScrollView>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        {sessions.map((session) =>
          <Pressable key={session.id} style={
            { borderWidth: 1, padding: 16, marginVertical: 6, }
          }
            onPress={() =>
              router.navigate({
                pathname: '/session',
                params: { sessionId: session.id }
              })
            }>
            <Text>{session.title}</Text>
          </Pressable>)}
      </ScrollView>
    </ParallaxScrollView>
  )
}