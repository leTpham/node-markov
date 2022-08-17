"use strict";
let sample = require('lodash.sample');

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
      let word = this.words[i]
      let nextWord = this.words[i+1] || null

      // if (this.words[i + 1] === undefined) {
      //   this.words[i + 1] = null;
      // }

      if (chains.has(word)) {
        chains.get(word).push(nextWord)
      }
      else {
        chains.set(word, [nextWord])
      }
      // if (this.words[i + 1] === undefined) {
      //   chains.set(this.words[i], [null]);
      // }
    }
    return chains;

  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null


    let resultText = [];
    resultText.push(this.words[0]);


    let randomWord = "";
    while (randomWord !== null) {

      randomWord = sample(this.chains.get(resultText[resultText.length - 1]));
      resultText.push(randomWord);
    }
    return resultText.join(" ");

  }
}

// const sampleText = "The cat is in the hat. The cat is the cat. The hat is a cat.";

// const testMarkov = new MarkovMachine(sampleText);
// console.log(testMarkov.words);
// console.log(testMarkov.getChains());
// testMarkov.getText();

module.exports = {
  MarkovMachine
}