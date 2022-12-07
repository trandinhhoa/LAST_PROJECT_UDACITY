import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {handleGetUsers} from '../actions/shared'

const styles = {
    root: {
        display: 'flex',
        marginBottom: 20,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
}

class LeaderBoard extends Component{
    componentDidMount(){
        this.props.dispatch(handleGetUsers());
    }

    render(){
        const {users} = this.props;
        return(
            <Container maxWidth="xs">
                {
                    users !== null && users.map((user) => (
                        <Card key={user.id} style={styles.root}>
                            <CardMedia
                                style={styles.cover}
                                image={user.avatarURL}
                                title={user.name}
                            />

                            <div style={styles.details}>
                                <CardContent style={styles.content}>
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
    let sortedUsers = []
    for(var user in users){
        sortedUsers.push(users[user])
    }
    sortedUsers.sort((a,b) => {
        let ascore = Object.keys(a.answers).length + a.questions.length
        let bscore = Object.keys(b.answers).length + b.questions.length

        if(ascore < bscore){
            return 1
        }else if(ascore > bscore){
            return -1
        }
        return 0
        
    })

    return{
        users: sortedUsers,
    }
}

export default connect(mapStateToProps)(LeaderBoard)