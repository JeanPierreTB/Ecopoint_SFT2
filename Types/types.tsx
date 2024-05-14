// En un archivo llamado types.ts
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    inicio: undefined;
    sesion: undefined;
    registrarte: undefined;
    principal: undefined;
    Consejos: undefined;
    Recompensas: undefined;
    Comunidad: undefined;
    Recorrido: undefined;
    perfil:undefined;
    cuenta:undefined;
    soporte:undefined;
    pregunta:undefined;
    enviar:undefined;
    ocontra:undefined;
    Preciclaje:undefined;
    foto: undefined; // Aquí especificamos que 'foto' puede recibir un objeto con una propiedad 'propExtra' opcional de tipo booleano
    agregar:undefined;
    misamigos:undefined;
    notificaciones:undefined
    chatpersonal:undefined
  };


  export type ConsejosProps = StackScreenProps<RootStackParamList, 'Consejos'>;
  export type RecompensasProps = StackScreenProps<RootStackParamList, 'Recompensas'>;
  export type ComunidadProps = StackScreenProps<RootStackParamList, 'Comunidad'>;
  export type RecorridoProps = StackScreenProps<RootStackParamList, 'Recorrido'>;
  