/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * remote controller that sends a variable to all the listening devices
 */

// server variables

var dataServer;
var pubKey = 'pub-c-3a5429eb-d270-4869-bd02-55fe6fe7afa1';
var subKey = 'sub-c-16e11ea6-1363-11e9-a898-9ef472141036';

//input variables

var slideNumber = 0;
var totalImages = 16;
var nextQuestion = false;
var answerShown = false;


//name used to sort your messages. used like a radio station. can be called anything
var channelName = "gameShow";

function setup() 
{
  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

}

function draw() 
{
buttons()
}

function buttons(){

    //create the button
 
    sendButton = createButton('NEXT');
    sendButton.position(0, 0);
    sendButton.mousePressed(sendTheMessage);
    sendButton.size(400,400);

    sendButton = createButton('RESET');
    sendButton.position(0, 450);
    sendButton.mousePressed(resetMessage);
    sendButton.size(400,400);  

}


function resetMessage(){

  slideNumber = 0;
  sendTheMessage();
  console.log(slideNumber)
}

//sends from the button press
function sendTheMessage() {

  slideNumber = ((slideNumber+1)<=(totalImages-1)) ? slideNumber+=1 : 0; //shorthand for conditional assignment
  nextQuestion = true;
  console.log("Answer Shown")

  //publish the number to everyone.
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        slide: slideNumber,
        question: nextQuestion,
      }
    });

}


