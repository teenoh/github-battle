import axios from 'axios'

export default {
  fetchPopularRepos: (lang) => {
    var URL = `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`
    
    return axios.get(URL)
                .then((response) => response.data.items)
  }
  
}
