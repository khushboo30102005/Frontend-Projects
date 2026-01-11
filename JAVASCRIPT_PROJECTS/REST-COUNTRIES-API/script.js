const countriesContainer = document.querySelector('.countries-container')
const filter = document.querySelector('#filter')
const searchInput = document.querySelector('#search-input')
const theme = document.querySelector('.theme')
const themeMoon = document.querySelector('.theme span')

let allCountriesData

let mode = localStorage.getItem('mode') || 'Light'
  if (mode === 'Light') {
    document.body.classList.remove('dark')
     theme.innerHTML = '<i class="fa-regular fa-moon"></i></span> dark mode'
    
  } else if (mode === 'Dark') {
    document.body.classList.add('dark')
    theme.innerHTML = '<i class="fa-solid fa-sun"></i>  light mode'
  }

theme.addEventListener('click', () => {

  if (mode === 'Light') {
    mode = 'Dark'
    document.body.classList.add('dark')
    theme.innerHTML = '<i class="fa-solid fa-sun"></i>  light mode'
  } else if (mode === 'Dark') {
    mode = 'Light'
    document.body.classList.remove('dark')
    theme.innerHTML = '<i class="fa-regular fa-moon"></i> dark mode'
  }
  localStorage.setItem('mode', mode)
})

fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,subregion,tld,currencies,languages,borders')
  .then(res => res.json())
  .then(data => {
    renderCountries(data)
    allCountriesData = data
  })

filter.addEventListener('change', (e) => {
  countriesContainer.innerHTML = ""
  if (filter.value === 'All') {

    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,subregion,tld,currencies,languages,borders')
      .then(res => res.json())
      .then(renderCountries)
  } else {

    fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
      .then(res => res.json())
      .then(renderCountries)
  }
})

searchInput.addEventListener('input', (e) => {
  let filteredCountries = allCountriesData.filter(country => country.name.common.toLowerCase().includes(searchInput.value.toLowerCase()))
  renderCountries(filteredCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach(country => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `country.html?name=${country.name.common}`
    countryCard.innerHTML = `
       <img class="flag" src='${country.flags.svg}' alt="${country.name.common}-flag">
          <div class="country-details">
            <h2 class="country">${country.name.common}</h2>
            <p><b>Population: </b> ${(country.population).toLocaleString('en-IN')} </p>
            <p> <b>Region: </b>${country.region} </p>
            <p><b>Capital: </b>${country?.capital?.[0]} </p>
          </div>`
    countriesContainer.append(countryCard)
  })
}

