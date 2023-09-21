import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Swiper from 'react-native-swiper';
import left from '../../assets/left.png'
import right from '../../assets/right.png'
import {colors} from '../globals/style';
// const carouseldata = [
//   {
//     id:1,
//     image:'../../assets/OfferSliderImage/img1'
//   },
//   {
//     id:2,
//     image:'../../assets/OfferSliderImage/img2'
//   },
//   {
//     id:3,
//     image:'../../assets/OfferSliderImage/img3'
//   },
//   {
//     id:4,
//     image:'../../assets/OfferSliderImage/img4'
//   },
//   {
//     id:5,
//     image:'../../assets/OfferSliderImage/img5'
//   }
// ]
const OfferSlider = () => {
  return (
    <View>
      <View style={styles.offerSlider}> 
          <Swiper autoplay={true} autoplayTimeout={4}
             showsButtons={true}
              dotColor={colors.text2}
              activeDotColor={colors.text1}
              nextButton={ <View style={styles.btnContainer}><Image source={right} resizeMode='contain' style={[styles.buttonImg,{marginLeft:5}]}/></View>}
              prevButton={ <View style={styles.btnContainer}><Image source={left} resizeMode='contain' style={[styles.buttonImg,{marginRight:5}]}/></View>}
             >
             
             <View style={styles.slide}>
               <Image
               source={require('../../assets/OfferSliderImage/img1.jpg')}
                style={styles.image}
                />
             </View>
             <View style={styles.slide}>
               <Image
               source={require('../../assets/OfferSliderImage/img7.jpg')}
                style={styles.image}
                />
             </View>
             <View style={styles.slide}>
               <Image
               source={require('../../assets/OfferSliderImage/img2.png')}
                style={styles.image}
                />
             </View>
             <View style={styles.slide}>
               <Image
               source={require('../../assets/OfferSliderImage/img3.jpg')}
                style={styles.image}
                />
             </View>
             <View style={styles.slide}>
               <Image
               source={require('../../assets/OfferSliderImage/img4.jpg')}
                style={styles.image}
                />
             </View>
          </Swiper>
      </View>
    </View>
  )
}
export default OfferSlider;
const styles = StyleSheet.create({
  offerSlider:{
    width:'100%',
    height:200,
    backgroundColor:colors.col1,
    paddingHorizontal:10,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10,
    },
   slide:{
    width:'100%',
    height:200,
    backgroundColor:colors.col1,
    justifyContent:'center',
    alignItems:'center',
   },
  image:{
    width:'100%',
    height:'100%',
    borderRadius:20,
  },

  btnContainer:{
    height:40,
    width:40,
    backgroundColor:colors.col1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonImg:{
    height:20,
    width:20,
    tintColor:colors.text1
  }
})