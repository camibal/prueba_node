const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");

/**
 * @api {post} /orders Crear una nueva orden
 * @apiName CreateOrder
 * @apiGroup Orders
 * @apiHeader {String} Authorization Token de autenticación (Bearer token).
 *
 * @apiBody {Object[]} productos Lista de productos a comprar.
 * @apiBody {Number} productos.productId ID del producto.
 * @apiBody {Number} productos.cantidad Cantidad solicitada.
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 * @apiSuccess {Number} orderId ID de la orden creada.
 * @apiSuccess {Number} total Total de la orden.
 * @apiSuccess {Object[]} productos Productos incluidos en la orden.
 * @apiSuccess {Number} productos.productId ID del producto.
 * @apiSuccess {Number} productos.cantidad Cantidad comprada.
 * @apiSuccess {Number} productos.precio Precio unitario del producto.
 *
 * @apiError (401) Unauthorized Usuario no autenticado.
 * @apiError (400) BadRequest Error en la validación de productos o stock insuficiente.
 */

exports.createOrder = async (req, res) => {
  try {
    const { productos } = req.body; // [{ productId, cantidad }]
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: "Debes enviar una lista de productos válida" });
    }

    let total = 0;

    const items = await Promise.all(
      productos.map(async (p) => {
        if (!p.productId || !p.cantidad) {
          throw new Error("Cada producto debe tener productId y cantidad");
        }

        const prod = await Product.findByPk(p.productId);
        if (!prod) throw new Error(`Producto con ID ${p.productId} no encontrado`);
        if (prod.cantidad < p.cantidad) throw new Error(`Stock insuficiente para ${prod.nombre}`);

        const subtotal = prod.precio * p.cantidad;
        total += subtotal;

        // Descontar stock
        prod.cantidad -= p.cantidad;
        await prod.save();

        return { productId: prod.id, cantidad: p.cantidad, precio: prod.precio };
      })
    );

    const order = await Order.create({ userId, total });
    await OrderItem.bulkCreate(items.map((i) => ({ ...i, orderId: order.id })));

    res.json({
      message: "Compra realizada con éxito",
      orderId: order.id,
      total,
      productos: items,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @api {get} /orders/mine Obtener órdenes del usuario autenticado
 * @apiName GetOrdersByUser
 * @apiGroup Orders
 * @apiHeader {String} Authorization Token de autenticación (Bearer token).
 *
 * @apiSuccess {Object[]} orders Lista de órdenes del usuario.
 * @apiSuccess {Number} orders.id ID de la orden.
 * @apiSuccess {Number} orders.total Total de la orden.
 * @apiSuccess {Object[]} orders.OrderItems Items de la orden.
 * @apiSuccess {Object} orders.OrderItems.Product Información del producto.
 */

exports.getOrdersByUser = async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.userId },
    include: [{ model: OrderItem, include: [Product] }]
  });
  res.json(orders);
};

/**
 * @api {get} /orders Obtener todas las órdenes
 * @apiName GetAllOrders
 * @apiGroup Orders
 * 
 * @apiSuccess {Object[]} orders Lista de todas las órdenes.
 * @apiSuccess {Number} orders.id ID de la orden.
 * @apiSuccess {Number} orders.total Total de la orden.
 * @apiSuccess {Object[]} orders.OrderItems Items de la orden.
 * @apiSuccess {Object} orders.OrderItems.Product Información del producto.
 */

exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [{ model: OrderItem, include: [Product] }]
  });
  res.json(orders);
};
