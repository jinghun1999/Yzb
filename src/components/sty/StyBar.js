import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { Text,Button,ActionSheet} from 'native-base';
import {observer} from 'mobx-react/native';
import {action,observable} from 'mobx'
import { Icon } from 'native-base'

@observer
export default class StyBar extends Component{
    constructor(props){
        super(props);
    };

    onMenu(){
        let formList = [{
            name:"SettingSty",
            text: "设置",
            icon: "ios-cog",
            iconColor: "#15856e",
            action:()=>{
                this.props.onSettingPress();
            }
        }, {
            name:"DeleteSty",
            text:"删除栋舍",
            icon:"ios-trash",
            iconColor: "#FF0000",
            action:()=>{
            }
        },{
            name:"EditSty",
            text: "修改栋舍",
            icon: "ios-create",
            iconColor: "#2c8ef4",
            action:()=>{
                this.props.onEditPress();
            }
        },{
            name:"OutPet",
            text:"入栏",
            icon:"ios-log-in",
            iconColor:"#cc1e4c",
            action:()=>{
                this.props.onInPetPress();
            }
        },{
            name:"OutPet",
            text:"出栏",
            icon:"ios-log-out",
            iconColor:"#cc1e4c",
            action:()=>{
                this.props.onOutPetPress();
            }
        }];
        ActionSheet.show({
            title:'栋舍操作',
            options: formList,
            destructiveButtonIndex:0,
            cancelButtonIndex:-1
        }, (index) => {
            if( index < 0 || index >= formList.length ){
                return;
            }
            let action = formList[index].action.bind(this);
            action();
        });
    }

    render(){
        return (
            <Button transparent light onPress={this.onMenu.bind(this)}>
                <Icon name="md-more" style={{color:'white'}} />
            </Button >)
    }
};