/*
                          .
                          ..   `.
                         `..  ...
                         ... ...`
                        .........
                       ..........
                      ............
                     .............
                     ...............
                    `..............
                    ..............`
                    `.............
                 ................
                  ...............
                  .............`
                   .....;;;;;;
                       :;;;;;;
                       :,,,,:;`
                   `............
                  ................
                ...................
               ........:::::,.......`
              .....,;;;;;;;;;;;;.....`
             ....:;;;;;;;;;;;;;;;;....
             ...;;;;;;;;;;;;;;;;;;;;...
            ..,;;;;;;;;;;;;;;;;;;;;;;...
           `..;;;;;;;;;;;;;;;;;;;;;;;;..
           ..;;;;;;;;;;;;;;;;;;;;;;;;;;..
           .;;;;;;;;;;;;;;;;;;;;;;;;;;;,.
          `.;;   .;;;;;;;;;;;;;;;;   .;;.
          .:; ..  ;;;;;;   .;;;;;`  .` ;.`
          .;`...` :;;;, .;;  ;;;;  .... ;`
          . ..... :;;``;;;;;; :;;  .....:`
          :...... :;.:;;;;;;;;`;;` .....``
          `..... `;,;;;;;;;;;;;; ;  .....,
         ,`....` ; ;;;;;;;;;;;;;;,: .....`
         ;`.... :,;;;;;;;;;;;;;;;:;` ....`.
         ;``.  :;:;;;;;;;;;;;;;;;;`;` `.`::
         ;;   ;;.;;;;;;;;;;;;;;;;;;;;,  `;;
        ,;;;;;;;;;;;;,:;;;;;;.;;;;;;;;;;;;;
        ;;;;;;;;;;;;`  ;;;;;`  ;;;;;;;;;;;;,
        ;;;;;;;;;;;; ;;:;;;;`;; ;;;;;;;;;;;;
       `;;;;;;;;;;;,;;;;;;;;;;;:;;;;;;;;;;;;
       `;;;;;;;;;;;:;;;;;;;;;;;;;;;;;;;;;;;;
       :;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,
    ,;;;;;:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
 `:;;;;;;;;.;;;;;;;;;;;;;;;;;;;;;;;;;;;;:;;;;;;;:,
.::::;;;;;;; ;;;;;;;;;;;;;;;;;;;;;;;;;;.;;;;;;;::::
,::::;;;;;;;;:;;;;;;;;;;;;;;;;;;;;;;;; ;;;;;;;:::::
.:::::;;;;;;; ;;;;;;;;;;;;;;;;;;;;;;;::;;;;;;::::;:
`:;::::;;;;;;;`;;;;;;;;;;;;;;;;;;;;;; ;;;;;;;::::::
 ::;;:::;;;;;;; ;;;;;;;;;;;;;;;;;;;; ;;;;;;;:::;;:,
 ,::;::::;;;;;; ;;;;;;;;;;;;;;;;;;;::;;;;;;::::;::
  ::;;:::;;;;;;,;;;;;;;;;;;;;;;;;;;`;;;;;;::::;;:,
  `::;::::;;;;;;:;;;;;;;;;;;;;;;;;; ;;;;;;:::;;::
   ,:;;:::;;;;;; ;;;;;;;;;;;;;;;;;; ;;;;;;:::;::
    ::::::;;;;.   .;;;;;;;;;;;;;;    :;;;::::::,
     :::::;;`        ,;;;;;;;;.        ,;:::::`
      .::,                               .:::
*/
import { select } from 'redux-saga/effects'
import tracer from './tracer'

// Reducer config > api is mandatory.
const apiSelector = ({ config: { api } }) => api

// Add all params to path url.
const addPathParams = (url, pathParams) => {
  if (Array.isArray(pathParams) && pathParams.length > 0) return `${url}/${pathParams.join('/')}`
  return url
}
// Add all params to the query on url.
const addQueryParams = (url, queryParams) => {
  if (typeof queryParams === 'object' && Object.keys(queryParams).length > 0) {
    const params = Object.keys(queryParams).map((k => `${k}=${queryParams[k]}`))
    return `${url}?${params.join('&')}`
  }
  return url
}

export default action => function* (params) {
  const pathParams = (params && params.pathParams) || []
  const queryParams = (params && params.queryParams) || {}

  let url
  let fallback

  // Check url redux
  if (typeof action === 'string') {
    if (/.*_.*/.test(action)) {
      // retrieve resource urls.
      const [method, resource] = action.split(/_(.+)/)
      const api = yield select(apiSelector)

      const resource = api[resource][method]
      if (typeof resource === 'string') url = resource
      if (typeof resource === 'object') {
        url = resource.url
        fallback = resource.fallback
      }
    } else {
      // throw Exception if action key is malformed.
      throw new Error(`The action '${action}' is malformed, the template of action is like this 'METHOD_RESOURCES' (ie: GET_USERS)`)
    }
  }

  // action is an object
  if (typeof action === 'object') {
    // the property url is mandatory
    if (action.url) {
      url = action.url
    } else {
      throw new Error("The first argument of roadhog is an object, it should contain a non-empty 'url' property")
    }
  }

  // build url with path params.
  url = addPathParams(url, pathParams)
  // build url with query params.
  url = addQueryParams(url, queryParams)

  // Call tracer : fetch resource and dispatch event error - if necessary -
  const raw = yield tracer(action, () => fetch(url), !fallback)()

  return yield raw.ok ? raw.json() : fallback
}
