function isInputHasContent(domList = []) {
  if (!(domList.length > 0 && domList && Array.isArray(domList))) return -1;

  let statusCoide = 0 // success

  domList.forEach(dom => {
    if (dom.value === '') {
      statusCoide = 1; // dom empty error
    }
  })

  return statusCoide;
}

function clearDomValue(domList = []) {
  if (domList.length > 0 && domList && Array.isArray(domList)) {
    domList.forEach(dom => {
      dom.value = ''
    })
  }
}

export {
  isInputHasContent, clearDomValue
}