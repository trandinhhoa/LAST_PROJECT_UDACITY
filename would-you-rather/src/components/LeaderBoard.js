import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {getUsers} from '../actions/users'
import '../css/LeaderBoard.css'

class LeaderBoard extends Component{
    componentDidMount(){
        this.props.dispatch(getUsers());
    }

    render(){
        console.log(this.props);
        const {users} = this.props;
        return(
            <Container maxWidth="xs">
                {
                    users !== null && users.map((user) => (
                        <Card key={user.id} className='CardLeaderBoard'>
                            <CardMedia className='CardMediaLeaderBoard'
                                image={user.avatarURL}
                                title={user.name}
                            />

                            <div className='DetailLeaderBoard'>
                                <CardContent className='CardContentLeaderBoard'>
                                    <h4>{user.name}</h4>
                                    <p>Answered Questions: {Object.keys(user.answers).length}</p>
                                    <p>Created Questions: {user.questions.length}</p>
                                
                                    <p>Score: {Object.keys(user.answers).length + user.questions.length}</p>
                                </CardContent>
                            
                            </div>
                        </Card>
                    ))
                }
            </Container>
        )
    }
}

function mapStateToProps({users}){
    let arrUser = []
    for(var user in users){
        arrUser.push(users[user])
    }
    arrUser.sort((a,b) => {
        let score1 = Object.keys(a.answers).length + a.questions.length
        let score2 = Object.keys(b.answers).length + b.questions.length

        if(score1 > score2){
            return -1
        }else if(score1 < score2){
            return 1
        }
        return 0      
    })

    return{
        users: arrUser,
    }
}

export default connect(mapStateToProps)(LeaderBoard)