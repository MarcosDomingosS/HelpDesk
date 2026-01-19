import SlaLog from "../models/slalog.js";
import Repository from "./base.repo.js";

class SlaLogRepository extends Repository<SlaLog>{
    constructor(){
        super(SlaLog);
    }
}

export default new SlaLogRepository();