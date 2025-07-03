let timerDuration = 25 * 60
let currentTime = timerDuration
let timerDisplay = document.querySelector('#timer-display')
let startBtn = document.querySelector('.start')
let pauseBtn = document.querySelector('.pause')
let resetBtn = document.querySelector('.reset')

let tracker = false

let isRunning = false
let timerIntervel = null

let container = document.querySelector('#container')
let trackingNotesContainer = document.querySelector('.tracking-notes-container')
let habitTitleInp = document.querySelector('#habit-title')
let habitContentInp = document.querySelector('#habit-content')
let addingHabitBtn = document.querySelector('.adding-habit-btn')
let trackNotes = document.querySelector('#track-notes')
checkingNotes()

function checkingNotes() {
  if (localStorage.length > 0) {
    loadingData()
  }
}

// habit tracking when it clicks on on habit
function habitTracking(e) {
  tracker = !tracker
}

// checking the cards note counts
function checkingCardsCount() {
  if (trackNotes.childElementCount >= 4) {
    console.log('Note limit Found!')
    // removing note creating container 
    container.removeChild(trackingNotesContainer)
  } else {
    // ADDING TRACKING CONTAINER 
    container.insertBefore(trackingNotesContainer, trackNotes)
  }
}

// removing cards
function removingCards(e) {
  let selectionCard = e.target.parentElement.parentElement
  if (trackNotes.contains(selectionCard)) {
    trackNotes.removeChild(selectionCard)

    // also removing localStorage
    selectionTitle = selectionCard.children[0].children[1].textContent
    if (selectionTitle in localStorage) {
      localStorage.removeItem(selectionTitle)
      // check everytime for getting the create habit section
      checkingCardsCount()
    }
  }
}

// creating new cards
function createNewCard(title, content) {
  // card creation
  let card = document.createElement('div')
  card.classList.add('new-card')

  // top content container creation
  let topContent = document.createElement('div')
  topContent.classList.add('top-content')

  // icon creation
  let icon = document.createElement('span')
  icon.classList.add('material-symbols-outlined')
  icon.textContent = 'bolt'
  
  // content title creation
  let cardTitle = document.createElement('h3')
  cardTitle.classList.add('card-title')
  cardTitle.textContent = title

  // content content' element creation
  let cardContent = document.createElement('p')
  cardContent.classList.add('card-content')
  cardContent.textContent = content

  // adding components here
  topContent.append(icon, cardTitle, cardContent)

  // another content container creation
  let bottomContent = document.createElement('div')
  bottomContent.classList.add('bottom-content')
  // delet button creation
  let deleteBtn = document.createElement('button')
  // button's adding a an icon
  deleteBtn.classList.add('material-symbols-outlined')
  deleteBtn.textContent = 'delete'  
  // button's delete event 
  deleteBtn.addEventListener('click', removingCards)  
  bottomContent.append(deleteBtn)

  // random hsl colors applying in every card when it creates
  card.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 20%)`
  // adding other components in card cotnainer
  card.append(topContent, bottomContent)
  // card event 
  card.addEventListener('click', habitTracking)
  // adding card contents in track note container
  trackNotes.append(card)
  // checking how many note cards contains 
  checkingCardsCount()
}


// loading stored data from localStorage (clears old Ui first)
function loadingData() {
  trackNotes.innerHTML = ''
  let storedData = localStorage
  for (let i = 0; i < storedData.length; i++) {
    // getting the key of object
    const key = localStorage.key(i)
    // getting the value of key
    const value = localStorage[key]
    createNewCard(key, value)
  }
}

// adding new habits
function addingNewHabit() {
  const title = habitTitleInp.value.trim()
  const content = habitContentInp.value.trim()
  if (!title) return

  // save to localStorge if not already saved
  if (!localStorage.getItem(title)) {
    localStorage.setItem(title, content)
  }

  // update the UI
  loadingData()

  // clear input
  habitTitleInp.value = ''
  habitContentInp.value = ''

  // input focusing for next adding next habit
  habitTitleInp.focus()
}


// reseting the timer
function resetTimer() {
  clearInterval(timerIntervel)
  timerIntervel = null
  resetThings()
  isRunning = false
}

function resetThings() {
  currentTime = timerDuration
  updateTimer(currentTime)
}

// pausing the timer
function pausingTimer() {
  clearInterval(timerIntervel)
  isRunning = false
}

// running timer 
function runningTimer() {
  if (tracker) {
    if (isRunning) return
    isRunning = true
    timerIntervel = setInterval(() => {
      if (currentTime > 0) {
        currentTime--
        updateTimer(currentTime)
      } else {
        clearInterval(timerIntervel)
        isRunning = false
        currentTime = timerDuration
      }
    }, 1000)
  } else {
    console.log('select any habit from you creates')
  }
}



function convertTime(seconds) {
  let mins = Math.floor(seconds / 60)
  let secs = seconds % 60
  return `${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`
}

// update timer 
function updateTimer(time) {
  timerDisplay.textContent = convertTime(time)
}



// Event Listeners 
addingHabitBtn.addEventListener('click', addingNewHabit)
startBtn.addEventListener('click', runningTimer)
pauseBtn.addEventListener('click', pausingTimer)
resetBtn.addEventListener('click', resetTimer)
