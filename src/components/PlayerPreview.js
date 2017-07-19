import React from 'react'
import Proptypes from 'prop-types'

const PlayerPreview = (props) => {

    return (
        <div>
            <div className="column">
                <img
                    className="avatar"
                    src={props.avatar}
                    alt={`avatar for ${props.username}`}/>

                <h2 className="username">@{props.username}</h2>
            </div>
            {props.children}
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: Proptypes.string.isRequired,
    username: Proptypes.string.isRequired,
}
 export default PlayerPreview