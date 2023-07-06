const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// crear nuevos usuarios empoinst
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties: 
 *        name:
 *          type: string
 *          description:  the user  name
 *        precio:
 *          type: decimal
 *          description:  precio
 *        color:
 *          type: string
 *          description:  color
 *        marca:
 *          type: string
 *          description:  samsung
 *      required:
 *        - name
 *        - precio
 *        - color
 *        - marca
 *      example:
 *        name: Smarwatch
 *        precio: 2000
 *        color:  variedad
 *        marca:  samsung
 */
/**
 * @swagger
 * /api/smartwatch:
 *  post:
 *    summary:  tu  Compra
 *    tags: [User]
 *    requestBody:
 *      requerid: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description:  new USER  created!
 */
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
/**
 * @swagger
 * /api/smartwatch:
 *  post:
 *    summary:  tu  Compra
 *    tags: [User]
 *    requestBody:
 *      requerid: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description:  new USER  created!
 */
// obtener todos los usuarios
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// obtener solo uno en especifico
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// borrar un usuario
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// actualizar un usuario en la BD
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
