import React, { useEffect } from 'react'
import { View,Image,Text,StyleSheet} from 'react-native'

interface Consejos{
    url:string,
    des:string,
    id:number
}

export default function CajaConsejos({url,des,id}:Consejos) {

  return (
    <View style={styles.container}>

        { id % 2 === 0 ? (
        <>
            <Image
            style={styles.imagen}
            source={{ uri: url }}
            />
            <Text style={styles.texto}>{des}</Text>
        </>
        ) : (
        <>
            <Text style={styles.texto}>{des}</Text>
            <Image
            style={styles.imagen}
            source={{ uri: url }}
            />
        </>
        )}

        
    </View>
)    
}

const styles=StyleSheet.create({
    container:{
        marginTop:20,
        flex:1,
        flexDirection:'row',
        gap:20,
        alignItems:'center',
        marginLeft:10
    },
    imagen:{
        marginLeft:5,
        width:100,
        height:100,
        borderRadius:20
    },
    texto:{
        width:'60%',
        fontSize:12
    }
})

