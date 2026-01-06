import { DestroyOptions, FindOptions, UpdateOptions } from "sequelize";
import User from "../models/user.js";
import Repository from "./base.repo.js";

class UserRepository extends Repository<User>{
    constructor(){
        super(User);
    }

    async findByEmail(email: string){
        return User.findOne({ where: { email: email } });
    }
}

export default new UserRepository();