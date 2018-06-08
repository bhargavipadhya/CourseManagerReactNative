import React from 'react'
import { ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage,Text,Button} from 'react-native-elements'

class TFEditor extends React.Component{

    static navigationOptions = {title: 'TrueFalse Question Editor'}

    constructor(props){
        super(props)
        this.state = { title: '', description: '', points: '', tfQuestion:'' }

        this.formUpdate = this.formUpdate.bind(this)
    }

    formUpdate(newState) {
        this.setState(newState)
    }

    componentDidMount(){
        let tfQuestion = this.props.navigation.getParam('tfQuestion')
        this.setState({tfQuestion:tfQuestion,title: tfQuestion.title, description: tfQuestion.description, points: tfQuestion.points})
    }

    render(){
        let pointToString = this.state.tfQuestion.points;
        pointToString = '' + pointToString;
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({title: text})}
                           value={this.state.tfQuestion.title}/>
                {this.state.title === '' && <FormValidationMessage>Title is required</FormValidationMessage>}

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({description: text})}
                           value={this.state.tfQuestion.description}/>
                {this.state.description === '' && <FormValidationMessage>Description is required</FormValidationMessage>}

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText = {
                    text => this.formUpdate({points: text})}
                           value={pointToString}/>
                {this.state.points === '' && <FormValidationMessage>Points are required</FormValidationMessage>}

                <Button	backgroundColor='green'
                           color='white'
                           title='Save'/>
                <Button	backgroundColor='red'
                           color='white'
                           title='Cancel'
                           onPress = {() => this.props.navigation.navigate('ExamEditor')}/>

                <Text h3>Preview</Text>

                <Text h4>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text>{this.state.points}</Text>
            </ScrollView>
        )
    }
}
export default TFEditor
