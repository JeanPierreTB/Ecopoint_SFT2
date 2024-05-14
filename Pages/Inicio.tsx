import React from 'react'
import { View ,Image,StyleSheet,Text, TouchableOpacity} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';

type InicioProps = {
    navigation: StackNavigationProp<RootStackParamList, 'inicio'>;
  };

export default function Inicio({ navigation }: InicioProps) {
  return (
    <View style={styles.container}>
        <View>
            <Image
            style={styles.imagen}
            source={{uri:"https://cdn-icons-png.flaticon.com/512/3299/3299954.png"}}/>
            <Text style={styles.texto}>ECOPOINT</Text>
        </View>
        <View style={styles.inicio2}>
            <TouchableOpacity style={styles.boton} onPress={()=>navigation.navigate('sesion')}>
                <Text style={styles.textob}>Ya tengo una cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={()=>navigation.navigate("registrarte")}>
                <Text style={styles.textob}>No tenga una cuenta</Text>
            </TouchableOpacity>
        </View>
        

    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        gap:50
    },
    imagen:{
        width:300,
        height:300
    },
    texto:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:30
    },
    inicio2:{
        gap:10
    },
    boton:{
        backgroundColor:'#004d00',
        borderRadius:10,
        paddingHorizontal:70,
        paddingVertical:20
    },
    textob:{
        color:'white'
        
    }

})
