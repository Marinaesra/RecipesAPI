const crypto = require('crypto');
 
const secret = 'Full stack 17';
const secret2 = 'Actualizo con más seguridad TOKEN DE REFRESCO';
 
const hash = crypto.createHmac('sha256',secret).update(secret2).digest("hex");
 
console.log(hash);