import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import app from "./firebaseConfig"; 

const auth = getAuth(app);
const storage = getStorage(app);

export default function LoginRegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);

    // Request image picker permission
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access media library is required!");
            return false;
        }
        return true;
    };

    // Handle image selection
    const pickImage = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Handle registration
    const handleRegister = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            if (image) {
                const uri = image;
                const response = await fetch(uri);
                const blob = await response.blob();
                const storageRef = ref(storage, `profile_images/${userCredential.user.uid}`);
                await uploadBytes(storageRef, blob);
            }

            Alert.alert("Success", "Registration Successful");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", error.message);
        }
    };

    // Handle login
    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Login Successful");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>
            {isRegistering && (
                <>
                    <Button title="Pick an image" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </>
            )}
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
            <Button
                title={isRegistering ? "Register" : "Login"}
                onPress={isRegistering ? handleRegister : handleLogin}
                disabled={loading}
            />
            {loading && <Text style={styles.loadingText}>Please wait...</Text>}
            <Button
                title={isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                onPress={() => setIsRegistering(!isRegistering)}
            />
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
        textAlign: "center",
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
        marginBottom: 10,
    },
    loadingText: {
        textAlign: "center",
        color: "gray",
    },
});
