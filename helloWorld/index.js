'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

let speechOutput;
let reprompt;
const SKILL_NAME = 'Retro Master';
const HELP_MESSAGE = 'You can say make a new list, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'No worries, see ya!';
const INTRO = [
   'This sounds like a cool combination. ',
   'This will be great. ',
   'Oh, wise choice. '
 ];

//Implement Handler Functions
const handlers = {
    'LaunchRequest': function () {
        this.emit('StartNewListIntent');
    },
   
    'StartNewListIntent': function () {
        //delegate to Alexa to collect all the required slot values
        var filledSlots = delegateSlotCollection.call(this);
        
        //compose speechOutput that simply reads all the collected slot values
        var speechOutput = randomPhrase(INTRO);
        
        //recap the order
        if(isSlotValid(this.event.request,'Food')||isSlotValid(this.event.request,'Drink')){
            var food = this.event.request.intent.slots.Food.value;
            var drink = this.event.request.intent.slots.Drink.value;
            speechOutput+= food + ' as your food and ' + drink + ' as your drink.';
        }
        //say the results
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    
     //Built-in intents
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

//Set Entry Point
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function delegateSlotCollection(){
  console.log('in delegateSlotCollection');
  console.log('current dialogState: '+this.event.request.dialogState);
    if (this.event.request.dialogState === 'STARTED') {
      console.log('in Beginning');
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(':delegate', updatedIntent);
    } else if (this.event.request.dialogState !== 'COMPLETED') {
      console.log('in not completed');
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(':delegate');
    } else {
      console.log('in completed');
      console.log('returning: '+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}