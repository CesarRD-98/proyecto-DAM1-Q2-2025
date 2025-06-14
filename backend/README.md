# API Documentation - Backend MiPistoHN

## Tabla de Contenidos

- [API Documentation - Backend MiPistoHN](#api-documentation---backend-mipistohn)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Crear base de datos](#crear-base-de-datos)
  - [Configuración del archivo .env](#configuración-del-archivo-env)
  - [Comandos útiles](#comandos-útiles)
  - [Estructura de carpetas](#estructura-de-carpetas)
  - [Endpoints](#endpoints)
    - [Autenticación](#autenticación)
    - [Usuarios](#usuarios)
    - [Categorías](#categorías)
    - [Gastos](#gastos)
    - [Presupuestos](#presupuestos)
    - [Estadisticas](#estadisticas)
  - [Validaciones y respuestas](#validaciones-y-respuestas)
  - [Manejo de errores](#manejo-de-errores)

---

## Requisitos

- Node.js >= 16.x
- npm >= 8.x
- MySQL

## Instalación

```bash
git clone <repo-url>
cd backend
npm install
```

## Crear base de datos

- `src/config/mipisto_hn.sql` - Script de la base de datos

## Configuración del archivo .env

Copia el archivo `.envexample` a `.env` y completa los valores:

```env
PORT = 5000
DB_HOST = 127.0.0.1
DB_USER = root
DB_PASSWORD = tu_contrasena
DB_DATABASE = mipistohn_db
JWT_SECRET = jwt_secret_123
```

## Comandos útiles

- Iniciar el servidor:  
  ```bash
  npm start
  ```
- Modo desarrollo (con nodemon):  
  ```bash
  npm run dev
  ```

## Estructura de carpetas

- `src/` - Código fuente principal
- `src/controllers/` - Lógica de negocio de cada recurso
- `src/models/` - Modelos de base de datos
- `src/routers/` - Definición de rutas/endpoints
- `src/middlewares/` - Middlewares personalizados
- `src/utils/` - Utilidades generales
- `uploads/` - Archivos subidos (imágenes de usuario, etc.)

## Endpoints

### Autenticación

- **POST** `/autenticacion`  
  _Body:_ `{ correo, contrasena }`  
  _Respuesta:_ `{ token, usuario }`

- **POST** `/registro`  
  _Body:_ `{ primer_nombre, primer_apellido, correo, contrasena }`  
  _Respuesta:_ `{ id }`

### Usuarios

- **GET** `/perfil`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Respuesta:_ `{ usuario, presupuesto, ultimos_gastos }`

- **GET** `/perfil-imagen/:id`  
  _Respuesta:_ `{ url }`

- **PUT** `/perfil-imagen`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Body:_ `form-data: { key: image, file: image.png/jpeg }`  
  _Respuesta:_ `{ id }`

- **PUT** `/perfil-nombre`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Body:_ `{ primer_nombre, primer_apellido }`  
  _Respuesta:_ `{ id }`

- **PUT** `/perfil-contrasena`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Body:_ `{ actual_contrasena, nueva_contrasena }`  
  _Respuesta:_ `{ id }`

### Categorías

- **GET** `/categorias`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Respuesta:_ `[ { codigo_categoria, categoria } ]`

### Gastos

- **GET** `/gastos`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Respuesta:_ `{ gastos: [] }`

- **POST** `/gasto`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Body:_ `{ nombre_gasto, codigo_categoria, monto, notas }`  
  _Respuesta:_ `{ id, superado, monto }`

### Presupuestos

- **PUT** `/perfil-presupuesto`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Body:_ `{ monto, nombre_presupuesto, notas }`  
  _Respuesta:_ `{ monto }`

### Estadisticas

- **GET** `/estadisticas`  
  _formato esperado:_ `/estadisticas?desde=2025-06-01&hasta=2025-06-09`  
  _Headers:_ `Authorization: Bearer <token>`  
  _Respuesta:_ `{ gastos: [] }`

## Validaciones y respuestas

- Todos los endpoints protegidos requieren el header:  
  `Authorization: Bearer <token>`
- Los campos obligatorios deben ser enviados en el body.
- Las respuestas exitosas tienen el formato `{ success: true, message: '', data: ... }`
- Los errores tienen el formato `{ success: false, message: "Error..." }`

## Manejo de errores

- 401: Token inválido o no enviado
- 400: Datos inválidos o faltantes
- 404: Recurso no encontrado
- 500: Error interno del servidor

---

**Nota:**  
Para más detalles sobre cada endpoint, revisa los archivos en `src/routers/` y `src/controllers/`.
