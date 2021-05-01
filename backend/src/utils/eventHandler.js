/**
* System error defined and handled here
 */

process.emit("unhandledRejection", (reason, promise) => {
  // TODO: Handle error at your convenience
  console.log(reason, promise)
  process.exit(1)
})
