import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, ScrollView, Animated, TextInput, TouchableOpacity } from 'react-native';

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
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined); // State for maximum price

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

    const applyPriceFilter = () => {
        if (typeof maxPrice === 'undefined') {
            // If maxPrice is undefined, reset the filter and fetch all products again
            resetFilter();
        } else {
            // Filter the products based on the maximum price
            const filteredProducts = products.filter(product => product.price * 19 <= maxPrice);
            setProducts(filteredProducts);
            //setTimeout(resetFilter, 2000);
           // console.log(maxPrice);
        }
    };

    


    const resetFilter = () => {
        // Reset the maximum price and fetch all products again
        setMaxPrice(undefined);
        fetchProductData();
    };

    if (error) {
        return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <Text style={styles.heading}>Filter by Price:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Max Price"
                        value={maxPrice ? maxPrice.toString() : ''}
                        onChangeText={text => setMaxPrice(Number(text))}
                    />
                    <TouchableOpacity style={styles.filterButton} onPress={applyPriceFilter}>
                        <Text>Apply Filter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
                        <Text>Reset Filter</Text>
                    </TouchableOpacity>
                </View>
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
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginRight: 8,
    },
    filterButton: {
        padding: 8,
        backgroundColor: 'lightblue',
        borderRadius: 4,
        marginRight: 8,
    },
    resetButton: {
        padding: 8,
        backgroundColor: 'lightgray',
        borderRadius: 4,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
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
