import { connection } from "websocket";

class Client {
    members: Array<connection>;

    constructor() {
        this.members = []
    }

    public receive = (cnt: connection) => {
        this.members.push(cnt);
    }

    public others = (cnt: connection) => {
        return this.members.filter(item => item !== cnt);
    }

}

export default new Client();