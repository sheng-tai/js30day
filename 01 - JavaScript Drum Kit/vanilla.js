function playSound(e) {
     // console.log(e.keyCode)
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`)
    // console.log(key)
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    // console.log(audio)
    if(!audio) return       // 如果沒有audio 就回傳空值
    // 撥放初值設為0
    audio.currentTime = 0
    audio.play()
    // 新增palying屬性
    key.classList.add('playing')
}

function removeTransition(e) {
    // console.log(e)
    if(e.propertyName !== 'transform') return
    this.classList.remove('playing')
}

// 選擇所有有key class
const keys = document.querySelectorAll('.key')
// console.log(keys)

// 替所有key監聽transition 結束transition呼叫removeTransition
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

document.addEventListener('keydown', playSound)