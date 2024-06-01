import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WelcomePage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./pic2.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>

        <TouchableOpacity
          style={[styles.button, styles.borrowerButton]}
          onPress={() => navigation.navigate('Login', { userType: 'borrower' })}
        >
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Login as Loan Borrower</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.lenderButton]}
          onPress={() => navigation.navigate('LenderLogin', { userType: 'lender' })}
        >
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Login as Company Employee</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.3, 
    shadowRadius: 3, 
  },
  borrowerButton: {
    backgroundColor: '#57A6A1', 
  },
  lenderButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WelcomePage;
