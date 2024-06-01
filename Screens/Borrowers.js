import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { db, addDoc } from './firebase'; 

import { collection } from 'firebase/firestore';

export default function Borrowers() {
  const navigation = useNavigation();
  const [selectedLoan, setSelectedLoan] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [clickedBorrower, setClickedBorrower] = useState('');

  const loanOptions = [
    { type: "Personal Loan", interestRate: "20%", description: "Flexible loan for personal expenses." },
    { type: "Business Loan", interestRate: "35%", description: "Funds for business growth and expansion." },
    { type: "Home Loan", interestRate: "25%", description: "Mortgage financing for purchasing a home." },
    { type: "Student Loan", interestRate: "15%", description: "Funding for educational expenses with favorable interest rates." },
  ];

  const handleBorrowerClick = (borrower) => {
    setClickedBorrower(borrower);
  };

  const submitApplication = async () => {
    try {
      
      await addDoc(collection(db, "Laon_Application"), {
        fullName,
        email,
        phoneNumber,
        idNumber,
        loanAmount,
        selectedLoan,
      });
     
      navigation.navigate("Success");
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Borrowers Page</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.loanOptions}>
            <Text style={styles.sectionHeading}>Loan Options</Text>
            {loanOptions.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <Text style={styles.optionTitle}>{option.type}</Text>
                <Text style={styles.optionDescription}>Interest Rate: {option.interestRate}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.applicationForm}>
          <Text style={styles.sectionHeading}>Apply for a Loan</Text>
          <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
          <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
          <TextInput style={styles.input} placeholder="ID Number" value={idNumber} onChangeText={setIdNumber} />
          <TextInput style={styles.input} placeholder="Loan Amount Needed" keyboardType="numeric" value={loanAmount} onChangeText={setLoanAmount} />
          
          <Picker
            selectedValue={selectedLoan}
            onValueChange={(itemValue, itemIndex) => setSelectedLoan(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Loan Type" value="" />
            {loanOptions.map((option, index) => (
              <Picker.Item key={index} label={option.type} value={option.type} />
            ))}
          </Picker>
          
          <Button title="Submit Application" onPress={submitApplication} />
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#57A6A1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loanOptions: {
    marginBottom: 30,
    flexDirection: 'row',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    marginRight: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 16,
  },
  applicationForm: {
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  clickedBorrower: {
    color: 'blue', 
    fontWeight: 'bold',
  },
});
