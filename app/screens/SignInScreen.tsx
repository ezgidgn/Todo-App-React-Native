import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db, firebase_auth } from "../../firebaseConfig";
import SignUpScreen from "../../app/screens/SignUpScreen";
import { signInWithEmailAndPassword } from "firebase/auth";
import List from "./List";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";


const SignInScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  const goToSignUpScreen = () => {
    navigation.navigate(SignUpScreen);
  };
  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Check your emails!");
      navigation.navigate(List);
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <ScrollView>
          <Image
            style={{
              height: 200,
              width: 200,
              marginLeft: 50,
              paddingTop: 10,
            }}
            source={require("")}
            resizeMode="contain"
          />
        </ScrollView>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <>
          <TouchableOpacity onPress={signIn} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToSignUpScreen}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#BD90F1",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#BD90F1",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 10,
    borderColor: "#BD90F1",
    borderWidth: 2,
  },

  buttonOutlineText: {
    color: "#BD90F1",
    fontWeight: "700",
    fontSize: 16,
  },
});
