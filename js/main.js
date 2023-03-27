let home = document.querySelector('.home')
let homewrap = document.querySelectorAll('.homewrap li')

home.addEventListener('mouseover', function(){
    home.classList.add('on')
    homewrap[1].innerHTML= `홈`
})

home.addEventListener('mouseout', function(){
    home.classList.remove('on')
    homewrap[1].innerHTML= `<i class="fa-solid fa-house"></i>`
})

