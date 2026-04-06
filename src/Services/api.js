

const getDataFromAPI = async (url , endPoint ="")=>{
try{
    const URL = endPoint ? `${url}/${endPoint}` : url ;
    const response = await fetch(URL) ;

    if(!response.ok){
        throw new Error ("Server responded with status: " + response.status);
    }
    const data = await response.json();
    return {status : "success" , value : data }

} catch(e){
    return {status : "error" , value : e.message }
}
}

export default getDataFromAPI ;