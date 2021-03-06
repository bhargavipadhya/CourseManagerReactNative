import React from 'react'
import {ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage,Text,Button} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

class AssignmentEditor extends React.Component{

    static navigationOptions = {title: 'Assignment Editor'}

    constructor(props){
        super(props)
        this.state = { title: '', description: '', points: '', assignment:'' }

        this.formUpdate = this.formUpdate.bind(this)
        this.assignmentService = AssignmentService.instance;
        this.updateAssignment = this.updateAssignment.bind(this);
    }

    formUpdate(newState) {
        this.setState(newState)
    }

    updateAssignment(){
        let modifiedAssn ={
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            text: this.state.title,
            widgetType: 'assignment'
        }

        this.assignmentService.updateAssignment(this.state.assignment.id, modifiedAssn)
            .then(alert('Success!'))
    }

    componentDidMount(){
        let assnId=this.props.navigation.getParam('assnId',1)
        this.assignmentService.findAssignmentById(assnId)
            .then(assn=>(
                this.setState({assignment: assn,title: assn.title
                    ,description: assn.description, points: assn.points})
            ))
    }

    render(){
        let pointToString = this.state.assignment.points;
        pointToString = '' + pointToString;
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                           text => this.formUpdate({title: text})}
                           value={this.state.assignment.title}/>
                {this.state.title === '' && <FormValidationMessage>Title is required</FormValidationMessage>}

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                           text => this.formUpdate({description: text})}
                           value={this.state.assignment.description}/>
                {this.state.description === '' && <FormValidationMessage>Description is required</FormValidationMessage>}

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText = {
                           text => this.formUpdate({points: text})}
                value={pointToString}/>
                {this.state.points === '' && <FormValidationMessage>Points are required</FormValidationMessage>}

                <Button	backgroundColor='green'
                           color='white'
                           title='Save'
                           onPress={()=>this.updateAssignment()}/>
                <Button	backgroundColor='red'
                           color='white'
                           title='Cancel'
                           onPress = {() => this.props.navigation.navigate('WidgetList')}/>

                <Text h3>Preview</Text>

                <Text h4>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text>{this.state.points}</Text>

            </ScrollView>
        )
    }
}
export default AssignmentEditor