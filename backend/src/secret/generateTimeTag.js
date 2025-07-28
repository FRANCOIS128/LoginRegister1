function getTime() {
  const date = new Date()

  const day = ("0" + date.getDate()).slice(-2)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)

  const year = date.getFullYear()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()

  return year + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec
}

export { getTime }