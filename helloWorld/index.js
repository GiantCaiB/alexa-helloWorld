'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

//Different opening greetings
var WELCOME = [
    "G\'day, how can I help?",
    "Hey, ready to serve.",
    "Hi there, is there anything I can do for you?",
    "Hello, I\'m here to help you.",
    "Aloha, what can I do for you today?",

];
//Different finishings
var GOODBYE = [
    "Okay, see ya!",
    "Ok, see you soon.",
    "Sure thing, see ya.",
    "No worries, bye!",
    "Of course, goodbye!",
];


//Set Entry Point
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
//Implement Handler Functions
const handlers = {
    'LaunchRequest': function () {
        //choose a random opening greeting
        var welcomeIndex = Math.floor(Math.random() * WELCOME.length);
        var randomGreeting = WELCOME[welcomeIndex];
        this.attributes['speechOutput'] = randomGreeting;
        this.attributes['repromptSpeech'] = 'I beg your pardon?';
        this.emit(':ask',this.attributes['speechOutput'], this.attributes['repromptSpeech']);
        //this.emit(':tell',this.attributes['speechOutput']);
    },
    //This intent is a simple calculate
    'CalculateIntent': function() {
        //Getting values from the user's input request
        var operator = this.event.request.intent.slots.Operator.value;
        var numberOne = parseInt(this.event.request.intent.slots.NumberOne.value);
        var numberTwo = parseInt(this.event.request.intent.slots.NumberTwo.value);
        var result = 0;
        switch (operator) {
            case 'add':
                result = numberOne + numberTwo;
                break;
            case 'subtract':
                result = numberOne - numberTwo;
                break;
            case 'multiply':
                result = numberOne * numberTwo;
                break;
            case 'divide':
                if(numberTwo!=0){
                    result = numberOne / numberTwo; 
                }
                else{
                    result = undefined;
                }
                break;
            default:
                result = numberOne + numberTwo;
        }
        this.emit(':tell', "The result is "+ result);
        //this.emit(':tell', operator + numberOne +"to" + numberTwo+", well, this is a question.");
    },
    
    //Built-in intents
    'AMAZON.HelpIntent': function () {

    },
    'AMAZON.CancelIntent': function () {
        //choose a random goodbye
        var goodbyeIndex = Math.floor(Math.random() * GOODBYE.length);
        var randomGoodbye = GOODBYE[goodbyeIndex];
        this.emit(':tell', randomGoodbye);
    },
    'AMAZON.StopIntent': function () {
        //choose a random goodbye
        var goodbyeIndex = Math.floor(Math.random() * GOODBYE.length);
        var randomGoodbye = GOODBYE[goodbyeIndex];
        this.emit(':tell', randomGoodbye);
    },
};
