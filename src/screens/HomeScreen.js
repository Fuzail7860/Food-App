import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import { colors } from '../globals/style';

import Cardslider from '../components/Cardslider';
import {firebase} from '../../Firebase/FirebaseConfig';
import BottomNav from '../components/BottomNav';


const HomeScreen = ({navigation}) => {
  const [foodData, setFoodData] = useState([]);
  const [vegData, setVegData] = useState([]);
  const [nonVegData, setNonVegData] = useState([]);
  const [search, setSearch] = useState('');
  const foodRef = firebase.firestore().collection('foodData');
  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  useEffect(() => {
    setVegData(foodData.filter(item => item.foodType === 'veg'))
  }, [foodData])
  // console.log(vegData);
  // console.log('__________________________________________________________')
  useEffect(() => {
    setNonVegData(foodData.filter(item => item.foodType === 'non-veg'))
  }, [foodData])
  // console.log(nonVegData);
  console.log(search);
  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation}/>

      <View style={styles.bottomNav}>
      <BottomNav navigation={navigation}/>
      </View>
     
      <ScrollView>
      <View style={styles.searchbox}>
        <Octicons name="search" size={24} color="black"
          style={styles.searchicon}
        />
        <TextInput style={styles.input} placeholder='Search'
          onChangeText={(text) => { setSearch(text) }}
        />
      </View>
      {search != ''
        && <View style={styles.searchresultsouter}>
          <FlatList style={styles.searchresultsinner}
            data={foodData}
            renderItem={({ item }) => {
              if (item.foodName.toLowerCase().includes(search.toLocaleLowerCase())) {
                return (
                  <View style={styles.searchresult}>
                    <AntDesign name="arrowright" size={24} color={"black"} />
                    <Text style={styles.searchresulttext}>{item.foodName}</Text>
                  </View>
                )
              }
            }}
          />
          
        </View>}
      <Categories />
      <OfferSlider />
      <Cardslider title={"Today's Special"} data={foodData} navigation={navigation}/>
      <Cardslider title={"NonVeg Love"} data={nonVegData} navigation={navigation}/>
      <Cardslider title={"Veg Love"} data={vegData} navigation={navigation}/>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    //  alignItems:'center',
    width: '100%'
  },
  searchbox: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    padding: 4,
    margin: 15,
    paddingLeft: 15,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 18,
    color: colors.text1,
  },
  searchicon: {
    color: colors.text1,
  },
  searchresultsouter:{
    width:'100%',
    marginHorizontal:30,
    height:'100%',
    backgroundColor:colors.col1,
  },
  searchresultsinner:{
    width:'100%'
  },
  searchresult:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    padding:5,
  },
  searchresulttext:{
    marginLeft:10,
    fontSize:18,
    color:colors.text1
  },
  bottomNav:{
    position:'absolute',
    bottom:0,
    width:'100%',
    backgroundColor:colors.col1,
    zIndex:20
  },
  
})
export default HomeScreen;