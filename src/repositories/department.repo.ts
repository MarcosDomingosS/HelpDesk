import Department from "../models/department.js";
import Repository from "./base.repo.js";

class DepartmentRepository extends Repository<Department>{
    constructor(){
        super(Department);
    }
}

export default new DepartmentRepository();