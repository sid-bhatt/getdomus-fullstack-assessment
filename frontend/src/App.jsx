import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import TeamDirectory from "./TeamDirectory";
import UserForm from "./UserForm";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [availableTZs, setAvailableTZs] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  // --- API CALLS --- //

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/dashboard/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/users/");
      setAllUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const getTimeZones = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/timezones/");
      setAvailableTZs(res.data);
    } catch (err) {
      console.error("Error fetching timezones:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
    getTimeZones();
  }, []);

  // --- HANDLERS --- //

  const handleCreateUser = async (name, timezone) => {
    try {
      await axios.post(`http://127.0.0.1:8000/users/?name=${name}&timezone=${timezone}`);
      setShowUserForm(false);
      await fetchUsers();
      alert("User added successfully!");
    } catch (err) {
      alert("Error adding user.");
    }
  };

  const handleCreateTask = async (title, description, ids) => {
    const idArray = ids.split(",").map((s) => s.trim()).filter((s) => s !== "").map(Number);
    
    if (idArray.some(isNaN)) return alert("Please enter numeric IDs.");
    if (idArray.length === 0) return alert("Please assign at least one user.");

    try {
      await axios.post("http://127.0.0.1:8000/tasks/", {
        title,
        description,
        user_ids: idArray,
      });
      setShowTaskForm(false);
      fetchData();
    } catch (err) {
      const message = err.response?.data?.detail || "Error creating task.";
      alert(typeof message === "string" ? message : "Check User IDs.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <Header 
        onAddMember={() => setShowUserForm(true)} 
        onAddTask={() => setShowTaskForm(true)}
        hasUsers={allUsers.length > 0}
      />

      <TeamDirectory users={allUsers} />

      {showUserForm && (
        <UserForm 
          availableTZs={availableTZs} 
          onClose={() => setShowUserForm(false)} 
          onSave={handleCreateUser} 
        />
      )}

      {showTaskForm && (
        <TaskForm 
          onClose={() => setShowTaskForm(false)} 
          onSave={handleCreateTask} 
        />
      )}

      {tasks.length === 0 ? (
        <div className="col-span-full text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium tracking-tight">
            No tasks found. Onboard a member and create your first task!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, idx) => (
            <TaskCard key={idx} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;