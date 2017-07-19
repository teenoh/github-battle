import React, {Component} from 'react'
import queryString from 'query-string'
import api from '../utils/api'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import PlayerPreview from './PlayerPreview'


const Profile = ({info}) => {
    return (
        <PlayerPreview 
                avatar={info.avatar_url}
                id={info.label}
                username={info.login}
                style={{textAlign: "center"}}
            >
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
        console.log(players)
        api.battle([players.playerOneName, players.playerTwoName])
            .then((res) => {
                if (res === null){
                    return this.setState(() => {
                        error: "It looks like there's an error, check to see if each github names exists"
                        loading: false
                    })
                }

                this.setState(() => {
                    return {
                        error: null,
                        winner: res[0],
                        loser: res[1]
                    }
                })
            })
            //you re meant to add bind(this) if it gives error
    }

    render() {
        const error = this.state.error
        const loading = this.state.loading
        const winner = this.state.winner
        const loser = this.state.loser

        if (!loading || winner === null || loser === null){
            return <p>Loading...</p>
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