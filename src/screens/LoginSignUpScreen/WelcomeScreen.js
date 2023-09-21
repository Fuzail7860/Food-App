import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import logofd from '../../../assets/logofd.png';
import {colors, hr80} from '../../globals/style';
import {firebase} from '../../../Firebase/FirebaseConfig';
import Snackbar from 'react-native-snackbar';


const WelcomeScreen = ({navigation}) => {
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          // console.log(user);
          setUserLogged(user)
          // showSucess('Logged in Successfully')
        } else {
          setUserLogged(null);
          console.log("No user logged in");
        }
      })
    };
    checklogin();
  }, []);

  

  const showSucess = message => {
    Snackbar.show({
      text: message,
      duration:2000,
      backgroundColor:'#3adb76',
      action: {
        text: 'HIDE',
      },
    });
  };

  const handleLogout = ()=>{
    firebase.auth().signOut()
    .then(()=>{
      setUserLogged(null);
      console.log("user logged out");
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // console.log("User Data>>>>>>>>",userLogged);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Foodie </Text>
      <View style={styles.logoout}>
        <Image style={styles.logo} source={logofd} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>
        Find the best food around you at lowest price
      </Text>
      <View style={hr80} />
      {userLogged == null?
       <View style={styles.btnout}>
       <TouchableOpacity onPress={() => navigation.navigate('signup')}>
         <Text style={styles.btn}>Sign Up</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('login')}>
         <Text style={styles.btn}>Log In</Text>
       </TouchableOpacity>
     </View>
      :
      <View style={styles.logged}>
        <Text style={styles.txtlog}>Signed in as <Text style={styles.txtlogin}>{userLogged.email}</Text></Text>
         <View style={styles.btnout}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Text style={styles.btn}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.btn}>Log Out</Text>
        </TouchableOpacity>
      </View>
      </View>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4242',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 50,
    color: colors.col1,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '200',
  },
  logoout: {
    width: '80%',
    height: '30%',
    alignItems: 'center',
    //backgroundColor:'white'
  },
  logo: {
    width: 220,
    height: 220,
  },
  text: {
    fontSize: 18,
    width: '80%',
    color: colors.col1,
    textAlign: 'center',
  },
  btnout: {
    flexDirection: 'row',
  },
  btn: {
    fontSize: 20,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: '700',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  logged:{
    alignItems:'center'
  },
  txtlog:{
    fontSize:18,
    color:colors.col1
  },
  txtlogin:{
    fontSize:19,
    color:colors.col1,
    fontWeight:'700'
  }
});
export default WelcomeScreen;
