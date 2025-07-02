let timerDuration = 25 * 60
let currentTime = timerDuration
let timerDisplay = document.querySelector('#timer-display')
let startBtn = document.querySelector('.start')
let pauseBtn = document.querySelector('.pause')
let resetBtn = document.querySelector('.reset')

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

// checking the cards note counts
function checkingCardsCount() {
  if (trackNotes.childElementCount >= 4) {
    console.log('Note limit Found!')
    // removing note creating container 
    container.removeChild(trackingNotesContainer)
  } else {
    container.insertBefore(trackingNotesContainer, trackNotes)
  }
}

// removing cards
function removingCards(e) {
  let selectionCard = e.target.parentElement.parentElement
  if (trackNotes.contains(selectionCard)) {
    trackNotes.removeChild(selectionCard)
    console.log('removing note')
    // also removing localStorage
    console.log(selectionCard.children[0].children[1])
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
  let card = document.createElement('div')
  card.classList.add('new-card')

  let topContent = document.createElement('div')
  topContent.classList.add('top-content')

  let icon = document.createElement('span')
  icon.classList.add('material-symbols-outlined')
  icon.textContent = 'bolt'
  
  let cardTitle = document.createElement('h3')
  cardTitle.classList.add('card-title')
  cardTitle.textContent = title

  let cardContent = document.createElement('p')
  cardContent.classList.add('card-content')
  cardContent.textContent = content

  topContent.append(icon, cardTitle, cardContent)

  let bottomContent = document.createElement('div')
  bottomContent.classList.add('bottom-content')
  let deleteBtn = document.createElement('button')
  deleteBtn.classList.add('material-symbols-outlined')
  deleteBtn.textContent = 'delete'  
  deleteBtn.addEventListener('click', removingCards)  
  bottomContent.append(deleteBtn)

  card.style.backgroundColor = `hsl(${Math.random() * 360}, 60%, 40%)`
  card.append(topContent, bottomContent)
  trackNotes.append(card)
  // checking how many note cards contains 
  checkingCardsCount()
}


// loading stored data from localStorage (clears old Ui first)
function loadingData() {
  trackNotes.innerHTML = ''
  let storedData = localStorage
  for (let i = 0; i < storedData.length; i++) {
    const key = localStorage.key(i)
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
}


// reseting the timer
function resetTimer() {
  console.log('this is working')
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
}



function convertTime(seconds) {
  let mins = Math.floor(seconds / 60)
  let secs = seconds % 60
  return `${String(mins).padStart(2, '0')}: ${String(secs).padStart(2, '0')}`
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
