import Sequelize from "sequelize"

export default class Songs extends Sequelize.Model {
  static init(sequelize) {
    const options = {}
    options.sequelize = sequelize
    options.tableName = "songs"

    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      album_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      file_path: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      artists_name: {
        type: Sequelize.STRING(50),
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
      },
    }, options)
  }
}