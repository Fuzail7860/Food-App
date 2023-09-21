import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  colors,
  navbtn,
  navbtnin,
  navbtnout,
  btn2,
  hr80,
  btn1,
} from '../globals/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebase} from '../../Firebase/FirebaseConfig';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZORPAY_KEY_ID,RAZORPAY_SECRET_KEY} from '@env'

const PlaceOrder = ({navigation, route}) => {
  const [orderData, setOrderData] = useState([]);
  const [totalCost, setTotalCost] = useState('0');
  const [userLoggeduid, setUserLoggeduid] = useState(null);
  const [userdata, setUserData] = useState(null);
  const [data, setData] = useState([]);

  let key=RAZORPAY_KEY_ID;
  let secretKey=RAZORPAY_SECRET_KEY;

  console.log(key,secretKey);

  const {cartData} = route.params;
  console.log('param data >>>>>>>>>>', cartData);

  useEffect(() => {
    setOrderData(JSON.parse(cartData));
  }, [cartData]);

  // console.log(typeof orderData);

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
      // console.log(totalfoodprice);
      setTotalCost(totalfoodprice);
    }
  }, [cartData]);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // console.log(user);
          setUserLoggeduid(user.uid);
        } else {
          setUserLoggeduid(null);

          // console.log('No user logged in');
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
          // console.log(doc.data());
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

  //  console.log('user Data>>>>>>>>', userdata);

  const handlePayment = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: key,
      amount: totalCost*100,
      name: 'Ahmad',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'ahmad@gmail.com',
        contact: '6394421813',
        name: 'Fuzail Ahmad',
      },
      theme: {color: '#FF5733'},
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
        // console.log('sucess data>>>>>>>.',data);
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      
      // alert(`Error: ${error.code} | ${error.description}`);
      alert(`Error : ${error?.error?.description}`);
       setData(error?.error?.description)
     
    });
  };
  console.log("data>>>>>>>>>>",data);
  return (
    <ScrollView style={styles.containerout}>
      <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color={'black'} style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.head1}>Your Order Summary</Text>
        <FlatList
          style={styles.c1}
          data={orderData.cart}
          renderItem={({item}) => {
            return (
              <View style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{item.FoodQuantity}</Text>
                    <Text style={styles.title}>{item.data.foodName}</Text>
                    <Text style={styles.price}>₹{item.data.foodPrice}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalprice}>
                      ₹
                      {parseInt(item.FoodQuantity) *
                        parseInt(item.data.foodPrice)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{item.Addonquantity}</Text>
                    <Text style={styles.title}>{item.data.foodAddon}</Text>
                    <Text style={styles.price}>
                      ₹{item.data.foodAddonPrice}
                    </Text>
                  </View>
                  <View style={styles.right1}>
                    <Text style={styles.totalprice}>
                      ₹
                      {parseInt(item.Addonquantity) *
                        parseInt(item.data.foodAddonPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View style={hr80}></View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total :</Text>
          </View>
          <View style={styles.left}>
            <View style={styles.left}>
              <Text style={styles.totalprice}>₹{totalCost}</Text>
            </View>
          </View>
        </View>
        <View style={hr80}></View>

        <View style={styles.userdataout}>
          <Text style={[styles.head1, {marginTop: -10}]}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.email}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Phone :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.phone}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.address}</Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={btn1} onPress={() => handlePayment()}>
            <Text style={styles.btntext}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  //   containerout: {
  //     flex: 1,
  //     backgroundColor: colors.col1,
  //     width: '100%',
  //   },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  head1: {
    fontSize: 30,
    color: colors.text1,
    justifyContent: 'space-between',
    fontWeight: '200',
    margin: 10,
    marginTop: 50,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between',
  },
  rowout: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  qty: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
    color: colors.col1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '30%',
  },
  right1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '45%',
  },

  price: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.text1,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    // color:colors.text1,
    color: '#000000',
  },
  totalprice: {
    fontSize: 17,
    fontWeight: 'bold',
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    color: '#000000',
  },
  containerin: {
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.text1,
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
    marginBottom: '10%',
  },
  head2: {
    fontSize: 20,
    fontWeight: '200',
    marginTop: 20,
    color: '#000000',
  },
  head2in: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000000',
  },
  userdataout: {
    alignItems: 'center',
    width: '100%',
  },
  btntext: {
    fontSize: 20,
    color: colors.col1,
    fontWeight: 'bold',
    margin: 10,
  },
});
