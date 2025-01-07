# Proyecto Cine Frontend

Este es el frontend del proyecto de reserva de asientos para un cine. La aplicación permite a los usuarios seleccionar y reservar asientos para diferentes películas.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/ericklasluisa/cine-frontend.git
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Inicia la aplicación:
    ```bash
    npm run dev
    ```
2. Abre tu navegador y navega a `http://localhost:5173`.

## Estructura del Proyecto

```plaintext
cine-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PeliculaCard.jsx
│   │   ├── Seat.jsx
│   │   └── SeatGrid.jsx
│   ├── hooks/
│   │   └── useSocket.js
│   ├── pages/
│   │   └── reservaPage.jsx
│   ├── api.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Tecnologías Utilizadas

- React
- React Router
- Socket.io
- SweetAlert2
- Tailwind CSS
