# Audit Ambient

**Audit Ambient** es una aplicación web diseñada para gestionar auditorías ambientales de manera eficiente. Permite a los usuarios llenar formularios de auditoría, visualizar los datos mediante gráficos interactivos, comparar auditorías pasadas y generar informes PDF para su análisis y presentación.

## Características

- **Formulario de Auditoría**: Rellena y guarda las auditorías ambientales.
- **Dashboard Interactivo**: Visualiza gráficos con datos de las auditorías de forma clara y precisa.
- **Comparación de Auditorías**: Compara diferentes auditorías para obtener información útil sobre el desempeño ambiental.
- **Generación de Informes**: Crea informes en formato PDF a partir de los datos de las auditorías.
- **Diseño Responsivo**: La aplicación es completamente funcional tanto en dispositivos de escritorio como móviles.

## Tecnologías

- **React**: Librería JavaScript para la construcción de interfaces de usuario.
- **TailwindCSS**: Framework CSS para el diseño responsivo y la personalización del estilo.
- **Chart.js**: Librería para crear gráficos interactivos y visualizaciones de datos.
- **PrimeReact**: Librería de componentes React de interfaz de usuario con diseño moderno.
- **jsPDF & jsPDF-AutoTable**: Herramientas para la creación de archivos PDF y tablas en los informes generados.
- **React Router DOM**: Manejo de rutas para la navegación entre vistas en la aplicación.

## Instalación

### Requisitos previos

Antes de comenzar, asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu sistema.

### Pasos para configurar el proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/audit-ambient.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd audit-ambient
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia la aplicación en modo de desarrollo:

   ```bash
   npm start
   ```

   Esto abrirá la aplicación en `http://localhost:3000`.

### Scripts disponibles

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Crea una versión optimizada de producción de la aplicación.
- `npm test`: Ejecuta los tests de la aplicación.
- `npm run eject`: Eyecta la configuración de `react-scripts` para una personalización avanzada.

## Uso

1. **Llenar Auditoría**: Accede a la sección de "Rellenar Auditoría" para completar los formularios.
2. **Ver Dashboard**: Visualiza los datos de las auditorías en gráficos interactivos.
3. **Comparar Auditorías**: Compara datos de auditorías previas para analizar el progreso.
4. **Generar Informes**: Crea y descarga informes en formato PDF con los datos de las auditorías.