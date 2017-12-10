import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';

import _ from "lodash";
useStrict(true);

class outPetStore {
    farm={};
    styId="";

    @observable
    styName="";

    @observable
    otherStyOptions=[];//其它栋舍

    @observable
    batchsOptions=[];//其它批次
    @observable
    batchs=[];

    @observable
    showTransferSty=false;


    data={
        Id:'',
        StyId:'',
        FarmId:'',
        @observable
        Genus:'',

        @observable
        Collection:{
            @observable
            Normal:0,
            @observable
            Death:0,
            @observable
            Eliminate:0,
            @observable
            Other:0,
            @observable
            Transfer:0
        },

        @observable
        Day:0,
        @observable
        BatchNumber:'',
        @observable
        Type:1,//操作类型
        @observable
        OutDate:'',//出栏日期
        @observable
        Reason:'',
        @observable
        TransferSty:''//转移到的栋舍
    }

    OutPetReasonTypeEum = {
        Normal: { Label: '销售出栏', Transfer: false },
        Death: { Label: '死亡', Transfer: false },
        Eliminate: { Label: '淘汰', Transfer: false },
        Other: { Label: '其他', Transfer: false },
        Transfer: { Label: '转栏', Transfer: true }
    };

    StyeOperationType = {
        AddPet: { Value: 0, Label: '补栏/补苗' },
        RemovePet: { Value: 1, Label: '出栏' },
        ClearSty: { Value: 2, Label: "清栏" }
    };

    BreedEnum = {
        Poultry: 0,
        Livestock: 1,
        PoultryAndLivestock: 2
    };

    onIni(paramter,callback,failed){
        let {styId,farm} = paramter;
        this.styId = styId;
        this.farm = farm;
        this.getOutPetConfigFromApi((data)=>{
            this.updateConfig(data.styName,data.BatchNumbers,data.Other);
            if(callback){
                callback(data);
            }
        },failed);
    }

    getOutPetConfigFromApi(callback,falied){
        request.getJson(urls.apis.IMM_GET_OUTPETCONFIG,{styid:this.styId}).then((data) => {
            callback(data);
        }).catch((err) => {
            falied(err);
        });
    }

    @action
    updateConfig(styName,batchsSource,stySource){
        this.styName=styName;
        this.batchs=batchsSource;
        if(batchsSource && batchsSource!=null){
            this.batchsOptions=[];
            batchsSource.forEach((item)=>{
                this.batchsOptions.push(item.BatchNumber);
            });
        }

        if(stySource && stySource!=null){
            stySource.forEach((item)=>{
                this.otherStyOptions.push({ value: item.Id, text: item.Name , ico:'home' , iconColor: "#2c8ef4" });
            });
        }
    }

    @action
    onUpdate(uo){
        let oldBatchNumber=!this.data.BatchNumber || this.data.BatchNumber==null ? "":this.data.BatchNumber;
        Object.assign(this.data,this.data,uo);
        let newBatchNumber=!this.data.BatchNumber || this.data.BatchNumber==null ? "":this.data.BatchNumber;
        if(oldBatchNumber!=newBatchNumber){
            this.onChangedBatch(newBatchNumber);
        }
    }
    @action
    onUpdateCollection(key,value){
        this.data.Collection[key] = value;
        if( !this.showTransferSty && this.OutPetReasonTypeEum[key].Transfer && this.data.Collection[key] > 0 ){
            this.showTransferSty=true;
        }
    }
    @action
    onChangedBatch(batch){
        let item = this.batchs.fristOne(item=> item.BatchNumber==batch);
        this.onUpdate({ Day:item.Day });
    }
}

outPetStore = new outPetStore();
export default outPetStore;