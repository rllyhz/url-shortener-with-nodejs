document.querySelector('#shortenBtn')
  .addEventListener('click', event => {
    document.querySelector('#shortenedUrlText').value = ""
  })

document.querySelector('#copyBtn')
  .addEventListener('click', event => {
    event.preventDefault()

    document.querySelector('#shortenedUrlText')
      .select()
    document.execCommand('copy')

    event.target.innerHTML = 'Copied'
  })


window.addEventListener('keyup', event => {
  if (event.keyCode == 44) {
    console.log(event.keyCode)
    // updateClipboard()
  }
})

function updateClipboard() {
  navigator.permissions.query({ name: 'clipboard-write' })
    .then(result => {
      if (result.state == 'granted' || result.state == 'prompt') {
        const inputElem = document.createElement('input')
        inputElem.setAttribute('value', 'Sorry, print screen disabled!')
        document.body.appendChild(inputElem)
        inputElem.select()
        document.execCommand('copy')
        document.body.removeChild(inputElem)
        alert('Sorry, print screen disabled!')
      }
    })
}