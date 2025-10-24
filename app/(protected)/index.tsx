import { View, Text } from 'react-native'
import React from 'react'
import {SignOutButton} from '@/components/clerk/SignOutButton'
import SessionScreen from '@/components/screens/SessionScreen'

export default function index() {
  return (
    <SessionScreen />
  )
}