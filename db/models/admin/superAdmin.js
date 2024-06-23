const { DataTypes } = require('sequelize');

const authUser = require('../auth/authUser');
const generatToken = require(`${process.cwd()}/utils/token/generateJwtToken`);


const sequelize = require(`${process.cwd()}/config/database`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const superAdmin = sequelize.define(
  'super_admin',
  {
    userId: {
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
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
    modelName: 'super_admin',
    schema: 'admin',
  }
);




superAdmin.belongsTo(authUser, {
  foreignKey: 'authId',
  targetKey: 'id',
  as: 'authUser',
  constraints: false,

});

const createSuperAdmin = async (data, transaction) => {
  try {
    const newUserDate = await superAdmin.create({
      authId: data.authId,
      userId: `SUPER_${data.authId}`,
    }, { transaction });

    if (!newUserDate) {
      throw new AppError('Failed to create super admin', 400);
    }

    const accessToken = generatToken({
      id: data.authId,
      roleName: data.roleName,
      userId: newUserDate.userId,
    });

    return { newUserDate, accessToken };
  } catch (error) {
    throw error;
  }
}

const getSuperAdmin = async (authUserData) => {
  try {
    const userData = await superAdmin.findOne({
      where: {
        authId: authUserData.id
      },
    });

    if (!userData) {
      return next(new AppError('Super admin not found', 404));
    }

    const accessToken = generatToken({
      id: authUserData.id,
      roleName: authUserData.role.name,
      userId: userData.userId,
    });

    return { userData, accessToken };
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to get super admin', 400);
  }
}




module.exports = { superAdmin, createSuperAdmin, getSuperAdmin, };