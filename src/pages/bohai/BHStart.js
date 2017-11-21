/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer, inject} from 'mobx-react/native'

@observer
export default class BHStart extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海监测',
        headerRight: <View></View>
    });

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.topBox}>
                        <View style={styles.topBoxLine}>
                            <Image source={require('../../resource/bohai_logo.png')} style={{width: 40, height: 40}}/>
                            <Text style={styles.title}>众联监测服务</Text>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Web",{ title:'检测说明', url: urls.webPath+'/yzb/bohai/help' })}}>
                                <Text>检测说明</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>
                            <Text>        应天津市市场和质量监督管理委员会要求和检测工作的发展需要，天津渤海农牧产业联合研究院有限公司（由天津瑞普生物技术股份有限公司投资）于2016年6月成立，主要从事动物疫病诊断检测和药物分析检测。渤海农牧作为具有独立法人资格的第三方检测机构，能够独立行文、独立开展业务、独立检测，具备独立的财务制度。</Text>
                        </Text>
                    </View>
                    <Text style={{margin:10}}>提交申请单</Text>
                    <View style={styles.items}>
                        <TouchableOpacity onPress={()=>this.error()}>
                            <Text>家禽</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.error()}>
                            <Text>家畜</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>this.error()}>
                        <Text>检测说明</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBox:{
        marginTop:5,
        padding:15,
        borderTopWidth:3,
        borderTopColor:'#ff9800',
        backgroundColor:'#fff',
    },
    topBoxLine:{
        paddingBottom:3,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        flexDirection:'row',
        alignItems:'flex-end'
    },
    title:{
        fontSize:22,
        flex:1,
    },
    items:{
        backgroundColor:'#fff',
    }
})