import figlet from "figlet";
import gradient, { rainbow } from "gradient-string";

async function renderTitle(): Promise<void> {
	const title = figlet.textSync("HYDRASTACK", {
		font: "ANSI Shadow",
		horizontalLayout: "default",
		verticalLayout: "default",
		width: 45,
		whitespaceBreak: true,
	});
	console.log(gradient(['cyan', 'green'])(title));
}

export { renderTitle };
