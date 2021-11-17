'use strict'

var app = require('./app'); // se importa el modulo app al indexjs
var port = 3000; // puerto del servidor

app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
})








