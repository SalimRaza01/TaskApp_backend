import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import DatePicker from "react-native-modern-datepicker";


const { width, height } = Dimensions.get('window');

const TaskDetails = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.TaskDetailsText}>Task Details</Text>
      <View style={styles.divider} />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <View style={styles.Prioritybox}>
          <Text style={styles.TaskPriorityText}>Priority: High</Text>
        </View>
        <View style={styles.Deadlinebox}>
          <Text style={styles.DeadlineText}>Deadline: 20 Oct 2023</Text>
        </View>
      </View>
      <DatePicker
        style={styles.datePicker}
        mode="datepicker" />
      <TextInput
        style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
        placeholderTextColor="#999"
        placeholder=" Comment" />
    </View>
  )
}

export default TaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  TaskDetailsText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginTop: height * -0.01,
    marginBottom: -10,
    color: "#333",
    textAlign: "left",
  },
  divider: {
    marginTop: height * 0.04,
    backgroundColor: "#007BFF",
    height: 2,
  },
  DeadlineText: {
    fontSize: width * 0.03,
    color: '#FFF',
    fontWeight: "600",
    textAlign: "right",
  },
  TaskPriorityText: {
    fontSize: width * 0.03,
    fontWeight: "600",
    color: '#FFF',
    textAlign: "left",
  },
  Deadlinebox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.01,
    borderRadius: width * 0.02,
    width: width * 0.43,
    height: height * 0.05,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  Prioritybox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.01,
    borderRadius: width * 0.02,
    width: width * 0.43,
    height: height * 0.05,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: width * 0.025,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    borderRadius: width * 0.02,
    fontSize: width * 0.04,
  },
  datePicker: {
    backgroundColor: "#fff",
    marginTop: height * 0.015,
    marginBottom: height * 0.006,
    borderRadius: width * 0.03,
    elevation: 5,
    shadowColor: '#000000',
  }

})