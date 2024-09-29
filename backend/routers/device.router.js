const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/device.controller");
const authJwt = require("../middleware/authJwt");

// Create a device
// POST http://localhost:5000/api/v1/devices/
router.post("/", deviceController.create);

// Get all device
// GET http://localhost:5000/api/v1/devices/
router.get("/", deviceController.getAll);

// Get a device by ID
// GET http://localhost:5000/api/v1/devices/:id
router.get("/:id",deviceController.getById);

// Update a device
// PUT http://localhost:5000/api/v1/devices/:id
router.put("/:id",deviceController.update);

// Delete a device
// DELETE http://localhost:5000/api/v1/devices/:id
router.delete("/:id",deviceController.delete);

module.exports = router;
