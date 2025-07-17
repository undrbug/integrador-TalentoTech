# BienHelada E-Commerce

Es un proyecto Full-Stack de una tienda online de bebidas, desarrollado como parte del bootcamp Talento Tech. La aplicación cuenta con un frontend interactivo construido con React y un backend hecho con Node.js, Express y MySQL.

## 🚀 Demos en Vivo

*   **Frontend (Vercel):** [https://integrador-ttech.vercel.app/](https://integrador-ttech.vercel.app/)
*   **Backend (Render):** [https://api-auth-secure.onrender.com/](https://api-auth-secure.onrender.com/)
*   user admin: hernan@hernan.com
*   pass admin: BienH3lad@

*   user cliente: paola@paola.com
*   pass cliente: BienH3lad@

---

## ✨ Funcionalidades Principales

*   **Autenticación de Usuarios:** Registro, inicio de sesión y cierre de sesión seguros utilizando JWT (JSON Web Tokens).
*   **Roles de Usuario:**
    *   **Cliente:** Puede ver productos, agregarlos al carrito y acceder a ofertas exclusivas.
    *   **Administrador:** Tiene acceso a un panel de control para crear, editar y eliminar productos. Proximamente, se implementará la gestión de usuarios.
*   **Catálogo de Productos:**
    *   Listado de productos con **scroll infinito**.
    *   **Buscador** de productos en tiempo real.
    *   Vista de detalle para cada producto.
*   **Carrito de Compras:** Funcionalidad completa para agregar, visualizar y gestionar productos en el carrito.
*   **Rutas Protegidas:** Secciones como "Ofertas" y el "Panel de Administración" solo son accesibles para usuarios autenticados y/o con el rol adecuado.
*   **Panel de Administración:** Un dashboard intuitivo para que los administradores gestionen el inventario de productos (CRUD).

---

## 🛠️ Tecnologías Utilizadas

### Frontend
*   **React 19** (con Vite)
*   **React Router v6** para el manejo de rutas.
*   **Context API** para la gestión de estado global (autenticación, productos, carrito).
*   **React-Bootstrap** y **Bootstrap 5** para el diseño y los componentes de UI.
*   **Axios** para las peticiones a la API.
*   **React Toastify** para notificaciones.

### Backend
*   **Node.js**
*   **Express** para la creación del servidor y la API REST.
*   **MySQL** como base de datos.
*   **JWT (JSON Web Tokens)** para la autenticación y autorización.
*   **Bcrypt.js** para el hasheo de contraseñas.
*   **Express-validator** para la validación de los datos de entrada.
*   **CORS** para la comunicación entre dominios.

---

## ⚙️ Cómo Empezar (Instalación Local)

Sigue estos pasos para levantar el proyecto en tu máquina local.

### Prerrequisitos
*   Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
*   Tener instalado un gestor de base de datos MySQL (como MySQL Workbench, XAMPP, etc.).
*   Un editor de código como [VS Code](https://code.visualstudio.com/).

### 1. Clona el Repositorio
```bash
git clone https://github.com/undrbug/api-auth-secure.git
cd api-auth-secure
```

### 2. Configura el Backend
Navega a la carpeta del backend, instala las dependencias y configura las variables de entorno.

```bash
cd api-auth-secure
npm install
```

Crea un archivo `.env` en la raíz de `/api-auth-secure` y añade las siguientes variables:

```env
# Configuración de la Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña_de_mysql
DB_NAME=bienhelada_db

# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Secretos para JWT
JWT_SECRET=un_secreto_muy_largo_y_seguro
JWT_REFRESH_SECRET=otro_secreto_diferente_y_seguro

# Configuración de Seguridad
LOCK_TIME=15
MAX_ATTEMPTS=5
```

**Importante:** Crea la base de datos `bienhelada_db` en tu gestor de MySQL y ejecuta los scripts SQL necesarios para crear las tablas `users` y `products`.

Finalmente, inicia el servidor del backend:
```bash
npm start
```
El servidor estará corriendo en `http://localhost:3000`.

### 3. Configura el Frontend
Abre una nueva terminal, navega a la carpeta del frontend, instala las dependencias y configura las variables de entorno.

```bash
cd integrador-TalentoTech
npm install
```

Crea un archivo `.env` en la raíz de `/integrador-TalentoTech` y añade la siguiente variable:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Ahora, inicia la aplicación de React:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

¡Y listo! Ya tienes el proyecto completo funcionando en tu entorno local.

---

## 🔮 Mejoras a Futuro
Ganar el Quini6
