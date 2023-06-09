import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';




const HomeScreen: React.FC = () => {
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Welcome to My Store</Text>
                <Text>Your one-stop-shop for widgets, gadgets, and gizmos!</Text>
            </View>
            <View style={styles.productList}>
                <View style={styles.productItem}>
                    <Image source={require('./product1.jpeg')} />
                    <Text style={styles.productTitle}>iPhone</Text>
                    <Text>$548.00</Text>
                </View>

                <View style={styles.productItem}>
                    <Image source={require('./product3.jpeg')} />
                        <Text style={styles.productTitle}>Perfume Oil</Text>
                    <Text>$29.00</Text>
                </View>
                
            </View>
            </View>
            </ScrollView>
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
