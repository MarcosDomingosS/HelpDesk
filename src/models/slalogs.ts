import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import database from "../config/database.js";

class SlaLogs extends Model<InferAttributes<SlaLogs>, InferCreationAttributes<SlaLogs>>{
    declare id: CreationOptional<string>;
    declare ticket_id: string;
    declare started_at: Date;
    declare resolved_at?: Date;
    declare breached: boolean;
}

SlaLogs.init({
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
    started_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    resolved_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    breached: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: database,
    timestamps: false,
    tableName: 'slalogs',
});

SlaLogs.sync();

export default SlaLogs;