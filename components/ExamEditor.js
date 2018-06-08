import React from 'react'
import {ScrollView} from 'react-native'
import {ButtonGroup, ListItem} from 'react-native-elements'
import MCQService from '../services/MCQService'
import FIBService from '../services/FIBService'
import EssayService from '../services/EssayService'
import TFService from '../services/TFService'

class ExamEditor extends React.Component{
    static navigationOptions = { title: 'Exam Editor' }
    constructor(props){
        super(props)
        this.state={
            questions:[],
            examId:''
        }

        this.mcqService = MCQService.instance;
        this.createMCQ = this.createMCQ.bind(this);
        this.fibService = FIBService.instance;
        this.createFIB = this.createFIB.bind(this);
        this.essayService = EssayService.instance;
        this.createEssay = this.createEssay.bind(this);
        this.tfService = TFService.instance;
        this.createTF = this.createTF.bind(this);
        this.listQuestions=this.listQuestions.bind(this);
    }

    componentDidMount(){
        const {navigation} = this.props;
        const examId = navigation.getParam('examId')
        this.setState({examId: examId})
        fetch('http://192.168.0.12:8080/api/exam/' + examId + '/questions')
            .then(response => (response.json()))
            .then(fib => (this.setState({questions: fib})));
    }

    createMCQ(){
        var blankMCQ = {
            title: "Multiple Choice Question",
            text: "New Multiple Choice Question",
            description: 'Enter Description',
            points: '0',
            qType: 'MultipleChoice'
        }
        this.mcqService.createMCQ(blankMCQ, this.state.examId)
            .then(response => (response.json()))
            .then(() => (fetch('http://192.168.0.12:8080/api/exam/' + this.state.examId + '/questions')
                .then(response => (response.json()))))
            .then(mcq => (this.setState({questions: mcq})));

    }

    createFIB(){
        var blankFIB = {
            title: "Fill in the Blank Question",
            text: "New Fill in the Blank Question",
            description: 'Enter Description',
            points: '0',
            qType: 'FillInTheBlank'
        }
        this.fibService.createFIB(blankFIB, this.state.examId)
            .then(response => (response.json()))
            .then(fetch('http://192.168.0.12:8080/api/exam/' + this.state.examId + '/questions'))
            .then(response => (response.json()))
            .then(fib => (this.setState({questions: fib})));
    }

    createEssay(){
        var blankEssay = {
            title: "Essay Question",
            text: "New Essay Question",
            description: 'Enter Description',
            points: '0',
            qType: 'Essay'
        }
        this.essayService.createEssay(blankEssay, this.state.examId)
            .then(response => (response.json()))
            .then(() => (fetch('http://192.168.0.12:8080/api/exam/' + this.state.examId + '/questions')
                .then(response => (response.json()))))
            .then(essay => (this.setState({questions: essay})));
    }

    createTF(){
        var blankTF = {
            title: "True or False Question",
            text: "New True or False Question",
            description: 'Enter Description',
            points: '0',
            qType: 'TrueFalse'
        }
        this.tfService.createTF(blankTF, this.state.examId)
            .then(response => (response.json()))
            .then(() => (fetch('http://192.168.0.12:8080/api/exam/' + this.state.examId + '/questions')
                .then(response => (response.json()))))
            .then(tf => (this.setState({questions: tf})));
    }

    listQuestions(index) {

        if (index === 0) {
            this.createMCQ()
        }

        if (index === 1) {
            this.createFIB()
        }

        if (index === 2) {
            this.createEssay()
        }

        if (index === 3) {
            this.createTF()
        }
    }

    render(){
        const qTypes = ['Multiple Choice',
            'Fill in the blank', 'Essay', 'True or\nfalse']

        return(
            <ScrollView>

                <ButtonGroup
                    onPress = {this.listQuestions}
                    buttons={qTypes}
                    containerStyle={{height: 75}}/>

                {this.state.questions.map(
                    (question, index) => {
                return(
                    <ScrollView>
                        <ListItem key = {index}
                                  title = {question.title}
                                  onPress = {() => {
                                      if(question.qType === "TrueFalse")
                                      this.props.navigation
                                      .navigate("TFEditor", {tfQuestion: question})

                                      if(question.qType === "MultipleChoice")
                                          this.props.navigation
                                              .navigate("MCQEditor",{mcQuestion: question})

                                      if(question.qType === "FillInTheBlank")
                                          this.props.navigation
                                              .navigate("FIBEditor",{fibQuestion: question})

                                      if(question.qType === "Essay")
                                          this.props.navigation
                                              .navigate("EssayEditor",{essay: question})
                                  }}/>
                    </ScrollView>

                    )}
                )}

            </ScrollView>
        )
    }
}
export default ExamEditor