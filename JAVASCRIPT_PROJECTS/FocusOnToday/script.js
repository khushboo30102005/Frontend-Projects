const checkboxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const bottomQuote = document.querySelector('.bottom-quote')
const resetGoals = document.querySelector('.reset')
const goalBox = document.querySelectorAll('.goal-box')
const themeSwitcherBtn = document.querySelector('.mode')
const mode = document.querySelector('.mode')
const totalNoOFGoal = inputFields.length

// THEME SWITCHER ==>

let theme = localStorage.getItem('theme') || 'light'

if (theme === 'light') {
  document.body.classList.remove('dark')
  mode.innerHTML = '<i class="fa-solid fa-moon"></i> dark mode'
} else if (theme === 'dark') {
  document.body.classList.add('dark')
  mode.innerHTML = ` <i class="fa-solid fa-sun"></i>  light mode`
}

themeSwitcherBtn.addEventListener('click', () => {
  if (theme === 'light') {
    theme = 'dark'
    document.body.classList.add('dark')
    mode.innerHTML = ` <i class="fa-solid fa-sun"></i>  light mode`
  } else if (theme === 'dark') {
    theme = 'light'
    document.body.classList.remove('dark')
    mode.innerHTML = '<i class="fa-solid fa-moon"></i> dark mode'
  }
  localStorage.setItem('theme', theme)
})


const progressQuotes = [

  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill 😎',

  ' “Move one step ahead, today!”',
  '“A journey of a thousand miles begins with a single step.” ',
  '“Keep Going, You’re making great progress!”',
  '“It always seems impossible until it’s done.” '

]




const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter((goal) => { return goal.completed }).length

progressLabel.innerText = progressQuotes[completedGoalsCount]   // UPDATE PROGRESS QUOTE
bottomQuote.innerText = progressQuotes[completedGoalsCount + totalNoOFGoal + 1]

progressValue.style.width = `${(completedGoalsCount / totalNoOFGoal) * 100}%`

progressValue.firstElementChild.innerText = `${completedGoalsCount}/${totalNoOFGoal} completed`



// CONVERT NODE LIST INTO AN ARRAY

const inputFieldsArr = [...inputFields]

checkboxList.forEach((checkbox) => {

  checkbox.addEventListener('click', (e) => {
    if (inputFieldsArr.every((input) => {
      return input.value.trim()
    })) {
      checkbox.parentElement.classList.toggle('completed')    // FOR CHECK AND UNCHECK CHECKBOXES 

      const inputId = checkbox.nextElementSibling.id

      allGoals[inputId].completed = !allGoals[inputId].completed   // store check or uncheck in localStorage

      completedGoalsCount = Object.values(allGoals).filter((goal) => { return goal.completed }).length

      progressValue.style.width = `${(completedGoalsCount / totalNoOFGoal) * 100}%`

      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${totalNoOFGoal} completed`

      bottomQuote.innerText = progressQuotes[completedGoalsCount + totalNoOFGoal + 1]

      progressLabel.innerText = progressQuotes[completedGoalsCount]    //  QUOTES UPDATING..

      localStorage.setItem('allGoals', JSON.stringify(allGoals))   //UPDATE GOALS IN LOCAL STORAGE

    } else {
      progressBar.classList.add('show-error')         // FOR SHOWING ERROR 
    }
  })
})

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }


  input.addEventListener('focus', (e) => {
    progressBar.classList.remove('show-error')  // HIDE ERROR WHEN INPUT FIELD IS FOCUSED 
  })
  input.addEventListener('input', (e) => {

    if (allGoals[input.id]) {
      if (allGoals[input.id].completed) {
        input.value = allGoals[input.id].name
        return                                 // CAN NOT CHANGE AND CUT GOAL AFTER COMPLETED..
      }
    }

    // STORE VALUES IN allGoal OBJECT DURING INPUT..


    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value
      }
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals))   //STORE GOALS IN LOCAL STORAGE
  })

})

resetGoals.addEventListener('click', (e) => {


  localStorage.removeItem("allGoals");

  Object.keys(allGoals).forEach(key => delete allGoals[key]);

  inputFields.forEach(input => input.value = "");

  goalBox.forEach(goal => goal.classList.remove('completed'))

  completedGoalsCount = 0
  progressBar.firstElementChild.style.width = `${completedGoalsCount / totalNoOFGoal * 100}%`

  progressValue.firstElementChild.innerText = `${completedGoalsCount}/${totalNoOFGoal}completed`

  progressLabel.innerText = progressQuotes[completedGoalsCount]

  bottomQuote.innerText = progressQuotes[completedGoalsCount + totalNoOFGoal + 1]

})

