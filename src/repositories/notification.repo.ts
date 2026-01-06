import Notification from "../models/notification.js";
import Repository from "./base.repo.js";

class NotificationRepository extends Repository<Notification>{
    constructor(){
        super(Notification);
    }
}

export default new NotificationRepository();