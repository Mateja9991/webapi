
const SocketService = require('../socket/socket')

async function createUser() {
  console.log("Create user");
}

//message
function sendMessageToSession(sessionId, userId) {
  const session = await Session.findById(sessionId)
  const message = 'Hello';
  session.participants.forEach(participantId => {
    if (participantId !== userId) {
      sendMessageEvent(participantId, message)
    }
  });
}

function sendMessageEvent(room, message){
  SocketService.sendEventToRoom(room, 'new-message', message)
}

module.exports = {
  createUser,
};
