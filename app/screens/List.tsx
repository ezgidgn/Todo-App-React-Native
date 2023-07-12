import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

export interface Todo {
  text: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(db, "todos");
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log("UPDATED");
        const todos: any[] = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const addTodo = async () => {
    console.log("Add");
    const doc = await addDoc(collection(db, "todos"), {
      text: todo,
      done: false,
    });
    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(db, `todos/${item.id}`);

    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };
    const deleteItem = async () => {
      deleteDoc(ref);
    };
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <Ionicons name="md-checkmark-circle" size={32} color="black" />
          )}
          {!item.done && <Entypo name="circle" size={32} color={"black"} />}
          <Text style={styles.todoText}>{item.text}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="black"
          onPress={deleteItem}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/todo-app-695f4.appspot.com/o/team%20checklist-cuate.png?alt=media&token=eb204ee0-dcac-41ef-bfd8-e69776123a9e",
        }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new todo"
            onChangeText={(text: string) => setTodo(text)}
            value={todo}
          />
          <Button onPress={addTodo} title="Add todo" disabled={todo === ""} />
          {todos.length > 0 && (
            <FlatList
              data={todos}
              renderItem={(item) => renderTodo(item)}
              keyExtractor={(todo: Todo) => todo.id}
              style={styles.flatList}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.5,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  flatList: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    marginVertical: 4,
    borderRadius: 12,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
