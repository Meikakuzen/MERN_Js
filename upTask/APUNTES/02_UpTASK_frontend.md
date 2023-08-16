# 02 MERN UPTASK

## Frontend

> npm create vite@latest frontend

- Y dentro de /frontend

> npm i

- Dependencias

> npm i react-router-dom axios

- Hago limpieza de archivos. Dejo solo el App.jsx con un h1 y el index.css vacío
- Para instalar **Tailwind**

> npm i -D tailwindcss postcss autoprefixer

- Para crear el archivo de configuración de tailwind y postcss

> npx tailwindcss init -p

- En tailwind.config.js añado en content los archivos que van a ser afectados por Tailwind

~~~js
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [],
}
~~~

- En index.css añado en la cabecera

~~~css
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~

- En el index.html cambio el nombre del proyecto y en el body le añado un gray y un min-height de 100vh

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UpTask MERN</title>
  </head>
  <body class="bg-gray-100 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
~~~
-----

## Routing con React-Router-Dom 6

- En App.jsx importo de react-router-dom BrowserRouter, Routes y Route
- Tenemos dos áreas: 
  - Un área pública dónde registrar usuarios, login, etc
  - Un área privada para el manejo de proyectos y tareas
- Creo las carpetas /layouts  /componentes  /paginas
  - Creo en /layouts/AuthLayout.jsx . Componente del área pública que va a contener el formulario para registrarse, iniciar sesión, olvidé mi password, etc
- Le paso el componente a la ruta "/"
- En el Route interior le coloco index, es decir, el que va a ejecutarse cuando cargue "/"
- Le coloco el componente /paginas/Login.jsx

~~~jsx
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthLayout from '../src/layouts/AuthLayout'
import Login from './paginas/Login'


function App() {
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />

      </Route>
    </Routes>
  
  </BrowserRouter>

 )
}

export default App
~~~

- Para que imprima el componente Login debo definir el Outlet en AuthLayout

~~~js
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <h1>Auth Layout</h1>
      
      <Outlet />
    </>
  )
}

export default AuthLayout
~~~

- Agrego el componente Registrar al router con el path /registrar, otra de olvidePassword y NuevoPassword
- App.jsx

~~~jsx
<BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="registrar" element={<Registrar />} />
        <Route path="olvide-password" element={<OlvidePassword />} />
        <Route path="olvide-password/:token" element={<NuevoPassword />} />
        <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
      </Route>
    </Routes>
  </BrowserRouter>
~~~
--------

## Creando el Layout principal

- Vamos a aplicar algunos estilos al Layout principal
- mx-auto va a centrar el contenido, mt para margin top, md: es para media query, un margin top de 10
- md: flex, un display de flex en el tamaño mediano y justify-center para que esté centrado
- En el div el coloco un md (mediaquery de tamaño mediano) que ocupe 2 terceras partes
- En un tamaño más grande (lg) tomará un tercio de la pantalla. Coloco el Outlet dentro del div
### NOTA: puedo ponerle un fondo de color con bg-red-200 y ajustar la pantalla para ver el responsive

~~~jsx
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-1/3">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout
~~~
-----

## Login

- text-6xl para aumentar de tamaño, capitalize hace mayúscula el inicio de cada palabra
- En el **formulario** cada campo va a estar en un div
- Le agrego al form un margin en y de 10, fondo blanco, shadow (sombra) y esquinas redondeadas con rounded-lg
  - También un padding de 5 en todas direcciones
- En el **label** le coloco un block para que tome todo el ancho y empuje el input hacia abajo
- En el **input** coloco w-full para que tome todo el ancho
- Le coloco un border para que marque el controno y un padding en todas direcciones para hacer más grande el input
- En el **label** coloco un **htmlFor que apunta al id del input**. De esta manera lo hago accesible cuando clico sobre el label

~~~jsx

const Login = () => {
  return (
    <>
      <h1 className="text-orange-600 font-black text-6xl capitalize">Inicia sesión y administra tus
      <span className="text-slate-700"> proyectos</span></h1>

      <form className= "my-10 bg-white shadow rounded-lg p-5">
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="email">Email</label>
          <input type="email"
                 id="email"
                 placeholder="email de registro"
                 className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  />
        </div>
      </form>
    </>
  )
}

export default Login
~~~

- El diseño de este div lo copio para el password

~~~jsx
<div className="my-5">
    <label className="uppercase text-gray-600 block text-xl font-bold"
        htmlFor="password">Password</label>
    <input type="password"
            id="password"
            placeholder="escribe tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  />
</div>
~~~

- Coloco un **input** dentro del form para hacer el submit
- Le añado un efecto hover y un transition

~~~jsx
<input type="submit"
        value="Iniciar Sesión"
        className="bg-orange-600 w-full mb-5 text-white uppercase font-bold rounded p-3 hover:cursor-pointer
        hover:bg-orange-700 transition-colors" />
~~~
-----

## Añadiendo el routing a las otras páginas del área pública

  