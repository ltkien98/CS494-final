const Key = require("../key");
const Chalk = require("chalk");
const { UserDb } = require("../storage/user-database");
const SetupAction = require("../action/setup-action");
const SetupOption = require("../helper/setup-option");
const ActionConstant = require("../action/action-constant");
const CommonConstant = require("../helper/common-constant");

const Result = require("../helper/result-builder");

module.exports = function(actionData, socketID) {
    let {username, option, value} = SetupAction.fromJson(actionData);
    
    const userInfo = UserDb.find(username);
    let result;

    if(!userInfo) {
        result = new Result()
                .setType(ActionConstant.TYPE.SETUP)
                .setStatus(CommonConstant.STATUS.FAIL)
                .setData( {message: "Wrong username"});
        return result;
    }
    else {
        switch(option) {
            case SetupOption.OPTION.NAME:
                userInfo.name = value;
                break;
            case SetupOption.OPTION.NOTE:
                userInfo.note = value;
                break;
            case SetupOption.OPTION.DATE:
                userInfo.date = value;
                break;
            default:
                result = new Result()
                    .setType(ActionConstant.TYPE.SETUP)
                    .setStatus(CommonConstant.STATUS.FAIL)
                    .setData( {message: "Can not setup this info"});
                return result;
        }
        UserDb.update(username,userInfo);
    }
    console.log(userInfo);
    result = new Result().setType(ActionConstant.TYPE.SETUP).setData({});
    return result
}