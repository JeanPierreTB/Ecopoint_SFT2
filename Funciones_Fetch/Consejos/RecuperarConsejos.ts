
export async function RecuperarConsejos():Promise<any[]> {
    try{
        const response=await fetch('http://192.168.0.179:3001/recuperar-consejos')
        if(!response.ok) throw new Error('HTTP error! Status: ${response.status}')
        const data=await response.json();
        return data.data;

    }catch(e){
        console.error("Ocurrió un error ", e);
        return [];
    }
}
