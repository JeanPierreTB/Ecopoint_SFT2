import * as React from 'react';
import {Text,TouchableOpacity,StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons';

interface props{
    title:string,
    onpress:()=>void,
    icon:keyof typeof Entypo.glyphMap
}

export default function Boton({title,onpress,icon}:props){
    return(
        <TouchableOpacity onPress={onpress} style={styles.boton}>
            <Entypo name={icon} size={28} color='#f1f1f1'>
                <Text style={styles.text}>{title}</Text>
            </Entypo>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    boton:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontWeight:'bold',
        fontSize:16,
        color:'#f1f1f1',
        marginLeft:10
    }
})