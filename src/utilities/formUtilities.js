
export const validForm = (fieldList, dataCheck) => {
    let errs = {}
    for(const fItem in fieldList){
        const f = fieldList[fItem]
        if (f.req && !dataCheck[f.name]) errs[f.name] = 'Field is required'
        if ( dataCheck[f.name] && f.type === 'number' && isNaN(dataCheck[f.name])) {
        let test = dataCheck[f.name].split(" ").join('')
        if (isNaN(test)) errs[f.name] = 'Please input a number'
        }
    }
    return errs
}