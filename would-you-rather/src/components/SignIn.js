import React, {Component} from 'react'
import {connect} from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import {setAuthedUser} from '../actions/authedUser'
import logo from '../logo.svg';
import '../css/SignIn.css'

class SignIn extends Component{
    state = {
        sltUser: ""
    }

    submitSetAuthedUser = (e) =>{
        e.preventDefault();
        if(this.state.sltUser !== ""){
            this.props.dispatch(setAuthedUser(this.state.sltUser));
        }
    }

    changeSelectValue(value){
        this.setState(() => ({
            sltUser: value
        }))
    }

    render(){
        const {users} = this.props;
        const {sltUser} = this.state;
        return(
            <Container maxWidth="sm">
                <Card className='CardSignIn'>
                    <CardContent className='CardContentSignIn'>
                        <span>
                            <h2>Welcome to Would You Ratherz App!</h2>
                            <img src={logo} alt="Logo" />
                            <p>Select user to continue.</p>
                        </span>
                        <FormControl className='CardFormSignIn'>
                            <InputLabel id="signin-select-label">User</InputLabel>
                            <Select
                                labelId="signin-select-label"
                                id="signin-select"
                                value={sltUser}
                                onChange={e => this.changeSelectValue(e.target.value)}
                            >
                                {
                                    users !== null && Object.keys(users).map((key, index) => (
                                        <MenuItem value={users[key].id} key={users[key].id}>{users[key].name}</MenuItem>
                                    ))
                                }
                            </Select>
                            <CardActions className='CardActionSignIn'>
                                <Button variant="contained" onClick={this.submitSetAuthedUser}>Submit</Button>
                            </CardActions>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps({users}){
    return{
        users: users === null ? null : users
    }
}

export default connect(mapStateToProps)(SignIn)