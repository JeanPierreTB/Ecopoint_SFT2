import React from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
interface Preguntas{
    des:string,
}

function CajaPreguntas({des}:Preguntas) {
  return (
    <View style={styles.container}>
        <Icon name="arrow-right" size={30} color="black" />
        <Text>{des}</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:10,
        borderColor:'gray',
        borderWidth:2,
        borderRadius:20,
        width:'95%',
        gap:5
    }
})

export default CajaPreguntas