import Ticket from "../models/ticket.js";
import Repository from "./base.repo.js";

class TicketRepository extends Repository<Ticket>{
    constructor(){
        super(Ticket);
    }
}

export default new TicketRepository();