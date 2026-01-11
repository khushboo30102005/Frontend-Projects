const countryName = new URLSearchParams(window.location.search).get('name')
const backBtn = document.querySelector('.back-btn')
const flagImg = document.querySelector('.flag')
const countryNameH1 = document.querySelector('.name')
const nativeName = document.querySelector('.Native-Name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subregion = document.querySelector('.subregion')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const Currencies = document.querySelector('.Currencies')
const Languages = document.querySelector('.Languages')
const borderCountries = document.querySelector('.country-border')
const theme = document.querySelector('.theme')


// THEME SWITCHING ==> 

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

// BACK BUTTON ==> 

backBtn.addEventListener('click', () => {
  history.back()
})

// FETCH COUNTRY'S DETAILS ==> 
  
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then(res => res.json())
  .then(([country]) => {

    flagImg.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld[0]

    // NATIVE NAME ==>

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      nativeName.innerText = country.name.common
    }

    // CAPITAL ==>

    if (!country.capital) {
      capital.parentElement.classList.add('unavailable')
    } else {
      capital.innerText = country.capital.join(', ')
    }

    // SUBREGION ==>

    if (!country.subregion) {
      subregion.parentElement.classList.add('unavailable')
    } else {
      subregion.innerText = country.subregion

    }

    // CURRENCIES ==>


    if (country.currencies) {
      Currencies.innerText = Object.values(country.currencies).map(curr => curr.name).join(', ')
    } else {
      Currencies.parentElement.classList.add('unavailable')
    }

    Languages.innerText = Object.values(country.languages).reverse().join(', ')

    if (!country.borders) {
      borderCountries.classList.add('unavailable')
    }
    // BORDERS ==> 

    if (country.borders) {

      country.borders.forEach((borders) => {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
          .then(res => res.json())
          .then(([border]) => {
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = border.name.common
            borderCountryTag.classList.add('border-country-name')
            borderCountryTag.href = `country.html?name=${border.name.common}`

            borderCountries.append(borderCountryTag)
          })
      });
    }
  }
  )



