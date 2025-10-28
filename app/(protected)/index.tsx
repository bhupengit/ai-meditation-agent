import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SignOutButton } from '@/components/clerk/SignOutButton'
import SessionScreen from '@/components/screens/SessionScreen'
import { sessions } from '@/utils/sessions'
import { useRouter } from 'expo-router'
import ParallaxScrollView from "@/components/ParallaxScrollview";
import { Image } from 'expo-image'

const blurhash = "LKO2?U%2Tw=w]~RBVZRi};RPxuwH"

export default function index() {
  const router = useRouter()
  return (
    <ParallaxScrollView>
      <Text style={styles.title}>Explore Sessions</Text>
      <ScrollView
        contentContainerStyle={{
          paddingLeft: 16,
          gap: 16
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior='automatic'>
        {sessions.map((session) =>
          <Pressable key={session.id} style={styles.sessionContainer}
            onPress={() =>
              router.navigate({
                pathname: '/session',
                params: { sessionId: session.id }
              })
            }>
            <Image
              source={session.image}
              style={styles.sessionImage}
              contentFit='cover'
              transition={1000}
              placeholder={{ blurhash }}
            />
            <View style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              experimental_backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5))",
              borderRadius: 16,
            }}>
              <Text style={styles.sessionTitle}>{session.title}</Text>
            </View>

          </Pressable>)}
      </ScrollView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16
  },
  sessionContainer: {
    position: 'relative',
    borderWidth: 1,
    padding: 16,
    marginVertical: 6,
  },
  sessionImage: {
    width: 250,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden'
  },
  sessionTitle: {
    position: "absolute",
    width: '100%',
    bottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
})