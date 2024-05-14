import { URL } from "../URL/URL";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*interface respuesta{
  mensaje:string,
  res:boolean
}*/


class Usuario{
    private nombre:string;
    private contraseña:string;
    private Dni?:number|null;
    private ntelefono?:number|null;

    constructor(nombre:string,contraseña:string,Dni:number|null=null,ntelefono:number|null=null) {
        this.nombre=nombre;
        this.contraseña=contraseña;
        this.Dni=Dni;
        this.ntelefono=ntelefono;
    }

    async islogin(navigation: any): Promise<void> {
      try {
        const response = await fetch("http://192.168.0.179:3001/verificar-usuario", {
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
      const response = await fetch("http://192.168.0.179:3001/usuario-existente", {
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
        await fetch("http://192.168.0.179:3001/cambio_contra", {
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

    async register(navigation:any):Promise<boolean>{
        console.log(this.ntelefono);
        await fetch("http://192.168.0.179:3001/insertar-usuario", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: this.nombre,
            contrasena: this.contraseña,
            dni:this.Dni,
            ntelefono:this.ntelefono
        }),
        })

        .then(response=>response.json())
        .then(data=>{
            if(data.res){
                //navigation.navigate('sesion');
                Alert.alert('Exito',data.mensaje);
            }
            else
                Alert.alert('Error',data.mensaje)
            return data.res;
        })
        .catch(e=>console.error("Ocurrio un error ",e))
        
        return false;
    }

    static async datosusuario(id:number):Promise<any>{
      try{
        const response = await fetch("http://192.168.0.179:3001/obtener-usuario", {
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

    static async datosinformativos(id:number):Promise<any>{
      try{
        const response = await fetch("http://192.168.0.179:3001/notas-usuario", {
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

    static async actualizarfoto(id:number,foto:string):Promise<any>{
      const response=await fetch("http://192.168.0.179:3001/actualizar-foto", {
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

    async actualizadatos(id:number):Promise<any>{
      try{
        const response = await fetch("http://192.168.0.179:3001/actualizar-datos-usuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id,
                   nombre:this.nombre,
                   contrasena:this.contraseña,
                   dni:this.Dni,
                   ntelefono:this.ntelefono
                }),
            });
            const data=await response.json();
            return data;
          
      }catch(e){
        console.error("Ocurrio un error",e)
      }

      return null;
      
    }

    static async obtenerranking():Promise<any>{
      try{
        const response=await fetch('http://192.168.0.179:3001/rankings-usuarios')
        const data=await response.json();
        console.log(data.usuarios);
        return data.usuarios;
      }catch(e){
        console.error("Ocurrio un error",e)
      }
    }

    static async obtenernoamigos(id:number):Promise<any>{
      try{
        const response=await fetch('http://192.168.0.179:3001/todos-sin-amigos',{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id,
                   
                }),
        })
        const data=await response.json();
        console.log(data.usuario);
        return data.usuario;

      }catch(e){
        console.error("Ocurrio un error",e)
      }
    }

    static async agregaramigos(id_usuario:number,nombre:string,nombre1:string,foto:string,des:string,tipo:number):Promise<any>{
      try{
        const response=await fetch('http://192.168.0.179:3001/agregar-amigos',{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   idusuario:id_usuario,
                   nombre:nombre,
                   nombre1:nombre1,
                   foto:foto,
                   des:des,
                   tipo:tipo
                   
                   
                }),
        })

        const data=await response.json();
        console.log(data.mensaje)
        return data.mensaje;
      }catch(e){
        console.error("Ocurrio un error",e)
      }
    }

    static async amigorechazado(nombre:string,nombre1:string,foto:string,des:string,tipo:number):Promise<any>{
      try{
        const response=await fetch('http://192.168.0.179:3001/amigo-rechazado',{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   nombre:nombre,
                   nombre1:nombre1,
                   foto:foto,
                   des:des,
                   tipo:tipo
                   
                   
                }),
        })

        const data=await response.json();
        console.log("datos no se",data);
        return data.mensaje;
      }catch(e){
        console.error("Ocurrio un error",e)
      }
    }

    static async misamigos(id:number):Promise<any>{
      try{
        const response=await fetch('http://192.168.0.179:3001/misamigos',{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id    
                   
                }),
        })

        const data=response.json();
        console.log(data);
        return data;


      }catch(e){
        console.error("Ocurrio un error",e)
      }
    
    }
    




}


export default Usuario