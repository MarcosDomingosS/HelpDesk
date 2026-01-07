import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

export enum status{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
}

export enum priority{
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

class Ticket extends Model<InferAttributes<Ticket>, InferCreationAttributes<Ticket>>{
    declare id: CreationOptional<string>;
    declare title: string;
    declare description?: string;
    declare status: status;
    declare priority: priority;
    declare user_id: string;
    declare department_id: string;
    declare assigned_agent_id?: string;
}

Ticket.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'),
        allowNull: false,
        defaultValue: status.OPEN,
    },
    priority: {
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
        allowNull: false,
        defaultValue: priority.LOW,
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
    department_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    assigned_agent_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    sequelize: database,
    tableName: 'tickets',
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default Ticket;