"use strict";
// const sample = require('lodash.sample');

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    //LOOP over the array of this.words and create a map
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i + 1] === undefined) {
        this.words[i + 1] = null;
      }
      if (!chains.has(this.words[i])) {
        chains.set(this.words[i], [this.words[i + 1]]);
      }
      else {
        chains.get(this.words[i]).push(this.words[i + 1]);
      }
      if (this.words[i + 1] === undefined) {
        chains.set(this.words[i], [null]);
      }
    }
    return chains;

  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  // getText() {

  //   // - start at the first word in the input text
  //   // - find a random word from the following-words of that
  //   // - repeat until reaching the terminal null

  //   //start with "The"
  //   let resultText = [];
  //   resultText.push(this.words[0]);

  //   //get random number that is smaller than the length of an array
  //   // apply that random number to get a random word out of the array
  //   //take the word taken from the array and use it as a key for the map to get its value
  //   //do the same thing until null
  //   let randomWord = "";
  //   while (randomWord !== null) {
  //     debugger;
  //     randomWord = _.sample(this.chains.get(resultText[resultText.length - 1]));
  //     resultText.push(randomWord);
  //   }
  //   return resultText.join(" ");

  // }
}

const sampleText = "The cat is in the hat. The cat is the cat. The hat is a cat.";

const testMarkov = new MarkovMachine(sampleText);
console.log(testMarkov.words);
console.log(testMarkov.getChains());
// testMarkov.getText();
