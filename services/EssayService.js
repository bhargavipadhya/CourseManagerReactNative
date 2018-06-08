let _singleton=Symbol();

class EssayService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }
    createEssay(ess, examId){
        return fetch('http://192.168.0.12:8080/api/exam/' + examId + '/essay',{
            body: JSON.stringify(ess),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
    }
}
export default EssayService