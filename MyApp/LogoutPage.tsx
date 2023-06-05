import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LogoutPage: React.FC = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        // Perform logout logic here
        // For example, clearing user session or token

        navigation.navigate('LoginRegistrationPage');
  
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logout Page</Text>
            <Text style={styles.description}>Are you sure you want to logout?</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        marginBottom: 20,
    },
});

export default LogoutPage;

