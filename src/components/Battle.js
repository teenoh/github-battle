import React from 'react'
import Proptypes from 'prop-types'
import {Link} from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

class PlayerInput extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            username: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({username: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()

        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }

    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {this.props.label}
                    <input type="text"
                        id="username"
                        placeholder="Github username"
                        autoComplete="off"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <input
                        type="submit" 
                        className="button"
                        disabled={!this.state.username}/>
                </label>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: Proptypes.string.isRequired,
    label: Proptypes.string.isRequired,
    onSubmit: Proptypes.func.isRequired,
}

class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOneName: "",
            playerTwoName: "",
            playerOneImage: null,
            playerTwoImage: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleSubmit(id, username){
        this.setState(() => {
            const newState = {}
            newState[`${id}Name`] = username;
            newState[`${id}Image`] = `https://github.com/${username}.png`
            return newState
        })
    }

    handleReset(id){
        this.setState(() => {
            const resetState = {}
            resetState[`${id}Name`] = ""
            resetState[`${id}Image`] = null
            return resetState
        })

    }

    render(){
        const playerOneName = this.state.playerOneName
        const playerTwoName = this.state.playerTwoName
        const playerOneImage = this.state.playerOneImage
        const playerTwoImage = this.state.playerTwoImage
        const match = this.props.match
        
        return (
            <div>
                <div className="row">
                    {!playerOneName && 
                        <PlayerInput
                            id="playerOne"
                            label="Player One"
                            onSubmit={this.handleSubmit}
                        />}
                    
                    {playerOneImage !== null &&
                        <PlayerPreview 
                            avatar={playerOneImage}
                            username={playerOneName}>
                            <button 
                                className="reset"
                                onClick = {this.handleReset.bind(null,'playerOne')}>
                                Reset
                            </button>            
                        </PlayerPreview>
                        }    


                    {!playerTwoName && 
                        <PlayerInput
                            id="playerTwo"
                            label="Player Two"
                            onSubmit={this.handleSubmit}
                        />}

                    {playerTwoImage !== null &&
                        <PlayerPreview 
                            avatar={playerTwoImage}
                            username={playerTwoName}>
                            <button 
                                className="reset"
                                onClick = {this.handleReset.bind(null,'playerTwo')}>
                                Reset
                            </button>            
                        </PlayerPreview>}

                </div>

                {playerOneImage && playerTwoImage &&
                    <Link
                        className="button"
                        to = {{
                            pathname: `${match.url}/results`,
                            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                        }}>
                    Battle
                    </Link>    
                }
            </div>
        )
    }
}

export default Battle;