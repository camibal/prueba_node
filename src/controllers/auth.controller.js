const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = "secreto_api";

/**
 * @api {post} /users/register Registrar un nuevo usuario
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiBody {String} username Nombre de usuario.
 * @apiBody {String} password Contraseña del usuario (será encriptada).
 * @apiBody {String="admin","user"} role Rol del usuario.
 *
 * @apiSuccess {Number} id ID del usuario creado.
 * @apiSuccess {String} username Nombre de usuario.
 * @apiSuccess {String} role Rol asignado.
 * @apiSuccess {Date} createdAt Fecha de creación.
 * @apiSuccess {Date} updatedAt Fecha de actualización.
 *
 * @apiError (Error 500) InternalServerError Error interno al registrar usuario.
 */

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @api {post} /users/login Iniciar sesión
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiBody {String} username Nombre de usuario.
 * @apiBody {String} password Contraseña del usuario.
 *
 * @apiSuccess {String} token Token JWT válido por 1 día.
 * @apiSuccess {String} role Rol del usuario autenticado.
 *
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 401) Unauthorized Credenciales inválidas.
 * @apiError (Error 500) InternalServerError Error interno al iniciar sesión.
 */

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
