import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

function RepoGrid (props){
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li 
            key={repo.name}
            className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img 
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}/>
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
            
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

const SelectedLanguage = (props) => {
  const languages = ['All', 'Javascript', 'Python', 'Ruby', 'Css', 'Java']
  
  return (
    <div>
        <ul className='languages'>
          {languages.map((lang, index) => 
          <li key={index}
            style={lang === props.selectedLanguage ?
                  {color: "#d0021b"}: null} 
            onClick={props.onSelect.bind(null, lang)}>
              {lang}
          </li>
          )

          }
        </ul>
      </div>
    )
}


class Popular extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      selectedLanguage : 'All',
      repos: null
    }
    
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  
  updateLanguage(lang){
    this.setState({
      selectedLanguage: lang,
      repos: null
    })
    
    api.fetchPopularRepos(lang)
       .then((repos) => {
          this.setState({repos})
    })
  }
  
  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage)
  }
  
  render(){
    return (
      <div>
        <SelectedLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
        
        {!this.state.repos ? <p>Loading...</p>
          :<RepoGrid repos={this.state.repos} />
        }
      </div>    
    ) 
    
  }
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default Popular