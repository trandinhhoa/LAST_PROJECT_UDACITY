import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import QuestionsCard from './QuestionsCard'


function TabPanel(props) {
    const { children, value, index, questions, unansweredQuestions, answeredQuestions, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {
            value === 0 && unansweredQuestions.map((key) => (
                <QuestionsCard key={key} questionId={key} toStats={false} viewPoll={false}/>
            ))
        }
        {
            value === 1 && answeredQuestions.map((key) => (
                <QuestionsCard key={key} questionId={key} toStats={true} viewPoll={true}/>
            ))
        }
      </div>
    );
}

function addProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class Questions extends Component{
    state={
        value: 0,
    }
    handleChange = (e) =>{
        let newValue = e.target.value;
        if(this.state.value === 0){
            newValue = 1;
        }else{
            newValue = 0;
        }

        this.setState(()=>({
            value: newValue
        }))
    }

    render(){
        const {value} = this.state;
        const{questions, unansweredQuestions, answeredQuestions, viewPoll, toStats, questionId} = this.props;
        let qid = questionId;
        if(questionId === undefined && this.props.match !== undefined){
            qid = this.props.match.params.id;
        }
        return(
            <Container maxWidth="xs">
                {
                    viewPoll === false && (
                        <Fragment>
                        <AppBar position="static">
                            <Tabs value={value} onChange={(e) => this.handleChange(e)} aria-label="Toggle between answered and unanswered questions">
                                <Tab label="Unanswered Questions"  {...addProps(0)}  />
                                <Tab label="Answered Questions"  {...addProps(1)}  />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} questions={questions} unansweredQuestions={unansweredQuestions} answeredQuestions={answeredQuestions}>
                            Unanswered Questions
                        </TabPanel>
                        <TabPanel value={value} index={1} questions={questions} unansweredQuestions={unansweredQuestions} answeredQuestions={answeredQuestions}>
                            Answered Questions
                        </TabPanel>
                        </Fragment>
                    )
                }
                {
                    viewPoll && ( 
                        <QuestionsCard key={qid} questionId={qid} viewPoll={viewPoll} toStats={toStats}/>
                    )
                }
            </Container>
        )
    }
}

function sortDatetime(datetime1, datetime2){
    var date1 = new Date(datetime1);
    var date2 = new Date(datetime2);
    return date2 - date1;
}

function mapStateToProps({questions, authedUser, users}, props){
    let answeredQuestions, unansweredQuestions = [];
    answeredQuestions = Object.keys(users[authedUser].answers).sort((a,b) => sortDatetime(questions[a].timestamp, questions[b].timestamp));
    unansweredQuestions = Object.keys(questions).filter(key => !answeredQuestions.includes(questions[key].id)).sort((a,b) => sortDatetime(questions[a].timestamp, questions[b].timestamp));
    let viewPoll = false;
    if(props.viewPoll !== undefined){
        viewPoll = props.viewPoll;
    }else if(props.match !== undefined && props.match.path === "/questions/:id"){
        viewPoll = true;
    }
    return{
        questions,
        answeredQuestions,
        unansweredQuestions,
        authedUser,
        viewPoll
    };
}

export default connect(mapStateToProps)(Questions)