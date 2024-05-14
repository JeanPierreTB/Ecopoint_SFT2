import React from 'react'
import { View ,Text,StyleSheet} from 'react-native'
//import CircularProgress from 'react-native-circular-progress-indicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


interface Objetivo{
    titulo:string,
    recompesa:string,
    porcentaje:number
}

function CajaObjetivo({titulo,recompesa,porcentaje}:Objetivo) {

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>{titulo}</Text>

        <AnimatedCircularProgress
                size={120}
                width={20}
                fill={porcentaje}
                tintColor="lightgreen"
                backgroundColor="#3d5875">
                { (fill) => (
                    <Text style={{ fontSize: 20, color: 'black' }}>
                        {`${Math.round(fill)}%`}
                    </Text>
                )}
            </AnimatedCircularProgress>
    
        <Text style={styles.sub}>Recompesa al completar:{recompesa} puntos</Text>
        
    </View>
  )
}

const styles=StyleSheet.create({
    
    container:{
        marginTop:20,
        alignItems:'center',
        gap:5
    },
    titulo:{
        color:'green',
        fontSize:15
    },
    sub:{
        fontSize:15
    }
})

export default CajaObjetivo