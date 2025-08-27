const Product = require("../models/product");

/**
 * @api {post} /products Crear producto
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiDescription Crea un nuevo producto en el sistema.
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

exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

/**
 * @api {get} /products Obtener productos
 * @apiName GetProducts
 * @apiGroup Product
 * @apiDescription Obtiene la lista de todos los productos.
 *
 * @apiSuccess {Object[]} products Lista de productos.
 * @apiSuccess {Number} products.id ID del producto.
 * @apiSuccess {String} products.name Nombre del producto.
 * @apiSuccess {Number} products.price Precio del producto.
 * @apiSuccess {String} products.description Descripción del producto.
 */

exports.getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

/**
 * @api {put} /products/:id Actualizar producto
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiDescription Actualiza los datos de un producto existente.
 *
 * @apiParam {Number} id ID del producto.
 * @apiBody {String} [name] Nombre del producto.
 * @apiBody {Number} [price] Precio del producto.
 * @apiBody {String} [description] Descripción del producto.
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 */

exports.update = async (req, res) => {
  const { id } = req.params;
  await Product.update(req.body, { where: { id } });
  res.json({ message: "Producto actualizado" });
};

/**
 * @api {delete} /products/:id Eliminar producto
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiDescription Elimina un producto por su ID.
 *
 * @apiParam {Number} id ID del producto.
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 */

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.json({ message: "Producto eliminado" });
};
