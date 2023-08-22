import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import  axios  from "axios"
import  Alerta from '../components/Alerta'
import clienteAxios from "../config/clienteAxios"

const ConfirmarCuenta = () => {

  const params = useParams()
  const {token} = params

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  useEffect(()=>{
    const confirmarCuenta = async()=>{
      try {
        const {data}= await clienteAxios.get(`/usuarios/confirmar/${token}`)

        console.log(data)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])

  const {msg} = alerta

  return (
    <>
    <h1 className="text-orange-600 font-black text-6xl capitalize">Confirma tu cuenta y empieza a crear tus
    <span className="text-slate-700"> proyectos</span></h1>
    <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white"
    >{msg && <Alerta alerta={alerta} />}
      {cuentaConfirmada &&    
         <Link to="/"
              className="block text-center my-5 text-slate-500 uppercase text-sm"
        >Inicia sesión</Link>}
     </div>

  </>
  )
}

export default ConfirmarCuenta