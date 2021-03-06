/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import {Container, Content, Text} from 'native-base';
import {MaskLoading} from '../../components';
import {observer} from 'mobx-react/native';
import userStore from "../../store/userStore";

@observer
export default class BHList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: 1,
            loading: true,
            refreshing: false
        };
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '送检单列表',
        headerRight: <View/>
    });
    componentDidMount(){
        var timer = setTimeout(()=>{
            this.fetchData();
        }, 100);
    }
    componentWillUnMount(){
        this.timer && clearTimeout(this.timer);
    }
    fetchData(page){
        request.getJson(urls.apis.BH_GET_SHEETS, {phone: userStore.phone}).then((res)=>{
            this.setState({
                data: res,
                loading: false,
                refreshing: false
            });
        }).catch((err)=>{
            tools.showToast(err.message);
            this.setState({
                loading: false,
                refreshing: false
            });
        });
    }
    handleRefresh = () => {
        this.fetchData(1);
    };
    // handleLoadMore = () => {
    //     this.setState(
    //         {
    //             page: this.state.page + 1
    //         },
    //         () => {
    //             this.fetchData(this.state.page);
    //         }
    //     );
    // };
    renderSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: "#CED0CE"}}/>
        );
    };
    renderItem = (item) =>{
        return (<TouchableOpacity onPress={()=>this.props.navigation.navigate('BHDetail', {item: item})}>
            <View style={styles.item}>
                <View style={styles.bhNo}>
                    <Text style={{fontSize:18, flex:1,}}>众联单号 {item.sheetNo}</Text>
                    <Text style={{color:'gray'}}>{item.submitDate.substr(0, 10)}</Text>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <View style={{flexDirection:'row',}}>
                    <Text style={{flex:1, fontWeight:'bold'}}>{item.farmName}</Text>
                    <Text>送检类型：{item.animalType}</Text>
                </View>
            </View>
        </TouchableOpacity>);
    }
    renderFooter = () => {
        return null;
    };
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content>
                    <MaskLoading show={this.state.loading}/>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item, key) => key.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                        //onEndReached={this.handleLoadMore}
                        //onEndReachedThreshold={0.1}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        marginTop:10,
        padding:10,
        backgroundColor:'#fff',
    },
    bhNo:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        marginBottom:5,
        paddingBottom:5
    },
    statusText:{
        backgroundColor:'#ff9800',
        color:'#fff',
        marginLeft:3,
        paddingLeft:3,
        paddingRight:3,
        borderRadius:3
    },
})