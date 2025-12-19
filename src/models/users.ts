import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

export enum roles {
    ADMIN = 'ADMIN',
    AGENT = 'AGENT',
    CLIENT = 'CLIENT',
}

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>>{
    declare id: CreationOptional<string>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: roles;
}

Users.init({
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
}, {
    sequelize: database,
    tableName: 'users',
});

Users.sync();
export default Users;