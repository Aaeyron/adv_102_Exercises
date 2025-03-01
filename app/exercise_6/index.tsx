import React, { createContext, useContext, useReducer, useState, ReactNode } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";

// Define User Type
interface User {
  id: number;
  name: string;
}

// Define Action Types
type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "DELETE_USER"; payload: number };

// Create Context Type
interface UserContextType {
  users: User[];
  dispatch: React.Dispatch<Action>;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Reducer function
const userReducer = (state: User[], action: Action): User[] => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "UPDATE_USER":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};

// Context Provider Props Type
interface UserProviderProps {
  children: ReactNode;
}

// Context Provider
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, []);

  return (
    <UserContext.Provider value={{ users: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

// User Management Component
const UserManagement: React.FC = () => {
  const { users, dispatch } = useUsers();
  const [name, setName] = useState("");

  const addUser = () => {
    if (name.trim() === "") return;
    dispatch({ type: "ADD_USER", payload: { id: Date.now(), name } });
    setName("");
  };

  const updateUser = (id: number) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      dispatch({ type: "UPDATE_USER", payload: { id, name: newName } });
    }
  };

  const deleteUser = (id: number) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.updateButton} onPress={() => updateUser(item.id)}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <UserProvider>
      <UserManagement />
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFF0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonGroup: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#FFA500",
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default App;