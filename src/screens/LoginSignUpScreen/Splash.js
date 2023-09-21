import {Image, StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';
import FoodLogo from '../../../assets/FoodLogo.png'

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
     
        navigation.navigate('welcomepage')
    }, 2000);
  }, []);
  return <View style={styles.container}>
      <Image source={FoodLogo} resizeMode='contain' style={styles.LogoImg}/>
  </View>;
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4242',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  LogoImg:{
    height:200,
    width:200,
    borderRadius:100,
    marginBottom:'20%'
  }
});
