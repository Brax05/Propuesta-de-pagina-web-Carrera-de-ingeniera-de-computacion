# Propuesta de Página Web — Carrera de Ingeniería en Computación

Proyecto web con arquitectura moderna basada en **TypeScript**. El **Frontend** está desarrollado con **Vite (React)** y desplegado en **Vercel**. **Supabase** se utiliza como backend completo para base de datos, almacenamiento de archivos, autenticación y lógica adicional mediante funciones.

---

##  Stack Tecnológico

### **Frontend — Vite (React + TypeScript)**

* Construcción rápida y modular del Frontend.
* Desplegado automáticamente en **Vercel**.

### **Backend / Servicios — Supabase**

* **Base de Datos:** PostgreSQL administrado.
* **Storage:** Almacenamiento de imágenes, videos y otros archivos.
* **Auth:** Gestión de usuarios, sesiones y seguridad.
* **Funciones:** Posibilidad de agregar lógica backend con Supabase Functions.

---

##  Configuración del Proyecto

### 1. **Clonar el repositorio**

```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

### 2. **Instalar dependencias**

Asegúrate de tener **Node.js** instalado.

```bash
npm install
```

### 3. **Configurar variables de entorno**

Crea un archivo **`.env.local`** en la raíz del proyecto.

Agrega tus claves públicas de Supabase:

```bash
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Estas claves se obtienen desde el panel de Supabase.

---

##  Despliegue

### **Frontend — Vercel**

* Se despliega automáticamente al conectar el repositorio.
* Vercel detecta el proyecto **Vite** y realiza una compilación optimizada.

### **Backend — Supabase**

* La base de datos y servicios ya quedan activos desde Supabase.
* No requiere configuración adicional más allá de las variables de entorno.

---

## 👥 Colaboradores

**Líder:** Sady Guzman

**Arquitecto de Software:** Nicolas Malebran

**Diseñadora UI/UX:** Amaranta V.

* **Tester/QA:** Miguel C.

**SysAdmin y DevOps:** Brandon M.

* **DB:** Josue B., Cristobal A.

**Líder de Desarrollo:** Matias Fierro

* **Frontend:** Joselyn M.
* **Backend:** Benjamin U., Emilio M.

Proyecto desarrollado por **404 Solutions****.
