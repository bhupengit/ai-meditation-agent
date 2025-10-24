import { ImageSourcePropType } from "react-native";

interface Session {
    id: number,
    title: string,
    description: string,
    image: ImageSourcePropType | undefined
}

export const sessions: Session[] = [
    {
      id: 1,
      title: "Morning Mindfulness",
      description:
        "Start your day with calm focus. A guided session to awaken clarity and gratitude.",
      image: require("../assets/images/morning.jpg"),
    },
    {
      id: 2,
      title: "Stress Release",
      description:
        "Let go of tension and anxiety with deep breathing and awareness practices.",
      image: require("../assets/images/stress.jpg"),
    },
    {
      id: 3,
      title: "Focus & Flow",
      description:
        "Enhance your concentration with a short, focused meditation designed for productivity.",
      image: require("../assets/images/focus.jpg"),
    },
    {
      id: 4,
      title: "Evening Reflection",
      description:
        "Wind down your day with a soothing reflection to release thoughts and restore peace.",
      image: require("../assets/images/evening.jpg"),
    },
    {
      id: 5,
      title: "Deep Sleep Journey",
      description:
        "Ease into a restful night’s sleep with calming narration and soft ambient sounds.",
      image: require("../assets/images/sleep.avif"),
    },
  ];