// 控制元素
const player = document.querySelector('.player')
const viewer = player.querySelector('.viewer')
const progress = player.querySelector('.progress__filled')
const progress_bar = player.querySelector('.progress')
const toggle = player.querySelector('.toggle')
const input_list = player.querySelectorAll('[type = "range"]')
const skip_bottons = player.querySelectorAll('[data-skip]')

// FUNCTION
function play() {
    // 判斷影片是否正在暫停狀態，如果是播放影片，否暫停影片
    // 要使用paused回傳true或false
    viewer.paused ? viewer.play() : viewer.pause()
}

function updateToggle() {
    // 更新按鈕content
    viewer.paused ? toggle.textContent = '▶' : toggle.textContent = '█'
}

function range() {
    viewer[this.name] = this.value
    // console.log(this)
    // console.log(this.value)
}

function skip() {
    // console.log(this.dataset)
    // 增加或減少當前撥放時間
    viewer.currentTime += parseFloat(this.dataset.skip)
}

function updateProgress() {
    // 先計算目前時間和撥放總長度算出百分比
    // 更改css flex-basis屬性百分比
    const persent = (viewer.currentTime / viewer.duration) * 100
    progress.style.flexBasis = `${persent}%`
    // console.log(persent)
}

function moveProgress(e) {
    // 計算點擊位置佔全部的比例乘與影片長度時間換算成影片時間
    viewer.currentTime = e.offsetX / 640 * viewer.duration
    // console.log(e.offsetX / 640 * viewer.duration)
}
// EVENT
// 綁定play到viewer和toggle的click
viewer.addEventListener('click', play)
toggle.addEventListener('click', play)
// 綁定updateToggle到viewer播放和play時
viewer.addEventListener('play', updateToggle)
viewer.addEventListener('pause', updateToggle)
// 綁定volume和play_back_rate到range
input_list.forEach(input => {
    input.addEventListener('click', range)
    input.addEventListener('mousemove', range)
})
// 綁定skip
skip_bottons.forEach(botton => {
    botton.addEventListener('click', skip)
})
// 綁定viewer 更新progress
viewer.addEventListener('timeupdate', updateProgress)
// 判斷滑鼠拖曳和點擊 呼叫moveProgress
let movedown = false;
progress_bar.addEventListener('click', moveProgress)
progress_bar.addEventListener('mousedown', () => movedown = true)
progress_bar.addEventListener('mouseup', () => (movedown = false))
progress_bar.addEventListener('mouseout', () => (movedown = false))
progress_bar.addEventListener('mousemove', (e) => {
    if(movedown) moveProgress(e)
})