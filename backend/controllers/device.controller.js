const Device = require("../models/device.model");

// Create and Save a New device
exports.create = async (req, res) => {
  const { name, type, price,imageUrl } = req.body;

  if (!name || !type || !price || !imageUrl) {
    return res.status(400).send({
      message: "Name and Description cannot be empty!",
    });
  }

  // Check if the device already exists
  await Device.findOne({ where: { name: name } }).then((device) => {
    if (device) {
      return res.status(400).send({
        message: "Course already exists!",
      });
    }

    // Create a New device
    const newDevice = {
      name:name,
      type:type,
      price:price,
      imageUrl:imageUrl
    };

    Device.create(newDevice)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error occurred creating the  Device.",
        });
      });
  });
};

// Get all courses
exports.getAll = async (req, res) => {
  await  Device.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred retrieving  Device.",
      });
    });
};

// Get a course by ID
exports.getById = async (req, res) => {
  const id = req.params.id;

  await  Device.findByPk(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Not found  Device with id " + id });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred retrieving the Device.",
      });
    });
};

// Update a course
exports.update = async (req, res) => {
  const id = req.params.id;

  await  Device.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " Device was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update  Device with id=" +
            id +
            ". Maybe  Device was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred updating the  Device.",
      });
    });
};

// Delete a  Device
exports.delete = async (req, res) => {
  const id = req.params.id;

  await  Device.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " Device was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete Device with id " + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred deleting the Device.",
      });
    });
};
