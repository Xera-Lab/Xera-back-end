const { DataTypes } = require('sequelize');

const authUser = require('../auth/authUser');
const generatToken = require(`${process.cwd()}/utils/token/generateJwtToken`);


const sequelize = require(`${process.cwd()}/config/database`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const admin = sequelize.define(
  'admin',
  {
    adminId: {
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
    modelName: 'admin',
    schema: 'admin',
  }
);




admin.belongsTo(authUser, {
  foreignKey: 'authId',
  targetKey: 'id',
  constraints: false
});


const createAdmin = async (data, transaction) => {
  try {
    const newUserDate = await admin.create({
      authId: data.authId,
      adminId: `ADMIN_${data.authId}`,
    }, { transaction });

    if (!newUserDate) {
      throw new AppError('Failed to create admin', 400);
    }

    const accessToken = generatToken({
      id: data.authId,
      roleName: data.roleName,
      [`${data.roleName}Id`]: newUserDate.adminId,
    });

    return { newUserDate, accessToken };
  } catch (error) {
    throw error;
  }
}

const getAdmin = async (authUserData) => {
  try {
    const userData = await admin.findOne({
      where: {
        authId: authUserData.id
      },
    });

    if (!userData) {
      return next(new AppError('Admin not found', 404));
    }

    const accessToken = generatToken({
      id: authUserData.id,
      roleName: authUserData.role.name,
      [`${authUserData.role.name}Id`]: userData.adminId,
    });

    return { userData, accessToken };
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to get admin', 400);
  }
}



module.exports = {
  admin,
  createAdmin,
  getAdmin,
};