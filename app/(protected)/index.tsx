import { View, Text } from 'react-native'
import React from 'react'
import {SignOutButton} from '@/components/clerk/SignOutButton'

export default function index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
      <SignOutButton />
    </View>
  )
}