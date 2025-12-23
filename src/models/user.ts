import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

export enum roles {
    ADMIN = 'ADMIN',
    AGENT = 'AGENT',
    CLIENT = 'CLIENT',
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<string>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: roles;
    declare department_id?: string;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("ADMIN", "AGENT", "CLIENT"),
        allowNull: false,
        defaultValue: roles.CLIENT,
    },
    department_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'departments',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    sequelize: database,
    tableName: 'users',
});

export default User;