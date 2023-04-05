let inner = document.querySelector('.inner')
let open = document.querySelector('.inner2')
let section = document.querySelector('.section1')
let wrap = document.querySelector('.wrap')


function mapOpen() {
    let main = document.querySelector('#btn')
    main = main.options[main.selectedIndex].value;
    if (main == 'none') {
        alert('지역을 선택하세요.')
    } else if (main != 'none') {
        let detail = document.querySelector('#detail')
        detail = detail.options[detail.selectedIndex].value;
        if (detail == 'none') {
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
}
function mapClose() {
    location.reload(true); //새로고침
    open.style.zIndex = '0'
    inner.style.display = 'flex'
}
