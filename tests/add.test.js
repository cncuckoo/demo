const assert = require('assert')
const add = require('./add')

describe('Demo', () => {
  it('shoud add correctly', () => {
    assert.equal(add(1,2), 3);
  })
})