import { router } from "expo-router";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import HTMLView from "react-native-htmlview";

export default function Exercise() {
    const exercises = [
        { title: "Exercise 3", description: "<p>Create login screen<br>Login screen fields:<ul><li>Email</li><li>Password</li></ul></p>" },
        { title: "Exercise 4", description: "<p>useState/useEffect</p>" },
        { title: "Exercise 5", description: "<p>Register Here!</p>" },
        { title: "Exercise 6", description: "<p>A simple CRUD user management system" },
        { title: "Exercise 7", description: "<p>Basic Quiz App with the use of API</p>" },
    ];

    return (
        <ScrollView style={styles.container}>
            {exercises.map((exercise, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => {
                        if (index === 0) {
                            router.push("/exercise_3");
                        }
                        else if (index === 1) {
                            router.push("/exercise_4");
                        }
                        else if (index === 2) {
                            router.push("/exercise_5");
                        }
                        else if (index === 3) {
                            router.push("/exercise_6")
                        }
                        else if (index === 4){
                            router.push("/exercise_7")
                        }
                        else {
                            undefined
                        }
                        
                    }}
                >
                    <Text style={styles.title}>{exercise.title}</Text>
                    <HTMLView value={exercise.description} stylesheet={htmlStyles} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        backgroundColor: "#AEC6CF",
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
});

const htmlStyles = {
    p: { fontSize: 16 },
    li: { marginBottom: 5 },
};