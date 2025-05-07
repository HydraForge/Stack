import figlet from "figlet";
import {rainbow} from "gradient-string";

async function renderTitle() {
   const title = figlet.textSync("HYDRASTACK", {
            font: "ANSI Shadow",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 45,
            whitespaceBreak: true,
        });
    console.log(rainbow.multiline(title));
}

export { renderTitle };