const defaultAccessLevels = {
    'public': '*',
    'anon': [ 'anon' ],
    'user' : [ 'user', 'admin' ],
    'admin': [ 'admin' ]
}


const flatConcat = arrs => arrs.reduce(
    (acc, x) => acc.concat(Array.isArray(x) ? flatConcat(x) : [x]), [])

const uniq = arr => [... new Set(arr)]

const without = (el, arr) => arr.filter(x => x !== el)

const arrToChars = (arr, char='1') => Object.keys(arr).reduce(acc => acc + char, '')

const buildRoles = levels => {
    const roleNames = without('*', uniq(flatConcat(Object.values(levels))))

    const roles = roleNames.reduce(([ roles, bitMask ], roleName) => {
        const intCode = parseInt(bitMask, 2)
        const nextBitMask = (intCode << 1).toString(2)

        roles[roleName] = { bitMask: intCode, title: roleName }
        return [roles, nextBitMask]
    }, [{}, '01'])

    return roles[0];
}

const buildLevels = (levelDefinitions, roles) => {
    const buildLevel = (acc, [levelName, levelRoles]) => {
        if (levelRoles === '*') {
            acc[levelName] = parseInt(arrToChars(roles), 2)
        } else {
            acc[levelName] = levelRoles.reduce(
                (acc, levelRole) => acc | roles[levelRole].bitMask, 0)
        }

        return acc
    }

    return Object.entries(levelDefinitions).reduce(buildLevel, {})
}

function build(levels = defaultAccessLevels) {
    const roles = buildRoles(levels)
    const accessLevels = buildLevels(levels, roles)

    return { roles, accessLevels }
}

module.exports = build
