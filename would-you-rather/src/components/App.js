import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import {handleInitialData} from '../actions/shared'
import SignIn from './SignIn';
import Nav from './Nav';
import LeaderBoard from './LeaderBoard';
import Questions from './Questions';
import NewQuestionsCard from './NewQuestionsCard'

class App extends Component {
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}

	render(){
		const {authedUser,loading} = this.props;

		return (
			<Router>
				<Fragment>
					<LoadingBar />
						<div className="App">
							{
								authedUser === null
								? <SignIn />
								: <div>
									<Nav />
									<Route path="/" exact component={Questions} />
									<Route path="/questions/:id" component={Questions} /> 
									<Route path="/add" component={NewQuestionsCard} />
									<Route path="/leaderboard" component={LeaderBoard} />
								</div>
							}
						</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps({authedUser, loading}){ 
	return{
		authedUser,
		loading: authedUser = null
	}
}

export default connect(mapStateToProps)(App)