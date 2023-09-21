import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '../../Firebase/FirebaseConfig';
import {navbtn, navbtnin, navbtnout} from '../globals/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../globals/style';

const UserProfile = ({navigation}) => {
  const [userLoggeduid, setUserLoggeduid] = useState(null);
  const [userdata, setUserData] = useState(null);
  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // console.log(user);
          setUserLoggeduid(user.uid);
        } else {
          setUserLoggeduid(null);

          console.log('No user logged in');
          // navigation.navigate('login')
        }
      });
    };
    checklogin();
  }, []);

  useEffect(() => {
    const getuserdata = async () => {
      const docRef = firebase
        .firestore()
        .collection('user Data')
        .where('uid', '==', userLoggeduid);
      const doc = await docRef.get();
      // console.log("Await log>>>>>>>",doc.data);
      if (!doc.empty) {
        doc.forEach(doc => {
          console.log(doc.data());
          setUserData(doc.data());
        });
      }
      // else{
      //   console.log("No such Document");
      //   // navigation.navigate('login')
      // }
    };
    getuserdata();
  }, [userLoggeduid]);

  console.log('user Data>>>>>>>>', userdata);

  return (
    <View style={styles.containerout}>
      <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color={'black'} style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.head1}>Your Profile</Text>
        <View style={styles.containerin}>
        <Text style={styles.head2}>
          Name :
          {userdata ? (
            <Text style={styles.head2in}> {userdata.name}</Text>
          ) : (
            'Loading...'
          )}
        </Text>
        <Text style={styles.head2}>
          Email :
          {userdata ? (
            <Text style={styles.head2in}> {userdata.email}</Text>
          ) : (
            'Loading...'
          )}
        </Text>
        <Text style={styles.head2}>
          Phone :
          {userdata ? (
            <Text style={styles.head2in}> {userdata.phone}</Text>
          ) : (
            'Loading...'
          )}
        </Text>
        <Text style={styles.head2}>
          Address :
          {userdata ? (
            <Text style={styles.head2in}> {userdata.address}</Text>
          ) : (
            'Loading...'
          )}
        </Text>
      </View>
      </View>
     
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  containerout:{
    flex:1,
    backgroundColor:'#fff',
    // alignItems:'center',
    width:'100%'
  },
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    width:'100%'
  },
  head1:{
    fontSize:40,
    color:colors.text1,
    // textAlign:'center',
    marginVertical:20,
    fontWeight:'200'
  },
  containerin:{
    width:'90%',
    alignItems:'center',
    borderWidth:1,
    borderColor:colors.text1,
    borderRadius:10,
    marginTop:20,
    padding:20
  },
  head2:{
    fontSize:20,
    fontWeight:'200',
    marginTop:20,
    color:'#000000'
  },
  head2in:{
    fontSize:20,
    fontWeight:'300',
    color:'#000000'
  }
});
