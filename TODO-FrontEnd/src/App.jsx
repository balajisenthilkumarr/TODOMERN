import { useEffect, useState } from "react";
import "./App.css";
import Cantainer from "./Components/Cantainer";
import InputContainer from "./Components/InputContainer";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null); // To track the task being edited
  const [editingTitle, setEditingTitle] = useState(""); // For the title when editing
  const [editingDescription, setEditingDescription] = useState(""); // For the description when editing
  const [originaldata, setOriginaldata] = useState({
    title: "",
    description: "",
  });

  const writesettitle = (e) => {
    setTitle(e.target.value);
  };

  const writeDescription = (e) => {
    setDescription(e.target.value);
  };

  const apiurl = "http://localhost:8000";

  //add data to the api
  function addTask() {
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiurl + "/todopost/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add task");
          }
          return response.json();
        })
        .then((data) => {
          setTask([...task, data]);
          setSuccess("Data added successfully");
          setTitle("");
          setDescription("");
          clearMessageAfterTimeout("success");
        })
        .catch((error) => {
          setError("API not working: " + error.message);
        });
    } else {
      setError("Title cannot be empty!");
      clearMessageAfterTimeout("error");
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  //getdata from api
  function getdata() {
    fetch(apiurl + "/getdata") // Replace with your API URL to fetch tasks
      .then((response) => response.json())
      .then((data) => {
        setTask(data); // Set the fetched tasks to state
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.message);
      });
  }
  //deletin data from database
  function deleteTask(taskId) {
    fetch(`${apiurl}/delete/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        //converting javascript object method
        return response.json();
      })
      .then((deletedTask) => {
        //console.log(deletedTask._id);
        setTask((prevTasks) => prevTasks.filter((task) => task._id !== deletedTask._id));
        
        setSuccess("Task deleted successfully!");
        clearMessageAfterTimeout("success");
      })
      .catch((error) => {
        console.error("Error deleting task:", error.message);
        setError("Failed to delete task.");
        clearMessageAfterTimeout("error");
      });
  }
  //hanlding edit function
  const handlingEdit = (taskId) => {
    const taskToEdit = task.find((t) => t._id === taskId);
    //console.log("Editing task ID:", taskToEdit); // Debugging
    //console.log("Editing task decription:", taskToEdit.description); // Debugging
    if (taskToEdit) {
      setOriginaldata({
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
      setEditingTaskId(taskId);
      setEditingTitle(taskToEdit.title);
      setEditingDescription(taskToEdit.description);
      setIsEditing(true);
    }
  };

  //handling cancel button
  const handlecancel = () => {
    // Revert to the original data
    setEditingTitle(originaldata.title);
    setEditingDescription(originaldata.description);

    // Reset editing state
    setIsEditing(false);
    setEditingTaskId(null);
    setOriginaldata({ title: "", description: "" });
  };

  //handling update function for api
  const handleUpdate = () => {
    if (editingTitle.trim() !== "" && editingDescription.trim() !== "") {
      fetch(`${apiurl}/update/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingTitle,
          description: editingDescription,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update task");
          }
          return response.json();
        })
        .then((updatedTask) => {
          setTask((prevTasks) =>
            prevTasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            )
          );
          setIsEditing(false);
          setSuccess("Task updated successfully");
          setEditingTaskId(null); // Reset editing state
          setEditingTitle(""); // Clear title input
          setEditingDescription(""); // Clear description input
        })
        .catch((error) => {
          setError("Error updating task: " + error.message);
        });
    } else {
      setError("Both title and description are required");
    }
  };

  // Helper function to clear error or success message after 3 seconds
  function clearMessageAfterTimeout(type) {
    // Clear previous timeout if there was one
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      if (type === "error") {
        setError(""); // Clear error message after timeout
      } else if (type === "success") {
        setSuccess(""); // Clear success message after timeout
      }
    }, 3000); // 3000ms = 3 seconds

    setTimeoutId(newTimeoutId);
  }

  {
    /*const addTask = () => {
    if (title.trim() === "" || description.trim() === "") {
      setError("Both Title and Description are required.");
      setSuccess("");
      return;
    }
    const newTask = {
      _id: Date.now(), // Temporary unique ID
      title,
      description,
    };
    setTask([...task, newTask]); // Add new task to the list
    setTitle(""); // Clear input fields
    setDescription("");
    setError("");
    setSuccess("Task added successfully!");
  };*/
  }

  {
    /*const deleteTask = (id) => {
    const updatedTasks = task.filter((t) => t._id !== id);
    setTask(updatedTasks);
    setSuccess("Task deleted successfully!");
    setError("");
  };*/
  }

  return (
    <>
      <div className="p-10 text-center bg-slate-600 text-blue-300 align-center">
        <h1 className="text-6xl font-bold">To Do List</h1>
      </div>
      <InputContainer
        title={title}
        writesettitle={writesettitle}
        description={description}
        writeDescription={writeDescription}
        addTask={addTask}
      />
      <div className="text-center">
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <Cantainer
        task={task}
        deleteTask={deleteTask}
        handlingEdit={handlingEdit}
        isEditing={isEditing}
        editingTaskId={editingTaskId}
        editingTitle={editingTitle}
        editingDescription={editingDescription}
        setEditingTitle={setEditingTitle}
        setEditingDescription={setEditingDescription}
        handlecancel={handlecancel}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default App;
