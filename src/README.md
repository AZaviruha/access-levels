# access-levels

Небольшая библиотечка для рассчета уровней доступов по роля, по принципу бинарных масок.

Идея реализации позаимствована [отсюда]( http://frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/).

## Usage

```js
import buildLevels from 'access-levels'

const accessLevelsConfig = {
    'public': '*',
    'anon': [ 'anon' ],
    'user' : [ 'user', 'admin' ],
    'admin': [ 'admin' ]
}

const { roles, accessLevels } = buildLevels(accessLevelsConfig)

/**
 > roles
 { anon: { bitMask: 1, title: 'anon' },
  user: { bitMask: 2, title: 'user' },
  admin: { bitMask: 4, title: 'admin' } }

 > accessLevels
 { public: 7, anon: 1, user: 6, admin: 4 }
 */

const hasUserAccess = !!(roles.user.bitMask & accessLevels.user) // true
const hasAdminAccess = !!(roles.user.bitMask & accessLevels.admin) // false
```

Набор доступов и ролей приведенный в примере, встречается достаточно часто. Поэтому, в библиотеке он используется в качестве значения по умолчанию для функции `buildLevels`. Так что, эта строчка сработает аналогично:

```js
const { roles, accessLevels } = buildLevels(/* default */)
```
