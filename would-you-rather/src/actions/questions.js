import {showLoading, hideLoading} from 'react-redux-loading'
import {saveQuestionApi, saveQuestionAnswerApi} from '../helper/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION' 
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function questions(state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return{
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return{
                ...state,
                [action.question.id]: action.question,
                
            }
        case SAVE_QUESTION:
            return{
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]:{
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        default:
            return state
    }
}

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

export function processAddQuestion(optionOneText, optionTwoText){
    return async (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        const question = await saveQuestionApi({
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

export function saveQuestionAnswer(answer, qid){
    return async (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())

        await saveQuestionAnswerApi({
            authedUser,
            qid,
            answer
        })
        dispatch(questionAnswer(authedUser, qid, answer))
        return dispatch(hideLoading())
    }
}