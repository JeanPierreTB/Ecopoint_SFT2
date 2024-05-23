import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VerificationStrategy from '../Validador/VerificationStrategy';
import PasswordVerificationStrategy from "../Validador/PasswordVerificationStrategy";
import DniVerificationStrategy from '../Validador/DniVerificationStrategy';
import EmailVerificationStrategy from '../Validador/EmailVerificationStrategy';
import PhoneVerificationStrategy from '../Validador/PhoneVerificationStrategy';
import UpdateStraterty from '../ActualizarDatos/UpdateStraterty';
import Registro from '../RegisterStratery/Registro';
import Update from '../ActualizarDatos/Update';
import { URL2 } from '../../URL/URL';




class Usuario{
    private nombre:string;
    private contraseña:string;
    private Dni:number|null;
    private ntelefono:number|null;
    private puntaje:number|null;

    constructor(nombre: string, contraseña: string, Dni: number | null = null, ntelefono: number | null = null, puntaje: number | null = null) {
      this.nombre = nombre;
      this.contraseña = contraseña;
      this.Dni = Dni;
      this.ntelefono = ntelefono;
      this.puntaje = puntaje;
  }

  getnombre():string{
    return this.nombre;
  }

  getcontraseña():string{
    return this.contraseña;
  }
  getDni():number|null{
    return this.Dni;
  }

  getntelefono():number|null{
    return this.ntelefono;
  }

  getpuntaje():number|null{
    return this.puntaje;
  }





    async islogin(navigation: any): Promise<void> {
      try {
        console.log("Entro aqui..")
        const response = await fetch(`${URL2}verificar-usuario`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: this.nombre,
            contrasena: this.contraseña,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data.res) {
          // Almacena información de sesión segura en AsyncStorage
          console.log(data.usuario.id);
          const userData=data.usuario.id;
          //const userData = { nombre: this.nombre,contraseña:this.contraseña };
          AsyncStorage.setItem('usuario', JSON.stringify(userData));
          navigation.navigate('principal');
        } else {
          Alert.alert('Error', data.mensaje);
        }
      } catch (error) {
        console.error('Error:', error);
        // Manejo de errores
        Alert.alert('Error', 'Ocurrió un error al procesar la solicitud.');
      }
    }

    async verifiyaccount():Promise<boolean>{
      const response = await fetch(`${URL2}usuario-existente`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: this.nombre
          }),
        });

        const data=await response.json();
        return data.res;
        
        

        
    }
      


    async changepassword(contranueva:string,navigation:any):Promise<void>{
      const passwordVerificationStrategy = new PasswordVerificationStrategy();
      
      if(passwordVerificationStrategy.verify(contranueva)){
        console.log("Verificacion con la clase");
        await fetch(`${URL2}cambio_contra`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: this.nombre,
            contrasena: contranueva,
        }),
        })

        .then(response=>response.json())
        .then(data=>{
            if(data.res){
                Alert.alert('Exito','Contraseña cambiada exitosamente');
                navigation.navigate('sesion');
            }
            else
                Alert.alert('Error','Correo no encontrado')

        })
        .catch(e=>console.error(`Ocurrio un error ${e}`))
      }
      else{
        Alert.alert('Error','Contraseña no valida');
      }

        
    }




    async register(navigation: any,registro:Registro): Promise<boolean> {
      if(registro.register(this)){
        try {
          const response = await fetch(`${URL2}insertar-usuario`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      nombre: this.nombre,
                      contrasena: this.contraseña,
                      dni:this.Dni,
                      ntelefono: this.ntelefono
                  }),
              });
  
              const data = await response.json();
  
              if (data.res) {
                  Alert.alert('Éxito', data.mensaje);
              } else {
                  Alert.alert('Error', data.mensaje);
              }
  
              return data.res;
          } catch (error) {
              console.error("Ocurrió un error ", error);
              Alert.alert('Error', 'Ocurrió un error al procesar la solicitud.');
              return false;
          }
      }
      else{
        Alert.alert('Error','Ponga bien los datos');
        return false;
      }
      
  }


  
  

    static async datosusuario(id:number):Promise<any>{
      try{
        const response = await fetch(`${URL2}obtener-usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:id
                }),
            });
         const data=await response.json();
         
         return data.usuario
          
      }catch(e){
        console.error("Ocurrio un error",e)
      }
    }

    

    static async actualizarfoto(id:number,foto:string):Promise<any>{
      const response=await fetch(`${URL2}actualizar-foto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id:id,
            foto:foto
        }),
    });

    const data=await response.json();
    return data
    }

    async actualizadatos(id: number,update:Update): Promise<any> {
      if(update.verify(this)){
        try {
          const response = await fetch(`${URL2}actualizar-datos-usuario`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              nombre: this.nombre,
              contrasena: this.contraseña==="Indefinido"? "":this.contraseña,
              dni: this.Dni,
              ntelefono: this.ntelefono
            }),
          });
  
          const data = await response.json();
          return data;
        } catch (error) {
          
          console.error("Ocurrió un error ", error);
          return false;
        }
      } else {
        Alert.alert('Error', 'Algunos datos no son válidos. Por favor, revisa los campos ingresados.');
        return false;
      }
    }

    static async datosinformativos(id:number):Promise<any>{
      try{
        const response = await fetch(`${URL2}notas-usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id
                }),
            });
         const data=await response.json();
         
         return data
          
      }catch(e){
        console.error("Ocurrio un error",e)
      }
    }
        
    

  

}


export default Usuario