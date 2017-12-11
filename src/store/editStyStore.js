import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import camelCase from 'camelcase';

import _ from "lodash";
import storeBase from "./common/storeBase";
useStrict(true);

class editStyStore extends storeBase {
    @observable
    farm={};

    genus=[];//种属列表

    @observable
    data={
        @observable
        code:'',
        @observable
        @validate(/\S+$/, '种属必填')
        genus:'',
        @observable
        @validate(/\S+$/, '栋舍名称必填')
        name:'',
        @observable
        @validate(/\d+$/, '日龄必填且为数值')
        day:'',
        @observable
        batchNumber:'',
        @observable
        @validate(/^[1-9]\d*$/, '数量必填且为大于0')
        number:'',
        @observable
        @validate(/\S+$/, '入栏日期')
        addDate:''
    }

    @action
    onChangedSty(uo){
        Object.assign(this.data,this.data,uo);
    }

    @action
    onEditIni(code,farm){
        this.farm = farm;
        this.getStyFromApi(code,data=>{
            this.onFillSty(data);
        },err=>{
            alert(err);
        });
    }

    @action
    onFillSty(data){
        this.data.code=data.Id,
            this.data.genus=data.Genus;
        this.data.name=data.Name;
        this.data.day=data.Day.toString();
        this.data.number=data.Total.toString();
        this.data.addDate=data.IniDate;
        this.genus=data.SourceGenus;
    }

    @action
    getStyFromApi(code,callback,falied) {
        request.getJson(urls.apis.IMM_GET_STY_BASE,{id:code}).then(data=>{
            callback(data);
        }).catch(err => {
            falied(err);
        });
    }

    @action
    onInvalid(){
        if( !this.data.isValid ){
        }
    }

    @action
    onUpdateSty(callback,falied) {
        let item = {
            StyId: this.data.code,
            Name: this.data.name,
            Day: this.data.day,
            Genus: this.data.genus,
            Number: this.data.number,
            AddDate: this.data.addDate,
            BatchNumber: this.data.batchNumber
        };
        request.postJson(urls.apis.IMM_POST_STY,item).then(data=>{
            callback(data);
        }).catch(err => {
            falied(err);
        });
    }
}

editStyStore = new editStyStore();
export default editStyStore;