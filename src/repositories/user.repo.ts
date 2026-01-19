import { DestroyOptions, FindOptions, UpdateOptions } from "sequelize";
import User from "../models/user.js";
import Repository from "./base.repo.js";
import Department from "../models/department.js";

class UserRepository extends Repository<User>{
    constructor(){
        super(User);
    }

    async findByEmail(email: string): Promise<User | null>{
        return User.findOne({ where: { email: email } });
    }

    async findByDepartment(department_id: string): Promise<User[]>{
        return User.findAll({
            where: { department_id },
            include: [
                {
                     model: Department,
                     as: "department",
                     attributes: ["id", "name"],
                }
            ]
        });
    }
}

export default new UserRepository();