import React from 'react';
import { ScrollView, StatusBar} from 'react-native';
import {Button, ListItem} from 'react-native-elements'
import {createStackNavigator} from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import AssignmentEditor from './components/AssignmentEditor'
import ExamEditor from './components/ExamEditor'
import FixedHeader from './elements/FixedHeader'
import MCQEditor from './components/MCQEditor'
import FIBEditor from './components/FIBEditor'
import TFEditor from './components/TFEditor'
import EssayEditor from './components/EssayEditor'


class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
  constructor(props){
    super(props)
  }
  render(){
    return(
        <ScrollView>
            <StatusBar barStyle="light-content"/>
            <FixedHeader/>

            <Button title="Courses"
                    onPress = {() => this.props.navigation
                        .navigate('CourseList') } />
        </ScrollView>
    )
  }
}

const App = createStackNavigator({
  Home, CourseList, ModuleList, LessonList, TopicList, WidgetList, AssignmentEditor, ExamEditor, MCQEditor, TFEditor, FIBEditor, EssayEditor
});
export default App;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
