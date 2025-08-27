/**
 * @api {post} /register Registrar usuario
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiBody {String} username Nombre de usuario
 * @apiBody {String} email Correo electrónico
 * @apiBody {String} password Contraseña
 *
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Object} user Datos del usuario creado
 * @apiSuccess {String} user.id ID único del usuario
 * @apiSuccess {String} user.username Nombre de usuario
 * @apiSuccess {String} user.email Correo electrónico
 *
 * @apiError (400) BadRequest Faltan campos requeridos o datos inválidos
 * @apiError (409) Conflict El usuario ya existe
 */

/**
 * @api {post} /login Iniciar sesión
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiBody {String} email Correo electrónico
 * @apiBody {String} password Contraseña
 *
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {String} token Token JWT para autenticación
 *
 * @apiError (401) Unauthorized Credenciales inválidas
 */


const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.post("/register", auth.register);
router.post("/login", auth.login);

module.exports = router;
