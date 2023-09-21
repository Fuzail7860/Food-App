import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '../../Firebase/FirebaseConfig';

import {colors, navbtn, navbtnin, navbtnout, btn2} from '../globals/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomNav from '../components/BottomNav';

const UserCart = ({navigation}) => {
  const [cartData, setCartData] = useState(null);
  const [totalCost, setTotalCost] = useState('0');

  const getCartData = async () => {
    const docRef = firebase
      .firestore()
      .collection('userCart')
      .doc(firebase.auth().currentUser.uid);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.log('data exists',doc);

          const data = JSON.stringify(doc.data());
          setCartData(data);
        } else {
          console.log('data do not exists', doc);
        }
      })
      .catch(error => {
        console.log('Error!!!!!!!!!', error);
      });
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (cartData != null) {
      const food = JSON.parse(cartData).cart;
      // console.log("ABR>>>>>>>>>",food);
      let totalfoodprice = 0;
      food.map(item => {
        // console.log("----------->",item.data.foodPrice);
        totalfoodprice =
          parseInt(item.data.foodPrice) * parseInt(item.FoodQuantity) +
          parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity) +
          totalfoodprice;
      });
      console.log(totalfoodprice);
      setTotalCost(totalfoodprice);
    }
  }, [cartData]);

  const deleteItem = item => {
    const docRef = firebase
      .firestore()
      .collection('userCart')
      .doc(firebase.auth().currentUser.uid);
    docRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(item),
    });
    getCartData();
  };

  // console.log('data>>>>>>>>>>', cartData);
  return (
    <View style={styles.containerout}>
      <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color={'black'} style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation} />
      </View>
      <View style={styles.container}>
        <Text style={styles.head1}>Your Cart</Text>
        {cartData == null || JSON.parse(cartData).cart.length == 0 ? (
          <Text style={styles.head2}>Your Cart is Empty</Text>
        ) : (
          <FlatList
            style={styles.cardlist}
            data={JSON.parse(cartData).cart}
            renderItem={({item}) => {
              return (
                <View style={styles.cartcard}>
                  <Image
                    source={{uri: item.data.foodImageurl}}
                    style={styles.cartimg}
                  />
                  <View style={styles.cartcardin}>
                    <View style={styles.c1}>
                      <Text style={styles.txt1}>
                        {item.FoodQuantity}&nbsp; {item.data.foodName}
                      </Text>
                      <Text style={styles.txt2}>
                        {' '}
                        ₹{item.data.foodPrice}/each
                      </Text>
                    </View>
                    {item.Addonquantity > 0 && (
                      <View style={styles.c2}>
                        <Text style={styles.txt3}>
                          {item.Addonquantity}&nbsp; {item.data.foodAddon}
                        </Text>
                        <Text style={styles.txt3}>
                          ₹{item.data.foodAddonPrice}/each
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity onPress={() => deleteItem(item)}>
                      <View style={styles.c4}>
                        <Text style={styles.txt1}>Delete</Text>
                        <AntDesign
                          name="delete"
                          size={25}
                          color={'black'}
                          style={styles.del}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
        <View style={styles.btnContainer}>
          <View style={styles.c3}>
            <Text style={styles.txt5}>Total</Text>
            <Text style={styles.txt6}>₹{totalCost}</Text>
          </View>
          <TouchableOpacity style={btn2} onPress={()=>navigation.navigate('PlaceOrder',{cartData})}>
            <Text style={styles.btntxt}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserCart;

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  },
  containerout: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
    alignItems: 'center',
  },
  head1: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.text1,
  },

  head2: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '200',
    marginVertical: 20,
    elevation: 10,
    backgroundColor: colors.col1,
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    paddingVertical: '25%',
    borderRadius: 10,
  },
  cardlist: {
    width: '100%',
  },
  cartcard: {
    flexDirection: 'row',
    backgroundColor: colors.col1,
    marginVertical: 5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    elevation: 10,
    alignItems: 'center',
  },
  cartimg: {
    width: 140,
    height: 120,
    borderRadius: 10,
    margin: 10,
  },
  cartcardin: {
    flexDirection: 'column',
    margin: 5,
    width: '52%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  c1: {
    flexDirection: 'row',
    backgroundColor: colors.col1,
    width: '100%',
    padding: 5,
    justifyContent: 'space-between',
  },
  c2: {
    flexDirection: 'row',
    backgroundColor: colors.text1,
    width: '100%',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  txt1: {
    fontSize: 16,
    color: colors.text1,
    fontWeight: 'bold',
    width: '60%',
  },
  txt2: {
    fontSize: 16,
    color: colors.text3,
    fontWeight: 'bold',
  },
  txt3: {
    fontSize: 16,
    color: colors.col1,
  },
  del: {
    color: 'red',
  },
  c4: {
    flexDirection: 'row',
    borderColor: colors.text1,
    borderWidth: 1,
    width: 100,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    flexDirection: 'row',
    borderTopWidth: 0.2,
    borderTopColor: colors.text3,
    marginBottom: 80,
  },
  btntxt: {
    fontSize: 20,
    color: colors.col1,
    backgroundColor: colors.text1,
    textAlign: 'center',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  c3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt5: {
    fontSize: 20,
    color: colors.text3,
  },
  txt6: {
    fontSize: 25,
    color: colors.text3,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});
