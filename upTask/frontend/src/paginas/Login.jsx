
const Login = () => {
  return (
    <>
      <h1 className="text-orange-600 font-black text-6xl capitalize">Inicia sesión y administra tus
      <span className="text-slate-700"> proyectos</span></h1>

      <form className= "my-10 bg-white shadow rounded-lg p-5">
        <div className="my-3">
          <label className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="email">Email</label>
          <input type="email"
                 id="email"
                 placeholder="email de registro"
                 className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password">Password</label>
          <input type="password"
                 id="password"
                 placeholder="escribe tu password"
                 className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  />
        </div>

        <input type="submit"
                value="Iniciar Sesión"
                className="bg-orange-600 w-full mb-5 text-white uppercase font-bold rounded p-3 hover:cursor-pointer
                hover:bg-orange-700 transition-colors" />
      </form>
    </>
  )
}

export default Login