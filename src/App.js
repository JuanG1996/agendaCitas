import React, {Fragment, useState, useEffect}  from 'react';
import Formulario from './components/Formulario';
import Cita from './components/cita';
import PropTypes from "prop-types";

function App() {

  //Citas en el localStorage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCita] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect(() =>{

      localStorage.setItem("citas", JSON.stringify(citas));

  }, [citas]);

  // Funcion que tome las citas actuales y agrege la nueva
  const crearCita = cita =>{
      guardarCita([
        ...citas,
        cita
      ])
  }


  // Funcion que elimina una cita por su id
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCita(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
          <div className="row">
             <div className="one-half column">
               <Formulario 
                  crearCita={crearCita}
               />
             </div>
             <div className="one-half column">
                <h2>{titulo}</h2>
                {citas.map(cita => (
                  <Cita 
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                ))}
             </div>
          </div>
      </div>
    </Fragment>
  );
}


Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired
}

export default App;
