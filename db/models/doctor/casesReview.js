const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);
const cases = require(`${process.cwd()}/db/models/doctor/cases`);

const casesReview = sequelize.define(
  'cases_review',
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
    reviewerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    timestamps: false,
    modelName: 'cases_review',
    schema: 'doctor',
  }
);

casesReview.belongsTo(cases, {
  foreignKey: 'caseId',
  targetKey: 'id',
  as: 'case',
  constraints: false
});


module.exports = casesReview;