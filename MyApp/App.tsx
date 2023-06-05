import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import LoginRegistrationPage from './LoginRegistrationPage';
import LogoutPage from './LogoutPage';

const Stack = createStackNavigator();

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (email: string, password: string) => {
        // Perform login logic and set isLoggedIn to true
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Perform logout logic and set isLoggedIn to false
        setIsLoggedIn(false);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Screen
                        name="Zuse Technologies"
                        component={HomePage}
                        options={{
                            title: 'Zuse Technologies',
                            headerTitleAlign: 'center',
                        }} />


                ) : (
                    <Stack.Screen
                        name="LoginRegistrationPage"
                        options={{ headerShown: false }}
                    >
                        {() => <LoginRegistrationPage onLogin={handleLogin} />}
                    </Stack.Screen>
                )}
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
