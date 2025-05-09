import figlet from "figlet";
import gradient, { rainbow } from "gradient-string";

const theme = gradient(["#F7EAA3", "#ECB4EE", "#A3CBF7"]);
async function renderTitle(): Promise<void> {
	console.log("\n");
	const title = figlet.textSync("HYDRASTACK", {
		font: "ANSI Shadow",
		horizontalLayout: "default",
		verticalLayout: "default",
		width: 45,
		whitespaceBreak: true,
	});
	console.log(theme(title));
}

export { renderTitle };
