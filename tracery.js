var tracery = require('tracery-grammar'),
    rawGrammar = require('./grammar.json'), // the grammar for the bot, edit this!
    processedGrammar = tracery.createGrammar(rawGrammar);

processedGrammar.addModifiers(tracery.baseEngModifiers); 

module.exports.grammar = processedGrammar;