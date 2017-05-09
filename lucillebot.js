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
       bot.reply(message, {markdown:'Hi! My name is Lucille and my job is to help to introduce you to Cisco Spark by providing you with training materials. If you would like help with something, just *mention me* or *direct message me* followed by the thing you need and I will do my best to find you the right document. If I find something that I think will help, I will send it to you in a direct message.<br><br>**I have documentation on the following subjects:**<br><br>- Make a call<br>- Use a Spark Board<br>- Set up WebEx Personal Room<br>- Set up Admin Organization<br>- Set up DX70 or DX80<br>- Set up SX10<br><br>Just mention something and I\'ll see if I can help!'});
 });

controller.hears('.*SX10.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/5mgcmbw1ofk18iitnq363n0ygrzedvvw.pdf']});
  });

controller.hears('.*DX.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/bze3vanzkpyr6153big0tuxuzg67ouq6.pdf']});
  });


// controller.hears('.*Get Started.*', 'direct_message,direct_mention', function(bot, message) {
//       bot.reply(message, 'Searching for your file...')
//       bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/km2o06vklw1e14t2633vfed9nz33jis2.pdf']});
//   });

controller.hears('.*Spark Board.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your files...')
      bot.reply(message, {text:'Here\'s a document for how to place a call using the Spark Board if you have the Spark app', files:['https://cisco.box.com/shared/static/ntpqc0phj0tpy0ceiujeux5zlxx5qtya.pdf']});
      bot.reply(message, {text:'Here\'s some information on how to make a call on the Spark Board without the Spark app', files:['https://cisco.box.com/shared/static/d834cgqagp6f43jscicxh60qce28r480.pdf']});
  });

controller.hears('.*Make a call.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/qc1kc21nm3dx9f88d904tknbgy2z44y2.pdf']});
  });

controller.hears('.*WebEx.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/dyd5n29cftk4noywao87ut61ats0gpmf.pdf']});
  });

controller.hears('.*Admin.*', 'direct_message,direct_mention', function(bot, message) {
      bot.reply(message, 'Searching for your file...')
      bot.reply(message, {text:'Here is your file', files:['https://cisco.box.com/shared/static/rx6l1bo9ni7n21tt4ke3jf2z3ddaewbe.pdf']});
  });

controller.hears('','direct_message,direct_mention', function(bot, message) {
    bot.reply(message, 'I don\'t understand the question and I won\'t respond to it.');
  });
