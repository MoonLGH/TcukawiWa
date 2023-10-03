import { create } from "@open-wa/wa-automate";
import { prefix } from "../settings.js";
import { LoadCommands } from "../handle.js";
import { connect } from "../db/Mongo.js";
import { model } from "../../util/db/model/semiowner.js";
export class Client {
    constructor(options, AdvanceOptions) {
        this.MongoUrl = AdvanceOptions?.mongoUrl;
        this.options = options;
        this.Whitelist = false;
        this.SoftWhitelist = false;
        this.semiOwner = [];
    }
    async semiOwnerList() {
        // combine both semiOwner and semiOwner from database
        if (this.MongoUrl) {
            const semi = await model.find();
            const semiId = semi.map((e) => e.numberId);
            if (this.semiOwner) {
                this.semiOwner = [...this.semiOwner, ...semiId];
            }
            else {
                this.semiOwner = semiId;
            }
        }
        return this.semiOwner;
    }
    addSemiOwner(id) {
        if (!this.semiOwner) {
            this.semiOwner = [];
        }
        this.semiOwner.push(id);
    }
    removeSemiOwner(id) {
        if (!this.semiOwner) {
            this.semiOwner = [];
        }
        this.semiOwner = this.semiOwner.filter((e) => e !== id);
    }
    get uptime() {
        return Date.now();
    }
    async start() {
        const Client = await create(this.options);
        await this.assignProperty();
        if (this.MongoUrl) {
            await connect(this.MongoUrl);
        }
        this.clientInstances = Client;
        return this.clientInstances;
    }
    setSecret(string) {
        if (string.length > 1) {
            this.secret = JSON.parse(string);
        }
        return this;
    }
    setWhitelist(InitVal, SoftWhitelist) {
        this.SoftWhitelist = SoftWhitelist || false;
        this.Whitelist = InitVal;
    }
    async assignProperty() {
        this.commands = await LoadCommands();
        return;
    }
    get client() {
        if (!this.clientInstances)
            throw Error("No client initializedf");
        return this.clientInstances;
    }
    parseMessage(msg) {
        let text = msg.body;
        if (msg.type !== "chat") {
            text = "";
            if (msg.isMedia) {
                text = msg.caption;
                if (!msg.caption) {
                    text = "";
                }
            }
        }
        const isPrefixed = text.startsWith(prefix) ? true : false;
        const args = isPrefixed ? text.slice(prefix.length).split(" ") : text.split(" ");
        const first = args.shift()?.toLowerCase();
        let isCommand = false;
        let commands;
        if (isPrefixed) {
            commands = this.commands.find((o) => o.name === first) || this.commands.find((c) => c.alias.includes(first.toLowerCase()));
            if (commands) {
                isCommand = true;
            }
        }
        return { text, isCommand, args, first, commands };
    }
    handleCommand(msg) {
        const parsedMessage = this.parseMessage(msg);
        if (parsedMessage.isCommand) {
            if (this.Whitelist && !this.SoftWhitelist && !msg.fromMe) {
                this.clientInstances?.sendText(msg.chatId, "Whitelist Mode is on!, you cant use it now");
                return;
            }
            else if (this.Whitelist && this.SoftWhitelist && !msg.sender.isMyContact && !msg.fromMe) {
                this.clientInstances?.sendText(msg.chatId, "Whitelist Mode is on!, But soft Whitelist is also on, you can only use command if you added to this account contact");
                return;
            }
            this.logger(`Runned ${parsedMessage.commands.name}`, "command");
            parsedMessage.commands.run(this, msg);
            return;
        }
    }
    logger(text, type) {
        console.log(`[${type.toUpperCase()}] ${text}`);
    }
}