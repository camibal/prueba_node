/**
 * @api {post} /orders Crear pedido
 * @apiName CreateOrder
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiPermission user
 *
 * @apiHeader {String} Authorization Token JWT con formato "Bearer {token}"
 *
 * @apiBody {Object[]} items Lista de productos
 * @apiBody {String} items.productId ID del producto
 * @apiBody {Number} items.quantity Cantidad solicitada
 * @apiBody {String} [address] Dirección de entrega
 *
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Object} order Datos del pedido creado
 * @apiSuccess {String} order.id ID único del pedido
 * @apiSuccess {String} order.userId ID del usuario que creó el pedido
 * @apiSuccess {Object[]} order.items Lista de productos
 *
 * @apiError (401) Unauthorized Token no válido o ausente
 * @apiError (400) BadRequest Datos inválidos en la solicitud
 */

/**
 * @api {get} /orders/mine Listar mis pedidos
 * @apiName GetMyOrders
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiPermission user
 *
 * @apiHeader {String} Authorization Token JWT con formato "Bearer {token}"
 *
 * @apiSuccess {Object[]} orders Lista de pedidos del usuario
 * @apiSuccess {String} orders.id ID del pedido
 * @apiSuccess {Object[]} orders.items Productos solicitados
 * @apiSuccess {String} orders.status Estado del pedido
 *
 * @apiError (401) Unauthorized Token no válido o ausente
 */

/**
 * @api {get} /orders Listar todos los pedidos
 * @apiName GetAllOrders
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization Token JWT con formato "Bearer {token}"
 *
 * @apiSuccess {Object[]} orders Lista de pedidos
 * @apiSuccess {String} orders.id ID del pedido
 * @apiSuccess {String} orders.userId ID del usuario dueño del pedido
 * @apiSuccess {Object[]} orders.items Productos solicitados
 * @apiSuccess {String} orders.status Estado del pedido
 *
 * @apiError (401) Unauthorized Token no válido o ausente
 * @apiError (403) Forbidden Solo accesible para administradores
 */


const router = require("express").Router();
const controller = require("../controllers/order.controller");
const { verifyToken, isAdmin } = require("../middleware/authJwt");

router.post("/", verifyToken, controller.createOrder);
router.get("/mine", verifyToken, controller.getOrdersByUser);
router.get("/", verifyToken, isAdmin, controller.getAllOrders);

module.exports = router;
