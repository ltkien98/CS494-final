const ActionConstant = require("../action/action-constant");
const ActionMessage = require("../action/action-message");

const handleConnect = require("./connect-handler");
const handleRegister = require("./register-handler");
const handleLogin = require("./login-handler");
const handleSend = require("./send-handler");
const handleUpload = require("./upload-handler");
const handleCheck = require("./check-handler");
const handleSetup = require("./setup-handler");

module.exports = async function(msg, socket) {
  const action = ActionMessage.fromJson(JSON.parse(msg));
  console.log(action);
  switch (action.type) {
    case ActionConstant.TYPE.CONNECT:
      return handleConnect(action.data, action.socketId, socket);
    case ActionConstant.TYPE.REGISTER:
      return handleRegister(action.data, action.socketId);
    case ActionConstant.TYPE.LOGIN:
      return handleLogin(action.data, action.socketId);
    case ActionConstant.TYPE.SEND:
      return handleSend(action.data, action.socketId);
    case ActionConstant.TYPE.UPLOAD:
      return handleUpload(action.data, action.socketId);
    case ActionConstant.TYPE.CHECK:
      return handleCheck(action.data, action.socketId);
    case ActionConstant.TYPE.SETUP:
      return handleSetup(action.data, action.socketId);
  }
};
