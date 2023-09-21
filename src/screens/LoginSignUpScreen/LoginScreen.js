import { View, Text,StyleSheet, TextInput, TouchableOpacity ,Image,ScrollView} from 'react-native'
import React,{useState} from 'react';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Octicons  from 'react-native-vector-icons/Octicons';
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import {colors, titles ,btn1,hr80} from '../../globals/style';
import google from '../../../assets/google.png';
import facebook from '../../../assets/facebook.png';
import instagram from '../../../assets/instagram.png';
import logofd from '../../../assets/logofd.png';
import {firebase} from '../../../Firebase/FirebaseConfig';
import FoodLogo from '../../../assets/FoodLogo.png'
import Snackbar from 'react-native-snackbar';

const LoginScreen = ({navigation}) => {
  const [emailfocus,setEmailfocus] = useState(false);
  const [passwordfocus,setPasswordfocus] = useState(false);
  const [showpassword,setShowpassword] = useState(false);

  // taking form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   // for error and success message
   const [customError, setCustomError] = useState('');
   const [sucessmsg, setSuccessmsg] = useState(null);


   const showError = message => {
    Snackbar.show({
      text: message,
      duration:2000,
      backgroundColor:'red',
      action: {
        text: 'HIDE',
      },
    });
  };

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
 
   const handleLogin = ()=>{
    firebase.auth().signInWithEmailAndPassword(email,password).then((userCredetial)=>{
      var user=userCredetial.user;
      console.log("Logged in Successfully!!!!!!!");
      console.log(user);
      setTimeout(() => {
        Snackbar.show({
          text:"Loggeg in successfully.",
          duration: 2000,
          backgroundColor: '#3adb76',
          action: {
            text: 'HIDE',
          },
        });
      }, 500)
      navigation.navigate('welcomepage')
      // showSucess('Logged in Successfully!!!!') 
    })

    .catch((error)=>{
      var errorMessage=error.message;
      console.log(errorMessage);
       if (
        errorMessage ==
        'Firebase: The email address is badly formatted. (auth/invalid-email).'
      ) {
        showError('Please enter a valid email address.');
      } else {
        showError("Incorrect email or password.");
      }
    })
   

    
   }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
       {/* <View style={styles.logoout}>
            <Image 
            style={styles.logo}
            source={FoodLogo}
            resizeMode='contain'
            />
       </View> */}
      <Text style={styles.head1}>Sign In </Text>
      {/* {customError !== '' && (
          <Text style={styles.errormsg}>{customError}</Text>
        )} */}
      <View style={styles.inputout}>
      <AntDesign name="user" size={24}
       paddingVertical={10} 
       color={emailfocus === true ? colors.text1:colors.text2}
      />
       <TextInput style={styles.input} placeholder="Email"
       onFocus={()=>{
         setEmailfocus(true);
         setPasswordfocus(false)
         setShowpassword(false);
        //  sh('');
       }}
       onChangeText={text => setEmail(text)}
       />
      </View>
      <View style={styles.inputout}>
        <MaterialCommunityIcons name='lock-outline' size={24} 
          color={passwordfocus === true ? colors.text1:colors.text2}
          paddingVertical={10}
        />
       <TextInput style={styles.input}placeholder="Password"
         onFocus={()=>{
          setEmailfocus(false);
          setPasswordfocus(true);
          // setCustomError('');
        }}
        secureTextEntry={showpassword === false ? true :false}
        onChangeText={text => setPassword(text)}
        />
        <Octicons name={showpassword == false ? "eye-closed":"eye"} size={24}
        paddingVertical={10}
        onPress={()=>
          setShowpassword(!showpassword)
        }
        color={colors.text2}
        />
      </View>
      <TouchableOpacity style={btn1} onPress={()=>handleLogin()}>
         <Text style={{color:colors.col1,fontSize:titles.btntxt,fontWeight:'bold',textAlign:'center'}}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={styles.forgot}>Forget Password?</Text>
      </TouchableOpacity>
      
      <Text style={styles.or}>OR</Text>
      <Text style={styles.gftxt}>Sign In With</Text>
      <View style={styles.gf}>
          <TouchableOpacity>
              <View>
                 <Image
                 source={google}
                 style={{
                  width:30,
                  height:30,
                 margin:10,
                  borderRadius:50,
                  alignItems:'center',  
                 }}
                 />
              </View>
          </TouchableOpacity>
          <TouchableOpacity>
              <View>
                 <Image
                 source={facebook}
                 style={{
                  width:30,
                  height:30,
                  margin:10,
                  borderRadius:50,
                  alignItems:'center',
                 }}
                 />
              </View>
          </TouchableOpacity>
          <TouchableOpacity>
              <View>
                 <Image
                 source={instagram}
                 style={{
                  width:30,
                  height:30,
                  margin:10,
                  borderRadius:50,
                  alignItems:'center',
                 }}
                 />
              </View>
          </TouchableOpacity>
      </View>
      <View style={hr80}></View>
      <Text>Don't have an account?<Text style={styles.signup}
      onPress={()=>navigation.navigate('signup')}
      > Sign Up</Text></Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      width:'100%',
      // alignItems:'center',
      // justifyContent:'center',
      marginTop:'25%'
  },
  head1:{
    fontSize:titles.title1,
    color:colors.text1,
    textAlign:'center',
    marginHorizontal:10,
  },
  inputout:{
    flexDirection:'row',
    marginVertical:10,
    width:'80%',
    backgroundColor:colors.col1,
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:3,
    // alignSelf:'center',
    elevation:20,
  },
  input:{
    fontSize:18,
    marginLeft:10,
    width:'80%',
  },
 forgot:{
    color:colors.text2,
    marginTop:20,
    marginBottom:10,
 },
 or:{
  color:colors.text1,
  marginVertical:10,
  fontWeight:'bold',
},
gftxt:{
  color:colors.text2,
  marginVertical:10,
  fontSize:25,
  fontWeight:'bold',
},
gf:{
  flexDirection:'row'
},
signup:{
  color:colors.text1,
},
logoout:{
  width:'80%',
  height:'30%',
  alignItems:'center',
  //backgroundColor:'white'

},
logo:{
  width:120,
  height:120, 
  marginTop:'25%',
  borderRadius:60
},
errormsg: {
  color: 'red',
  fontSize: 16,
  textAlign: 'center',
  marginTop: 10,
  borderColor: 'red',
  borderWidth: 1,
  borderRadius: 10,
  padding: 10,
},
});
export default LoginScreen;