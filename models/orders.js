'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // order모델 - user모델 : N:1 관계
            this.belongsTo(models.Users, {
                targetKey: 'userId',
                foreignKey: 'userId',
            });

            // // order모델 - store모델 : N:1 관계
            this.belongsTo(models.Stores, {
                targetKey: 'storeId',
                foreignKey: 'storeId',
            });

            // order모델 -  orderMenu모델 : 1:N 관계
            this.hasMany(models.OrderMenus, {
                sourceKey: 'orderId',
                foreignKey: 'orderId',
            });
        }
    }
    Orders.init(
        {
            orderId: {
                allowNull: false, // NOT NULL
                autoIncrement: true, // AUTO_INCREMENT
                primaryKey: true, // Primary Key (기본키)
                type: DataTypes.INTEGER,
            },
            storeId: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
            },
            totalPrice: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
            },
            delivery: {
                allowNull: false, // NOT NULL
                type: DataTypes.BOOLEAN,
                default: false,
            },
            createdAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Orders',
        },
    );
    return Orders;
};
