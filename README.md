Propuesta de pagina web Carrera de ingeniera de computacion

Proyecto web con arquitectura moderna basada en TypeScript. Frontend en TypeScript, utilizando **Vite (React)** desplegado en **Vercel**. **Supabase** provee la persistencia de datos (PostgreSQL), almacenamiento de archivos (Storage), gestión de usuarios (Auth) y puede manejar la lógica de backend (por ejemplo, con Supabase Functions).
[404 Solutions]

Stack Tecnológico

Este proyecto utiliza una arquitectura moderna y desacoplada, aprovechando los siguientes servicios y frameworks:
Framework (Frontend): **Vite** (React + TypeScript)
Se utiliza para construir el Frontend (componentes de React con TypeScript) y se despliega en Vercel.
Base de Datos y Servicios: **Supabase**
Utilizado como la base de datos principal PostgreSQL.
Maneja el almacenamiento multimedia (storage) para archivos, imágenes y videos.
Gestiona la autenticación y usuarios (Auth).
Despliegue:
Vercel: Despliegue y hosting del proyecto frontend (Vite).
Supabase: Hosting de la base de datos, storage y servicios de autenticación.
Primeros Pasos (Configuración)

Clonar el repositorio:
git clone [URL_DEL_REPOSITORIO]cd [NOMBRE_DEL_PROYECTO]

Instalar dependencias (Node.js):
(Se tiene que realizar la intalacion de Node.js )
# Instala los paquetes de node
npm install

Configurar Variables de Entorno:
Crear un archivo `.env.local` en la raíz del proyecto.
Añade tus claves de Supabase (URL y Anon Key) obtenidas de tu panel de Supabase.
# Claves públicas para el cliente de Supabase en el frontend
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY

Despliegue

Vercel: El proyecto se despliega automáticamente conectando este repositorio de Git a Vercel. Vercel detectará que es un proyecto **Vite** y desplegará el frontend de forma optimizada.
Supabase: La base de datos, almacenamiento y autenticación ya están "desplegados" y gestionados por la plataforma de Supabase.
