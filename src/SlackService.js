const Config = require('./../config');
const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(Config.SlackToken);

const PostMessage = async function(message)  {

  await slackClient.chat.postMessage({
    text: message,
    channel: Config.SlackChannel,
  });

};


module.exports = {
    PostMessage: PostMessage
}