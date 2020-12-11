import axios from 'axios'

export function apiCall(method, path, data) {
  return new Promise((resolve, regect) => {
    // we can't do dot because we need to evaluate the value of method
    // This return to us a function so we invoke it with the res
    return axios[method](path, data).then(res => {
      // whenever we get information back from axios in comes back in an objects response 
      // and a sub object called data and another sub objects called error 
      return resolve(res.data)
    }).catch(err => {
      return reject(err.response.data.error)
    })
  })
}