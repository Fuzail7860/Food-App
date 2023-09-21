import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TextBase,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import {colors, titles, btn1, hr80} from '../../globals/style';
import google from '../../../assets/google.png';
import facebook from '../../../assets/facebook.png';
import instagram from '../../../assets/instagram.png';
import Snackbar from 'react-native-snackbar';
import {firebase} from '../../../Firebase/FirebaseConfig';

const SignUpScreen = ({navigation}) => {
  const [namefocus, setNamefocus] = useState(false);
  const [emailfocus, setEmailfocus] = useState(false);
  const [phonefocus, setPhonefocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [cpasswordfocus, setCpasswordfocus] = useState(false);
  const [addressfocus, setAddressfocus] = useState(false);

  // taking form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [address, setAddress] = useState('');

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

  const handleSignup = () => {
    // console.log(name,email,phone,password,cpassword,address);

    if (name === '') {
      showError('Please enter name.');
      return;
    } else if (email === '') {
      showError('Please enter email.');
      return;
    } else if (phone === '') {
      showError('Please enter mobile number.');
      return;
    } else if (password === '') {
      showError('Please enter password.');
      return;
    } else if (cpassword === '') {
      showError('Please enter confirm password.');
      return;
    } else if (address === '') {
      showError('Please enter address.');
      return;
    } else if (password != cpassword) {
      showError('Password and cofirm password do not match.');
      return;
    } else if (phone.length != 10) {
      showError('Mobile number should be 10 digit.');
      return;
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredetials => {
          console.log(userCredetials?.user.uid);
          console.log('user created');
          setSuccessmsg('User created sucessfully.');
          if (userCredetials?.user.uid) {
            const userRef = firebase.firestore().collection('user Data');
            userRef
              .add({
                name: name,
                email: email,
                phone: phone,
                password: password,
                // cpassword:cpassword,
                address: address,
                uid: userCredetials?.user.uid,
              })
              .then(() => {
                console.log('data added to firestore');
                // setSuccessmsg('User created sucessfully.');
                setTimeout(() => {
                  Snackbar.show({
                    text:"Sign Up successfully.",
                    duration: 2000,
                    backgroundColor: '#3adb76',
                    action: {
                      text: 'HIDE',
                    },
                  });
                }, 500)
                navigation.navigate('welcomepage')
              })
              .catch(error => {
                console.log('firestore error', error);
              });
          }

          // navigation.navigate('login');
        })
        .catch(error => {
          console.log('signup firebase error', error.message);
          if (
            error.message ==
            'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
          ) {
            showError('Email already exits.');
          } else if (
            error.message ==
            'Firebase: The email address is badly formatted. (auth/invalid-email).'
          ) {
            showError('Invalid Email');
          } else if (
            error.message ==
            'Firebase: Password should be at least 6 characters (auth/weak-password).'
          ) {
            showError('Password should be atleast 6 characters.');
          } else {
            showError(error.message);
          }
        });
    } catch (error) {
      console.log('signup system error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* {sucessmsg == null ? (
       
      ) : (
        // <View style={styles.container1}>
        //   <Text style={styles.successmessage}>{sucessmsg}</Text>
        //   <TouchableOpacity
        //     style={btn1}
        //     onPress={() => navigation.navigate('login')}>
        //     <Text
        //       style={{
        //         color: colors.col1,
        //         fontSize: titles.btntxt,
        //         fontWeight: 'bold',
        //         textAlign: 'center',
        //       }}>
        //       Sign In
        //     </Text>
        //   </TouchableOpacity>
        //   <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
        //     <Text
        //       style={{
        //         color: colors.col1,
        //         fontSize: titles.btntxt,
        //         fontWeight: 'bold',
        //         textAlign: 'center',
        //       }}>
        //       Go Back
        //     </Text>
        //   </TouchableOpacity>
        // </View>
      )} */}
       <ScrollView style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.head1}>Sign Up </Text>
           
            <View style={styles.inputout}>
              <AntDesign
                name="user"
                size={24}
                color={namefocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onFocus={() => {
                  setNamefocus(true);
                  setEmailfocus(false);
                  setPhonefocus(false);
                  setPasswordfocus(false);
                  setCpasswordfocus(false);
                  setAddressfocus(false);
                  // setCustomError('');
                }}
                maxLength={40}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.inputout}>
              <Zocial
                name="email"
                size={24}
                color={emailfocus === true ? colors.text1 : colors.text2}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onFocus={() => {
                  setNamefocus(false);
                  setEmailfocus(true);
                  setPhonefocus(false);
                  setPasswordfocus(false);
                  setCpasswordfocus(false);
                  setAddressfocus(false);
                  // setCustomError('');
                }}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputout}>
              <MaterialIcons
                name="phone-iphone"
                size={24}
                color={phonefocus === true ? colors.text1 : colors.text2}
              />

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType={'phone-pad'}
                onFocus={() => {
                  setNamefocus(false);
                  setEmailfocus(false);
                  setPhonefocus(true);
                  setPasswordfocus(false);
                  setCpasswordfocus(false);
                  setAddressfocus(false);
                  // setCustomError('');
                }}
                onChangeText={text => setPhone(text)}
                maxLength={10}
              />
            </View>

            <View style={styles.inputout}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={passwordfocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onFocus={() => {
                  setNamefocus(false);
                  setEmailfocus(false);
                  setPhonefocus(false);
                  setPasswordfocus(true);
                  setCpasswordfocus(false);
                  setAddressfocus(false);
                  // setCustomError('');
                }}
                secureTextEntry={showpassword === false ? true : false}
                onChangeText={text => setPassword(text)}
                maxLength={15}
              />
              <Octicons
                name={showpassword == false ? 'eye-closed' : 'eye'}
                size={24}
                onPress={() => setShowpassword(!showpassword)}
                color={colors.text2}
              />
            </View>
            <View style={styles.inputout}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={cpasswordfocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onFocus={() => {
                  setNamefocus(false);
                  setEmailfocus(false);
                  setPhonefocus(false);
                  setPasswordfocus(false);
                  setCpasswordfocus(true);
                  setAddressfocus(false);
                  // setCustomError('');
                }}
                secureTextEntry={showcpassword === false ? true : false}
                onChangeText={text => setCPassword(text)}
                maxLength={15}
              />
              <Octicons
                name={showcpassword == false ? 'eye-closed' : 'eye'}
                size={24}
                onPress={() => setShowcpassword(!showcpassword)}
                color={colors.text2}
              />
            </View>
            {/* end */}

            <View style={styles.inputout}>
              <FontAwesome5
                name="address-book"
                size={24}
                color={addressfocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                onFocus={() => {
                  setNamefocus(false);
                  setEmailfocus(false);
                  setPhonefocus(false);
                  setPasswordfocus(false);
                  setCpasswordfocus(false);
                  setAddressfocus(true);
                  // setCustomError('');
                }}
                onChangeText={text => setAddress(text)}
                maxLength={100}
              />
            </View>
            <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
              <Text
                style={{
                  color: colors.col1,
                  fontSize: titles.btntxt,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
            {/* <Text style={styles.forgot}>Forget Password?</Text> */}
            <Text style={styles.or}>OR</Text>
            <Text style={styles.gftxt}>Sign In With</Text>
            <View style={styles.gf}>
              <TouchableOpacity>
                <View>
                  <Image
                    source={google}
                    style={{
                      width: 30,
                      height: 30,
                      marginHorizontal: 10,
                      borderRadius: 50,
                      alignItems: 'center',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Image
                    source={facebook}
                    style={{
                      width: 30,
                      height: 30,
                      marginHorizontal: 10,
                      borderRadius: 50,
                      alignItems: 'center',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Image
                    source={instagram}
                    style={{
                      width: 30,
                      height: 30,
                      marginHorizontal: 10,
                      borderRadius: 50,
                      alignItems: 'center',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={hr80}></View>
            <View style={{marginBottom: 50}}>
              <Text>
                Already have an account?
                <Text
                  style={styles.signup}
                  onPress={() => navigation.navigate('login')}>
                  {' '}
                  Log In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 20,
  },
  container1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  inputout: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '80%',
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
    //alignSelf:'center',
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
    height: 40,
  },
  // forgot: {
  //     color: colors.text2,
  //     marginTop: 20,
  //     marginBottom: 10,
  // },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  gftxt: {
    color: colors.text2,
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  gf: {
    flexDirection: 'row',
  },
  signup: {
    color: colors.text1,
  },
  // address:{
  //     fontSize:18,
  //     color:colors.text2,
  //     textAlign:'center',
  //     marginTop:20,
  // }
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
  successmessage: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
export default SignUpScreen;
