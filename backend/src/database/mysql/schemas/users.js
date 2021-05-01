import Sequelize from "sequelize"

export default class Users extends Sequelize.Model {
  static init(sequelize) {
    const options = {}
    options.sequelize = sequelize
    options.tableName = "users"

    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      is_deleted: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        allowNull: false
      }
    }, options)
  }
}