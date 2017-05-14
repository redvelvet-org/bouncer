module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, field: 'deleted_at' }
  };
  const classMethods = {
    associate: (models, instance) => {
      // instance.hasMany(models.Todo);
    }
  };
  return sequelize.define('User', fields, {
    paranoid: true,
    tableName: 'users',
    timestamps: true,
    classMethods
  });
};
