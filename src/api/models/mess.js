const db = require("../../../db");
const { DataTypes } = require("sequelize");

const mess = db.define(
  "mess",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    messId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey:true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isVeg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boyCapacity: {
      type: DataTypes.INTEGER,
    },
    girlCapacity: {
      type: DataTypes.INTEGER,
    },
    menu: {
      type: DataTypes.TEXT,
    },
    charges: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps:true,
  },
  {
    tableName: "mess",
  }
);

messAdmin = db.define(
  "messAdmin",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    pswd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps:true,
  },
  {
    tableName: "mess",
  }
);

mess.hasOne(messAdmin, {
  foreignKey: "messId",
  sourceKey: "messId",
});

(async () => {
  await db.sync();
})();

module.exports ={
 mess,
 messAdmin
}
