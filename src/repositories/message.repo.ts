import Message from "../models/message.js";
import Repository from "./base.repo.js";

class MessageRepository extends Repository<Message>{
    constructor(){
        super(Message);
    }
}

export default new MessageRepository();