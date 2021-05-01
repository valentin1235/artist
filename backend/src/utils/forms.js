/**
* Http response or function return formation defined here
 */

function stdReturn(msg, data) {
  return { 
    msg: msg,
    data: data
  }
}

export {
  stdReturn
}