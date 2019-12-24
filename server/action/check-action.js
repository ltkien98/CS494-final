module.exports = class CheckAction{
    constructor () {
        this.username = undefined;
        this.option = undefined;
    }

    static fromJson(json) {
        return Object.assign(new CheckAction(), json);
    }
}