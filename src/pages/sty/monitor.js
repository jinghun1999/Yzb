import React, {Component} from 'react';
import
{
    View,
    TextInput,
    WebView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import {Container, Content, Button, Text} from 'native-base';

export default class monitor extends Component{

    static navigationOptions = ({navigation})=>({
        headerTitle: '栋舍监控',
        headerRight: <View/>
    });

    render(){
        return (<Container>
            <Content>
                <View style={styles.container}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MonitorPlay', {id: '00000001'})}>
                        <Image source={{uri:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg'}} style={{width:50, height:30}}/>
                    </TouchableOpacity>
                </View>
            </Content>
        </Container>);
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
    },
})