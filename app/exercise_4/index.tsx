import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
export default function exerciseHome(){

    const Links = [
        {to: "/exercise_4/useState/state" as const,
         name: "UseState screen"},

        {to: "/exercise_4/useEffect/useEffect" as const,
         name: "UseEffect screen"},
    ]

    return (
        <View style={style.container}>
        {Links.map((link, i) => (
            <Link key={i} href={`${link.to}`} style={style.buttons}>
                <Text>{link.name}</Text>
            </Link>
        ))}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    buttons: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "black",
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
    }
})