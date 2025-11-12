# Propuesta Página Web Carrera Computación

Sitio web frontend para la Escuela de Ingeniería en Computación de la Universidad de La Serena. Desarrollado con React, TypeScript y Tailwind CSS.

## Características

- **Página de Inicio** - Hero section con información del programa
- **Noticias** - Listado de noticias y eventos
- **Estudiantes** - Perfiles de estudiantes
- **Plan de Estudios** - Malla curricular completa
- **Contacto** - Formulario de contacto y información de contacto
- **Autenticación** - Login y registro con almacenamiento local
- **Diseño Responsivo** - Funciona en móvil, tablet y desktop
- **Interfaz Moderna** - Diseño limpio y profesional

## Requisitos

- Node.js 18+ 
- npm o pnpm

## Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
```

2. **Instalar dependencias**
```bash
npm install
# o
pnpm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
# o
pnpm dev
```

El sitio se abrirá automáticamente en `http://localhost:5173`

## Estructura del Proyecto

```
Proyecto Página Carrera/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navegación principal
│   │   └── Footer.tsx           # Pie de página
│   │   ├── LoadingSpinner.tsx   # Componente de carga
│   │   └── ErrorBoundary.tsx    # Manejo de errores
│   ├── pages/
│   │   ├── Homepage.tsx         # Página principal
│   │   ├── Login.tsx            # Inicio de sesión
│   │   ├── Registro.tsx        
│   │   ├── Noticias.tsx            
│   │   ├── Estudiantes.tsx       
│   │   ├── PlanEstudios.tsx       
│   │   └── Contacto.tsx  
│   │   └── CEC.tsx              # Falta por Agregar
│   │   └── Admin/
│   │       ├── Dashboard.tsx    # Panel admin
│   │       ├── EstudiantesCRUD.tsx # CRUD docentes 
│   │       └── NoticiasCRUD.tsx # CRUD noticias
│   ├── hooks/
│   │   └── useAuth.ts          # Hook de autenticación
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── public/                     # Archivos estáticos
├── index.html                  # HTML principal
├── package.json                # Dependencias
├── tsconfig.json               # Configuración TypeScript
├── vite.config.ts              # Configuración Vite
├── tailwind.config.js          # Configuración Tailwind
└── README.md                   # Este archivo
```

## Colores y Estilos

- **Primario**: Azul (#1e40af)
- **Secundario**: Gris oscuro (#111827)
- **Acento**: Amarillo (#eab308)
- **Fuente**: Inter (Google Fonts)

## Autenticación

La autenticación es **local** (sin backend). Los datos se guardan en `localStorage`.

**Datos de prueba:**
- Email: `test@userena.cl`
- Contraseña: `contraseña123`

### Requisitos de contraseña:
- Mínimo 6 caracteres

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## Dependencias Principales

- **React 19** - Librería UI
- **React Router DOM 6** - Enrutamiento
- **TypeScript** - Tipado estático
- **Tailwind CSS 3** - Estilos utilitarios
- **Vite** - Bundler rápido
- **Lucide React** - Iconos


##  Colaboradores

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

**Última actualización**: 11 Noviembre 2025
