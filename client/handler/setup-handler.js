const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const chalk = require("chalk");
const inquirer = require("../helper/inquirer");
const exceptionWrapper = require("../helper/exception-wrapper");

const Credential = require("../helper/inquirer");

module.exports = exceptionWrapper(async function(commandArgs){
    let { username, option, value } = await inquirer.askSetup();
    const result = await ProtocolClient.setup(username, option, value);
    if(result.status == CommonConstant.STATUS.SUCCESS) {
        console.log(chalk.cyan("Setup Sucessfully"));
    }
})