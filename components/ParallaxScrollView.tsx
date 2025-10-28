import { View, Text, StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import { sessions } from '@/utils/sessions';
import { Image } from 'expo-image';
import Button from './Button';

const blurHash = "LKO2?U%2Tw=w]~RBVZRi};RPxuwH"
const HEADER_HEIGHT = 400

export default function ParallaxScrollview({ children }: PropsWithChildren) {
    const todaySession = sessions[Math.floor(Math.random() * sessions.length)]
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)

    const headerAnimatedStyle = useAnimatedStyle(() => {
        // Only apply parallax effect when pulling down (negative scroll offset)
        // When scrolling up (positive offset), behave like normal scroll item
        const translateY =
            scrollOffset.value <= 0
                ? interpolate(
                    scrollOffset.value,
                    [-HEADER_HEIGHT, 0],
                    [-HEADER_HEIGHT / 2, 0]
                )
                : 0; // No transform when scrolling up – let natural scroll handle it

        const scale =
            scrollOffset.value <= 0
                ? interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0], [2, 1])
                : 1; // No scaling when scrolling up

        return { transform: [{ translateY }, { scale }] };
    });
    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={[headerAnimatedStyle, {height: HEADER_HEIGHT, overflow: 'hidden'}]}>
                    <Image
                        source={todaySession.image}
                        placeholder={blurHash}
                        style={{
                            width: '100%',
                            height: HEADER_HEIGHT
                        }}
                    />
                </Animated.View>
                <View style={styles.headerContainer}>

                    <View style={styles.headerContent}>
                        <View style={{ flex: 5 }} />

                        <Text style={styles.headerSubtitle}>Featured Session</Text>
                        <Text style={styles.headerTitle}>{todaySession.title}</Text>
                        <Text style={styles.headerDescription}>{todaySession.description}</Text>
                        <Button>Start Session</Button>

                        <View style={{ flex: 1 }} />
                    </View>

                </View>
                {children}
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "white",
        opacity: 0.5,
        fontWeight: "bold",
    },
    headerTitle: {
        fontSize: 48,
        fontWeight: "bold",
        color: "white",
    },
    headerDescription: {
        fontSize: 16,
        color: "white",
    },
    headerContainer: {
        position: 'absolute',
        width: "100%",
        height: HEADER_HEIGHT,
        experimental_backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5))"
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    }
})