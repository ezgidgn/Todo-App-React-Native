import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase_auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import List from "./List";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserCredential | null>(null); // Kullanıcı bilgilerini tutmak için user state'i
  const auth = firebase_auth;



  useEffect(() => {
    if (user) {
      // Kullanıcı oturum açtığında yapılacak işlemler
      // Örneğin, kullanıcıya özgü verileri getirme veya yönlendirme gibi
      console.log("User authenticated:", user);
      navigation.navigate(List); // Kullanıcı oturum açtığında "Inside" ekranına yönlendirilir
    }
  }, [user]);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setUser(response); // Oturum açan kullanıcının bilgilerini user state'ine atar
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      setUser(response); // Oturum açan kullanıcının bilgilerini user state'ine atar
    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/todo-app-695f4.appspot.com/o/team%20checklist-cuate.png?alt=media&token=eb204ee0-dcac-41ef-bfd8-e69776123a9e",
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              secureTextEntry
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#FFC756" />
            ) : (
              <>
                <TouchableOpacity onPress={signIn} style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={signUp}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#FFC756",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#FFC756",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#FFC756",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#FFC756",
    fontWeight: "700",
    fontSize: 16,
  },
});
