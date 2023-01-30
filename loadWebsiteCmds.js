import { LoadCommandsNoCollection } from "./util/handle.js";
import { writeFileSync } from "fs";
LoadCommandsNoCollection().then((cmds) => {
    cmds.map((cmd) => {
        cmd.filepath = `src/commands/${cmd.category}/${cmd.filepath}`;
    });
    writeFileSync("dist/cmd.json", JSON.stringify(cmds));
});
