const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);
const cases = require(`${process.cwd()}/db/models/doctor/cases`);

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



module.exports = casesTimeSheet;