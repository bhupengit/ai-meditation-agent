import { View, Text } from 'react-native'
import React from 'react'
import {SignIn} from '@/components/clerk/SignIn'

export default function index() {
  return (
    <SignIn signUpUrl='/sign-up' scheme='aimeditationagent' homeUrl='(protected)'/>
  )
}