import axios from 'axios'

const ID = 'a9cc94893ef46ffaad02'
const SEC_KEY = '9a329798db36ff341f5433bfdce6f7a926fed166'
const PARAMS = `?client_id=${ID}&client_secret=${SEC_KEY}`

const getUserProfile = (username) => {
  return axios.get(`https://api.github.com/users/${username}${PARAMS}`)
       .then((user) => user.data)
}

const getRepos = (username) => {
  return axios.get(`https://api.github.com/users/${username}/repos${PARAMS}&per_page=100`)
              .then((repos) => repos.data)
}

const getStarCount = (repos) => {
  return repos.reduce((count, repo) => count + repo.stargazers_count ,0)
}

const calculateScores = (profile, repos) => {
  const followers = profile.followers
  const total_stars = getStarCount(repos)

  return (followers * 3) + total_stars
}

const handleError = (error) => {
  console.warn(error)
  return null
}


const getUserData = (player) => {
  return axios.all ([
    getUserProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0]
    const repo = data[1]
    return {
      profile: profile,
      score: calculateScores(profile, repo)
    }
  } 
  ).catch(handleError)
}

const sortPlayers = (players) => {
  return players.sort((a,b) => b.score - a.score)
}


export default {
  battle: (players) => {
    return axios.all(players.map(getUserData))
         .then(sortPlayers)    
  },

  fetchPopularRepos: (lang) => {
    var URL = `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`
    
    return axios.get(URL)
                .then((response) => response.data.items)
  }
  
}
