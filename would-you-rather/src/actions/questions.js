import {showLoading, hideLoading} from 'react-redux-loading'
import {saveQuestion, saveQuestionAnswer} from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION' 
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function receiveQuestions(questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion(question){
    return{
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText){
    return async (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        const question = await saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText,
        })
        dispatch(addQuestion(question))
        return dispatch(hideLoading())
    }
}

function questionAnswer(authedUser, qid, answer){
    return{
        type: SAVE_QUESTION,
        authedUser, 
        qid, 
        answer
    }
}

export function handleSaveQuestionAnswer(answer, qid){
    return async (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())

        await saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        dispatch(questionAnswer(authedUser, qid, answer))
        return dispatch(hideLoading())
    }
}