# Inmuebles App — Frontend en Angular

🇬🇧 [Read in English](README.md)

Aplicación web de inmuebles construida con **Angular**. Los usuarios crean una cuenta, inician sesión y publican propiedades (nombre, dirección, precio y foto). Las fotos se suben a **Firebase Storage**; los datos de usuarios e inmuebles los maneja una API REST aparte.

Es un proyecto de aprendizaje. Lo construí para practicar los patrones que se usan en aplicaciones Angular medianas y grandes: manejo de estado con NgRx, módulos con carga diferida, guards de rutas, interceptores HTTP y subida de archivos a la nube.

## Funcionalidades

- **Autenticación**: registro e inicio de sesión contra la API REST. El JWT se guarda y un interceptor HTTP lo agrega a cada petición.
- **Protección de rutas**: `AuthGuard` bloquea las páginas privadas a quien no ha iniciado sesión, y `UnauthGuard` evita que un usuario con sesión entre al login o al registro.
- **Inmuebles**: listado de propiedades y creación de nuevas con un formulario validado.
- **Subida de imágenes**: un diálogo reutilizable (que se abre con una directiva) con recorte de imagen opcional, que guarda los archivos en Firebase Storage y devuelve la URL pública.
- **Interfaz**: Angular Material, menú lateral responsive, spinner de carga, notificaciones y página 404.

## Tecnologías

| Área | Tecnología |
|---|---|
| Framework | Angular 14, TypeScript |
| Manejo de estado | NgRx (Store, Effects, Entity, Store DevTools) |
| UI | Angular Material, Angular Flex Layout |
| Almacenamiento de archivos | Firebase Storage (`@angular/fire`) |
| Imágenes | ngx-image-cropper |
| Contenedor | Docker (build multi-etapa) + nginx |

## Arquitectura

```
src/app/
├── pages/          # Módulos de funcionalidad con carga diferida
│   ├── auth/       #   login, registro
│   ├── inmueble/   #   listado y formulario de inmuebles + su propio store NgRx
│   └── static/     #   bienvenida, 404
├── store/user/     # Estado global NgRx del usuario en sesión
├── guards/         # AuthGuard / UnauthGuard
├── shared/         # Módulos reutilizables: diálogo de subida, foto, spinner
├── Services/       # Servicio de notificaciones
├── Components/     # Header y menú lateral
└── auth-interceptor.ts  # Agrega "Authorization: Bearer <token>"
```

Flujo de datos: los componentes despachan **acciones** de NgRx, los **effects** llaman a la API REST, los **reducers** actualizan el store y los componentes leen el estado mediante **selectores**.

### Endpoints del backend que usa

| Método | Endpoint | Para qué |
|---|---|---|
| POST | `api/usuario/registrar` | Registrar un usuario |
| POST | `api/usuario/login` | Iniciar sesión, devuelve un JWT |
| GET | `api/usuario` | Usuario actual (restaura la sesión) |
| GET | `api/inmueble` | Listar inmuebles |
| POST | `api/inmueble` | Crear un inmueble |

La URL base de la API se configura en `src/environments/` (por defecto: `http://localhost:5000/`).

## Cómo ejecutarlo

Requisitos: Node.js 16 y npm.

```bash
npm install

# Credenciales de Firebase (este archivo está en el .gitignore)
cp src/environments/firebase.config.example.ts src/environments/firebase.config.ts
# luego completa los valores de tu proyecto de Firebase

npm start               # servidor de desarrollo en http://localhost:4200
npm run build:prod      # build de producción en dist/
```

La API del backend debe estar corriendo en la URL configurada para que funcionen el login y los inmuebles.

## Docker

El `Dockerfile` compila la app con Node 16 y sirve los archivos estáticos con nginx. `nginx.conf` envía todas las rutas a `index.html` para que el enrutamiento de Angular funcione al recargar la página.

```bash
docker build -t inmuebles-app .
docker run -p 8080:80 inmuebles-app   # http://localhost:8080
```

## Qué aprendí

- Organizar una app Angular en módulos de funcionalidad con carga diferida y enrutamiento propio.
- Manejar estado compartido con NgRx, dejando los efectos secundarios (llamadas HTTP) en los effects y no en los componentes.
- Proteger la navegación con guards y agregar autenticación JWT mediante un interceptor.
- Integrar Firebase Storage para los archivos de los usuarios sin subir credenciales al repositorio.
- Empaquetar una SPA en una imagen Docker con nginx.

## Próximos pasos

- [ ] Actualizar a la versión actual de Angular y reemplazar Flex Layout, que ya no se mantiene, por CSS Grid/Flexbox.
- [ ] Agregar pruebas unitarias para reducers, effects y guards.
- [ ] Editar y eliminar inmuebles.
