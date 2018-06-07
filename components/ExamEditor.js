import React from 'react'
import {ScrollView, Button} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage,Text, ButtonGroup} from 'react-native-elements'

class QuestionTypeChooser extends React.Component {
    static navigationOptions = {title: 'Create Question'};

    constructor(props) {
        super(props)
        this.state = {selectedIndex: 1}
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {
        const buttons = ['Multiple Choice',
            'Fill in the blank', 'Essay', 'True or\nfalse']
        const {selectedIndex} = this.state
        return (
            <ButtonGroup
                onPress={() => {
                    if(question.type === "TrueFalse")
                        this.props.navigation
                            .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                    if(question.type === "MultipleChoice")
                        this.props.navigation
                            .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                }}
                    {/*{this.updateIndex}*/}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 75}}/>)
    }
}

class ExamEditor extends React.Component{
    static navigationOptions = { title: 'Exam Editor' }
    constructor(props){
        super(props)
        this.state = { title: '', description: '', points: 0 }

        this.formUpdate = this.formUpdate.bind(this)
    }

    formUpdate(newState) {
        this.setState(newState)
    }

    render(){
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({title: text}) }/>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({description: text}) }/>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({points: text}) }/>

                <Button	backgroundColor="light-green"
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>

                <Text h4>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text>{this.state.points}</Text>
                {/*<FormValidationMessage>*/}
                {/*Title is required*/}
                {/*</FormValidationMessage>*/}

            </ScrollView>
        )
    }
}
export default ExamEditor