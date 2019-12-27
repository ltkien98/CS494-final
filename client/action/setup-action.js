const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.SetupAction = class SetupAction extends BaseAction {
    constructor() {
        super(ActionConstant.TYPE.SETUP);
    }
    username(username) {
        this.data.username = username;
        return this;
    }
    option(option) {
        this.data.option = option;
        return this;
    }
    value(value) {
        this.data.value = value;
        return this;
    }
};

