import React, { Component } from 'react';
import { Platform,Text, Modal, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {
    state = {
        ...initialState
    }

    save=()=>{
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        }
        this.props.onSave && this.props.onSave(newTask);
        this.setState({...initialState})
    }

    getDatePicker=()=>{
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({date, showDatePicker: false})}
            mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePicker=(
                <View>
                    <TouchableOpacity onPress={()=> this.setState({showDatePicker: true})}>
                        <Text style={style.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }


    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>
                <View style={style.container}>
                    <Text style={style.header}>Nova tarefa</Text>
                    <TextInput style={style.input} placeholder="Informe a descrição..." 
                    onChangeText={desc => this.setState({desc})}
                    value={this.state.desc}/>
                    {this.getDatePicker()}
                    <View style={style.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={style.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={style.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
const style = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})