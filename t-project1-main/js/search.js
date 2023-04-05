let search = document.querySelector('.left form i')
let cancel = document.querySelector('.cancel i')
let inputSearch = document.querySelector('.left input')
let smallImg = document.querySelectorAll('.smallImg img')
let wrapWeather = document.querySelector('.wrapWeather')

// search.addEventListener('click', () => {
//     wrapWeather.classList.add('on')
// })

cancel.addEventListener('click', () => {
    wrapWeather.classList.remove('on')
})


smallImg[0].style.border = '4px solid #5707ff'
smallImg[0].style.opacity = '100%'
for (let i in smallImg) {
    imgClick(i)
}

function imgClick(i) {
    smallImg[i].addEventListener('click', function () {
        smallImg.forEach((e) => (e.style.border = 'none', e.style.opacity = '50%'))
        smallImg[i].style.border = '4px solid #5707ff',
            smallImg[i].style.opacity = '100%'
        i++
        let bImg = ''
        bImg += `<img src="./img/seoul${i}.png" alt="" />`
        $('.bigImg').html(bImg)
        i--
    })
}

function searchTravel() {
    let travelSearch = document.getElementById('travelSearch').value
    if (travelSearch !== "") {
        $('.title h2').html(travelSearch)
        wrapWeather.classList.add('on')
    } else {
        alert('여행상품을 입력해주세요.')
    }
}

