import jwt from 'jsonwebtoken';

const resource = dotenv.config({path:'../../.env'})

const KEYSEED = resource.parsed.SEEDKEY


const secretKey = KEYSEED;


// Función para generar un JWT
function generarToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expira en 1 hora
}

// Función para verificar un JWT
 function verificarToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null; // Retorna null si el token no es válido
    }
    }    



export { generarToken, verificarToken};
