let _singleton=Symbol();

class FIBService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FIBService(_singleton);
        return this[_singleton]
    }
    createFIB(fib, examId){
        return fetch('http://192.168.0.12:8080/api/exam/' + examId + '/blanks',{
            body: JSON.stringify(fib),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
    }
}

export default FIBService