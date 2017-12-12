import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Container, Content, Text } from 'native-base';
import Modal from 'react-native-modalbox';
import {observer,inject} from 'mobx-react/native';
import StyBar from '../../components/sty/StyBar';
import Waring from '../../components/sty/Waring';
import ImmList from '../../components/sty/ImmList';
import Monitor from '../../components/sty/Monitor';
import EnvironmentMonitor from '../../components/sty/EnvironmentMonitor';

@inject('styStore')
@observer
export default class Sty extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>({
        title: navigation.state.params.title,
        headerRight: <StyBar
            onInPetPress={()=>{
                navigation.navigate("InPet",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})
            }}
            onOutPetPress={()=>{
                navigation.navigate("OutPet",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})}}

            onEditPress={()=>{
                navigation.navigate("EditSty",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})
            }}
            onSettingPress={()=>{
                navigation.navigate("StySetting",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})
            }} />
    });

    componentDidMount(){
        const {styStore, navigation} = this.props;
        styStore.onIni(navigation.state.params.code);
    }

    render(){
        const {waring, moitor, immCollection, environmental} = this.props.styStore;
        return (
            <Container>
                <Content>
                    <Waring waring={waring}/>
                    <Monitor monitor={moitor} switchVideo={()=>{this.refs.modal_choose_monitor.open();}}/>
                    <EnvironmentMonitor data={environmental} />
                    <ImmList title="免疫提醒" collection={immCollection}/>
                </Content>
                <Modal
                    ref={"modal_choose_monitor"}
                    position={"center"}
                    style={styles.modal}
                    onClosed={()=>{tools.showToast('...')}}>
                    <ScrollView style={{flex:1}}>
                        {
                            moitor.cameras.map((camera, i)=>(
                                <Text key={i}>{camera.name}</Text>
                            ))
                        }
                    </ScrollView>
                </Modal>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    modal:{
        width:300,
        height:300,
    }
})