import {showLoading, hideLoading} from 'react-redux-loading'
import {getUsersApi, getInitDataUserAndQuestion} from '../helper/api'
import {SAVE_QUESTION} from './questions'
import {receiveQuestions} from '../actions/questions'


export const RECEIVE_USERS = 'RECEIVE_USERS'

export function users(state = {}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users
            }
        case SAVE_QUESTION: {
            return {
                ...state,
                [action.authedUser] : {
                    ...state[action.authedUser],
                    answers : {
                        ...state[action.authedUser].answers,
                        [action.qid] : action.answer
                    }
                }
            }
        }
        default:
            return state
    }
}

export function receiveUsers(users){
    return{
        type: RECEIVE_USERS,
        users,
    }
}

export function getUsers(){
    return async (dispatch) => {
        dispatch(showLoading())
        const { users } = await getUsersApi()
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
    }
}

export function getDataUserAndQuestion(){
    return async (dispatch) => {
        dispatch(showLoading())
        try {
            const { users, questions } = await getInitDataUserAndQuestion()
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))

            dispatch(hideLoading())
        } catch {
            console.log("An error occured getting the initial data")
        }
    }
}