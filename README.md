# Recetario Digital 👨‍🍳

Una aplicación web elegante y moderna para gestionar tus recetas favoritas.

## 🌟 Características

- Interfaz de usuario moderna y profesional
- Gestión completa de recetas (crear, ver, eliminar)
- Diseño responsive para todos los dispositivos
- Animaciones suaves y feedback visual
- Tipografía elegante y legible

## 🛠️ Tecnologías Utilizadas

### Frontend
- React + Vite
- CSS moderno con variables y animaciones
- Bootstrap para el sistema de grid
- Fuentes: Cormorant Garamond y Montserrat

### Backend
- Node.js + Express
- MongoDB para la base de datos
- Arquitectura MVC
- API RESTful

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone [URL del repositorio]
```

2. Instala las dependencias del backend:
```bash
cd backend
npm install
```

3. Instala las dependencias del frontend:
```bash
cd frontend
npm install
```

4. Configura las variables de entorno:
   - Crea un archivo `.env` en la carpeta backend
   - Añade la URL de conexión a MongoDB

## 🔧 Uso

1. Inicia el servidor backend:
```bash
cd backend
npm start
```

2. Inicia el servidor frontend:
```bash
cd frontend
npm run dev
```

3. Abre http://localhost:5175 en tu navegador

## 📝 Estructura del Proyecto

```
RecipesProject/
├── frontend/              # Aplicación React
│   ├── src/              # Código fuente
│   ├── public/           # Archivos estáticos
│   └── package.json      # Dependencias frontend
│
└── backend/              # Servidor Node.js
    ├── src/             # Código fuente
    │   ├── routes/      # Rutas de la API
    │   ├── models/      # Modelos de datos
    │   └── helpers/     # Funciones auxiliares
    └── package.json     # Dependencias backend
```

## 👤 Autor

Daniel Loaiza

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
