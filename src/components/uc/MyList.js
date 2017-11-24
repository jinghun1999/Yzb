import React, {PureComponent} from "react";
import {SeparatorArea} from "../../components";

import {Body, Icon, Left, ListItem, Right, Text, View} from "native-base";

const Item = props => {
    return (
        <ListItem
            icon
            style={{backgroundColor:'#fff',marginLeft: 0,paddingLeft: 15}}
            onPress={props.goToPage ? props.goToPage : null}>
            <Left>
                <Icon name={props.icon} style={props.iconStyle}/>
            </Left>
            <Body style={props.bordered?{}:{borderBottomWidth: 0}}>
                <Text>{props.text}</Text>
            </Body>
            <Right style={props.bordered?{}:{borderBottomWidth: 0}}>
                <Text>{props.subtext?props.subtext: null}</Text>
                {
                    props.goToPage ?
                    <Icon name="ios-arrow-forward"/>
                    : null
                }
            </Right>
        </ListItem>
    );
}

export default class MyList extends PureComponent {
    goToPage = (page, params) => {
        const { navigation } = this.props;
        params = params ? params : {};
        navigation && navigation.navigate(page, params)
    }
    render() {
        return (
            <View style={{backgroundColor:'#E3E7F3'}}>
                <Item icon="ios-contact" iconStyle={{color:'red'}} goToPage={()=>this.goToPage('Didi')} text="个人资料" bordered/>
                <Item icon="ios-ribbon" iconStyle={{color:'green'}} text="我的积分" subtext={430}/>
                <SeparatorArea style={{height: 15}}/>
                <Item icon="ios-thumbs-up" iconStyle={{color:'#00859c'}} goToPage={()=>this.goToPage('Live')} text="我的收藏"/>
                <SeparatorArea style={{height: 15}}/>
                <Item icon="ios-planet" iconStyle={{color:'gray'}} goToPage={()=>this.goToPage('About')} text="关于养殖宝"/>
            </View>
        )
    }
}