import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'

import Error from './Error'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [criptomoneda, SelecCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos);
  
    useEffect(() => {

      const consultarAPI = async () => {
          const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"


          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          console.log(resultado.Data);

          const arrayCriptos = resultado.Data.map( ({CoinInfo}) => {

           
              const objeto = {
                id: CoinInfo.Name,
                nombre: CoinInfo.FullName
              }

              // console.log(objeto);
              return objeto; 
          })

          console.log(arrayCriptos);

          setCriptos(arrayCriptos);
      }

      consultarAPI();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if([moneda, criptomoneda].includes('')){
          console.log('ERROR');
          setError(true);
          returndiv;
        }

        setError(false);
        setMonedas({
          moneda,
          criptomoneda
        })
    }

  return (
    <>
    { error && <Error>Todos los campos son obligatorios</Error>}

    <form onSubmit={handleSubmit}>
        <SelectMonedas/>
        <SelecCriptomoneda/>

        <InputSubmit type="submit"  value='Cotizar'/>
    </form>
    </>
  )
}

export default Formulario