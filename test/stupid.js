const buildLevels = require('../src')
const assert = require('assert')

const { roles, accessLevels } = buildLevels()

const { anon, user, admin } = roles

try {
    assert.ok(anon.bitMask & accessLevels.public)
    assert.ok(anon.bitMask & accessLevels.anon)
    assert.ok(!(anon.bitMask & accessLevels.user))
    assert.ok(!(anon.bitMask & accessLevels.admin))

    assert.ok(user.bitMask & accessLevels.public)
    assert.ok(!(user.bitMask & accessLevels.anon))
    assert.ok(user.bitMask & accessLevels.user)
    assert.ok(!(user.bitMask & accessLevels.admin))

    assert.ok(admin.bitMask & accessLevels.public)
    assert.ok(!(admin.bitMask & accessLevels.anon))
    assert.ok(admin.bitMask & accessLevels.user)
    assert.ok(admin.bitMask & accessLevels.admin)

    console.log('test success')
} catch (e) {
    console.log('test failed')
}