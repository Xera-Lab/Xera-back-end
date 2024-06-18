const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const role = require('./role');


const sequelize = require(`${process.cwd()}/config/database`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const authUser = sequelize.define(
  'auth_user',
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
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
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
    modelName: 'auth_user',
    schema: 'auth',
  }
);


authUser.belongsTo(role, {
  foreignKey: 'roleId',
  targetKey: 'id',
  constraints: false
});


module.exports = authUser