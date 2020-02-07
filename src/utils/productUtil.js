import {
    FIELDS_TO_VALIDATE
} from "../constants/productConstants";

export function validateData (field={}) {
    let errorMessage= "";
    for(var key in field){
        let value = field[key];
        let key_regex = new RegExp(FIELDS_TO_VALIDATE[key]);
        if(!value || !key_regex.test(value)){
            errorMessage += key+" is not properly entered."
        }
    }
    if(errorMessage){
        errorMessage+= "Please validate."
        return {
            status: false,
            errorMessage
        }
    } else {
        return {
            status: true
        }
    }
}
 export function filterData(arrayOfData=[], name){
    name= name.toLowerCase();
    let array = arrayOfData.filter(key=>(
        (key.name)&&
        (key.name.toLowerCase().indexOf(name)!==-1)
    ));
    return array;
 }

 export function sortData(arrayOfData=[], sortBy){
    if(!sortBy){
        return arrayOfData;
    }
    sortBy = sortBy==="Price"?"product_price":"name";
    return arrayOfData.sort((a,b) => {
        return a[sortBy] > b[sortBy]
    });

 }