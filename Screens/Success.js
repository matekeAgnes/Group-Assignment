import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Success = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Application Submitted Successfully!</Text>
      <Text>Your loan application has been submitted successfully. We will review your application and get back to you soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Success;
