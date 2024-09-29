const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// สร้าง Schema สำหรับ Course
const  Device = sequelize.define(" device", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// ซิงค์ตาราง (สร้างตารางถ้ายังไม่มี)
Device.sync({ force: false })
  .then(() => {
    console.log("Table ' Device' created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });

module.exports =  Device;
