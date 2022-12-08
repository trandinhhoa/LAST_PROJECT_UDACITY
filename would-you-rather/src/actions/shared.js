import {showLoading, hideLoading} from 'react-redux-loading'
import {getInitDataUserAndQuestion} from '../helper/api'
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/questions'

export function handleInitialData(){
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
