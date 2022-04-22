import axios from "axios";

const API_URL = "http://localhost:5000/api/";
const header = {
  "Content-Type": "application/json",
};

const createTask = (taskTitle) => {
  return new Promise((resolve, reject) => {
    try {
      let body = {
        taskTitle: taskTitle,
      };
      axios
        .post(`${API_URL}add`, body, { header })
        .then((result) => {
          resolve(result.data);
        })
        .catch((er) => {
          reject(er);
        });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllTasks = async () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${API_URL}alldata`, { header })
        .then((result) => {
          resolve(result.data.tasks);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteTask = async (id) => {
  try {
    axios
      .delete(`${API_URL}delete/${id}`, { header })
      .then((result) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  } catch (e) {
    console.log(e);
  }
};

const updateTask = async (id, state) => {
  try {
    var body = {
      completedTask: state,
    };
    axios
      .post(`${API_URL}update/${id}`, body, { header })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }
};

const getTask = async (object) => {
  const tasks = await axios.get(`${API_URL}get/:id`, object);
  console.log(object);
  return tasks;
};

export default { createTask, deleteTask, updateTask, getTask, getAllTasks };
