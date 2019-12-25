const Key = require("../key");
const Chalk = require("chalk");
const { UserDb } = require("../storage/user-database");
const CheckAction = require("../action/check-action");
const CheckOption = require("../helper/check-option");
const ActionConstant = require("../action/action-constant");
const CommonConstant = require("../helper/common-constant");

const Result = require("../helper/result-builder");

module.exports = function(actionData, socketID) {
    let {username, option} = CheckAction.fromJson(actionData);
    let query;
        switch(option) {
            case CheckOption.OPTION.DATE:
                query = UserDb.find(username, { showDate: true });
                break;
            case CheckOption.OPTION.NAME:
                query = UserDb.find(username, { showName: true });
                break;
            case CheckOption.OPTION.ONLINE:
                query = UserDb.find(username, { online: true });
                break;
            case CheckOption.OPTION.PASSWORD:
                query = UserDb.find(username, { showPassword: true });
                break;
            case CheckOption.OPTION.NOTE:
                query = UserDb.find(username, { showNote: true });
                break;
            default: 
                break;
        }
    let result = new Result()
    .setType(ActionConstant.TYPE.CHECK)
    .setStatus(CommonConstant.STATUS.SUCCESS)
    .setData({ query });   
    return result;
}