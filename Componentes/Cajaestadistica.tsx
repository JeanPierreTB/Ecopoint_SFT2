import React from 'react'
import { View,Text,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface estadistica{
    namei:string,
    puntaje:string,
    des:string
}

function Cajaestadistica({namei,puntaje,des}:estadistica) {
  return (
    <View style={styles.container}>
        <Icon name={namei} size={20} color="green"/>
        <View>
            <Text>{puntaje}</Text>
            <Text>{des}</Text>
        </View>
        
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        padding:10,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:20,
    }
})

export default Cajaestadistica