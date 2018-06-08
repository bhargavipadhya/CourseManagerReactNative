let _singleton=Symbol();

class TFService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TFService(_singleton);
        return this[_singleton]
    }
    createTF(tf, examId){
        return fetch('http://192.168.0.12:8080/api/exam/' + examId + '/truefalse',{
            body: JSON.stringify(tf),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
    }
}

export default TFService