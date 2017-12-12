import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    WebView
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Button, Icon, Text } from 'native-base';

@observer
export default class Monitor extends Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.infoBox}>
                    <Text style={styles.desc}>
                        当前摄像头：{this.props.monitor.name}
                    </Text>
                    <TouchableOpacity onPress={this.props.switchVideo}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Icon name={'md-swap'} style={{fontSize:24, color:'red'}}/>
                            <Text style={{color:'white', fontSize:16}}>切换</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <WebView
                    javaScriptEnabled={true}
                    source={{uri: urls.webPath + 'yzb/monitor/live'}}
                    style={styles.webView}
                    scalesPageToFit={false}
                    scrollEnabled={false}
                    onNavigationStateChange={(page)=> {
                        this.setState({
                            WebViewHeight: parseInt(page.title)
                        })
                    }}
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
    },
    infoBox:{
        flexDirection:'row',
        alignItems:'center',
        height:30,
        paddingRight:10,
    },
    desc:{
        flex:1,
        padding:5,
        color:'#ffffff'
    },
    webView: { height: 257 },
});