import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles';

export default props => {

    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimate
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')
    const getRighContent = () => {
        return (
            <TouchableOpacity style={style.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='white' />
            </TouchableOpacity>
        )
    }
    const getLeftContent = () => {
        return (
            <View style={style.left}>
                <Icon name="trash" size={20} color='white' style={style.excludeIcon} />
                <Text style={style.excludeText}> Excluir</Text>
            </View>
        )
    }
    return (
        <Swipeable
            renderRightActions={getRighContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>

                    <View style={style.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[style.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={style.date}>{formatedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={style.done}>
                <Icon name='check' size={20} color='#FFF' />
            </View>
        )
    }
    else {
        return (
            <View style={style.pending}></View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center' //pra garantinr que vai alinhar na coluna
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: 'white',
        fontSize: 20,
        margin: 10,

    },
    excludeIcon: {
        marginLeft: 10
    }

})