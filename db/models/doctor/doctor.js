const { DataTypes } = require('sequelize');
const authUser = require('../auth/authUser');


const sequelize = require(`${process.cwd()}/config/database`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const generatToken = require(`${process.cwd()}/utils/token/generateJwtToken`);



const doctor = sequelize.define(
  'doctor',
  {
    doctorId: {
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number cannot be null',
        },
        notEmpty: {
          msg: 'Phone number cannot be empty',
        },
      },
      set(value) {
        const regex = /^\d+$/;
        if (!regex.test(value)) {
          throw new AppError(
            'Phone number must be a number',
            400
          );
        } else {
          this.setDataValue('phoneNumber', value);
        }
      },
    },
    dentalPracticeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dental Practice Name cannot be null',
        },
        notEmpty: {
          msg: 'Dental Practice Name cannot be empty',
        },
      },
    },
    practiceAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Practice Address cannot be null',
        },
        notEmpty: {
          msg: 'Practice Address cannot be empty',
        },
      },
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Specialty cannot be null',
        },
        notEmpty: {
          msg: 'Specialty cannot be empty',
        },
      },
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
    modelName: 'doctor',
    schema: 'doctor',

  }
);


doctor.belongsTo(authUser, {
  foreignKey: 'authId',
  targetKey: 'id',
  as: 'user',
  constraints: false
});

const createDoctor = async (data, transaction) => {
  try {

    const newUserDate = await doctor.create({
      authId: data.authId,
      doctorId: `DOCTOR_${data.authId}`,
      phoneNumber: data.phoneNumber,
      dentalPracticeName: data.dentalPracticeName,
      practiceAddress: data.practiceAddress,
      specialty: data.specialty
    }, { transaction });

    if (!newUserDate) {
      throw new AppError('Failed to create admin', 400);
    }

    const accessToken = generatToken({
      id: data.authId,
      roleName: data.roleName,
      userId: newUserDate.doctorId,
    });

    return { newUserDate, accessToken };
  } catch (error) {
    throw error;
  }
}

const getDoctor = async (authUserData) => {
  try {
    const userData = await doctor.findOne({
      where: {
        authId: authUserData.id
      },
    });

    if (!userData) {
      return next(new AppError('Doctor not found', 404));
    }

    const accessToken = generatToken({
      id: authUserData.id,
      roleName: authUserData.role.name,
      userId: userData.doctorId,
    });

    return { userData, accessToken };
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to get doctor', 400);
  }
}



module.exports = {
  doctor,
  createDoctor,
  getDoctor,
};