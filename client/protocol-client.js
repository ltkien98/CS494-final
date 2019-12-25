const net = require("net");
const ActionResult = require("./action/action-result");
const Credential = require("./credential");

const { ConnectAction } = require("./action/connect-action");
const { RegisterAction } = require("./action/register-action");
const { LoginAction } = require("./action/login-action");
const { SendAction } = require("./action/send-action");
const { UploadAction } = require("./action/upload-action");
const { CheckAction } = require ("./action/check-action");
const { SetupAction } = require ("./action/setup-action");

const events = require("events");
class ProtocolClient {
  constructor() {
    this._isConnected = false;
    this._client = new net.Socket();
    this.deferedResolve = undefined;
    this.deferedReject = undefined;
    this.eventEmitter = new events.EventEmitter();
    this.initSocket();
    this.timeOut = 60000;
  }

  initSocket() {
    this._client.on("data", data => {
      const actionResult = ActionResult.fromJson(JSON.parse(data));
      if (this.deferedResolve) {
        this.deferedResolve(actionResult);
        this.deferedResolve = undefined;
      } else {
        this.eventEmitter.emit(actionResult.type, actionResult);
      }
    });
    this._client.on("end", () => {
      this._isConnected = false;
      if (this.deferedReject) {
        this.deferedReject("Connection to server ended");
      }
    });
    this._client.on("error", () => {
      if (this.deferedReject) {
        this.deferedReject("Server encountered error");
      }
    });
  }

  destructSocket() {
    this._client.end();
    this._client.destroy();
  }
  disconnect() {}

  deferResultPromise(resolve, reject) {
    this.deferedResolve = resolve;
    this.deferedReject = reject;
    setTimeout(() => {
      this.deferedReject("Action has timed out");
    }, this.timeOut);
  }

  connect(host, port) {
    this._client.connect(port, host, () => {
      this._isConnected = true;

      const action = new ConnectAction()
        .ip(host)
        .port(port)
        .pubKey(Credential.getPubKey());

      const msg = action.getMessage();
      this._client.write(msg);
    });
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  register(username, password, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }
    const action = new RegisterAction()
      .username(username)
      .password(password)
      .useEncrypt(useEncrypt);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  login(username, password) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }
    const action = new LoginAction().username(username).password(password);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  check(username, option) {
    if(!this._isConnected){
      throw new Error ("Not connected to server");
    }
    const action = new CheckAction().username(username).option(option);
    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
    this.deferResultPromise(resolve, reject) 
    );
  }

  setup(username, option, value) {
    if(!this._isConnected) {
      throw new Error ("Not connected to server");
    }
    const action = new SetupAction().username(username).option(option).value(value);
    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise ((resolve, reject) =>
    this.deferResultPromise(resolve, reject)
    );
  }

  send(receivers, message, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }

    if (useEncrypt) {
      message = Credential.encrypt(message);
    }

    const action = new SendAction()
      .receivers(receivers)
      .message(message)
      .useEncrypt(useEncrypt);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  event() {
    return this.eventEmitter;
  }

  upload(filePath, content, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }

    if (useEncrypt) {
      message = Credential.encrypt(message);
    }

    const action = new UploadAction()
      .filePath(filePath)
      .content(content)
      .useEncrypt(useEncrypt);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }
  show(useEncrypt) {
    if(!this._isConnected) {
      throw new Error("Not connected to server");
    }

    if (useEncrypt) {
      message = Credential.encrypt(message);
    }
  }
}

module.exports = new ProtocolClient();
