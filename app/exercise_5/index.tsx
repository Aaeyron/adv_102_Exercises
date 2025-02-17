import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
export default function exerciseHome(){

const [name, setName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [image, setImage] = useState<string | null>(null);

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}

            <TextInput
                placeholder="Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Register" />
        </View>
    );
}  


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#FFFFF0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
      }
});