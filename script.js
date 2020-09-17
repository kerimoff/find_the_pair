Array.prototype.shuffle = function(){
  // change input var name
  for(let i = this.length-1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    // can use pattern matching
    const temp = this[i]
    this[i] = this[j]
    this[j] = temp
  }
}
class Card{
  constructor (position, isOpen, imgSource, isFound){
    this.position = position;
    this.isOpen = isOpen;
    this.imgSource = imgSource;
    this.isFound = isFound;
  }

  open() {
    this.isOpen = true
    document.getElementById(this.position).classList.add('display')
  }

  close() {
    this.isOpen = false
    document.getElementById(this.position).classList.remove('display')
  }

  setFound(){
    this.isFound = true;
    document.getElementById(this.position).classList.add('display')
    this.isOpen = false;
  }
}

class Game{
  constructor (cardsCollection, username, score){
    this.cardsCollection = cardsCollection;
    this.username = username;
    this.score = score;
    this.size = cardsCollection.length;
  }

  // Parameters
  get isOver() {
    let foundCards = this.cardsCollection.filter(card => card.isFound);
    return foundCards.length == this.size;
  }
  
  get hasOpenCard() {
    return this.openCards.length > 0;
  }

  get openCards() {
    return this.cardsCollection.filter(card => card.isOpen);
  }
  
  get openCard() {
    if (this.hasOpenCard) {
      return this.openCards[0]
    } else {
      return false;
    }
  }
  
  closeOpenCards() {
    this.openCards.forEach(card => {
      if (!card.isFound) card.close()
    })
  }
}

//HTML ELEMENTS
let cardDivs = document.querySelectorAll('.card');

let numberOfImages = cardDivs.length;

//CREATE ARRAY OF IMGAGE PATHS
let imgArr = new Array();

for (let i=0; i<numberOfImages / 2; i++){
  imgArr.push("assets/visuals/p"+(i+1)+".jpg");
  imgArr.push("assets/visuals/p"+(i+1)+".jpg");
}
imgArr.shuffle();

//CREATING CARD CLASS AND ADDING INSTANCES TO AN ARRAY
let cardsArray = new Array();
for (let i = 0; i < numberOfImages; i++) {
  cardsArray.push(new Card(i, false, imgArr[i], false))
}

let game  = new Game(cardsArray, "Nurlan", 0)

//looping through array and listening for events
cardsArray.forEach((objCard,index) => {
  //create img tag and add img link to divs in object.card(which is an html element)
  let imgTag = document.createElement('img')
  imgTag.setAttribute('src', objCard.imgSource)
  imgTag.setAttribute('id', objCard.position)
  imgTag.classList.add('imgStyle')

  cardDivs[index].appendChild(imgTag);

  //listen for the click
  cardDivs[index].addEventListener('click', function(e){
    if (game.openCards.length > 1) {
      game.closeOpenCards();
    }
    
    if (!game.hasOpenCard) {
      objCard.open()
    } else {
      if (objCard.position == game.openCard.position) {
        return
      }
      if (objCard.imgSource === game.openCard.imgSource) {
        game.openCard.setFound()
        objCard.setFound()
        if (game.isOver) {
          setTimeout(()=>{
            alert("The game is over!!!")
          },500)
        }
      } else {
        objCard.open();
        // setTimeout(()=>{
        //   if (!objCard.isFound) objCard.close()
        //   if (game.hasOpenCard && !game.openCard.isFound) game.openCard.close()
        // },1000).bind([objCard, game.openCard])
      }
    }
    console.log(game.openCards);
  }); // end eventListener


}); // end forEach
