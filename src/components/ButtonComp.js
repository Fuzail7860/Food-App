import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const ButtonComp = ({
    text='DONE',
    onPress=()=>{},
   disabled=false
}) => {
    
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={{
        ...styles.container,
        backgroundColor:!disabled?"#D7654D":'gray',
    }}
    disabled={disabled}
   
    >
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComp;

const styles = StyleSheet.create({
    container: {
        height:42,
        width:'100%',

        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
      },
      textStyle:{
        fontWeight:'bold',
        color:'white',
        fontSize:16,
      }
})