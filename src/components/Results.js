import React, {Component} from 'react'
import queryString from 'query-string'
import api from '../utils/api'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

const Profile = ({info}) => {
    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className="space-list-items">
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
            </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired
}

const Player = (props) => {
    return (
        <div>
            <h1 className="header">{props.label}</h1>
            <h3 style={{textAlign: "center"}}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}


class Results extends Component {
    constructor(props){
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount(){
        const players = queryString.parse(this.props.location.search)
        api.battle([players.playerOneName, players.playerTwoName])
            .then((players) => {
                if (players === null){
                    console.log(players)
                    return this.setState(() => (
                         { 
                            error: "It looks like there's an error, check to see if each github names exists",
                            loading: false,
                         })
                    )
                }

                this.setState(() => (
                    {
                        error: null,
                        winner: players[0],
                        loser: players[1],
                        loading: false
                    })
                )
            })
            //you re meant to add bind(this) if it gives error
    }

    render() {
        const error = this.state.error
        const loading = this.state.loading
        const winner = this.state.winner
        const loser = this.state.loser

        if (loading === true){
            return <Loading />
        }

        if (error){
            return (
                <div>
                    <p>{error}</p>
                    <Link to="/battle">Reset</Link>
                </div>
            )
        }

        console.log(winner)
        return (
            <div className="row">
                <Player 
                    label="Winner"
                    score={winner.score}
                    profile={winner.profile}/>

                <Player 
                    label="Loser"
                    score={loser.score}
                    profile={loser.profile}/>
            </div>
        )
    }
}

export default Results;