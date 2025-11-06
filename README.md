# Propuesta de pagina web Carrera de ingeniera de computacion

Proyecto web con arquitectura moderna basada en **TypeScript**.
**Frontend y Backend (API) en TypeScript**, utilizando **Next.js** (React) desplegado en **Vercel**.
El backend se implementa como **API Routes (Serverless Functions)** que corren sobre Node.js dentro de la misma plataforma Vercel.
**Supabase** provee la persistencia de datos (PostgreSQL), almacenamiento de archivos (Storage) y **gestión de usuarios (Auth)**.

# [404 Solutions]

---

##  Stack Tecnológico

Este proyecto utiliza una arquitectura moderna y desacoplada, aprovechando los siguientes servicios y frameworks:

* **Framework (Full-stack):** [**Next.js**](https://nextjs.org/) (React + TypeScript)
    * Se utiliza para construir el **Frontend** (componentes de React con TypeScript).
    * Provee el **Backend** (API Routes) que se ejecutan como Serverless Functions (Node.js con TypeScript) en Vercel.

* **Estilos (Opcional):** [Bootstrap](https://getbootstrap.com/)
    * Se puede integrar con Next.js para una UI responsiva .

* **Base de Datos y Servicios:** [Supabase](https://supabase.com/)
    * Utilizado como la base de datos principal **PostgreSQL**.
    * Maneja el **almacenamiento multimedia** (storage) para archivos, imágenes y videos.
    * Gestiona la **autenticación y usuarios (Auth)**.

* **Despliegue:**
    * **Vercel:** Despliegue y hosting de todo el proyecto Next.js (Frontend y Backend API).
    * **Supabase:** Hosting de la base de datos, storage y servicios de autenticación.

---

## Primeros Pasos (Configuración)

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO]
    cd [NOMBRE_DEL_PROYECTO]
    ```

2.  **Instalar dependencias (Node.js):**
    * (Se tiene que realizar la intalacion de  [Node.js](https://nodejs.org/) )
    ```bash
    # Instala los paquetes de node
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    * Crea un archivo `.env.local` en la raíz del proyecto.
    * Añade tus claves de Supabase (URL y Anon Key) obtenidas de tu panel de Supabase.
    ```ini
    # Claves públicas para el cliente de Supabase en el frontend
    NEXT_PUBLIC_SUPABASE_URL="TU_URL_DE_SUPABASE"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="TU_ANON_KEY_DE_SUPABASE"

    # (Si necesitas claves secretas para el backend, añádelas sin NEXT_PUBLIC_)
    # SUPABASE_SERVICE_ROLE_KEY="TU_SERVICE_ROLE_KEY"
    ```

---

## Despliegue

* **Vercel:** El proyecto se despliega automáticamente conectando este repositorio de Git a Vercel. Vercel detectará que es un proyecto **Next.js** y desplegará tanto el frontend como las API routes (Serverless Functions) de forma optimizada.
* **Supabase:** La base de datos, almacenamiento y autenticación ya están "desplegados" y gestionados por la plataforma de Supabase.
