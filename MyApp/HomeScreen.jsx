import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import product1 from './product1.jpeg';
import product2 from './product2.jpg';



const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Welcome to My Store</Text>
                <Text>Your one-stop-shop for widgets, gadgets, and gizmos!</Text>
            </View>
            <View style={styles.productList}>
                <View style={styles.productItem}>
                    <Image source={product1} style={styles.productImage} />
                    <Text style={styles.productTitle}>iPhone</Text>
                    <Text>$548.00</Text>
                </View>
                <View style={styles.productItem}>
                    <Image source={product2} style={styles.productImage} />
                    <Text style={styles.productTitle}>MacBook Pro</Text>
                    <Text>$1749.00</Text>
                </View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productList: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    productItem: {
        alignItems: 'center',
        marginBottom: 20,
    },
    productImage: {
        width: 200,
        height: 200,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default HomeScreen;
