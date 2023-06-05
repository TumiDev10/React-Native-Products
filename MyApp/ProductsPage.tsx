import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';

interface CurrencyRates {
    [key: string]: number;
}

interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    thumbnail: string;
    discount?: number;
}

const MyComponent: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({});
    const [error, setError] = useState<any>(null);

    const scrollY = new Animated.Value(0);

    useEffect(() => {
        fetchProductData();
        fetchCurrencyData();
    }, []);

    const fetchProductData = () => {
        axios
            .get('https://dummyjson.com/product')
            .then(response => {
                setIsLoaded(true);
                setProducts(response.data.products);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    };

    const fetchCurrencyData = () => {
        axios
            .get('https://api.exchangerate.host/latest?base=USD')
            .then(response => {
                setCurrencyRates(response.data.rates);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const calculateDiscountedPrice = (price: number, discount: number) => {
        return price - (price * discount) / 100;
    };


    if (error) {
        return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}></Text>
                <Animated.ScrollView
                    style={styles.scrollContainer}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    scrollEventThrottle={16}
                >
                    {products.map((product: Product) => (
                        <View key={product.id} style={styles.productItem}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
                                <Text style={styles.price1}>Was: R{product.price * 19}</Text>
                                <Text style={styles.price}>Now: R{product.price * 19 - product.price}</Text>
                            </View>
                            <Text style={styles.productName}>{product.name}</Text>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    discountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    discountContainer: {
        marginBottom: 8,
    },

    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    scrollContainer: {
        flex: 1,
    },
    productItem: {
        marginBottom: 12,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    thumbnail: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
  
    price: {
        fontSize: 14,
       color: 'green',
    },

    price1: {
        fontSize: 14,
        color: 'red',
    },
});

export default MyComponent;
