import {showLoading, hideLoading} from 'react-redux-loading'
import {getInitialData, getUsers} from '../utils/api'
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/questions'

export function handleInitialData(){
    return async (dispatch) => {
        dispatch(showLoading())
        try {
            const { users, questions } = await getInitialData()
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))

            dispatch(hideLoading())
        } catch {
            console.log("An error occured getting the initial data")
        }
    }
}

export function handleGetUsers(){
    return async (dispatch) => {
        dispatch(showLoading())
        const { users } = await getUsers()
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
    }
}