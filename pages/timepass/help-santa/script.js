console.clear()
setTimeout(function() {
  var santa = document.querySelector('#lp-santa')
  var game_box = document.querySelector('#lp-the-game')
  var height_max = window.innerHeight*.25
  var width_max = 150
  var gift_count = 0
  var score = 0
  var nhs;
  var dialog = document.querySelector('#dialog')
  var quotes = ['Well done!','Excellent!','Perfect!','Joy!','Ho. Ho. ho.','Merry Christmas!']

  var gb_deets = game_box.getBoundingClientRect() 
  var offset = gb_deets.left

  function createCasa() {
    var casa = document.createElement('div')
    casa.className = 'casa'
    casa.style.width = 75 + 'px'
    casa.style.height = 50 + (Math.random()*200) + 'px'
    casa.style.bottom = 0
    casa.style.filter = 'hue-rotate('+Math.random()*90+'deg)'
    var d = 8
    // console.log(d)
    casa.style.animationDuration = d+'s'

    var hitbox = document.createElement('div')
    hitbox.className = 'hitbox'  
    game_box.appendChild(casa).appendChild(hitbox)

    // console.log((d*.75)*1000)
    setTimeout(createCasa, (d*.75)*1000)
  }
  // createCasa()


  function dropPresent() {
    document.querySelector('#tap_me').style.display = 'none'
    var santa_loc = santa.getBoundingClientRect()
    var present = document.createElement('div')
    present.className = 'present'
    present.style.filter = 'hue-rotate('+Math.random()*360+'deg)'
    present.style.left = santa_loc.left - offset + 'px'
    present.style.top = santa_loc.top - gb_deets.top + 'px' 
    console.log(santa_loc.left)

    var hitbox = document.createElement('div')
    hitbox.className = 'present_hitbox'  

    if(!document.querySelector('.present') || document.querySelectorAll('.present').length < 1 ){
      game_box.appendChild(present).appendChild(hitbox)
    } 
  }

  function check_present_collision() {
    if(document.querySelector('.casa')){
      var presents = document.querySelectorAll('.present_hitbox')    
      var chimney = document.querySelector('.hitbox')
      var chimney_deets = chimney.getBoundingClientRect()
      if(chimney_deets.left <= -100 + offset) {
        if(!chimney.classList.contains('dead')) {
          score = 0
          nhs = true
          document.querySelector('#score span').innerHTML = score   
          chimney.parentElement.remove()          
        } else {
          chimney.parentElement.remove()  
        }
      }
      presents.forEach(function(elm){
        var elm_deets = elm.getBoundingClientRect()
        var ouch = !(elm_deets.right < chimney_deets.left || 
                     elm_deets.left > chimney_deets.right || 
                     elm_deets.bottom < chimney_deets.top || 
                     elm_deets.top > chimney_deets.bottom)
        if(ouch) {  
          elm.parentElement.remove()
          chimney.parentElement.style.filter = 'grayscale(1)'
          chimney.classList.toggle('dead')
          chimney.style.top = '150%'
          score++
          document.querySelector('#score span').innerHTML = score

          var newQ = quotes[Math.floor(Math.random()*quotes.length)]        
          dialog.innerHTML = newQ          
          dialog.classList.toggle('offDialog')          
          setTimeout(function(){
            dialog.classList.toggle('offDialog')
          },2500)

          if(localStorage.getItem('santa-drop-score') < score){
            localStorage.setItem('santa-drop-score', score)
            nhs = false
            document.querySelector('#high_score span').innerHTML = score
          }
        }

        if(elm_deets.top >= gb_deets.height + gb_deets.top + 100) {
          elm.parentElement.remove()
          dialog.innerHTML = "That's too bad. :("          
          dialog.classList.toggle('offDialog')          
          setTimeout(function(){
            dialog.classList.toggle('offDialog')
          },2500)
        }
      })
    }
    setTimeout(check_present_collision, 1000/60)
  }

  setTimeout(function(){
    createCasa()
    check_present_collision()  
  }, 1000)

  game_box.addEventListener('click', dropPresent)
  window.addEventListener('keypress', function(e){
    if(e.keyCode == 32) {
      dropPresent()
    } 
  })
},250)

function addSnowFlake(){
  var f = document.createElement('div')
  f.className = 'snowflake'
  var size = (Math.random()*10)+5;
  f.style.width = size+'px'
  f.style.height = size+'px'
  f.style.left = Math.random()*320 + 'px'
  f.style.animationDelay = Math.floor(Math.random()*10) + 's'
  document.querySelector('#snow').appendChild(f)
}

setTimeout(function(){
  for(var i=0;i<8;i++) {
    addSnowFlake()
  }  
},1000)

if(!localStorage.getItem('santa-drop-score')) {
  localStorage.setItem('santa-drop-score', 0)
} else {
  document.querySelector('#high_score span').innerHTML = localStorage.getItem('santa-drop-score')
}

setTimeout(function(){
  dialog.classList.toggle('offDialog')
},5000)