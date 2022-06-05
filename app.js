import fetchAPI from './fetchAPI.js'


const loadingContainer = document.querySelector(".loading-container")


async function getUsers(num){
  const {data, error, loading} = await fetchAPI(`https://randomuser.me/api/?results=${num}`)


  return [ data, error, loading]
}


async function displayUsers(){
  const [ data, error, loading] = await getUsers(100)
  const usersContainer = document.querySelector('.users-container')

  if(!loading){
    loadingContainer.classList.add("hide")
  }
  if(error){
    usersContainer.innerText = `${error} - Try refreshing the page`
  }else{
    const users = data.results
    createListOfCountries(users)
    createUserFromList(users, usersContainer)
    eventListeners(users)
  }
}

function createListOfCountries(users){
  const listCountries = getCountries(users)
  const selectCountry = document.querySelector(".select-country")

  listCountries.forEach((country) => {
    const option = document.createElement("option")
    option.value = country
    option.innerText = country

    selectCountry.appendChild(option)

  })
}

function getCountries(users){
  const countries = users.map(user => {
    return user.location.country
  })

  const onlyUnique = (value, index, self) => self.indexOf(value) === index;

  return countries.filter(onlyUnique)
}

function createUserFromList(users, container){
  const usersFound = document.querySelector(".users-found")

  usersFound.innerHTML = `Users found: ${users.length}`

  users.forEach(user => {
    const div = document.createElement("div")
    div.className = 'user'

    div.innerHTML = `
     <img src=${user.picture.large}></img>
        <div class="user-informations">
           <h4 class="user-title">${user.name.first} ${user.name.last}</h4>
            <p class="user-locale">${user.location.city} - ${user.location.country}</p>
    `
    container.appendChild(div)
  });
}

function eventListeners(users){
  const usersContainer = document.querySelector(".users-container")

  const searchUsers = document.querySelector("#search-users");
  searchUsers.addEventListener("input", () => {

    const selectCountry = document.querySelector(".select-country")
    let filterUsers;
    if(selectCountry.value == "0") {
      filterUsers = users.filter((user) =>
      `${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()} `
        .includes(searchUsers.value.toUpperCase())
      )

    }else{
      filterUsers = users.filter((user) =>
      `${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()} `
        .includes(searchUsers.value.toUpperCase())
          && user.location.country == selectCountry.value
      )
    }

    usersContainer.innerHTML = ''
    createUserFromList(filterUsers, usersContainer)
  })

  const selectCountry = document.querySelector(".select-country");

  selectCountry.addEventListener("change", ({target}) => {
    const searchUsers = document.querySelector("#search-users");
    searchUsers.value = ''
    usersContainer.innerHTML = ''

    if(target.value != '0'){
      const filterUsers = users.filter((user) => user.location.country == target.value)
      createUserFromList(filterUsers, usersContainer)
    }else{
      createUserFromList(users, usersContainer)

    }

  })

}




displayUsers()



