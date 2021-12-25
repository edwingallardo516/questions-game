# challenge-sofka

## 1. Descripción del proyecto
El proyecto esta dividido en dos partes:
#### 1.1. API
La Api proporciona el banco de preguntas al juego y guarda el historial de los jugadores. Toda la información se guarda en una base de datos llamada **challenge-sofka** en **mongoDB**.

El desarrollo de la API se encuentra en la carpeta del proyecto que lleva su mismo nombre.
##### 1.1.1. Tecnologías usadas
JavaScript, NodeJs, Express y moongose

#### 1.2. Frontend y Backend
Corresponde a la parte visual y lógica del juego.
##### 1.1.1. Tecnologías usadas
JavaScript, Vuejs y Bootstrap 5

## 2. Instalación del proyecto
#### 2.1. Prerequisitos
El proyecto no se puede ejecutar con la versión 17 de NodeJs. Para que se ejecute correctamente se recomienda la versión 16.13.0 o cualquier versión 16.
##### 2.1.1. Instalación de Nodejs 16.13.0
- Paso 1: Si no tiene instalado ***nvm*** siga [Instalar nmv en windows](https://content.breatheco.de/es/how-to/nvm-install-windows "Instalar nmv en windows")
- Paso 2: ``` nvm install 16.13.0 ```
- Paso 3: ``` nvm use 16.13.0 ```

#### 2.2. Instalación
```
npm install
```
#### 2.3. Crear archivo .env
Crear archivo .env en el directo principal del proyecto con los siguientes datos:
```
PORT_API = 8000
DB_NAME = mongodb
MONGODB_URL = mongodb+srv://edwinpga:12345@cluster0.foj8m.mongodb.net/challenge-sofka?retryWrites=true&w=majority
```
( *Recuerde guardar los cambios* )

#### 2.4. Ejecución
Para la ejecución del proyecto se deben ejecutar al mismo tiempo la API y vuejs en diferentes terminales

Terminal 1: 
```
npm run api
```
Terminal 2:
```
npm run serve
```

#### 2.5. Comandos extra

##### 2.5.1. Compilar y minimizar para producción
```
npm run build
```
##### 2.5.2. Lints and fixes files
```
npm run lint
```

