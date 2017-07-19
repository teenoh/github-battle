import React, {Component} from 'react'
import queryString from 'query-string'
import api from '../utils/api'
import {Link} from 'react-router-dom'

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

        if (!loading){
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

        return (
            <div>
                {JSON.stringify(this.state, null, 2)}
            </div>
        )
    }
}

export default Results;