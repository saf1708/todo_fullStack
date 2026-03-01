import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { logout } = useAuth();

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");

  // 🔹 Fetch Todos
  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchTodos();
  }, []);

    const handleEditClick = (todo) => {
  setEditId(todo._id);
  setEditTitle(todo.title);
  setEditDescription(todo.description);
};

  const handleUpdate = async () => {
  try {
    await api.put(`/todos/update/${editId}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditId(null);
    fetchTodos();
  } catch (error) {
    console.log(error);
  }
};

  // 🔹 Create Todo
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await api.post("/todos", { title, description });
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Delete Todo
  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/delete/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Toggle Complete
  const handleToggle = async (todo) => {
    try {
      await api.put(`/todos/update/${todo._id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };


  // 🔹 Search Filter
  const filteredTodos = todos.filter((todo) => {
  const searchText = search.toLowerCase();

  return (
    todo.title.toLowerCase().includes(searchText) ||
    (todo.description &&
      todo.description.toLowerCase().includes(searchText))
  );
});

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h2>My Todos</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Add Todo */}
      <form className="todo-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="Search todos..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Todo List */}
      <div className="todo-list">
  {filteredTodos.map((todo) => (
    <div key={todo._id} className="todo-card">
      {editId === todo._id ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </>
      ) : (
        <>
          <div
            onClick={() => handleToggle(todo)}
            className={todo.completed ? "completed-text" : ""}
          >
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <small>
              Created: {new Date(todo.createdAt).toLocaleString()}
            </small>
          </div>

          <div className="actions">
            <button onClick={() => handleEditClick(todo)}>✏</button>
            <button onClick={() => handleDelete(todo._id)}>✕</button>
          </div>
        </>
      )}
    </div>
  ))}
</div>
    </div>
  );
};

export default Dashboard;