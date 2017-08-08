import R from "ramda"

export const pretty = function (strings, ...values){
    const tempValues = R.clone(values)
    return strings.reduce((memo, item)=>{
        const rest = tempValues.splice(0,1)
        memo+=item;
        if(rest.length>0) {
            memo += JSON.stringify(rest[0], null, " ")
        }
        return memo;
    }, "")
}
