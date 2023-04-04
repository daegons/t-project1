let imgChange = document.querySelector(".section2 .best > p");
let mright = document.querySelector(".mright");

imgChange.addEventListener("click", () => {
  const imgArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const randomValue = imgArray[Math.floor(Math.random() * imgArray.length)];

  let change1 = "";
  let change2 = "";
  let change3 = "";

  // change += `<img src="./img/${randomValue}.jpg" alt="#" /><img src="./img/${
  //   randomValue + 1
  // }.jpg" alt="#" /><img src="./img/${randomValue - 1}.jpg" alt="#"/>`;

  change1 += `<img src="./img/${randomValue}.jpg" alt="#" />`;
  change2 += `<img src="./img/${randomValue+1}.jpg" alt="#" />`;
  change3 += `<img src="./img/${randomValue-1}.jpg" alt="#" />`;
  
  $(".mright>img").remove();
  $(".mright").append(change1);
  setTimeout(function() {
    $(".mright").append(change2);
  }, 100);
  setTimeout(function() {
    $(".mright").append(change3);
  }, 200);
});
