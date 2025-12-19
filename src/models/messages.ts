import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

class Messages extends Model<InferAttributes<Messages>, InferCreationAttributes<Messages>>{
    declare id: CreationOptional<string>;
    declare ticket_id: string;
    declare sender_id: string;
    declare message: string;
    declare is_internal: boolean;
}

Messages.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    ticket_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'tickets',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    sender_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    is_internal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: database,
    tableName: 'messages',
    timestamps: true,
    updatedAt: false,
});

Messages.sync();

export default Messages;