//HTML ELEMENTS
let cardDivs = document.querySelectorAll('.card');

//CREATE ARRAY OF IMGAGE PATHS
let imgArr = new Array();

Array.prototype.shuffle = function(){
  for(let i = imgArr.length-1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = imgArr[i]
    imgArr[i] = imgArr[j]
    imgArr[j] = temp
  }
}

for (let i=0; i< 8;i++){
  imgArr.push("assets/visuals/p"+(i+1)+".jpg");
  imgArr.push("assets/visuals/p"+(i+1)+".jpg");
}
imgArr.shuffle();
console.log(imgArr);



//CREATING CARD CLASS AND ADDING INSTANCES TO AN ARRAY

let cardsArray = new Array();
class Card{
  constructor (card, position, isOpen, imgSource, isFound){
    this.card = card;
    this.position = position;
    this.isOpen = isOpen;
    this.imgSource = imgSource;
    this.isFound = isFound;
  }
}

for (let i = 0; i < cardDivs.length; i++) {
  cardsArray.push(new Card(cardDivs[i], i, false, imgArr[i], false))
}

console.log(cardsArray);

//LISTENING FOR CLICK: CHANING BLANCK CARD TO IMG
let waitingCardImg = ''
cardsArray.forEach((objCard,index) => {
  objCard.card.addEventListener('click', function(){
    let cardOpen = cardsArray.filter(objCard => objCard.isOpen === true);
    let cardIsFound = cardsArray.filter(objCard => objCard.isFound === true);
    
    if(cardOpen.length === 0 && cardIsFound.length === 0){
      console.log('no open card');
      objCard.isOpen = true;
      let imgTag = document.createElement('img')
      imgTag.setAttribute('src', objCard.imgSource)
      imgTag.classList.add('imgStyle')
      objCard.card.appendChild(imgTag);
      waitingCard = objCard.imgSource
      console.log(waitingCard);
    }
    if(cardOpen.length >0){
      console.log('open card is ' + objCard.position);
      objCard.isOpen = true;
      let imgTag = document.createElement('img')
      imgTag.setAttribute('src', objCard.imgSource)
      imgTag.classList.add('imgStyle')
      objCard.card.appendChild(imgTag);
      
      if (objCard.imgSource.localeCompare(waitingCardImg)=== 0) {
        console.log('you found match')
      }

      if (objCard.imgSource.localeCompare(waitingCardImg) !== 0) {
        console.log('try again');
      }
    }
    
    // console.log(cardOpen);
    // console.log(cardIsFound);
  })
});

function strCompare(a, b)
{   
    return (a<b?-1:(a>b?1:0));  
}



