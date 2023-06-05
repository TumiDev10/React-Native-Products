import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AboutPage from './AboutPage';
import ProductsPage from './ProductsPage';
import ContactPage from './ContactPage';
import LogoutPage from './LogoutPage';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const HomePage: React.FC = () => {
    return (

        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="About" component={AboutPage} />
            <Tab.Screen name="Products" component={ProductsPage} />
            <Tab.Screen name="Contact" component={ContactPage} />
            <Tab.Screen name="Logout" component={LogoutPage} />
        </Tab.Navigator>


    );
};

export default HomePage;
