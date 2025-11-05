# Propuesta de pagina web Carrera de ingeniera de computacion
Proyecto web con arquitectura desacoplada. Frontend en Bootstrap desplegado en Vercel para una UI responsiva. 
Backend como API RESTful en Flask (Python) que gestiona la lógica.
Supabase provee la persistencia de datos con PostgreSQL para tablas relacionales y su servicio de Storage para archivos multimedia.


# [404 Solutions]



---

## 🚀 Stack Tecnológico

Este proyecto utiliza una arquitectura moderna y desacoplada, aprovechando los siguientes servicios y frameworks:

* **Frontend:** [Bootstrap](https://getbootstrap.com/)
    * Un framework CSS responsivo para construir interfaces de usuario rápidas y limpias.

* **Backend:** [Flask](https://flask.palletsprojects.com/) (Python)
    * Un microframework ligero y flexible para construir la API y la lógica del servidor.

* **Base de Datos y Servicios:** [Supabase](https://supabase.com/)
    * Utilizado como la base de datos principal **PostgreSQL**.
    * Maneja el **almacenamiento multimedia** (storage) para archivos, imágenes y videos.
    * (Opcional: también puede gestionar la autenticación de usuarios).

* **Despliegue:**
    * **Vercel:** Despliegue y hosting del frontend (Bootstrap/HTML/CSS/JS).
    * **Supabase:** Hosting de la base de datos PostgreSQL y el almacenamiento de archivos.

---

##  Primeros Pasos (Configuración)

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO]
    cd [NOMBRE_DEL_PROYECTO]
    ```

2.  **Configurar el Backend (Flask):**
    * (Se asume que tienes Python y pip instalados)
    ```bash
    # Navega a la carpeta del backend (ajústalo si es necesario)
    cd backend/

    # Crea un entorno virtual
    python -m venv venv

    # Activa el entorno (Windows)
    .\venv\Scripts\activate
    # Activa el entorno (Mac/Linux)
    source venv/bin/activate

    # Instala las dependencias
    pip install -r requirements.txt
    ```

3.  **Configurar Variables de Entorno:**
    * Crea un archivo `.env` en la raíz (o en la carpeta del backend).
    * Añade tus claves de Supabase (URL y Anon Key) obtenidas de tu panel de Supabase.
    ```ini
    SUPABASE_URL="TU_URL_DE_SUPABASE"
    SUPABASE_KEY="TU_ANON_KEY_DE_SUPABASE"
    ```

---

##  Despliegue

* **Vercel:** El frontend se despliega automáticamente conectando este repositorio de Git a un proyecto de Vercel. Vercel detectará los archivos estáticos (HTML/CSS/JS) y los servirá globalmente.
* **Supabase:** La base de datos y el almacenamiento ya están "desplegados" y gestionados por la plataforma de Supabase.
