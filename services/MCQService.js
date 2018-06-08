let _singleton=Symbol();

class MCQService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MCQService(_singleton);
        return this[_singleton]
    }

    createMCQ(mcq, examId){
        console.log(examId)
        return fetch('http://192.168.0.12:8080/api/exam/' + examId + '/choice',{
            body: JSON.stringify(mcq),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
    }
}

export default MCQService