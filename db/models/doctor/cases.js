const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);
const { doctor } = require(`${process.cwd()}/db/models/doctor/doctor`);
const { admin } = require(`${process.cwd()}/db/models/admin/admin`);
// const caseType = require(`${process.cwd()}/db/models/doctor/caseType`);
const services = require(`${process.cwd()}/db/models/services/services`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);

const cases = sequelize.define(
  'cases',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    patientId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    caseUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    numberOfTooth: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    preferredCompletionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    additionalNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    needMeeting: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    assigneeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'cases',
    schema: 'doctor',
  }
);

cases.belongsTo(doctor, {
  foreignKey: 'doctorId',
  targetKey: 'doctorId',
  as: 'doctor',
  constraints: false
});

cases.belongsTo(admin, {
  foreignKey: 'adminId',
  targetKey: 'adminId',
  as: 'admin',
  constraints: false
});

cases.belongsTo(caseStatus, {
  foreignKey: 'statusId',
  targetKey: 'id',
  as: 'status',
  constraints: false
});

cases.belongsTo(services, {
  foreignKey: 'serviceId',
  targetKey: 'id',
  as: 'servicesType',
  constraints: false
});

module.exports = cases;