import {combineReducers} from 'redux'
import {loadingBarReducer} from 'react-redux-loading'
import {authedUser} from '../actions/authedUser'
import {questions} from '../actions/questions'
import {users} from '../actions/users'

export default combineReducers({
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
})