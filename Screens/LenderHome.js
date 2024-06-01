import React, { useState, useEffect, useRef } from 'react'; // Add useRef
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
const LendMoneyForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [address, setAddress] = useState('');
  const [editedFullName, setEditedFullName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedIdNumber, setEditedIdNumber] = useState('');
  const [editedLoanAmount, setEditedLoanAmount] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [balance, setBalance] = useState(60000.00); // Initial balance
  const scrollViewRef = useRef(null); 
  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const firestore = getFirestore();
        const borrowersCollection = collection(firestore, 'Borrowers');
        const snapshot = await getDocs(borrowersCollection);
        const borrowerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBorrowers(borrowerData);
      } catch (error) {
        console.error('Error fetching borrowers: ', error);
      }
    };

    fetchBorrowers();
  }, []);

  const handleLendLoanClick = () => {
    setShowForm(true);
    setSelectedBorrower(null);
  };

  const handleViewBorrowersClick = () => {
    setShowForm(false);
  };

  const handleBorrowerClick = (borrower) => {
    setSelectedBorrower(borrower);
    setEditMode(false);
    scrollViewRef.current.scrollToEnd({ animated: true });
  
 // Disable edit mode initially
  };

  const handleEditBorrower = () => {
    setEditMode(true); // Enable edit mode
    // Set initial values for editing
    setEditedFullName(selectedBorrower.fullName);
    setEditedEmail(selectedBorrower.email);
    setEditedPhoneNumber(selectedBorrower.phoneNumber);
    setEditedIdNumber(selectedBorrower.idNumber);
    setEditedLoanAmount(selectedBorrower.loanAmount);
    setEditedAddress(selectedBorrower.address);
  };

  const handleSaveEdit = async () => {
    try {
      const firestore = getFirestore();
      const borrowerRef = doc(firestore, 'Borrowers', selectedBorrower.id);
      await updateDoc(borrowerRef, {
        fullName: editedFullName,
        email: editedEmail,
        phoneNumber: editedPhoneNumber,
        idNumber: editedIdNumber,
        loanAmount: editedLoanAmount,
        address: editedAddress,
      });
      // Update the local state with edited borrower details
      const updatedBorrowers = borrowers.map(borrower =>
        borrower.id === selectedBorrower.id
          ? {
              ...borrower,
              fullName: editedFullName,
              email: editedEmail,
              phoneNumber: editedPhoneNumber,
              idNumber: editedIdNumber,
              loanAmount: editedLoanAmount,
              address: editedAddress,
            }
          : borrower
      );
      setBorrowers(updatedBorrowers);
      setEditMode(false); // Disable edit mode after saving changes
    } catch (error) {
      console.error('Error updating borrower: ', error);
    }
  };

  const handleDeleteBorrower = async () => {
    try {
      const firestore = getFirestore();
      const borrowerRef = doc(firestore, 'Borrowers', selectedBorrower.id);
      await deleteDoc(borrowerRef);
      // Remove the deleted borrower from the local state
      const updatedBorrowers = borrowers.filter(borrower => borrower.id !== selectedBorrower.id);
      setBorrowers(updatedBorrowers);
      setSelectedBorrower(null); // Clear the selected borrower
    } catch (error) {
      console.error('Error deleting borrower: ', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const loanAmountNumber = parseFloat(loanAmount);
      if (loanAmountNumber > balance) {
        alert("Insufficient balance.");
        return;
      }
      
      const firestore = getFirestore();
      const docRef = await addDoc(collection(firestore, 'Borrowers'), {
        fullName,
        email,
        phoneNumber,
        idNumber,
        loanAmount: loanAmountNumber,
        address,
      });
      console.log('Borrower added with ID: ', docRef.id);
      // Clear the form fields after successful submission
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setIdNumber('');
      setLoanAmount('');
      setAddress('');
      // Fetch updated borrowers list
      const snapshot = await getDocs(collection(firestore, 'Borrowers'));
      const borrowerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBorrowers(borrowerData);
      setShowForm(false); // Hide form after submission

      // Update the balance
      setBalance(prevBalance => prevBalance - loanAmountNumber);
    } catch (error) {
      console.error('Error adding borrower: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title1}>Lend Money</Text>
        <Text style={[styles.title1, styles.balance]}>Balance is M{balance.toFixed(2)}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleLendLoanClick}>
        <Text style={styles.buttonText}>Lend Loan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewBorrowersClick}>
        <Text style={styles.buttonText}>View Borrowers</Text>
      </TouchableOpacity>
      {showForm ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="ID Number"
            value={idNumber}
            onChangeText={setIdNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Loan Amount"
            value={loanAmount}
            onChangeText={setLoanAmount}
            keyboardType="numeric" // Ensure that the input is numeric
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (

        <ScrollView ref={scrollViewRef} style={styles.borrowersContainer} contentContainerStyle={styles.scrollViewContentContainer}>

          <Text style={styles.subtitle}>Borrowers List</Text>
        <View  style={styles.sub}>{borrowers.map((borrower, index) => (
            <TouchableOpacity key={index} style={styles.borrowerProfile} onPress={() => handleBorrowerClick(borrower)}>
              <Text style={styles.borrowerName}>{borrower.fullName}</Text>
              <Text>Email: {borrower.email}</Text>
              <Text>Phone Number: {borrower.phoneNumber}</Text>
              <View style={styles.more}><Text>ID Number: {borrower.idNumber}</Text><Feather name="arrow-down-right" size={24} color="black" /></View>
            </TouchableOpacity>
          ))}</View>
          {selectedBorrower && (
            <>
              {!editMode ? (
                <>
                  <TouchableOpacity style={styles.editButton} onPress={handleEditBorrower}>
                    <Text style={styles.buttonText}>Edit Borrower</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteBorrower}>
                    <Text style={styles.buttonText}>Delete Borrower</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={editedFullName}
                    onChangeText={setEditedFullName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={editedEmail}
                    onChangeText={setEditedEmail}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={editedPhoneNumber}
                    onChangeText={setEditedPhoneNumber}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="ID Number"
                    value={editedIdNumber}
                    onChangeText={setEditedIdNumber}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Loan Amount"
                    value={editedLoanAmount}
                    onChangeText={setEditedLoanAmount}
                    keyboardType="numeric" // Ensure that the input is numeric
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={editedAddress}
                    onChangeText={setEditedAddress}
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.doneButton} onPress={() => setEditMode(false)}>
                    <Text style={styles.buttonText}>Done</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#ACE1AF',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sub: {
    borderBottomWidth: 10,
    borderBottomColor: 'grey',
  },
  balance: {
    opacity: 0.5, // Lower opacity for the balance text
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  borrowerProfile: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  borrowerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  form: {
    marginBottom: 20,
  },
  borrowersContainer: {
    marginTop: 20,
    flex: 1,
  },
   container: {
    padding: 20,
    flex: 1,
  },
  // Other styles...
  borrowersContainer: {
    marginTop: 20,
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Start from the bottom
    
  },
  more: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Start from the bottom
   
  },
});

export default LendMoneyForm;
