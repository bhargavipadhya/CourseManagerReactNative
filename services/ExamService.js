let _singleton=Symbol();

class ExamService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    findExamByTopicId(topicId){
        return fetch('http://192.168.0.12:8080/api/topic/' + topicId + '/exam')
            .then(response=>(response.json()))
    }

    createExam(topicId, exam){
        return fetch('http://192.168.0.12:8080/api/topic/' + topicId + '/exam',{
            body: JSON.stringify(exam),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
    }

    deleteExam(examId){
        fetch('http://192.168.0.12:8080/api/exam/' + examId,{
            method:'DELETE'
        })
    }
}

export default ExamService;