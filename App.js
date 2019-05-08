import React, { Component } from 'react';
import Firebase from './config/Firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
     open:false,
     email:"",
     password:"",
     
     userEmail:"",
     userPassword:"",
     students:[],
    };
    this.updateInput = this.updateInput.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
   // console.log(this.state.email);
  }

// getEmail = () =>{
//   console.log(this.state.email);
// }

updateInput = e => {
this.setState({
    [e.target.name]: e.target.value
});
}

handleClickOpen = () => {
    this.setState({ open: true });
};

handleClose = () => {
    this.setState({ open: false });
};

handleLogin = () => {
  console.log(this.state.userEmail)
  const students = [];
  var Ref = Firebase.firestore().collection('students')
  var query = Ref.where('email', '==',this.state.userEmail).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((doc) =>{
      const {email,password,type} = doc.data();
      students.push({
        key:doc.id,
        email,
        password
        
      });
    });

    this.setState({
      email: students[0].email,
      password: students[0].password,
      
    });

    //console.log(this.state);
    const next =  this.handleLoggingType();
    //console.log(next);
    window.location.href = next;
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}; 

handleLoggingType = () => {
  if(this.state.password==this.state.userPassword){
    console.log("success");
  } else {
    console.log("object");
  }
}

  render() {
    return (
      
      <View style={styles.container}>
      
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./app/images/email.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              //value={this.state.userEmail}
              onChangeText={(userEmail) => this.setState({userEmail})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./app/images/password.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              //value={this.state.userPassword}
              onChangeText={(userPassword) => this.setState({userPassword})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin.bind(this)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        
      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});