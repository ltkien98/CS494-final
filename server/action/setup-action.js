module.exports = class SetupAction{
    constructor () {
        this.username = undefined;
        this.option = undefined;
        this.value = undefined;
    }

    static fromJson(json) {
        return Object.assign(new SetupAction(), json);
    }
}