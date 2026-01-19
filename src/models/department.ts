import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

class Department extends Model<InferAttributes<Department, {omit: "created_at"}>, InferCreationAttributes<Department>>{
    declare id: CreationOptional<string>;
    declare name: string;
    declare sla_minutes: number;
    declare created_at: CreationOptional<Date>;
}

Department.init({
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
    createdAt: "created_at",
});

export default Department;