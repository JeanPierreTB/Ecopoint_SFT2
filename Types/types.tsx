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
    Transaccion: undefined;
    perfil:undefined;
    cuenta:undefined;
    Ranking:undefined;
    pregunta:undefined;
    enviar:undefined;
    ocontra:undefined;
    Preciclaje:undefined;
    foto: undefined; 
    agregar:undefined;
    misamigos:undefined;
    notificaciones:undefined
    chatpersonal:undefined
    agregarpunto:undefined
  };


  export type ConsejosProps = StackScreenProps<RootStackParamList, 'Consejos'>;
  export type RecompensasProps = StackScreenProps<RootStackParamList, 'Recompensas'>;
  export type ComunidadProps = StackScreenProps<RootStackParamList, 'Comunidad'>;
  export type TransaccionProps = StackScreenProps<RootStackParamList, 'Transaccion'>;
  