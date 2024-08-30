/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import axios from 'axios';

export default function AssociateDetails({ route, navigation }) {
  const { associate } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState(associate.Status);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = status === 'Active' ? 'Not Active' : 'Active';
      const response = await axios.post(
        'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/change-status',
        { rowID: associate.ROWID, status: newStatus }
      );

      if (response.status === 200) {
        setStatus(newStatus);
        Alert.alert('Success', `Status changed to ${newStatus}`);
      } else {
        Alert.alert('Error', 'Failed to change status');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while changing status');
    } finally {
      toggleModal();
    }
    // console.warn('Working');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.avatar} />
        <Text style={styles.name}>{associate.Name}</Text>
        <Text style={styles.location}>{associate.WarehouseCity}</Text>
      </View>
      <Text style={styles.info}>Joined on : <Text style={styles.info2}>{associate.CREATEDTIME}</Text></Text>
      <Text style={styles.info}>Total Deliveries Performed : <Text style={styles.info2}>58</Text></Text>
      <Text style={styles.info}>Total POD Uploaded : <Text style={styles.info2}>51</Text></Text>
      <Text style={styles.info}>Last Working Day : <Text style={styles.info2}>15/05/2024</Text></Text>

      <TouchableOpacity onPress={toggleModal} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.status, {backgroundColor: status === 'Active' ? 'green' : 'red', width: '30%', padding: 5, borderRadius: 10, color: '#fff'}]}>
          {status}
        </Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Status</Text>
            <Text>Are you sure you want to change the status to {status === 'Active' ? 'Not Active' : 'Active'}?</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleStatusChange}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 300,
    height: 350,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  info2:{
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'normal',
    color: 'black',
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
 buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8, // Change this value for more or less rounded corners
  },
  cancelButton: {
    backgroundColor: '#cccccc', // Gray for cancel
  },
  confirmButton: {
    backgroundColor: '#4CAF50', // Green for confirm
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

