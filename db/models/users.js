const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const roles = require('./roles');


const sequelize = require(`${process.cwd()}/config/database`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const users = sequelize.define(
  'users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstName cannot be null',
        },
        notEmpty: {
          msg: 'firstName cannot be empty',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastName cannot be null',
        },
        notEmpty: {
          msg: 'lastName cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Email already in use',
      },
      validate: {
        notNull: {
          msg: 'Email cannot be null',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
        isEmail: {
          msg: 'Invalid email',
        },

      },
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be null',
        },
        notEmpty: {
          msg: 'password cannot be empty',
        },
      },

    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (this.password.length < 7) {
          throw new AppError(
            'Password length must be grater than 7',
            400
          );
        }
        if (value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError(
            'Password and confirm password must be the same',
            400
          );
        }
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
    modelName: 'users',

  }
);


users.belongsTo(roles, { foreignKey: 'roleId', as: 'role' });


module.exports = users