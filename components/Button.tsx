import { View, Text, PressableProps, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/utils/colors'

export default function Button({ children, ...props }: PressableProps) {
    const [isPressed, setIsPressed] = useState(false);
    return (
        <Pressable 
        onPressIn={() => setIsPressed(true)} 
        onPressOut={() => setIsPressed(false)}
        style={[styles.button, isPressed && styles.buttonPressed]}
        {...props}>
            {typeof children === 'string' ? (
                <Text style={styles.text}>{children}</Text>
            ) : (
                children
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    buttonPressed:{
        backgroundColor: colors.blue,
        opacity: 0.8
    },
    text: {
        color: 'white'
    }
})