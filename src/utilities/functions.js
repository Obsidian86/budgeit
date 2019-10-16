export const getObjIndex = (arr, key, val) => {
    let ind
    for(let i=0; i < arr.length; i++){
        if (arr[i][key] === val) {
            ind = i;
            break
        }
    } 
    return ind
  }