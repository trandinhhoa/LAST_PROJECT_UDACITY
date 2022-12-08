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
import {saveQuestionAnswer} from '../actions/questions'
import Questions from './Questions'
import Error from './Error'
import '../css/QuestionsCard.css'

class QuestionsCard extends Component{
    state = {
        sltAnswer: '',
        isStats: false
    }

    processRadioChange = (value) => {
        this.setState(() => ({
            sltAnswer: value
        }))
    }

    actionToParent = (e, id) => {
        e.preventDefault();
        this.props.history.push(`questions/${id}`);
    }

    actionSubmitPoll = () =>{
        this.props.dispatch(saveQuestionAnswer(this.state.sltAnswer, this.props.questionId));
        this.setState(() => ({
            isStats: true,
        }))
    }
    
    render(){
        const {questions, questionId, users, viewPoll, isStats, authedUser} = this.props;
        let question = null;

        if(questions[questionId] === undefined){
            return (<Error />)
        }else{
            question = questions[questionId];
        }

        if(this.state.isStats === true){
            return (
                <Questions questionId={questionId} viewPoll={true} isStats={true}/>
            )
        }

        return(
            <Fragment>
                {
                    viewPoll && !isStats && (
                        <Card className='Main' variant="outlined">
                            <CardContent>
                                <div className='Avatar'>
                                    <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                    <Typography className='TitleTypo' variant="h5" component="h2">     
                                        {users[question.author].name} asks:
                                    </Typography>
                                </div>
                                <div>
                                    <form onSubmit={(e) => this.actionSubmitPoll(e)}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Would you rather...</FormLabel>
                                            <RadioGroup aria-label="question" name="question" value={this.state.sltAnswer} onChange={(e) => this.processRadioChange(e.target.value)}>
                                                <FormControlLabel value={"optionOne"} control={<Radio />} label={question.optionOne.text} />
                                                <FormControlLabel value={"optionTwo"} control={<Radio />} label={question.optionTwo.text} />
                                            </RadioGroup>
                                                <Button type="submit" variant="contained">Submit</Button>
                                        </FormControl>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
                {
                    viewPoll && isStats && (
                        <Card className='Main' variant="outlined">
                            <CardContent>
                                <div className='Avatar'>
                                    <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                    <Typography className='TitleTypo' variant="h5" component="h2">     
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
                                    <Typography className='QuesTypo' color="textSecondary" gutterBottom>
                                        {question.optionOne.text}
                                    </Typography>
                                    <Typography className='QuesStatsTypo' color="textSecondary" gutterBottom>
                                        Votes: {question.optionOne.votes.length}
                                        <br />
                                        Percentage: {((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100).toFixed()}%
                                    </Typography>
                                    <Typography gutterBottom>
                                        OR
                                    </Typography>
                                    <Typography className='QuesTypo' color="textSecondary" gutterBottom>
                                        {question.optionTwo.text}
                                    </Typography>
                                    <Typography className='QuesStatsTypo' color="textSecondary" gutterBottom>
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
                        <Card className='Main' variant="outlined">
                            <CardContent>
                                <div className='Avatar'>
                                    <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                    <Typography className='TitleTypo' variant="h5" component="h2">
                                        {users[question.author].name} asks:
                                    </Typography>
                                </div>
                                <div className='ViewQuestion'>
                                    <Typography className='QuesTypo' color="textSecondary" gutterBottom>
                                        {question.optionOne.text}
                                    </Typography>
                                    <Typography gutterBottom>
                                        OR
                                    </Typography>
                                    <Typography className='QuesTypo' color="textSecondary" gutterBottom>
                                        {question.optionTwo.text}
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardActions className='BtnAction'>
                                <Button variant="contained" size="small" onClick={(e) => this.actionToParent(e, questionId)}>View Poll</Button>
                            </CardActions>
                        </Card>
                    )
                }                
            </Fragment>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, {questionId, viewPoll, isStats} ){   
    return{
        questions,
        users,
        questionId,
        viewPoll,
        isStats,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(QuestionsCard))