import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';

export default function BorrowerInfo() {
  const [loanApplications, setLoanApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLoanApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const loanAppQuery = query(collection(db, 'Laon_Application')); 
      const loanAppSnapshot = await getDocs(loanAppQuery);
      const applications = loanAppSnapshot.docs.map(doc => doc.data());
      console.log("Fetched loan applications:", applications);
      setLoanApplications(applications);
    } catch (error) {
      console.error("Error fetching loan applications: ", error);
      setError('Error fetching loan applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  const handleApplicationPress = (application) => {
    setSelectedApplication(application);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Loan Applications</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {loanApplications.map((application, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.applicationContainer}
          onPress={() => handleApplicationPress(application)}
        >
          <Text style={styles.applicationText}>Full Name: {application.fullName}</Text>
          <Text style={styles.applicationText}>Email: {application.email}</Text>
        </TouchableOpacity>
      ))}
      {selectedApplication && (
        <View style={styles.selectedApplicationContainer}>
          <Text style={styles.heading}>Selected Loan Application Details</Text>
          <Text style={styles.detailText}>Loan Amount: {selectedApplication.loanAmount}</Text>
          <Text style={styles.detailText}>Loan Type: {selectedApplication.selectedLoan}</Text>
          <Text style={styles.detailText}>Full Name: {selectedApplication.fullName}</Text>
          <Text style={styles.detailText}>Email: {selectedApplication.email}</Text>
          <Text style={styles.detailText}>ID Number: {selectedApplication.idNumber}</Text>
          <Text style={styles.detailText}>Phone Number: {selectedApplication.phoneNumber}</Text>
          {/* Add more fields as needed */}
          <Button title="Clear" onPress={() => setSelectedApplication(null)} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#57A6A1',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  applicationContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  applicationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  selectedApplicationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
