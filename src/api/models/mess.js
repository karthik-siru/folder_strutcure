const db = require("../../../db");
const { DataTypes } = require("sequelize");
const student = require('./student')

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

const messAdmin = db.define(
  "messAdmin",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
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
    tableName: "messAdmin",
  }
);

mess.hasOne(messAdmin, {
  foreignKey: "messId",
  sourceKey: "messId",
});

const messUser = db.define(
  "messUser",
  {
    month: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps:false,
  },
  {
    tableName: "messUser",
  }
);


mess.hasMany(messUser, {
  foreignKey: "messId",
  sourceKey: "messId",
});

student.hasMany(messUser,{
  foreignKey: "studentId",
  sourceKey: "rollno",
});

const messAdminArchives = db.define(
  "messAdminArchives",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    phno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fromDate:{
      type: DataTypes.DATEONLY,
    },
    toDate:{
      type: DataTypes.DATEONLY,
    }
  },
  {
    timestamps:false,
  },
  {
    tableName: "messAdminArchives",
  }
);

mess.hasMany(messAdminArchives, {
  foreignKey: "messId",
  sourceKey: "messId",
});

const messReview = db.define(
  "messReview",
  {
    quality: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    taste: {
      type: DataTypes.INTEGER,
    },
    catering: {
      type: DataTypes.INTEGER,
    },
    hyginess: {
      type: DataTypes.INTEGER,
    },
    punctuality: {
      type: DataTypes.INTEGER,
    },
    month: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps:true,
  },
  {
    tableName: "messReview",
  }
);

mess.hasMany(messReview, {
  foreignKey: "messId",
  sourceKey: "messId",
});

student.hasMany(messReview,{
  foreignKey: "studentId",
  sourceKey: "rollno",
});

const messAvailability = db.define(
  "messAvailability",
  {
    boysCount: {
      type: DataTypes.INTEGER,
    },
    girlsCount: {
      type: DataTypes.INTEGER,
    },
    boysCapacity: {
      type: DataTypes.INTEGER,
    },
    girlsCapacity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps:false,
  },
  {
    tableName: "messAvailability",
  }
);

mess.hasOne(messAvailability, {
  foreignKey: "messId",
  sourceKey: "messId",
});

(async () => {
  await db.sync({alter:true});
})();

module.exports ={
 mess,
 messAdmin,
 messUser,
 messAdminArchives,
 messReview,
 messAvailability
}
