import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import QuestionsCard from './QuestionsCard'

function tabProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function calculateDateTime(datetime1, datetime2){
    var date1 = new Date(datetime1);
    var date2 = new Date(datetime2);
    return date2 - date1;
}

function TabPanel(props) {
    const { children, value, index, questions, unansQuestions, ansQuestions, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {
            value === 0 && unansQuestions.map((key) => (
                <QuestionsCard key={key} questionId={key} toStats={false} viewPoll={false}/>
            ))
        }
        {
            value === 1 && ansQuestions.map((key) => (
                <QuestionsCard key={key} questionId={key} toStats={true} viewPoll={true}/>
            ))
        }
      </div>
    );
}

class Questions extends Component{
    state={
        value: 0,
    }

    tabChange = (e) =>{
        let valueNew = e.target.value;
        if(this.state.value === 0){
            valueNew = 1;
        }else{
            valueNew = 0;
        }

        this.setState(()=>({
            value: valueNew
        }))
    }

    render(){
        const {value} = this.state;
        const{questions, unansQuestions, ansQuestions, viewPoll, isStats, questionId} = this.props;
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
                            <Tabs value={value} onChange={(e) => this.tabChange(e)} aria-label="Toggle between answered and unanswered questions">
                                <Tab label="Unanswered Questions"  {...tabProps(0)}  />
                                <Tab label="Answered Questions"  {...tabProps(1)}  />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} questions={questions} unansQuestions={unansQuestions} ansQuestions={ansQuestions}>
                            Unanswered Questions
                        </TabPanel>
                        <TabPanel value={value} index={1} questions={questions} unansQuestions={unansQuestions} ansQuestions={ansQuestions}>
                            Answered Questions
                        </TabPanel>
                        </Fragment>
                    )
                }
                {
                    viewPoll && ( 
                        <QuestionsCard key={qid} questionId={qid} viewPoll={viewPoll} isStats={isStats}/>
                    )
                }
            </Container>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, props){
    let ansQuestions, unansQuestions = [];
    ansQuestions = Object.keys(users[authedUser].answers).sort((a,b) => calculateDateTime(questions[a].timestamp, questions[b].timestamp));
    unansQuestions = Object.keys(questions).filter(key => !ansQuestions.includes(questions[key].id)).sort((a,b) => calculateDateTime(questions[a].timestamp, questions[b].timestamp));
    let viewPoll = false;
    if(props.viewPoll !== undefined){
        viewPoll = props.viewPoll;
    }else if(props.match !== undefined && props.match.path === "/questions/:id"){
        viewPoll = true;
    }
    return{
        questions,
        ansQuestions,
        unansQuestions,
        authedUser,
        viewPoll
    };
}

export default connect(mapStateToProps)(Questions)