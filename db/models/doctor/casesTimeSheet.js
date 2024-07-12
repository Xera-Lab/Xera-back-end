const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);

const casesTimeSheet = sequelize.define(
  'cases_time_sheet',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    caseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caseStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigneeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    timestamps: false,
    modelName: 'cases_time_sheet',
    schema: 'doctor',
  }
);

casesTimeSheet.belongsTo(cases, {
  foreignKey: 'caseId',
  targetKey: 'id',
  as: 'case',
  constraints: false
});

casesTimeSheet.belongsTo(caseStatus, {
  foreignKey: 'caseStatus',
  targetKey: 'id',
  as: 'status',
  constraints: false
});


module.exports = casesTimeSheet;