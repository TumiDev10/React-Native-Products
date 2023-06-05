import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import zuse from './zuse.png';


interface LoginRegistrationPageProps {
    onLogin: (email: string, password: string) => void;
}

const LoginRegistrationPage: React.FC<LoginRegistrationPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = () => {
        // Perform login validation
        if (email && password) {
            // Perform login logic here
            const users = getUsers();
            const user = users.find((user) => user.email === email && user.password === password);
            if (user) {
                onLogin(email, password);
            } else {
                Alert.alert('Error', 'Invalid email or password');
            }
        } else {
            Alert.alert('Error', 'Please enter email and password');
        }
    };

    const handleRegister = () => {
        // Perform registration validation
        if (email && password) {
            // Perform registration logic here
            const users = getUsers();
            const existingUser = users.find((user) => user.email === email);
            if (existingUser) {
                Alert.alert('Error', 'Email already registered');
            } else {
                const newUser = { email, password };
                users.push(newUser);
                Alert.alert('Success', 'Registration successful');
                setIsLogin(true);
            }
        } else {
            Alert.alert('Error', 'Please enter email and password');
        }
    };

    const getUsers = () => {
        // Dummy function to retrieve users from a data source (e.g., API, local storage)
        return [
            { email: 'tumi.mashigo15@gmail.com', password: 'password1' },
            { email: 'test', password: 'test1' },
        ];
    };

    return (
        
        <View style={styles.container}>
           
            <Text style={styles.heading}>
                {isLogin ? 'Login' : 'Register'}</Text>

            <View style={styles.productItem}>
                <Image source={zuse} style={styles.productImage} />
                <Text>Zuse Technologies</Text>
            </View>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {isLogin ? (
                <Button title="Login" onPress={handleLogin} />
            ) : (
                <Button title="Register" onPress={handleRegister} />
            )}
            <View style={styles.switchButtonContainer}>
                <Text style={styles.switchButtonText}>
                    {isLogin ? 'Switch to Register' : 'Switch to Login'}
                </Text>
                <Button
                    title={isLogin ? 'Register' : 'Login'}
                    onPress={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
                />
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    switchButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    switchButtonText: {
        marginRight: 8,
    },

    input: {
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },

    productItem: {
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 20,
    },

    productImage: {
        width: 200,
        height: 200,
    },
});

export default LoginRegistrationPage;
