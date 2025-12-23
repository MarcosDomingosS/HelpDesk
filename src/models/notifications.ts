import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>>{
    declare id: CreationOptional<string>;
    declare user_id: string;
    declare type: string;
    declare payload: object;
    declare read_at: Date;
}

Notification.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payload: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    read_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: database,
    tableName: "notifications",
    updatedAt: false,
})