Skill: Refactorización Next.js (App Router) + Tailwind para SO Web

Fronteras de Cliente/Servidor: Todo componente que maneje estado de ventanas, z-index, o eventos del DOM (onClick, onDrag) debe iniciar con 'use client'. Mantén los Server Components estrictamente para el layout base o carga de metadatos.

Gestión de Estado: Extrae la lógica compleja de estado fuera de los componentes visuales. Si varios componentes necesitan saber qué ventana está activa, sugiere un gestor global (Zustand o React Context) en lugar de pasar props infinitas.

Tailwind CSS: Evita cadenas de clases kilométricas directamente en el JSX si se repiten. Usa utilidades de composición (como clsx o tailwind-merge) o extrae componentes pequeños (ej. <WindowButton />) para mantener el código limpio.

Fidelidad: No alteres el diseño visual. El objetivo es mejorar la estructura del código, no rediseñar Windows XP.
