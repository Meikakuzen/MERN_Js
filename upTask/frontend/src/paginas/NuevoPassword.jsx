import React from 'react'

const NuevoPassword = () => {
  return (
    <>
    <h1 className="text-orange-600 font-black text-6xl capitalize">Escribe tu nuevo
    <span className="text-slate-700"> password</span></h1>

    <form className= "mt-10 bg-white shadow rounded-lg p-3">
      
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password">Nuevo password</label>
        <input type="password"
               id="password"
               placeholder="Escribe tu nuevo password"
               className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  />
      </div>

      <input type="submit"
              value="Guardar Nuevo Password"
              className="bg-orange-600 w-full mb-5 text-white uppercase font-bold rounded p-3 hover:cursor-pointer
              hover:bg-orange-700 transition-colors" />
    </form>
  </>
  )
}

export default NuevoPassword