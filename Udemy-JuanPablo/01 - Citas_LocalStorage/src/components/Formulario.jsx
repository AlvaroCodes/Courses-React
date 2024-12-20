import {useState, useEffect} from 'react'
import { Error } from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, sePropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre);
      sePropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }

  }, [paciente]);


  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      if([nombre, propietario, email, fecha, sintomas].includes('')) {
        console.log('Hay al menos un campo vacio');
        setError(true);
        return;
      }

      setError(false);
      console.log('Enviado Formulario')

      const objetoPaciente = {
        nombre, 
        propietario, 
        email, 
        fecha, 
        sintomas
      }

      if(paciente.id){
        // Editando el registro
        objetoPaciente.id = paciente.id;

        const pacientesActualizados = pacientes.map((pacienteState) => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
        setPacientes(pacientesActualizados);
        setPaciente({});
        
      }else {
        // Nuevo registro
        objetoPaciente.id = generarId()
        setPacientes([...pacientes, objetoPaciente]);
      }

      
      // Reinicar el form
      setNombre('');
      sePropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
    
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''} 
          <span className="text-indigo-600 font-bold ">Administralos</span>
        </p>

        <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
          onSubmit={handleSubmit}
        >

        { error && <Error><p>Todos los campos son obligatorios </p></Error>}

          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"> Nombre Mascota</label>
            <input 
              id="mascota"
              type="text" 
              placeholder="Nombre de la Mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={({target}) => setNombre(target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold"> 
            Nombre Propietario</label>
            <input 
              id="propietario"
              type="text" 
              placeholder="Nombre del Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={({target}) => sePropietario(target.value)}
           />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold"> 
           Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="Nombre Contacto Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={({target}) => setEmail(target.value)}
          />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"> 
           Alta</label>
            <input 
              id="alta"
              type="date" 
              placeholder="Nombre Contacto Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={({target}) => setFecha(target.value)}
           
           />
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold"> 
           Sintomas</label>
            <textarea
             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              id="sintomas"
              placeholder="Describe los Sintomas"
              value={sintomas}
              onChange={({target}) => setSintomas(target.value)}
            />
          </div>

          <input type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase form-bold hover:bg-indigo-700 cursor-pointer transition-all"
            value={ paciente.id ? ' Editar Paciente ' : ' Agregar Paciente '} 
          />


        </form>
    </div>
   
  )
}

export default Formulario