// Exercise8.tsx
"use client";

import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function Exercise8() {
    const [isLogin, setIsLogin] = useState(true); // To toggle between Login and Register forms
    const { control, handleSubmit, formState: { errors } } = useForm();

    // Login form submit handler
    const handleLogin = (data: { email: string, password: string }) => {
        alert(`Logging in with ${data.email}`);
    };

    // Register form submit handler
    const handleRegister = (data: { name: string, email: string, password: string }) => {
        alert(`Registering with ${data.name}, ${data.email}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>

            {/* Toggle between Login and Register forms */}
            {isLogin ? (
                <>
                    {/* Login Form */}
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "Invalid email format"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.input}
                                    keyboardType="email-address"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    placeholder="Password"
                                    style={styles.input}
                                    secureTextEntry={true}
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                            </>
                        )}
                    />

                    <Button title="Login" onPress={handleSubmit(handleLogin)} />
                    <Button title="Switch to Register" onPress={() => setIsLogin(false)} color="gray" />
                </>
            ) : (
                <>
                    {/* Register Form */}
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    placeholder="Name"
                                    style={styles.input}
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "Invalid email format"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.input}
                                    keyboardType="email-address"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    placeholder="Password"
                                    style={styles.input}
                                    secureTextEntry={true}
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                            </>
                        )}
                    />

                    <Button title="Register" onPress={handleSubmit(handleRegister)} />
                    <Button title="Switch to Login" onPress={() => setIsLogin(true)} color="gray" />
                </>
            )}
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
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});
