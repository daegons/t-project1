let inner = document.querySelector('.inner')
let open = document.querySelector('.inner2')
let section = document.querySelector('.section1')
let wrap = document.querySelector('.wrap')


function mapOpen() {
    let option = document.querySelector('#detail option')
    if (option == null) {
        alert('상세지역을 선택하세요.')
    } else {
        open.style.zIndex = '9'
        open.style.opacity = '1'
        inner.style.display = 'none'
        if (window.innerWidth <= 550) {
            section.style.height = '900px'
            section.style.top = '550px'
            wrap.style.height = '1150px'
        }

    }
}

function mapClose() {
    location.reload(true); //새로고침
    open.style.zIndex = '0'
    inner.style.display = 'flex'
}

// .section1 {
//     width: 85%;
//     max-height: 2000px;
//     top: 580px;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     height: 1000px;
//     background-color: #f8f6f6;
//     border-radius: 50px;
//     padding-bottom: 20px;
//     position: relative;
//     overflow: hidden;
// }
