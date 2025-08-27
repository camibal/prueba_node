/**
 * @api {post} /products Crear producto
 * @apiName CreateProduct
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization Token JWT con prefijo `Bearer`.
 *
 * @apiBody {String} name Nombre del producto.
 * @apiBody {Number} price Precio del producto.
 * @apiBody {String} [description] Descripción opcional del producto.
 *
 * @apiSuccess {Number} id ID del producto creado.
 * @apiSuccess {String} name Nombre del producto.
 * @apiSuccess {Number} price Precio del producto.
 * @apiSuccess {String} description Descripción del producto.
 */

/**
 * @api {get} /products Obtener productos
 * @apiName GetProducts
 * @apiGroup Products
 * @apiPermission user
 *
 * @apiHeader {String} Authorization Token JWT con prefijo `Bearer`.
 *
 * @apiSuccess {Object[]} products Lista de productos.
 * @apiSuccess {Number} products.id ID del producto.
 * @apiSuccess {String} products.name Nombre del producto.
 * @apiSuccess {Number} products.price Precio del producto.
 * @apiSuccess {String} products.description Descripción del producto.
 */

/**
 * @api {put} /products/:id Actualizar producto
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization Token JWT con prefijo `Bearer`.
 *
 * @apiParam {Number} id ID del producto a actualizar.
 *
 * @apiBody {String} [name] Nombre del producto.
 * @apiBody {Number} [price] Precio del producto.
 * @apiBody {String} [description] Descripción del producto.
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 */

/**
 * @api {delete} /products/:id Eliminar producto
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization Token JWT con prefijo `Bearer`.
 *
 * @apiParam {Number} id ID del producto a eliminar.
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 */

const router = require("express").Router();
const controller = require("../controllers/product.controller");
const { verifyToken, isAdmin } = require("../middleware/authJwt");

router.post("/", verifyToken, isAdmin, controller.create);
router.get("/", verifyToken, controller.getAll);
router.put("/:id", verifyToken, isAdmin, controller.update);
router.delete("/:id", verifyToken, isAdmin, controller.delete);

module.exports = router;
