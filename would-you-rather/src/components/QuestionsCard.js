import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import FormControl  from '@material-ui/core/FormControl'
import FormLabel  from '@material-ui/core/FormLabel'
import RadioGroup  from '@material-ui/core/RadioGroup'
import FormControlLabel  from '@material-ui/core/FormControlLabel'
import Radio  from '@material-ui/core/Radio'
import {handleSaveQuestionAnswer} from '../actions/questions'
import Questions from './Questions'
import Error from './Error'

const styles ={
    root: {
        minWidth: 275,
        marginBottom: 5,
        marginTop: 5,
    },
    avatar:{
        display: 'flex'
    },
    question: {
        fontSize: 14,
        color: "black"
    },
    questionStats: {
        fontSize: 14
    },
    title: {
        marginLeft: 15,
        paddingTop: 3
    },
    submitBtn: {
        float: "right"
    },
    viewPollBtn: {
        paddingTop: 0
    },
    viewQuestion: {
        marginTop: 16
    }
}

class QuestionsCard extends Component{
    state = {
        selectedAnswer: '',
        toStats: false
    }

    toParent = (e, id) => {
        e.preventDefault();
        this.props.history.push(`questions/${id}`);
    }

    submitPoll = () =>{
        this.props.dispatch(handleSaveQuestionAnswer(this.state.selectedAnswer, this.props.questionId));
        this.setState(() => ({
            toStats: true,
        }))
    }

    handleRadioChange = (value) => {
        this.setState(() => ({
            selectedAnswer: value
        }))
    }
    
    render(){
        const {questions, questionId, users, viewPoll, toStats, authedUser} = this.props;
        let question = null;

        if(questions[questionId] === undefined){
            return (<Error />)
        }else{
            question = questions[questionId];
        }

        if(this.state.toStats === true){
            return (
                <Questions questionId={questionId} viewPoll={true} toStats={true}/>
            )
        }

        return(
            <Fragment>
                {
                    viewPoll && !toStats && (
                        <Card style={styles.root} variant="outlined">
                            <CardContent>
                                <div style={styles.avatar}>
                                    <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                    <Typography style={styles.title} variant="h5" component="h2">     
                                        {users[question.author].name} asks:
                                    </Typography>
                                </div>
                                <div>
                                    <form onSubmit={(e) => this.submitPoll(e)}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Would you rather...</FormLabel>
                                            <RadioGroup aria-label="question" name="question" value={this.state.selectedAnswer} onChange={(e) => this.handleRadioChange(e.target.value)}>
                                                <FormControlLabel value={"optionOne"} control={<Radio />} label={question.optionOne.text} />
                                                <FormControlLabel value={"optionTwo"} control={<Radio />} label={question.optionTwo.text} />
                                            </RadioGroup>
                                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                                        </FormControl>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
                {
                    viewPoll && toStats && (
                        <Card style={styles.root} variant="outlined">
                            <CardContent>
                                <div style={styles.avatar}>
                                    <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                    <Typography style={styles.title} variant="h5" component="h2">     
                                        {users[question.author].name} asks:
                                    </Typography>
                                </div>
                                <div>
                                    {
                                        users[authedUser].answers[questionId] !== undefined &&
                                        <Typography variant="subtitle1" color="primary">
                                            You selected <b>{question[users[authedUser].answers[questionId]].text}</b>
                                        </Typography>
                                    }
                                    <Typography style={styles.question} color="textSecondary" gutterBottom>
                                        {question.optionOne.text}
                                    </Typography>
                                    <Typography style={styles.questionStats} color="textSecondary" gutterBottom>
                                        Votes: {question.optionOne.votes.length}
                                        <br />
                                        Percentage: {((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100).toFixed()}%
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        OR
                                    </Typography>
                                    <Typography style={styles.question} color="textSecondary" gutterBottom>
                                        {question.optionTwo.text}
                                    </Typography>
                                    <Typography style={styles.questionStats} color="textSecondary" gutterBottom>
                                        Votes: {question.optionTwo.votes.length}
                                        <br />
                                        Percentage: {((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100).toFixed()}%
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
                {
                    !viewPoll && (
                        <Card style={styles.root} variant="outlined">
                            <CardContent>
                                <div style={styles.avatar}>
                                    <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                    <Typography style={styles.title} variant="h5" component="h2">
                                        {users[question.author].name} asks:
                                    </Typography>
                                </div>
                                <div style={styles.viewQuestion}>
                                    <Typography style={styles.question} color="textSecondary" gutterBottom>
                                        {question.optionOne.text}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        OR
                                    </Typography>
                                    <Typography style={styles.question} color="textSecondary" gutterBottom>
                                        {question.optionTwo.text}
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardActions  style={styles.viewPollBtn}>
                                <Button variant="contained" size="small" onClick={(e) => this.toParent(e, questionId)}>View Poll</Button>
                            </CardActions>
                        </Card>
                    )
                }                
            </Fragment>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, {questionId, viewPoll, toStats} ){   
    return{
        questions,
        users,
        questionId,
        viewPoll,
        toStats,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(QuestionsCard))