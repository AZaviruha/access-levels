const defaultAccessLevels = {
    'public': '*',
    'anon': [ 'anon' ],
    'user' : [ 'user', 'admin' ],
    'admin': [ 'admin' ]
}

function build(levels = defaultAccessLevels) {
    const roles = buildRoles(levels)
    const accessLevels = buildLevels(levels, roles)

    return { roles, accessLevels }
}

module.exports = build


function buildRoles(levels) {
    const roleNames = without('*', uniq(flatConcat(Object.values(levels))))

    const roles = roleNames.reduce(([ roles, bitMask ], roleName) => {
        const intCode = parseInt(bitMask, 2)
        const nextBitMask = (intCode << 1).toString(2)

        roles[roleName] = { bitMask: intCode, title: roleName }
        return [roles, nextBitMask]
    }, [{}, '01'])

    return roles[0];
}

function buildLevels (levelDefinitions, roles) {
    const buildLevel = (acc, [levelName, levelRoles]) => {
        if (levelRoles === '*') {
            acc[levelName] = parseInt(arrToChars(roles, '1'), 2)
        } else {
            acc[levelName] = levelRoles.reduce(
                (acc, levelRole) => acc | roles[levelRole].bitMask, 0)
        }

        return acc
    }

    return Object.entries(levelDefinitions).reduce(buildLevel, {})
}


// ------------------------------ HELPERS ------------------------------ //

function flatConcat(arrs) {
    return arrs.reduce((acc, x) => acc.concat(Array.isArray(x) ? flatConcat(x) : [x]), [])
}

function uniq(arr) {
    return [... new Set(arr)]
}

function without(el, arr) {
    return arr.filter(x => x !== el)
}

function arrToChars(arr, char='1') {
    return Object.keys(arr).reduce(acc => acc + char, '')
}
