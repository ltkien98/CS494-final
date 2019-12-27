const Credential = require("./credential");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

process.on("uncaughtException", function(err) {
  console.error(err);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
  // application specific logging, throwing an error, or other logic here
});

clear();

console.log(
  chalk.magentaBright(figlet.textSync("KiNt Client", { horizontalLayout: "full" }))
);
console.log(chalk.yellowBright("Type in commands to perform actions"));
console.log(chalk.yellowBright("Try 'connect 127.0.0.1 1337' to get started"));
console.log(chalk.yellowBright("'register' to create account"));
console.log(chalk.yellowBright("'login' to login your account"));
console.log(chalk.yellowBright("'check' to search in database (options: show name, show status, show date, show password, show note"));
console.log(chalk.yellowBright("'setup' to edit user info with options (name, note, date)"));
console.log(chalk.yellowBright("'chat' for chatting with other clients"));
console.log(chalk.yellowBright("'upload' to upload file to server"));
console.log(chalk.yellowBright("'exit' or 'quit' to exit program"));

const inquirer = require("./helper/inquirer");
const ActionConstant = require("./action/action-constant");

const handleConnect = require("./handler/connect-handler");
const handleRegister = require("./handler/register-handler");
const handleLogin = require("./handler/login-handler");
const handleChat = require("./handler/chat-handler");
const handleUpload = require("./handler/upload-handler");
const handleCheck = require("./handler/check-handler");
const handleSetup = require("./handler/setup-handler");

const ProtocolClient = require("./protocol-client");
const main = async () => {
  while (1) {
    try {
      const input = await inquirer.askCommand();
      const commandArgs = input.command.split(" ");

      switch (commandArgs[0]) {
        case ActionConstant.COMMAND.CONNECT:
          await handleConnect(commandArgs);
          break;
        case ActionConstant.COMMAND.REGISTER:
          await handleRegister(commandArgs);
          break;
        case ActionConstant.COMMAND.LOGIN:
          await handleLogin(commandArgs);
          break;
        case ActionConstant.COMMAND.CHAT:
          await handleChat(commandArgs);
          break;
        case ActionConstant.COMMAND.UPLOAD:
          await handleUpload(commandArgs);
          break;
        case ActionConstant.COMMAND.CHECK:
          await handleCheck(commandArgs);
          break;
        case ActionConstant.COMMAND.SETUP:
          await handleSetup(commandArgs);
          break;
        case "exit":
        case "quit":
          console.log(chalk.yellowBright("Good bye!"));

          ProtocolClient.destructSocket();

          return;
        default:
          console.log(chalk.red("Invalid command"));
          break;
      }
    } catch (ex) {
      console.log(chalk.red(ex));
    }
  }
};

Credential.genKey();
Credential.genSocId();

main();
