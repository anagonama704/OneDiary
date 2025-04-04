import { useState, useEffect } from "react";
import {
  TamaguiProvider,
  YStack,
  Text,
  XStack,
  Avatar,
  Image,
  Theme,
  Header,
  H1,
  Spinner,
  Circle,
} from "tamagui";
import { FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { config } from "./tamagui.config";
import { Animated, Easing } from "react-native";

const mockPosts = [
  {
    id: "1",
    title: "2025/04/05",
    entries: [
      {
        imageUri: "https://placehold.jp/150x300.png",
        comment: "朝ごはんを食べた",
      },
      {
        imageUri: "https://placehold.jp/150x300.png",
        comment: "公園を散歩した",
      },
      {
        imageUri: "https://placehold.jp/150x300.png",
        comment: "夜はカレーを食べた\nお腹が痛い",
      },
    ],
    user: "kei",
    location: "Tokyo, Japan",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "2025/04/06",
    entries: [
      {
        imageUri: "https://placehold.jp/150x150.png",
        comment: "散歩してリフレッシュ🐾",
      },
      {
        imageUri: "https://placehold.jp/150x150.png",
        comment: "友達とカフェに行った",
      },
      {
        imageUri: "https://placehold.jp/150x150.png",
        comment: "映画を見た",
      },
    ],
    user: "kei",
    location: "Kyoto, Japan",
    timestamp: new Date(),
  },
];

export default function App() {
  const [posts, setPosts] = useState(mockPosts);
  const [isLoading, setIsLoading] = useState(true);
  const [animations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  useEffect(() => {
    const createDotAnimation = (index: number) => {
      return Animated.sequence([
        Animated.delay(index * 200),
        Animated.loop(
          Animated.sequence([
            Animated.timing(animations[index], {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(animations[index], {
              toValue: 0,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ])
        ),
      ]);
    };

    animations.forEach((_, index) => {
      createDotAnimation(index).start();
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const beforeTimestamp = (timestamp: Date) => {
    const now = new Date();

    // 日付が無効な場合は現在時刻を返す
    if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
      return now.toLocaleDateString("ja-JP");
    }

    const nowDate = now.toLocaleDateString("ja-JP");
    const postDateStr = timestamp.toLocaleDateString("ja-JP");

    // 昨日の日付を計算
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString("ja-JP");

    if (postDateStr === nowDate) {
      return "今日";
    } else if (postDateStr === yesterdayStr) {
      return "昨日";
    } else {
      return postDateStr;
    }
  };

  const renderItem = ({ item }: { item: (typeof mockPosts)[0] }) => (
    <YStack
      backgroundColor="#1a1a1a"
      padding={16}
      borderRadius={12}
      elevation={2}
      overflow="hidden"
      gap={10}
      marginBottom={20}
      shadowColor="#000"
      shadowOpacity={0.2}
      shadowRadius={6}
    >
      {/* ユーザー情報 */}
      <XStack alignItems="center" gap={10}>
        <Avatar circular size={16} />
        <YStack>
          <Text color="#fff" fontWeight="600" fontSize="$4">
            {item.user}
          </Text>
          <Text color="#888" fontSize="$2">
            {item.location} ・{beforeTimestamp(item.timestamp)}
          </Text>
        </YStack>
      </XStack>
      <YStack
        backgroundColor="#eee"
        borderWidth={1}
        borderColor="#e0e0e0"
        borderRadius={2}
        padding={16}
        shadowColor="#000"
        shadowOpacity={0.1}
        shadowRadius={6}
      >
        <XStack gap={12}>
          {/* Notebook holes inside the card */}
          <YStack
            justifyContent="space-between"
            alignItems="center"
            paddingVertical={12}
            width={16}
          >
            {[...Array(8)].map((_, i) => (
              <YStack
                key={i}
                width={10}
                height={10}
                borderRadius={5}
                backgroundColor="#ddd"
                position="relative"
                justifyContent="center"
                alignItems="center"
              >
                {/* horizontal ring arm */}
                <YStack
                  position="absolute"
                  left={10}
                  width={6}
                  height={2}
                  backgroundColor="#bbb"
                />
              </YStack>
            ))}
          </YStack>

          {/* Card content */}
          <YStack flex={1} gap={10}>
            {/* ノートページの中身：3つの記録 */}
            <Header>
              <Header>
                <H1 color="#333" fontSize="$5" fontWeight="700">
                  {item.title}
                </H1>
              </Header>
            </Header>
            {item.entries?.map((entry, index) => (
              <YStack
                key={index}
                gap={6}
                borderTopWidth={1}
                borderTopColor="#333"
                paddingTop={10}
              >
                <Image
                  source={{ uri: entry.imageUri }}
                  width="100%"
                  height={200}
                  borderRadius={6}
                  maskMode="cover"
                />
                <Text color="#444" fontSize="$4" lineHeight={22}>
                  {entry.comment}
                </Text>
              </YStack>
            ))}
          </YStack>
        </XStack>
      </YStack>
      <XStack gap={16} marginTop={4}>
        <Text color="#666" fontSize="$2">
          ❤️ 12
        </Text>
        <Text color="#666" fontSize="$2">
          💬 4
        </Text>
      </XStack>
    </YStack>
  );

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <StatusBar style="light" />
        <YStack backgroundColor="#000" flex={1} padding={16}>
          {/* タイトル */}
          <Text
            color="#fff"
            fontSize={23}
            fontWeight="700"
            position="absolute"
            top={50}
            left={0}
            right={0}
            textAlign="center"
            zIndex={1}
            textShadowColor="rgba(83, 83, 83, 0.6)"
            textShadowOffset={{ width: 1, height: 1 }}
            textShadowRadius={3}
          >
            OneDiary
          </Text>

          {/* FlatList */}
          {isLoading ? (
            <YStack
              flex={1}
              justifyContent="center"
              alignItems="center"
              paddingTop={100}
            >
              <XStack gap={8} alignItems="center">
                {animations.map((animation, index) => (
                  <Animated.View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#fff",
                      opacity: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                      transform: [
                        {
                          translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -4],
                          }),
                        },
                      ],
                    }}
                  />
                ))}
              </XStack>
              <Text color="#fff" fontSize={16} marginTop={20}>
                読み込み中...
              </Text>
            </YStack>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingTop: 100 }}
            />
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
