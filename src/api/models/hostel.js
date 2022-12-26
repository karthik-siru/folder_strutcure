const db = require("../../../db");
const { DataTypes } = require("sequelize");
const student = require('./student')

const hostel = db.define(
  "hostel",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hostelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey:true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floors: {
      type: DataTypes.INTEGER,
    },
    phno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps:true,
  },
  {
    tableName: "hostel",
  }
);

const hostelSecretary = db.define(
  "hostelSecretary",
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
    tableName: "hostelSecretary",
  }
);

hostel.hasOne(hostelSecretary, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

const hostelUser = db.define(
  "hostelUser",
  {
    room: {
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
    tableName: "hostelUser",
  }
);

hostel.hasMany(hostelUser, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

student.hasMany(hostelUser,{
  foreignKey: "studentId",
  sourceKey: "rollno",
});

const hostelSecretaryArchives = db.define(
  "hostelSecretaryArchives",
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
    tableName: "hostelSecretaryArchives",
  }
);

hostel.hasMany(hostelSecretaryArchives, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});


const hostelWarden = db.define(
  "hostelWarden",
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
    department: {
      type: DataTypes.STRING
    },
  },
  {
    timestamps:true,
  },
  {
    tableName: "hostelWarden",
  }
);

hostel.hasMany(hostelWarden, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

const hostelWardenArchives = db.define(
  "hostelWardenArchives",
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
    phno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    department: {
      type: DataTypes.STRING
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
    tableName: "hostelWardenArchives",
  }
);

hostel.hasMany(hostelWardenArchives, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

const careTaker = db.define(
  "careTaker",
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
    tableName: "careTaker",
  }
);

hostel.hasOne(careTaker, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

const careTakerArchives = db.define(
  "careTakerArchives",
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
    tableName: "careTakerArchives",
  }
);

hostel.hasMany(careTakerArchives, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

(async () => {
  await db.sync({alter:true});
})();

module.exports ={
 hostel,
 hostelSecretary,
 hostelUser,
 hostelSecretaryArchives,
 hostelWarden,
 hostelWardenArchives,
 careTaker,
 careTakerArchives
}
