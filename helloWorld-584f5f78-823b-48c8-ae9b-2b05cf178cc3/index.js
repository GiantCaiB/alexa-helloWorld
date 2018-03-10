'use strict';
const Alexa = require('alexa-sdk');
//const APP_ID = undefined;
const APP_ID = "amzn1.ask.skill.1426cf07-34ea-4bef-9957-57d061aa3446";

//Different opening greetings
var WELCOME = [
    "G\'day, how can I help?",
    "Hey, ready to serve.",
    "Hi there, is there anything I can do for you?",
    "Hello, I\'m here to help you.",
];
//Different finishings
var GOODBYE = [
    "Okay, see ya!",
    "Ok, see you soon.",
    "Sure thing, see ya.",
    "No worries, bye!",
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
    },

    'AMAZON.HelpIntent': function () {

    },
    'AMAZON.CancelIntent': function () {
        //choos a random goodbye
        var goodbyeIndex = Math.floor(Math.random() * GOODBYE.length);
        var randomGoodbye = GOODBYE[goodbyeIndex];
        this.emit(':tell', randomGoodbye);
    },
    'AMAZON.StopIntent': function () {
        //choos a random goodbye
        var goodbyeIndex = Math.floor(Math.random() * GOODBYE.length);
        var randomGoodbye = GOODBYE[goodbyeIndex];
        this.emit(':tell', randomGoodbye);
    },
};
