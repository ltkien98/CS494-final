const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.CheckAction = class CheckAction extends BaseAction {
    constructor() {
        super(ActionConstant.TYPE.CHECK);
    }
    username(username) {
        this.data.username = username;
        return this;
    }
    option(option) {
        this.data.option = option;
        return this;
    }
};

