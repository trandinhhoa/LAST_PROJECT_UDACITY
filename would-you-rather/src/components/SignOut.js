import React, {Component} from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import {setAuthedUser} from '../actions/authedUser'
import '../css/SignOut.css'

class SignOut extends Component{
    signOut =(e) =>{
        e.preventDefault();
        this.props.dispatch(setAuthedUser(null));
    }

    render(){
        const {user} = this.props
        return(
            <div className='MainSignOut'>
                <p className='NameUserSignOut'>Hello, {user.name}</p>
                <Avatar className='AvatarSignOut' alt={user.name} src={user.avatarURL}/>
                <Button className='BtnSignOut' variant="contained" onClick={this.signOut} >Sign out</Button>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}){
    return{
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(SignOut)