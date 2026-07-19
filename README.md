# Registry Points

App para gestionar puntos escolares: colegios, cursos, asignaturas, profesores, estudiantes y registro de puntos.

## Roles

- **Superadmin**: administra colegios.
- **Colegio**: administra cursos, asignaturas, profesores, estudiantes y asignaciones.
- **Profesor**: crea categorías de puntos, las asigna y registra puntos a estudiantes.

## Stack

React 19 + TypeScript · Vite · Tailwind CSS · React Router · Jotai · React Hook Form · React Hot Toast

## Requisitos

- Node.js 18+
- pnpm o npm
- API en `http://localhost:8000/api`

## Instalación y uso

```bash
pnpm install
npm run dev
```

## Estructura

```
src/
├── admin/                          # Superadmin
├── admin-teacher/                  # Home del profesor
├── auth/                           # Login y protección de rutas
├── courses/
├── dashboard-school/                # Dashboard del colegio
├── point-categorys/                 # Categorías de puntos
├── point-categories-assignments/    # Asignación de categorías
├── registry-points/                 # Registro de puntos
├── students/
├── subjects/
├── teachers/
├── shared/                          # Layouts, componentes e interfaces comunes
└── utils/                           # Helpers (fetch, etc.)
```

## Rutas principales

| Ruta | Rol |
|---|---|
| `/auth/login` | Público |
| `/admin/home` | Superadmin |
| `/school/home` | Colegio |
| `/teacher/home` | Profesor |
| `/teacher/registry-points` | Profesor |
