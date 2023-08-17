import {Link} from 'react-router-dom'

const OlvidePassword = () => {
  return (
    <>
    <h1 className="text-orange-600 font-black text-6xl capitalize">Recupera tu
    <span className="text-slate-700"> password</span></h1>

    <form className= "mt-10 bg-white shadow rounded-lg p-3">
      <div className="my-3">
        <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email">Email</label>
        <input type="email"
               id="email"
               placeholder="Email de registro"
               className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  />
      </div>

      <input type="submit"
              value="Recuperar password"
              className="bg-orange-600 w-full mb-5 text-white uppercase font-bold rounded p-3 hover:cursor-pointer
              hover:bg-orange-700 transition-colors" />
    </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar"
              className="block text-center my-5 text-slate-500 uppercase text-sm"
        >¿No tienes una cuenta? Regístrate</Link>
        <Link to="/"
              className="block text-center my-5 text-slate-500 uppercase text-sm"
        >¿Ya tienes cuenta? Inicia sesión aquí</Link>
      </nav>
  </>
  )
}

export default OlvidePassword