import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

interface ContactUsState {
    name: string;
    email: string;
    message: string;
}

class ContactUsPage extends React.Component<{}, ContactUsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
        };
    }

    handleNameChange = (name: string) => {
        this.setState({ name });
    };

    handleEmailChange = (email: string) => {
        this.setState({ email });
    };

    handleMessageChange = (message: string) => {
        this.setState({ message });
    };

    handleSubmit = () => {
        const { name, email, message } = this.state;
        Alert.alert('Form Submitted', 'Thank you for contacting us!');
    };

    render() {
        const { name, email, message } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Contact Us</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    value={name}
                    onChangeText={this.handleNameChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                    value={email}
                    onChangeText={this.handleEmailChange}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Message"
                    value={message}
                    onChangeText={this.handleMessageChange}
                    multiline
                    numberOfLines={4}
                />
                <Button title="Submit" onPress={this.handleSubmit} />
            </View>
        );
    }
}

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
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default ContactUsPage;
