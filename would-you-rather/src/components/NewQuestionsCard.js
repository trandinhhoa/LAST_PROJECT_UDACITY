import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container'
import Input from '@material-ui/core/Input'
import {processAddQuestion} from '../actions/questions'
import '../css/NewQuestionCard.css'

class NewQuestionsCard extends Component{
    state = {
        valueOptionOne: '',
        valueOptionTwo: '',
        isHome: false
    }

    processSubmit = (event) =>{
        event.preventDefault();

        const {valueOptionOne, valueOptionTwo} = this.state;
        const {dispatch, id} = this.props;

        if(valueOptionOne.trim() !== "" && valueOptionTwo.trim() !== ""){
            dispatch(processAddQuestion(valueOptionOne, valueOptionTwo));

            this.setState(() => ({
                valueOptionOne: '',
                valueOptionTwo: '',
                isHome: id ? false : true,
            }));
        }
    }

    processInputChange = (event) => {
        const value = event.target.value;
        if(event.target.id === 'option-one'){
            this.setState(() => ({
                valueOptionOne: value
            }))
        }else{
            this.setState(() => ({
                valueOptionTwo: value
            }))
        }
    }

    render(){
        const {valueOptionOne, valueOptionTwo, isHome} = this.state;

        if(isHome === true){
            return (
                <Redirect to="/" />
            )
        }


        return(
            <Container maxWidth='xs'>
                <Card className='Main' variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Create a new question
                        </Typography>
                        <form className='Main' noValidate autoComplete="off">
                            <FormControl>
                                <InputLabel htmlFor="option-one">Option one</InputLabel>
                                <Input id="option-one" value={valueOptionOne} onChange={this.processInputChange} />
                            </FormControl>
                            <Typography className='TitleTypo' gutterBottom>
                                OR
                            </Typography>
                            <FormControl>
                                <InputLabel htmlFor="option-two">Option two</InputLabel>
                                <Input id="option-two" value={valueOptionTwo} onChange={this.processInputChange} />
                            </FormControl>
                        </form>
                        <div className='BtnSubmit'>
                            <Button variant="contained" onClick={this.processSubmit}>Submit</Button>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

export default connect()(NewQuestionsCard)