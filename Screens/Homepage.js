import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Homepage() {
  const navigation = useNavigation();
  

  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Our Company</Text>
      
      
     

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Borrowers</Text>
        <Button title="Search history" onPress={() => navigation.navigate("BorrowerInfo")} />
       
        <Text style={styles.borrowingInfo}>We offer loans for various purposes, including:</Text>
        <Text>- Personal Loans</Text>
        <Text>- Business Loans</Text>
        <Text>- Education Loans</Text>
        <Text>- Home Loans</Text>
        <Button title="Explore Borrowing" onPress={() => navigation.navigate("Borrowers")} />
        
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#57A6A1', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 10,
  },
  optionTitle: {
    fontWeight: 'bold',
  },
  optionDescription: {
    marginLeft: 10,
  },
  borrowingInfo: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});