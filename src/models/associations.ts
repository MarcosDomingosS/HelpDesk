import User from "./user.js";
import Ticket from "./ticket.js";
import SlaLog from "./slalog.js";
import Notification from "./notification.js";
import Message from "./message.js";
import Department from "./department.js";

// User
User.hasMany(Ticket, {
    foreignKey: "user_id",
    as: "createdTickets",
});

User.hasMany(Ticket, {
    foreignKey: "assigned_agent_id",
    as: "assignedTickets"
})

User.hasMany(Message, {
    foreignKey: "user_id",
    as: "messages",
});

User.hasMany(Notification, {
    foreignKey: "user_id",
    as: "notifications",
});

User.belongsTo(Department, {
    foreignKey: "department_id",
    as: "department"
});

// Ticket

Ticket.hasMany(Message, {
    foreignKey: "ticket_id",
    as: "messages",
});

Ticket.hasMany(SlaLog, {
    foreignKey: "ticket_id",
    as: "slalogs",
});

Ticket.belongsTo(User, {
    foreignKey: "user_id",
    as: "creator",
});

Ticket.belongsTo(User, {
    foreignKey: "assigned_agent_id",
    as: "assignedAgent",
});

Ticket.belongsTo(Department, {
    foreignKey: "department_id",
    as: "department"
});

// SlaLog

SlaLog.belongsTo(Ticket, {
    foreignKey: "ticket_id",
    as: "ticket"
});

// Notification

Notification.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Message

Message.belongsTo(Ticket, {
    foreignKey: "ticket_id",
    as: "ticket",
});

Message.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Department

Department.hasMany(Ticket, {
    foreignKey: "department_id",
    as: "tickets",
});

Department.hasMany(User, {
    foreignKey: "department_id",
    as: "users",
});