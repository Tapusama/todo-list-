import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Modal } from "react-native";
import apiHelper from "./apiHelper";

export default function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);
  const fetchAllData = async () => {
    var allTasks = await apiHelper.getAllTasks();
    setTaskList(allTasks);
  };

  const createTask = async (task) => {
    if (task.length != 0) {
      let newTask = await apiHelper.createTask(task);
      setTaskList((taskList) => [...taskList, newTask]);
      setTask("");
      fetchAllData();
    } else {
      alert("Please fill the task details");
    }
  };

  const completeTask = async (id, state) => {
    await apiHelper.updateTask(id, state);
    await fetchAllData();
  };

  const deleteTask = async (id) => {
    await apiHelper.deleteTask(id);
    await fetchAllData();
  };

  const OpenModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>delete this task ???</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                deleteTask(idToDelete);
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <OpenModal />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={task}
          style={styles.input}
          onChangeText={(e) => {
            setTask(e);
          }}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            createTask(task);
            setTask("");
          }}
        >
          <Text>add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.task}>
        {taskList.map((e, i) => {
          return (
            <View
              key={i}
              style={{
                height: 20,
                margin: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {!e.completedTask ? (
                <TouchableOpacity
                  onPress={() => {
                    completeTask(e._id, true);
                  }}
                >
                  <Text>{e.taskTitle}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    completeTask(e._id, false);
                  }}
                >
                  <Text style={{ textDecorationLine: "line-through" }}>
                    {e.taskTitle}
                  </Text>
                </TouchableOpacity>
              )}
              <Pressable
                style={[styles.button, { height: 25 }]}
                onPress={() => {
                  setModalVisible(true);
                  setIdToDelete(e._id);
                  OpenModal({ id: e._id });
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,101,80,0.32)",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#000",
    borderWidth: 2,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#59821F",
    height: 50,
    width: 50,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  underline: { textDecorationLine: "line-through" },
  task: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
