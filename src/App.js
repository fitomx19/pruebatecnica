
import React, {useEffect,useState} from 'react';
import axios from "axios"
import moment from "moment";

import './App.css';
import './Apps.scss';

function App() {
  let auxiliar = []
  const [resultados,setResultados] = useState({});
  //api link = https://api.datos.gob.mx/v1/condiciones-atmosfericas
  const consulta = async () =>{
    try {
          //consulta mediante axios al endpoint
          const res = await axios.get("https://api.datos.gob.mx/v1/condiciones-atmosfericas").then(res=>{
            return res.data.results
          })
          //ciclo para guardar el resultado en un objeto auxiliar para posteriormente guardarlo
          //en el state
            for(let i = 0; i< res.length; i++){
              auxiliar.push(res[i])
          }
          setResultados(auxiliar)
          //console.log(resultados)
    } catch (error) {
      console.log(error)
    }
  }
  //funcion para realizar la busqueda de el _id del objeto en el state
  const busqueda_id = (id)=>{

      let busqueda1 = resultados.find(e => e._id === id)
     
      return(
        alert(`Id: ${busqueda1._id} , nombre: ${busqueda1.name} , state: ${busqueda1.state}
        ,probabilityofprecip: ${busqueda1.probabilityofprecip},relativehumidity: ${busqueda1.relativehumidity}, 
        validdateutc: ${busqueda1.validdateutc}, winddirectioncardinal: ${busqueda1.winddirectioncardinal} , longitude: ${busqueda1.longitude}
        lastreporttime: ${busqueda1.lastreporttime}, skydescriptionlong: ${busqueda1.skydescriptionlong} , stateabbr: ${busqueda1.stateabbr},
        tempc: ${busqueda1.tempc}, latitude: ${busqueda1.latitude} , iconcode: ${busqueda1.iconcode},
        windspeedkm: ${busqueda1.windspeedkm}, 
        `)
      )
  }

  //funcion de impresion de filas para la tabla donde aparece la informacion
  const imprimir = () =>{
    return(
      resultados.map(function(x){
        return(
          <>
           
           <tr>
              <td><button onClick={()=> busqueda_id(x._id)}>{x._id}</button></td>
              <td><p>{x.cityid}</p></td>
              <td><p><b>{x.name}</b></p></td>
              <td><p>{x.state}</p></td>
              <td><p>{x.probabilityofprecip}</p></td>
              <td><p>{x.relativehumidity}</p></td>
              <td><p>{moment(x.lastreporttime).format('YYYY-MM-DD')}</p></td>
              <td>
                <p>
                {
                  x.probabilityofprecip>60 || x.relativehumidity > 50 ?
                  <p>Llueve</p>:<p>No llueve</p>
                }
                </p></td>
            </tr>
          
            
          </>
        )
      })
    )
  }
  useEffect(()=>{
    consulta();
  }, []);
 
  return (
    <>
        <center>
        <div class="contenedor">
            <table>
                <tr>
                  <th>_id</th>
                  <th>cityid</th>
                  <th>name</th>
                  <th>state</th>
                  <th>propability of precipi</th>
                  <th>relative humidity</th>
                  <th>fecha</th>
                  <th>Llueve</th>
                </tr>
                {imprimir()}
            </table>
        </div>
        </center>
    </>
  );
}

export default App;
