
let container = document.querySelector('#container')
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

// creating new cards
function createNewCard(title, content) {
  const card = document.createElement('div')
  card.classList.add('new-card')

  let cardTitle = document.createElement('h3')
  cardTitle.classList.add('card-title')
  cardTitle.textContent = title

  let cardContent = document.createElement('p')
  cardContent.classList.add('card-content')
  cardContent.textContent = content

  card.append(cardTitle, cardContent)
  trackNotes.append(card)
}


// loading stored data from localStorage (clears old Ui first)
function loadingData() {
  
  let storedData = localStorage
  for (let i = 0; i < storedData.length; i++) {
    const key = localStorage.key(i)
    console.log(`${key}`)
    const value = localStorage[key]
    console.log(`--${value}-`)
    card = createNewCard(key, value)
    console.log(card)
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



// Event Listeners 
addingHabitBtn.addEventListener('click', addingNewHabit)