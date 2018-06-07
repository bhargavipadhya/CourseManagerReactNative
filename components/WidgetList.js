import React from 'react'
import {ScrollView, TextInput, Text} from 'react-native'
import {ListItem, Button, Icon, FormLabel} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'
import ExamService from '../services/ExamService'

class WidgetList extends React.Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1,
            topicId: 1,
            assignment: [],
            exam: [],
            assignmentTitle:''
        }

        this.assignmentService = AssignmentService.instance;
        this.createAssignment = this.createAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
        this.examService = ExamService.instance;
        this.createExam=this.createExam.bind(this);
        this.deleteExam=this.deleteExam.bind(this);
    }

    handleOnNavigateBack = () => {
        this.assignmentService.findAssignmentByTopicId(this.state.topicId)
            .then(assn => (this.setState({assignment: assn})))
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId')
        this.setState({topicId: topicId})
        this.assignmentService.findAssignmentByTopicId(topicId)
            .then(assn => (this.setState({assignment: assn})))
        this.examService.findExamByTopicId(topicId)
            .then(exams => (this.setState({exam: exams})))
    }

    createAssignment(){

          var blankAssn = {
                title: 'New Assignment',
                description: 'Enter Description',
                points: '0',
                text: 'New Assignment',
                widgetType: 'assignment'
            }

        this.assignmentService.createAssignment(blankAssn,this.state.topicId)
            .then(response => (response.json()))
            .then(()=>(fetch('http://192.168.0.12:8080/api/topic/'+this.state.topicId+'/assignment')
                .then(response => (response.json()))))
            // .then(() => {this.findAssignmentByTopicId(this.state.topicId); })
            .then(assn => (this.setState({assignment: assn})));
    }

    deleteAssignment(assnId){
        this.assignmentService.deleteAssignment(assnId)
        this.assignmentService.findAssignmentByTopicId(this.state.topicId)
            .then(assn=> (this.setState({assignment: assn})))

    }

    // EXAM:

    deleteExam(examId){
        this.examService.deleteExam(examId)
        this.examService.findExamByTopicId(this.state.topicId)
            .then(exams => (this.setState({exam: exams})))
    }

    createExam(){

            var blankExam={
                title:"New Exam",
                text:"New Exam",
                widgetType:"exam"
            }

        return this.examService.createExam(this.state.topicId, blankExam)
            .then(response => (response.json()))
            .then(()=>(fetch("http://192.168.0.12:8080/api/topic/"+this.state.topicId+"/exam")
                    .then(response=>(response.json()))
                    .then(exams => (this.setState({exam: exams})))
            ))

    }


    render() {
        return(
            <ScrollView style = {{padding: 15}}>
                <Button title='Add Assignment'
                        onPress={() => this.createAssignment()} />
                {this.state.assignment.map(
                    (assignment, index) => (
                        <ListItem
                            onPress= {() => this.props.navigation
                                .navigate('AssignmentEditor', {assnId: assignment.id
                                    ,onNavigateBack: this.handleOnNavigateBack}) }
                            key = {index}
                            title = {assignment.title}
                            rightIcon = {<Icon name={'delete'}
                                               size={25}
                                               onPress = {() => this.deleteAssignment(this.state.assignment.id)}
                                        />}
                        />))}

                <Text>{'\n'}</Text>
                <Button title='Add Exam'
                        onPress = {() => this.createExam()} />
                {this.state.exam.map( (exam, index)=>(
                    <ListItem title = {exam.title}
                              key={index}
                              onPress={() => this.props.navigation.navigate('ExamEditor',{
                                  examId: exam.id, exam: exam
                              })}
                              rightIcon={<Icon name={'delete'}
                                               size={25}
                                               onPress={()=>this.deleteExam(this.state.exam.id)}/>}
                    />
                ))}

            </ScrollView>
        )
    }
}
export default WidgetList