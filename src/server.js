const express = require("express");
const sequelize = require("./config/database");

const app = express();
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// Sincronización BD
sequelize.sync({ alter: true }).then(() => {
  console.log("Base de datos sincronizada");
  app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
});
