import React from 'react'
import { View ,Text, TextInput,StyleSheet} from 'react-native'

function Ecomentarios() {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Centro de soporte</Text>
        <TextInput style={styles.input}></TextInput>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between'
    },
    titulo:{
        color:'green',
        fontSize:25
    },
    input:{
        borderColor:'black',
        borderWidth:2,
        borderRadius:20,
        width:'85%',
        height:'8%'
    }


})

export default Ecomentarios