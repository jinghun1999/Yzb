import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import {SwipeRow, Button, Text, Icon, List, ListItem, Left, Body, Right} from 'native-base';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react/native';

@observer
class AlarmClockRow extends Component {
    constructor(props) {
        super(props);
    }

    @observable
    showPlan = false;

    renderDate(item) {
        let formate = item.ImmuneTime.ToDate().GetLabel();
        return (
            <Text style={style.immTime} numberOfLines={1}>
                {formate}
            </Text>);
    };

    renderPlan(item) {
        if (!this.showPlan) {
            return null;
        }
        return (<View style={style.plan}>
            <List>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>栋舍</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.StyName}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>免疫日期</Text>
                    </Left>
                    <Body>
                    <Text
                        style={style.right}>{this.isNoNull(item.ImmuneTime) ? "" : item.ImmuneTime.ToDate().Format("yyyy-MM-dd")}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>疫病名称</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.Disease}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>疫苗/药品</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.VaccineName}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>制造商</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.FirmVaccineName}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>免疫方法</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.VaccineMethod}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>剂量</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.Dose}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>备注</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.Remark}</Text>
                    </Body>
                </ListItem>
                {
                    item.Status == PlanState.NotFinished.Value ?
                        <ListItem>
                            <Body style={style.actions}>
                            <Button warning full style={style.action}
                                    onPress={() => this.props.onIgnore(item)}><Text>忽略</Text></Button>
                            <Button success full style={style.action}
                                    onPress={() => this.props.onImplement(item)}><Text>执行</Text></Button>
                            </Body>
                        </ListItem>
                        :
                        null
                }
            </List>
        </View>);
    }

    @action
    flipPlan() {
        this.showPlan = !this.showPlan;
    }

    isNoNull(m) {
        return !m || m == "";
    }

    render() {
        let {item} = this.props;
        return (
            <View style={{alignItems: 'stretch'}}>
                <View>
                    <TouchableOpacity onPressIn={() => {
                        this.flipPlan()
                    }}>
                        <View style={style.row}>
                            {
                                this.renderDate(item)
                            }
                            <Text style={style.immTitle} numberOfLines={1}>
                                {item.VaccineName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.renderPlan(item)
                }
            </View>
        );
    }
};


@observer
export default class AlarmClock extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    renderRow(info) {
        return (<AlarmClockRow item={info.item} onIgnore={this.props.onIgnore}
                               onImplement={this.props.onImplement}></AlarmClockRow>);
    }

    _separator = () => {
        return <View style={{height: 1, backgroundColor: '#bbbbbb'}}/>;
    }
    _renderFooter = () => {
        if (!this.props.end) {
            return <TouchableOpacity style={style.footer}>
                <ActivityIndicator color={'#15856e'}/>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={style.footer} onPress={() => {
                this.props.onMore()
            }}>
                <Text style={style.footerTxt}>{!this.props.mored ? '' : '点击加载更多'}</Text>
            </TouchableOpacity>
        }
    }

    _renderHeader() {
        return <View></View>
    }

    render() {
        return <FlatList
            data={this.props.collection.list}
            renderItem={this.renderRow.bind(this)}
            onEndReachedThreshold={0.01}
            ListHeaderComponent={this._renderHeader}
            ItemSeparatorComponent={this._separator}
            ListFooterComponent={this._renderFooter}
            refreshing={!this.props.end}
            onRefresh={() => {
                this.props.onLoad();
            }}
            onEndReached={(number) => {
                this.props.onMore();
                return true;
            }}
            keyExtractor={(item, key) => key.toString()}>
        </FlatList>
    }
};

const style = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 0,
        height: 45,
        alignItems: 'flex-end'
    },
    immTitle: {
        color: '#017a6c',
        fontSize: 16,
        flex: 1,
        height: 30,
        textAlignVertical: 'center'
    },
    immTime: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        width: 100,
        height: 30,
        backgroundColor: "#009688",
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'stretch',

    },
    action: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    plan: {},
    planItem: {
        borderTopWidth: 1,
        borderTopColor: '#bbbbbb',
        borderBottomWidth: 0,
        height: 40
    },
    left: {
        textAlign: "left",
        color: '#bbbbbb'
    },
    right: {
        textAlign: 'right'
    },
    footer: {
        height: 35, justifyContent: 'center', alignItems: 'center'
    },
    footerTxt: {
        color: '#bbbbbb'
    }
});