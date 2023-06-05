import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ProductsPage from './ProductsPage.tsx';



const AboutScreen: React.FC = () => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>About Us - My Store</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                <View style={styles.contentContainer}>
                   
                    <View style={styles.content}>
                        <Text style={styles.sectionTitle}>Our Story</Text>
                        <Text style={styles.paragraph}>
                            My Store was founded in 2023 with a mission to provide the best products and services to our customers. Over the years, we have grown into a leading provider of widgets, gadgets, and gizmos, serving customers all over the world.
                        </Text>
                        <Text style={styles.sectionTitle}>Our Vision</Text>
                        <Text style={styles.paragraph}>
                            Our vision is to continue providing innovative and high-quality products and services to our customers, while also being a responsible and sustainable company that contributes to the well-being of the planet and the communities we serve.
                        </Text>
                        <Text style={styles.sectionTitle}>Our Team</Text>
                        <Text style={styles.paragraph}>
                            We are a team of passionate and dedicated professionals who love what we do. Our diverse backgrounds and experiences enable us to bring unique perspectives to our work, and we are committed to creating a positive and inclusive workplace culture where everyone can thrive.
                        </Text>
                        <TouchableOpacity style={styles.ctaButton} onPress={() => {ProductsPage}}>
                            <Text style={styles.ctaButtonText}>Explore Our Products</Text>
                        </TouchableOpacity>
                    </View>
                </View>
           
            <View style={styles.featuresContainer}>
                <Text style={styles.sectionTitle}>Our Features</Text>
                <Text>
                    <Text style={styles.featureItem}>- Free shipping on all orders over R100</Text>
                    {"\n"}
                    <Text style={styles.featureItem}>- 30-day money-back guarantee</Text>
                    {"\n"}
                    <Text style={styles.featureItem}>- 24/7 customer support</Text>
                    {"\n"}
                    <Text style={styles.featureItem}>- Customizable product options</Text>
                    {"\n"}
                    <Text style={styles.featureItem}>- Secure online payments</Text>
                </Text>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    scrollContentContainer: {
        flexGrow: 1,
    },

    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    imageContainer: {
        flex: 1,
        marginRight: 20,
    },
    profileImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        flex: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        marginBottom: 10,
    },
    ctaButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    ctaButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    featuresContainer: {
        marginBottom: 20,
    },
    featureItem: {
        marginBottom: 5,
    },
});

export default AboutScreen;
