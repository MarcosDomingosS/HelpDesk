import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

class Departments extends Model<InferAttributes<Departments>, InferCreationAttributes<Departments>>{
    declare id: CreationOptional<string>;
    declare name: string;
    declare sla_minutes: number;
}

Departments.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sla_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'departments',
    sequelize: database,
    timestamps: true,
    updatedAt: false,
});

Departments.sync();

export default Departments;