/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {
    Text,
    FlatList,
    View,
    DeviceEventEmitter,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwiperBanner from '../components/home/SwiperBanner';
import MySties from '../components/home/MySties';
import Reminds from "../components/home/Reminds";
//import Report from "../components/home/Report";
import {MaskLoading, TitleBar} from '../components';
import {InfoItem, InfoItemPic} from '../components/info/InfoItem';

@inject('homeStore')
@observer
export default class HomePage extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '智能养殖',
    });

    componentDidMount() {
        homeStore.fetchHomeData();
        this.subscription = DeviceEventEmitter.addListener("noticeChangedCamera", (events) => {
            if(events.key==='styAdded') {
                homeStore.fetchHomeData();
            }
        });
    }

    componentWillUnmount() {
        this.subscription && this.subscription.remove();
    }

    onBannerPress = (item) => {
        const {navigation} = this.props;
        if (item.type === 1) {
            //文章
            navigation.navigate("InfoDetail", {code: item.link, title: item.title});
        } else if (item.type === 2) {
            //链接
            navigation.navigate("Web", {url: item.link, title: item.title});
        }//alert(item.link);
    }
    remindMore = (t) => {
    }
    detailPress = (id) => {
    }
    ignore = key => {
        homeStore.onChangedState(key, PlanState.Ignore.Value, () => {
            tools.showToast('忽略成功');
        }, (mess) => {
            tools.showToast('忽略失败');
        });
    };
    exec = (key) => {
        homeStore.onChangedState(key, PlanState.Finished.Value, () => {
            tools.showToast('执行成功');
        }, (mess) => {
            tools.showToast('执行失败');
        });
    }
    newsPress = (info) => {
        const {navigation} = this.props;
        navigation.navigate("InfoDetail", {code: info.code, title: info.title})
    }

    onStyPress(sty) {
        let list = [];
        homeStore.sties.forEach((item) => {
            list.push({
                code: item.id,
                title: item.name
            });
        });
        this.props.navigation.navigate("Sty", {id: sty.id, title: sty.name, list: list, farm: homeStore.farm});
    }

    onAddSty() {
        this.props.navigation.navigate("AddSty", {farm: homeStore.farm});
    }

    onPlay = (uri) => {
        this.props.navigation.navigate("VodPlay", {url: uri});
    }

    renderListHeader() {
        const {isFetching, reminds, banners, fields, sties} = homeStore;
        return (
            <View style={styles.container}>
                <MaskLoading show={isFetching}/>
                <View style={styles.bannerWrap}>
                    <SwiperBanner ds={banners} onItemsPress={(item) => this.onBannerPress(item)}/>
                </View>
                <View style={styles.mainButtons}>
                    <TouchableHighlight underlayColor={'#f9f3f9'}
                                        onPress={() => this.props.navigation.navigate('BHStart')}
                                        style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='medkit' color={'#8bc34a'} size={34}/>
                            <Text>动物诊疗</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'#f9f3f9'} onPress={() => this.props.navigation.navigate('Didi')}
                                        style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='user-md' color={'#50AAF0'} size={34}/>
                            <Text>滴滴兽医</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'#f9f3f9'}
                                        onPress={() => this.props.navigation.navigate('LiveTab')}
                                        style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='video-camera' color={'#F1745E'} size={34}/>
                            <Text>直播间</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'#f9f3f9'}
                                        onPress={() => this.props.navigation.navigate('InfoTab')}
                                        style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='newspaper-o' color={'#009688'} size={34}/>
                            <Text>养殖头条</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <MySties store={homeStore} onStyPress={(sty) => {
                    this.onStyPress(sty)
                }} onPlay={(uri) => {
                    this.onPlay(uri)
                }} onAddSty={this.onAddSty.bind(this)}/>
                <Reminds reminds={reminds}
                         morePress={this.remindMore}
                         detailPress={this.detailPress}
                         exec={this.exec.bind(this)}
                         ignore={this.ignore.bind(this)}/>
                <TitleBar icon={'newspaper-o'}
                          iconColor={'red'}
                          title={'养殖头条'}
                          showMore={false}
                          onMorePress={() => {
                              this.remindMore('news')
                          }}/>
            </View>
        )
    }

    renderRow = (info) => {
        if (info.face_url) {
            return <InfoItemPic info={info} press={this.newsPress}/>
        } else {
            return <InfoItem info={info} press={this.newsPress}/>
        }
    }

    render() {
        const {isFetching, news, isNoMore, loadingMore} = homeStore;
        return (
            <FlatList
                style={styles.container}
                data={news.slice()}
                renderItem={({item}) => this.renderRow(item)}
                ListHeaderComponent={this.renderListHeader()}
                ListFooterComponent={
                    <Button full light
                            onPress={() => this.props.navigation.navigate('InfoTab')}><Text>查看更多</Text></Button>
                }
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => {
                    homeStore.fetchHomeData()
                }}
                refreshing={isFetching}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1,},
    bannerWrap: {height: 120,},
    homeBigButton: {flex: 1,},
    mainButtons: {marginTop: 10, marginBottom: 10, backgroundColor: '#fff', height: 80, flexDirection: 'row'},
    homeBigButtonInner: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    loading: {
        margin: 32,
    }
});