
let habitTitleInp = document.querySelector('#habit-title')
let habitContentInp = document.querySelector('#habit-content')
let addingHabitBtn = document.querySelector('.adding-habit-btn')
const trackingNotes = document.querySelector('.tracking-notes')

checkingNotes()

function checkingNotes() {
  if (localStorage.length > 0) {
    loadingData()
  }
}

// creating new cards
function createNewCard(title, content) {
  // trackingNotes.innerHTML = ''
  const card = document.createElement('div')
  card.classList.add('new-card')

  let cardTitle = document.createElement('h3')
  cardTitle.classList.add('card-title')
  cardTitle.textContent = title

  let cardContent = document.createElement('p')
  cardContent.classList.add('card-content')
  cardContent.textContent = content

  card.append(cardTitle, cardContent)
  trackingNotes.append(card)
}


// loading stored data from localStorage (clears old Ui first)
function loadingData() {
  trackingNotes.innerHTML = ''    // clear prevous cards first
  let storedData = localStorage
  for (let i = 0; i < storedData.length; i++) {
    const key = localStorage.key(i)
    console.log(`${key}`)
    const value = localStorage[key]
    console.log(`--${value}-`)
    createNewCard(key, value)
  }
}

// adding new habits
function addingNewHabit() {
  const title = habitTitleInp.value
  const content = habitContentInp.value 
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