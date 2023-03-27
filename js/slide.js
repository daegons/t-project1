let imgBox = document.querySelector('.imgBox')
let imgBoxAll = document.querySelectorAll('.imgBox')
const imgWrap = document.querySelectorAll('.img1')
let cloneFirst = imgWrap[0].cloneNode(true); // 요소 복사
let cloneLast = imgWrap[imgWrap.length - 1].cloneNode(true);
imgBox.insertBefore(cloneLast, imgWrap[0]);
imgBox.appendChild(cloneFirst);

let btn = document.querySelector('.img1') // 버튼 클릭 함수 실행을 위한 변수
let btnAll = document.querySelectorAll('.img1') // 버튼 클릭 함수 실행을 위한 변수
let count = 0;

if (window.innerWidth > 1100) {
    document.querySelector('.imgBox').style.left = '-450px'

    function imgSlideShow() {
        imgBox.style.transition = `all 1s`;
        if (count < imgWrap.length - 1) {
            count++
            imgBox.style.transform = `translate(${count * -450}px)`
        }
        else if (count == imgWrap.length - 1) {
            imgBox.style.transform = `translate(${(count + 1) * -450}px)`
            setTimeout(() => {
                imgBox.style.transition = `0s`;
                imgBox.style.transform = `translateX(0px)`;
            }, 1000)
            count = 0;

        }
    }

    // 첫번째 버튼 색상 
    btnAll[0].style.background = 'rgb(255, 255, 255, 1)'

    function prevSlide() {
        imgBox.style.transition = `all 1s`;
        if (count > 0) {
            count--
            document.querySelector('.imgBox').style.transform = `translate(${count * -450}px)`
            btnAll.forEach((i) => i.style.background = 'rgb(255, 255, 255, .5)')
            btnAll[count].style.background = 'rgb(255, 255, 255, 1)'
        } else if (count === 0) {
            console.log('asd')
            imgBox.style.transform = `translate(450px)`
            setTimeout(() => {
                imgBox.style.transition = `0s`;
                imgBox.style.transform = `translateX(${(imgWrap.length - 1) * -450}px)`;
            }, 1000)
            return count = imgWrap.length - 1;
        }
    }

    function nextSlide() {
        imgBox.style.transition = `all 1s`;
        if (count < imgWrap.length - 1) {
            count++
            document.querySelector('.imgBox').style.transform = `translate(${count * -450}px)`
            btnAll.forEach((i) => i.style.background = 'rgb(255, 255, 255, .5)')
            btnAll[count].style.background = 'rgb(255, 255, 255, 1)'
        } else if (count === imgWrap.length - 1) {
            imgBox.style.transform = `translate(${(count + 1) * -450}px)`
            setTimeout(() => {
                imgBox.style.transition = `0s`;
                imgBox.style.transform = `translateX(0px)`;
            }, 1000)
            return count = 0;
        }
    }

}



if (window.innerWidth <= 550) {
    document.querySelector('.imgBox').style.left = '-280px'

    function imgSlideShow() {
        imgBox.style.transition = `all 1s`;
        if (count < imgWrap.length - 1) {
            count++
            imgBox.style.transform = `translate(${count * -280}px)`
        }
        else if (count == imgWrap.length - 1) {
            imgBox.style.transform = `translate(${(count + 1) * -280}px)`
            setTimeout(() => {
                imgBox.style.transition = `0s`;
                imgBox.style.transform = `translateX(0px)`;
            }, 1000)
            count = 0;

        }
    }

    // 첫번째 버튼 색상 
    btnAll[0].style.background = 'rgb(255, 255, 255, 1)'

    function prevSlide() {
        imgBox.style.transition = `all 1s`;
        if (count > 0) {
            count--
            document.querySelector('.imgBox').style.transform = `translate(${count * -280}px)`
            btnAll.forEach((i) => i.style.background = 'rgb(255, 255, 255, .5)')
            btnAll[count].style.background = 'rgb(255, 255, 255, 1)'
        } else if (count === 0) {
            console.log('asd')
            imgBox.style.transform = `translate(280)`
            setTimeout(() => {
                imgBox.style.transition = `0s`;
                imgBox.style.transform = `translateX(${(imgWrap.length - 1) * -280}px)`;
            }, 1000)
            return count = imgWrap.length - 1;
        }
    }

    function nextSlide() {
        imgBox.style.transition = `all 1s`;
        if (count < imgWrap.length - 1) {
            count++
            document.querySelector('.imgBox').style.transform = `translate(${count * -280}px)`
            btnAll.forEach((i) => i.style.background = 'rgb(255, 255, 255, .5)')
            btnAll[count].style.background = 'rgb(255, 255, 255, 1)'
        } else if (count === imgWrap.length - 1) {
            imgBox.style.transform = `translate(${(count + 1) * -280}px)`
            setTimeout(() => {
                imgBox.style.transition = `0s`;
                imgBox.style.transform = `translateX(0px)`;
            }, 1000)
            return count = 0;
        }
    }

}



//=========================================== 마우스 호버 이벤트

let next = document.querySelector('.next') //마우스 호버시 슬라이드 멈추기 위한 변수
let pre = document.querySelector('.pre') //마우스 호버시 슬라이드 멈추기 위한 변수
let innerStop = document.querySelector('.innerStop')

// 슬라이드 막기
let slideControl = setInterval(imgSlideShow, 5000)
let go = false

if (!go) {
    next.addEventListener('mouseover', () => {
        clearInterval(slideControl)
    })
    next.addEventListener('mouseout', () => {
        return slideControl = setInterval(imgSlideShow, 5000)
    })
    pre.addEventListener('mouseover', () => {
        clearInterval(slideControl)
    })
    pre.addEventListener('mouseout', () => {
        return slideControl = setInterval(imgSlideShow, 5000)
    })
}

function stopSlide() {
    if (!go) {
        clearInterval(slideControl)
        innerStop.innerText = '>';
        next.addEventListener('mouseout', () => {
            clearInterval(slideControl)
        })
        pre.addEventListener('mouseout', () => {
            clearInterval(slideControl)
        })
        go = true

    } else {
        innerStop.innerText = '||';
        go = false
        return slideControl = setInterval(imgSlideShow, 5000)
    }

}
