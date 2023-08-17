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
                 placeholder="Email de registro"
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
            placeholder="Escribe tu password"
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

- Le añado un nav fuera del form, con display flex y justify:between para que quede uno a cada lado
- Importo Link de react-router-dom para apuntar a las otras páginas, en este caso Registrar y OlvidePassword
- Login.jsx

~~~jsx
<nav className="lg:flex lg:justify-between">
  <Link to="/registrar" 
    className="block text-center my-5 text-slate-500 uppercase text-sm"
  >¿No tienes una cuenta? Regístrate</Link>
  <Link to="/olvide-password"
        className="block text-center my-5 text-slate-500 uppercase text-sm"
  >¿Olvidaste tu password? Recuperalo aquí</Link>
</nav>
~~~

- Para crear la página de Registrar es muy similar. Copio el Fragment y lo llevo al componente Registrar
- Cambio el titulo por Regístrate para administrar tus proyectos
- Le añado dos campos más, uno para el nombre y otro para repetir password
- Importo Link de react-router-dom
  - Esta vez los dirijo a "/" y "/olvide-password"
- Para OlvidePassword solo necesito el email en el formulario. Copio el fragment y dirijo los links a iniciar y registrarse
- Creo ConfirmarCuenta y NuevoPassword
- Una vez más copio todo el contenido a NuevoPassword
- Solo un input de password, esta página no tiene nav
- Para ConfirmarCuenta solo copio el h1 y le pongo Confirma tu cuenta y empieza a crear tus proyectos
- Será una página dónde clicar un link, no hay nav
--------

## Abriendo state al formulario de Registrar

- Este proyecto va a manejar el state de forma global con context pero en el caso de este formulario no es necesario
- Solamente se requiere aquí, en este componente, la información
- Elimino todas las colecciones que tengo en MongoCompass para asegurarme que lo que se agregue sea desde la interfaz gráfica
- Voy a Registrar.jsx
- Creo un state por cada input dentro del componente, antes del return. Los inicio como strings vacíos

~~~jsx
const Registrar = () => {
  
  const [nombre, setNombre] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [repetirPassword, setRepetirPassword] = useState("")
      
  return (...)
}
~~~

- Añado el value y el onChange en el input
- Ejemplo de input

~~~jsx
<input type="text"
        id="nombre"
        value={nombre}
        onChange={e=>setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  />
~~~

- Si voy a React Developer Tools, Components y me sitúo en Registrar puedo observar en consola los states
- Para trabajar con el submit creo la función handleSubmit. Uso prevent default para prevenir la acción por default y que no refresque el navegador con el submit
- Para **validar el formulario** empiezo por validar que todos los campos tengan algo
- Creo un array lo que me hace disponible el método includes
## NOTA: a no ser que se especifique lo contrario, los hooks y métodos van dentro del componente, antes del return

~~~jsx
const handleSubmit = (e)=>{
      e.preventDefault()
      if([nombre,email,password,repetirPassword].includes("")){
            console.log('Todos los campos son obligatorios')
      }           
}
~~~

- Lo coloco en el onSubmit del form

~~~jsx
 <form className= "mt-10 bg-white shadow rounded-lg p-3"
      onSubmit={handleSubmit}>
~~~

- Evidentemente no va un console.log, va una alerta. Creo el componente de Alerta.jsx en /components 
- Hago el componente reutilizable para alertas buenas y malas
- Le paso el objeto alerta
- Con alerta.error hago un condicional para agregarle un gradiente rojo o verde, con bg-gradient-to-br le indico la dirección (bottom-right)
- Con alerta.message muestro el mensaje

~~~jsx
const Alerta = ({alerta}) => {
  return (

    <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-green-400 to-green-600'}
                    bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta
~~~

- La uso en lugar del console.log, cuando uso el if con el array de states para comprobar que no vengan vacíos
- Creo un nuevo state alerta, setAlerta. Lo inicio como un objeto vacío porque incluirá error y msg

~~~jsx
const handleSubmit = (e)=>{
      e.preventDefault()
      if([nombre,email,password,repetirPassword].includes("")){
            setAlerta({
                  msg: "Todos los campos son obligatorios",
                  error: true
            })
            return
      }           
}
~~~

- Para mostrar el componente extraigo el mensaje del state alerta antes del return. En caso de que exista significa que tiene algo, por lo que debe mostrarse. Para renderizar el componente Alerta elijo el lugar dentro del return
- Uso **&&** para que si el valor de la izquierda es true ejecute el valor de la derecha

~~~jsx
const {msg} = alerta

  return (
    <>
    <h1 className="text-orange-600 font-black text-6xl capitalize">Regístrate y administra tus
    <span className="text-slate-700"> proyectos</span></h1>
      {msg && <Alerta alerta ={alerta} />}

    <form className= "mt-10 bg-white shadow rounded-lg p-3"
      onSubmit={handleSubmit}>
      (...))
~~~

- Seguimos con las validaciones. Password y repetirPassword deben de ser iguales
- Pasadas las validaciones seteo alerta a objeto vacío para hacerlas desaparecer en caso de que haya errores
- Lo siguiente es crear el usuario y almacenarlo en la DB

~~~jsx
const handleSubmit = (e)=>{
            e.preventDefault()
            if([nombre,email,password,repetirPassword].includes("")){
                  setAlerta({
                        msg: "Todos los campos son obligatorios",
                        error: true
                  })
                  return
            } 
            if(password !== repetirPassword){
                  setAlerta({
                        msg: "Los passwords no coinciden",
                        error: true
                  })
                  return
            }          
            if(password.length < 6){
                  setAlerta({
                        msg: "El password es muy corto. Añade al menos 6 caracteres",
                        error: true
                  })
                  return
            }  
            
            setAlerta({})
            //crear usuario en la API
      }
~~~
-------

## Enviando un Request a la API y CORS

- Hago la consulta en un try catch
- Vamos a usar axios en lugar de FETCH. Lo importo
- Dentro del handleSubmit, después de las validaciones

~~~js
try {
    const respuesta  = await axios.post('http://localhost:3000/api/usuarios', {nombre, password, email})  
      } catch (error) {
            console.log(error)
      }
~~~

- Tengo que habilitar CORS para permitir recibir datos de un lado a otro
- Para habilitar CORS voy al backend

> npm i cors

- En app.js creo un whitelist. El frontend está en localhost:5173
- origin devuelve desde donde se originó la petición. Si está en el whitelist la dejará realizarse
- En caso de que no esté permitido devuelvo un error con el callback
- En caso de que esté en la lista blanca le pongo null porque no hay error y le doy acceso con un true
- Coloco el string de conexión de las dos formas, como localhost y como 127.0.0.1
- backend/app.js

~~~js
const app = express()
app.use(express.json())
dotenv.config()

conectarDB()

const whitelist = ['http://127.0.0.1:5173', 'http://localhost:5173']

const corsOptions ={
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOptions))
~~~

- Debo tener el servidor corriendo y el forntend también para poder hacer el POST
- Si quisiera aceptar cualquier origen debería colocar '*' en whitelist
- El usuarioAlmacenado que devuelvo en la respuesta del backend es lo que tengo en **data** (en consola, en la respuesta de la petición)
- Puedo desestructurarla directamente en la petición

~~~jsx
const {data}  = await axios.post('http://localhost:3000/api/usuarios', {nombre, password, email})
~~~

- En el controlador de crearUsuario, en el backend, en lugar de devolver el usuario voy a devolver un mensaje con .json({msg:"Usuario creado correctamente})

~~~js
try {
    const usuario = new Usuario(req.body)
    usuario.token = generarId() 
    await usuario.save()
    
    res.json({msg: "Usuario creado correctamente. revisa tu email"})
    
} catch (error) {
    console.log(error)
}
~~~

- Vamos a mostrar este mensaje en pantalla

~~~jsx
try {
    const {data}  = await axios.post('http://localhost:3000/api/usuarios', {nombre, password, email})  
    setAlerta({
    msg: data.msg,
    error: false
    })
} catch (error) {
    console.log(error) //error.response para que axios me muestre el error
}
~~~

- De esta manera me muestra el mensaje de usuario creado correctamente en verde en pantalla
- Si intento registrar el mismo usuario salta el catch con el console.log del error
- Para acceder al mensaje de error que generé en el backend, en la docu de axios dice que se accede con error.response (está en la propiedad data)
- Accedo con msg porque yo le puse ese nombre en el controlador
- usuario.controller método crearUsuario

~~~jsx
if(existeUsuario){
      const error = new Error("Usuario ya registrado")

      return res.status(400).json({msg: error.message}) //uso msg, pero puedo ponerle el nombre que quiera
  }
~~~

- En la petición del handleSubmit del componente Registrar, para acceder al error uso error.response.data.msg
- en lugar del console.log coloco una alerta
~~~jsx
try {
    const {data}  = await axios.post('http://localhost:3000/api/usuarios', {nombre, password, email})  
    setAlerta({
    msg: data.msg,
    error: false
    })
} catch (error) {
  setAlerta({
    msg: error.response.data.msg,
    error: true
  })
}
~~~

- **Cosas a solucionar:**
  - Todavía no hemos creado el email de confirmación de cuenta
  - El formulario se queda rellenado
  - Tenemos las ruta de la petición visible, no seteada como variable de entorno
-----

## Solucionando estas cositas

