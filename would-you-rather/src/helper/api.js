import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA.js'

export async function getInitDataUserAndQuestion(){
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

export async function getUsersApi(){
    const [users] = await Promise.all([
        _getUsers(),
    ])
    return ({ users })
}

export function saveQuestionApi(info){
    return _saveQuestion(info)
}

export function saveQuestionAnswerApi(info){
    return _saveQuestionAnswer(info)
}