# Chat real time Node.js + React.js + Socket . io

**Puedes hacer una prueba de este software en el siguiente link:**
[Clickea aqui](https://realtimechat-brian.herokuapp.com)

## ¿Como funciona?

Esta aplicacion web esta conectada con una base de datos MongoDB asi que para hacerla funcionar deberas poner tus credenciales en un archivo `.env` te dejo una muestra de las variables de entorno en el archivo `.env.example`, alli tambien deberas poner el secret key para la validacion con **JWT**.

La base de datos debera tener 3 colecciones (students, teachers, messages) para poder funcionar.

**La variable de entorno `ENV` puede ser production o development**

En el `package.json` estan listadas todas las dependencias que utiliza la aplicacion y los scripts que se pueden ejecutar, con un simple `npm install` deberas poder ejecutar el servidor en modo produccion con el comando `npm run start:dev`

-> Para correr la suit de prueba unitarias `npm run test` 

Puede haber problemas con las librerias de *jest* y *nodemon* asi que recomiendo instalarlas de manera de global.

`npm install jest nodemon -g`

## ¿Como funciona el registro en el link de prueba?

En esta aplicacion solo te puedes registrar como estudiante y para acceder como Profesor o Moderador deberas acceder con las siguientes credenciales.

Claro que si te registraste podras acceder como estudiante.

**Usuario:** Moderador
**Contraseña:** 12345678

**Recuerda poner el flag 'Soy profesor'**

## Notas importantes

* La aplicacion **no es responsive** asi que solo funcionara adecuadamente en la pantalla de un PC 
* Puedes ejecutar la aplicacion con Docker haciendo uso del Dockerfile
