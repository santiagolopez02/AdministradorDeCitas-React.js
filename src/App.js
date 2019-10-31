import React, {useState, Fragment, useEffect} from 'react';


//componente Formulario hook
function Formulario({creaCita}){
  //state inicial para formatear el form
  const stateIncial= {
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:''
  }

  //hook
  const [cita, actualizarCita ] = useState(stateIncial);
  
  const handleChange= e =>{
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  //mandar el form
  const handleSubmit= e =>{
    e.preventDefault();
   
  //pasar la cita hacia el componente principal
  creaCita(cita);  
  
  //reinicia el form
  actualizarCita(stateIncial);
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form
      onSubmit={handleSubmit}
      >
                  <label>Nombre Mascota</label>
                  <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width" 
                    placeholder="Nombre Mascota"
                    onChange={handleChange} 
                    value={cita.mascota}
                  />

                  <label>Nombre Dueño</label>
                  <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"  
                    placeholder="Nombre Dueño de la Mascota" 
                    onChange={handleChange}
                    value={cita.propietario} 
                  />

                  <label>Fecha</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="fecha"
                    onChange={handleChange}
                    value={cita.fecha} 
                  />               

                  <label>Hora</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="hora" 
                    onChange={handleChange}
                    value={cita.hora} 
                  />

                  <label>Sintomas</label>
                  <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={cita.sintomas} 
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
  )
}

//componente Cita hook
function Cita({cita, index, eliminaCita}){
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Propietario: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>
      <button
      onClick={()=>eliminaCita(index)}
      type="button"                     
      className="button eliminar u-full-width"
      >Borrar &times;
      </button>
    </div>
  )
}


function App() {
  //CARGAR LAS CITAS DEL LOCALSTORAGE COMO STATE INICIAS
  let citaPrincipal = JSON.parse(localStorage.getItem('citas'));
  if (!citaPrincipal) {
    citaPrincipal = [];
  }

  //hook todo en un archivo
  const [citas, guardarCitas] = useState(citaPrincipal);

  //agrega cita al state
  const creaCita = cita =>{
    const nuevaCita = [...citas, cita];
    guardarCitas(nuevaCita);
  }

  //elimina la cita del state
  const eliminaCita= index =>{
    const nuevaCita= [...citas];

  //elimina con splice(que elemntos, cuantos)
    nuevaCita.splice(index, 1);
    guardarCitas(nuevaCita);
  }  

//cargar titulo condicionalemnte, REVISA SI UN ARRAY ESTA VACIO O NO CON EL Object.key().length
const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administra tus citas';

//rescartar el local storage 
useEffect(()=>{
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(citasIniciales){
    localStorage.setItem('citas', JSON.stringify(citas))
  }else{
    localStorage.setItem('citas',JSON.stringify([]));
  }
},[citas])

  return (
    <Fragment>
      <h1>Administardor de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
              creaCita={creaCita}
              />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
              {citas.map((cita, index)=>(
                <Cita
                key={index}
                index={index}
                cita={cita}
                eliminaCita={eliminaCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
