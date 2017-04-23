/// Setup the Cisco Spark Websocket
// Lucille bot

var SparkWebSocket = require('ciscospark-websocket-events')

var accessToken = process.env.BOT_TOKEN
var PORT = process.env.PORT || 3000

var webHookUrl =  "http://localhost:"+PORT+"/ciscospark/receive"

sparkwebsocket = new SparkWebSocket(accessToken)
sparkwebsocket.connect(function(err,res){
   if (!err) {
         if(webHookUrl)
             sparkwebsocket.setWebHookURL(webHookUrl)
   }
   else {
        console.log("Error starting up websocket: "+err)
   }
})

//////// Bot Kit //////

var Botkit = require('botkit');

var controller = Botkit.sparkbot({
    debug: true,
    log: true,
    public_address: "https://localhost",
    ciscospark_access_token: process.env.BOT_TOKEN
});


var bot = controller.spawn({
});

controller.setupWebserver(PORT, function(err, webserver) {

 //setup incoming webhook handler
  webserver.post('/ciscospark/receive', function(req, res) {
            controller.handleWebhookPayload(req, res, bot);
  });

});

// controller.hears('hello', 'direct_message,direct_mention', function(bot, message) {
//     bot.reply(message, 'Hi');
// });
//
// controller.on('direct_mention', function(bot, message) {
//     bot.reply(message, 'You mentioned me and said, "' + message.text + '"');
// });
//
// controller.on('direct_message', function(bot, message) {
//     bot.reply(message, 'I got your private message. You said, "' + message.text + '"');
// });

controller.hears('help', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, {markdown:'Hi! My name is Lucille and my job is to help to introduce you to Cisco Spark by providing you with training materials. If you would like help with something, just **mention me or direct message me** followed by the thing you need and I will do my best to find you the right document. If I find something that I think will help, I will send it to you in a direct message.<br><br>**I am knowledgeable about the following subjects:**<br><br>- Get started<br>- Make a call<br>- Use a Spark Board<br>- Set up WebEx Personal Room<br>- Set up Admin Account<br>- Set up DX70 or DX80<br>- Set up SX10<br><br>Just mention something and I\'ll see if I can help!'});
});

controller.hears('.*SX10.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/2zpjpochto9bmtzxal9lx4se4myzj21w.pptx']});
  });

controller.hears('.*DX.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/2zj2v1jgg27vurw8uhdypk3khobmkwx0.pptx']});
  });


controller.hears('.*Get Started.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/km2o06vklw1e14t2633vfed9nz33jis2.pdf']});
  });

controller.hears('.*Make a call.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your files...')
      bot.reply(message, {text:'Here\'s a document for how to place a call using the Spark Board if you have the Spark app downloaded', files:['https://cisco.box.com/shared/static/pgukr882be8q3jaa5vw71i0w1wbhnky9.pdf']});
      bot.reply(message, {text:'Here\'s some information on how to make a call on the Spark Board without the Spark app', files:['https://cisco.box.com/shared/static/8c4rckxffpaf8wvz8rkkewsbmof2p9xx.pdf']});
  });

controller.hears('.*Spark Board.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/2zpjpochto9bmtzxal9lx4se4myzj21w.pptx']});
  });

controller.hears('.*WebEx.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/cqesre5q5byawpabkcoqrj6kko906pmv.pptx']});
  });

controller.hears('.*Admin.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/13boi0co1onmft9htljelg9xtza9whky.pptx']});
  });
