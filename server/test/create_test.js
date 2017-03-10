// const assert = require('assert');
const Tutorial = require('../db');

describe('Creating Tutorials', () => {
  it('saves a tutorial', () => {
    const testTutorial = new Tutorial({
      desc: 'tetsing',
      title: 'tetsing',
      author: 'tetsing',
      link: 'tetsing',
      id: 'tetsing',
      nickname: 'tetsing',
      edited: true,
      stuck: false
    });
    testTutorial.save();
  });
});
