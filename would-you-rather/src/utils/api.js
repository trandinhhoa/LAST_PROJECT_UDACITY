import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA.js'

export async function getInitialData(){
    try {
        const [users, questions] = await Promise.all([
            _getUsers(),
            _getQuestions(),
        ])
        return ({
            users,
            questions,
        })
    } catch {
        console.log("An error occured getting the users and questions")
    }
}

export async function getUsers(){
    const [users] = await Promise.all([
        _getUsers(),
    ])
    return ({ users })
}

export function saveQuestion(info){
    return _saveQuestion(info)
}

export function saveQuestionAnswer(info){
    return _saveQuestionAnswer(info)
}