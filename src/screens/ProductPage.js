import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  navbtn,
  navbtnin,
  navbtnout,
  nonveg,
  veg,
  btn2,
  hr80,
  incdecbtn,
  incdecinput,
  incdecout,
} from '../globals/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../globals/style';
import {firebase} from '../../Firebase/FirebaseConfig';

const ProductPage = ({navigation, route}) => {
  const [quantity, setQuantity] = useState('1');
  const [addOnQuantity, setAddOnQuantity] = useState('0');

  const data = route.params;
  console.log('Product page Data>>>>>>>>>>>', data);
  // console.log('Image URL >>>>>>>>>>>', data.foodImageurl);

  const addToCart = () => {
    // console.log('Hello');
    const docRef = firebase
      .firestore()
      .collection('userCart')
      .doc(firebase.auth().currentUser.uid);
    const data1 = {data, Addonquantity: addOnQuantity, FoodQuantity: quantity};
    // console.log("cart Data>>>>.>......",data1);
    docRef.get().then(doc => {
      if (doc.exists) {
        docRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(data1),
        });
        alert('Added to cart');
      } else {
        docRef.set({
          cart: [data1],
        });
        alert('Added to cart');
      }
    });
  };

  const increaseQty = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };

  const decreaseQty = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };
  const increaseaddOneQty = () => {
    setAddOnQuantity((parseInt(addOnQuantity) + 1).toString());
  };

  const decreaseaddOnQty = () => {
    if (parseInt(addOnQuantity) > 0) {
      setAddOnQuantity((parseInt(addOnQuantity) - 1).toString());
    }
  };
  // console.log(data.foodAddonPrice);
  return (
    <ScrollView style={styles.container}>
      {/* <Text>ProductPage</Text> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color={'black'} style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image
            source={{
              uri: data.foodImageurl,
            }}
            style={styles.cardimgin}
          />
        </View>
        <View style={styles.s2}>
          <View style={styles.s2in}>
            <Text style={styles.head1}>{data.foodName}</Text>
            <Text style={styles.head2}>₹{data.foodPrice}/-</Text>
          </View>
          <View style={styles.s3}>
            <Text style={styles.head3}>About Food</Text>
            <Text style={styles.head4}>{data.foodDescription}</Text>
            <View style={styles.s3in}>
              {data.foodType == 'veg' ? (
                <Text style={veg}></Text>
              ) : (
                <Text style={nonveg}></Text>
              )}
              <Text style={styles.head5}>{data.foodType}</Text>
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={styles.txt1}>Location</Text>
            <Text style={styles.txt2}>{data.restaurentName}</Text>
            <View style={styles.container2in}>
              <Text style={styles.txt3}>{data.restaurentAddreesBuilding}</Text>
              <View style={styles.dash}></View>
              <Text style={styles.txt3}>{data.restaurentAddreesStreet}</Text>
              <View style={styles.dash}></View>
              <Text style={styles.txt3}>{data.restaurentAddreesCity}</Text>
            </View>
          </View>
          {data.foodAddonPrice != '' && (
            <View style={styles.container3}>
              <View style={hr80}></View>
              <Text style={styles.txt5}>Add Extra</Text>
              <View style={styles.c3in}>
                <Text style={styles.text4}>{data.foodAddon}</Text>
                <Text style={styles.text4}>₹{data.foodAddonPrice}/-</Text>
              </View>
              <View style={incdecout}>
                <TouchableOpacity onPress={() => decreaseaddOnQty()}>
                  <Text style={incdecbtn}>-</Text>
                </TouchableOpacity>
                <TextInput value={addOnQuantity} style={incdecinput} />
                <TouchableOpacity onPress={() => increaseaddOneQty()}>
                  <Text style={incdecbtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.container3}>
            <View style={hr80}></View>
            <Text style={styles.txt5}>Food Quantity</Text>
            <View style={incdecout}>
              <TouchableOpacity onPress={() => decreaseQty()}>
                <Text style={incdecbtn}>-</Text>
              </TouchableOpacity>
              <TextInput value={quantity} style={incdecinput} />
              <TouchableOpacity onPress={() => increaseQty()}>
                <Text style={incdecbtn}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={hr80}></View>
          </View>
        </View>
        <View style={styles.container4}>
          <View style={styles.c4in}>
            <Text style={styles.txt2}>Total Price</Text>
            {data.foodAddonPrice != '' ? (
              <Text style={styles.txt6}>₹{((
                parseInt(data.foodPrice) * parseInt(quantity)
              )+parseInt(addOnQuantity)*parseInt(data.foodAddonPrice)).toString()}</Text>
            ) : (
              <Text style={styles.txt6}>₹{(parseInt(data.foodPrice) * parseInt(quantity)).toString()}/-</Text>
            )}
          </View>
          <View style={hr80}></View>
        </View>
        <View style={styles.btncount}>
          <TouchableOpacity style={btn2}>
            <Text style={styles.btntxt} onPress={() => addToCart()}>
              Add to Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={btn2}>
            <Text style={styles.btntxt}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    // width:'100%'
  },
  s1: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardimgin: {
    width: '100%',
    height: '100%',
  },
  s2: {
    width: '100%',
    padding: 20,
  },
  s2in: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  head1: {
    fontSize: 30,
    color: colors.text1,
    width: 220,
    fontWeight: '500',
    marginRight: 10,
  },

  head2: {
    fontSize: 50,
    color: colors.text3,
    fontWeight: '200',
  },
  s3: {
    backgroundColor: colors.text1,
    padding: 20,
    borderRadius: 20,
  },
  head3: {
    fontSize: 30,
    color: colors.col1,
    fontWeight: '200',
  },
  head4: {
    fontSize: 20,
    color: colors.col1,
    fontWeight: '400',
    marginVertical: 10,
  },
  s3in: {
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    width: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head5: {
    fontSize: 20,
    color: colors.text3,
    fontWeight: '200',
    marginLeft: 10,
  },
  btncount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btntxt: {
    backgroundColor: colors.text1,
    color: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: '90%',
    textAlign: 'center',
    fontSize: 20,
  },
  container2: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  txt1: {
    fontSize: 20,
    color: colors.text1,
    fontWeight: '200',
  },
  txt2: {
    fontSize: 30,
    color: colors.text3,
    fontWeight: '200',
    marginVertical: 10,
  },
  container2in: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt3: {
    color: colors.text1,
    fontSize: 16,
    // width:'30%',
    // textAlign:'center'
  },
  dash: {
    width: 1,
    height: 20,
    backgroundColor: colors.text1,
    marginHorizontal: 10,
  },
  container3: {
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txt5: {
    color: colors.text1,
    fontSize: 18,
    textAlign: 'center',
  },
  c3in: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  text4: {
    color: colors.text3,
    fontSize: 20,
    marginHorizontal: 10,
  },
  container4:{
    width:'90%',
    alignSelf:'center',
    alignItems:'center'
  },
  c4in:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems:'center'
  },
  txt6: {
    color: colors.text1,
    fontSize: 35,
    textAlign: 'center',
  },
});
