let _singleton = Symbol();
const URL = 'http://192.168.0.12:8080/api/topic'

class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    findAssignmentByTopicId(topicId){
        return fetch(URL + '/' + topicId + '/assignment')
            .then(response => (response.json()))
    }

    createAssignment(assignment, topicId){
        return fetch(URL + '/' + topicId + '/assignment',
            {
                body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
    }

    findAssignmentById(assnId){
        return fetch('http://192.168.0.12:8080/api/assignment/'+ assnId)
            .then(response => (response.json()))
    }

    deleteAssignment(assnId){
        return fetch('http://192.168.0.12:8080/api/assignment' + assnId,
            {
                method: 'DELETE'
            })
           // .then(response => (response.json()))
    }

    updateAssignment(assnId, assignment) {
        return fetch('http://localhost:8080/api/assignment/' + assnId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(assignment)
        })
    }
}

export default AssignmentService