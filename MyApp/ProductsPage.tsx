import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';

interface CurrencyRates {
    [key: string]: number;
}

interface Product {
    id: string;
    brand: string;
    price: number;
    currency: string;
    thumbnail: string;
    discountPercentage?: number;
    rating: number;
    title: string;
    description: string;
}

const Products: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({});
    const [error, setError] = useState<any>(null);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined); // State for maximum price
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        fetchProductData();
        fetchCurrencyData();
    }, []);

    const fetchProductData = () => {
        axios
            .get('https://dummyjson.com/product')
            .then((response) => {
                setIsLoaded(true);
                setProducts(response.data.products);
            })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            });
    };

    const fetchCurrencyData = () => {
        axios
            .get('https://api.exchangerate.host/latest?base=USD')
            .then((response) => {
                setCurrencyRates(response.data.rates);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const calculateDiscountedPrice = (price: number, discountPercentage: number) => {
        return price - (price * discountPercentage) / 100;
    };

    const applyPriceFilter = () => {
        if (typeof maxPrice === 'undefined') {
            // If maxPrice is undefined, reset the filter and fetch all products again
            resetFilter();
            console.log('No results');
        } else {
            // Filter the products based on the maximum price and search query
            const filteredProducts = products.filter(
                (product) =>
                    product.price * 19 <= maxPrice &&
                    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    };

    const resetFilter = () => {
        // Reset the maximum price, search query, and fetch all products again
        setMaxPrice(undefined);
        setSearchQuery('');
        fetchProductData();
    };

    if (error) {
        return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search by Brand"
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filterContainer}>
                    <Text style={styles.heading}>Filter by Price:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Max Price"
                        value={maxPrice ? maxPrice.toString() : ''}
                        onChangeText={(text) => setMaxPrice(Number(text))}
                    />
                    <TouchableOpacity style={styles.filterButton} onPress={applyPriceFilter}>
                        <Text>Apply Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
                        <Text>Reset Filter</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <View key={item.id} style={styles.productItem}>
                            <View style={styles.imageContainer}>
                                <Text style={styles.productName}>{item.title.includes(item.brand) ? item.title : `${item.brand} ${item.title}`}</Text>
                                <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
                                <Text style={styles.productName}>Description: {item.description}</Text>
                                <Text style={styles.productRate}>Rating: {item.rating}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.price1}>Was: R{item.price * 19}</Text>
                                    <Text style={styles.price}>Now: R{item.price * 19 - item.price}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
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
    clearButton: {
        padding: 8,
        backgroundColor: 'lightgray',
        borderRadius: 4,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
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

    productItem: {
        marginBottom: 17,
        
    },
    imageContainer: {
        width: '100%',
        height: 600,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    
    },
    thumbnail: {
        width: '80%',
        height: '60%',
        resizeMode: 'contain',
       
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productRate: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 250,
        marginTop: 20,
        color: 'black',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 14,
        color: 'green',
        marginLeft: 17,
        fontWeight: 'bold',
    },
    price1: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: -162,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
});

export default Products;
