import React,{Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import axios from 'axios';

function App() {

  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  useEffect(() => {

    if(Object.keys(busquedaletra).length === 0)return;

    const consultarApiLetra = async () => {
      
      const {artista, cancion} = busquedaletra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      
      //de esta forma se consulta al mismo tiempo dos api si ponemos dos await el segundo no hace la consulta hasta que el primero no ha terminado
      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);


      
    }
    consultarApiLetra();
  },[busquedaletra]);

  return (
    <Fragment>
        <Formulario
          guardarBusquedaLetra={guardarBusquedaLetra} 
        />

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Info
                info={info} 
              />
            </div>
            <div className="col-md-6">
              <Cancion
                letra={letra}
              />
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
