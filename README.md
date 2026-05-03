<p align="center">
  <img src="assets/logo.png" alt="Logo SCESI Promesas" width="180">
</p>

<h1 align="center">CSESI Promesas G11</h1>

<p align="center">
  <strong>Proyecto educativo de ciberseguridad desarrollado por el equipo SCESI Promesas.</strong><br>
  <em>Proyecto grupal desarrollado para practicar Git, GitHub, ramas, commits, Pull Requests, reviews y buenas prácticas de trabajo colaborativo.</em>
</p>

---

## Integrantes

| Nombre completo | Teléfono | Correo electrónico |
|---|---:|---|
| Jose Brayan Cruz Muruchi | 77989553 | jbcruz88888@gmail.com |
| Andrés Orlando Chávez Rosales | 67487957 | andresochavezr@gmail.com |
| Veliz Mamani Darlyn Alejandra | 77433898 | darlinalejandra87@gmail.com |
| Viraca Pacolla Joel Carlos | 64866872 | joelviraca@gmail.com |

---

## Tema del proyecto

Este proyecto consiste en un **sitio web educativo sobre ciberseguridad**.  
Su objetivo principal es explicar de forma clara, visual y práctica conceptos básicos relacionados con amenazas comunes, protección digital, seguridad web, prevención y buenas prácticas al navegar por internet.

## Objetivos del proyecto

- Practicar el uso de Git y GitHub en equipo.
- Aplicar un flujo de trabajo basado en ramas (Git Flow básico).
- Utilizar ramas principales como `main` y `develop`.
- Crear ramas `feature` para desarrollar funcionalidades específicas.
- Realizar commits pequeños, claros y descriptivos.
- Trabajar mediante Pull Requests (PRs).
- Aplicar revisiones de código antes de integrar cambios.
- Crear un sitio web informativo, ordenado y responsive.

## Tecnologías utilizadas

- **HTML5**: Estructura semántica del sitio web.
- **CSS3**: Estilos, animaciones, variables de diseño y maquetación responsive.
- **JavaScript (Vanilla)**: Lógica de interactividad, validadores de contraseñas, quiz y efectos visuales.
- **Git**: Control de versiones local.
- **GitHub**: Alojamiento del repositorio y trabajo colaborativo.

---

## Estructura del repositorio

El proyecto está organizado de la siguiente manera, separando los estilos y scripts para mantener el código limpio y modular:

```text
scesi-promesas-g11/
├── assets/
│   └── logo.png         # Recursos visuales (imágenes, logos)
├── .gitignore           # Archivos y carpetas ignorados por Git
├── amenazas.css         # Estilos específicos para la sección de amenazas
├── amenazas.js          # Lógica de animaciones e intersecciones para amenazas
├── index.html           # Página principal (Inicio, Seguridad Web, Prevención, Quiz)
├── proteccion.html      # Módulo detallado sobre Protección y Privacidad
├── script.js            # Lógica principal, menú, quiz y validador de contraseñas
├── styles.css           # Hoja de estilos principal y variables globales
└── README.md            # Documentación del proyecto
```
## Módulos del sitio web
El sitio web está dividido en diferentes secciones interactivas:

Inicio: Presentación general del proyecto y navegación principal.

Amenazas comunes: Información sobre ataques como phishing, malware, ransomware, spyware e ingeniería social.

Protección y privacidad (proteccion.html): Módulo dedicado a buenas prácticas para proteger cuentas, generador de contraseñas seguras, autenticación en dos pasos (2FA) simulada y privacidad digital.

Seguridad web: Explicación de protocolos HTTPS, cookies, formularios seguros y riesgos al navegar.

Prevención: Recomendaciones para evitar enlaces sospechosos, descargas inseguras y sitios falsos.

Quiz interactivo: Preguntas básicas con un sistema de puntuación para reforzar los conocimientos aprendidos.

## Flujo de trabajo (Git & GitHub)
El equipo trabaja usando ramas separadas por funcionalidad para evitar conflictos directos en el código de producción.

### Ramas principales

main: Rama principal del proyecto estable. Solo contiene código funcional y revisado.
develop: Rama de integración donde se unen las funcionalidades antes de pasar a main.

### Ramas de trabajo (feature)
Ejemplos de ramas utilizadas durante el desarrollo:
```Bash
feature/add-home-page
feature/add-cyber-threats-section
feature/add-cyber-protection-section
feature/add-web-security-quiz
feature/integrate-web-security-quiz
```
Proceso: Cada integrante trabaja en una rama feature y luego crea un Pull Request hacia develop. Una vez revisado por el equipo, se aprueba y se hace merge.

## Cómo ejecutar el proyecto
Al ser un proyecto estático que utiliza únicamente tecnologías web nativas, no necesitas instalar dependencias complicadas.

#### Opción 1: Ejecución rápida (Navegador)

Clonar el repositorio:
```Bash
git clone git@github.com:ChAndres05/scesi-promesas-g11.git
```
Entrar a la carpeta del proyecto:
```Bash
cd scesi-promesas-g11
```
Abrir el proyecto:
```
Haz doble clic en el archivo index.html o arrástralo directamente a tu navegador web favorito (Chrome, Firefox, Edge, etc.).
```
#### Opción 2: Para desarrollo (Live Server en VS Code)

Si deseas editar el código y ver los cambios en tiempo real:
Abre la carpeta del proyecto en Visual Studio Code.
Asegúrate de tener instalada la extensión Live Server.
Haz clic derecho sobre el archivo index.html y selecciona "Open with Live Server".
