function colorizeDuplicates(){
    var currentSheet = SpreadsheetApp.getActive();
    var currentRange = currentSheet.getActiveRange();
  
    var numRows = currentRange.getNumRows(); 
    var numCols = currentRange.getNumColumns();
    var repeatedValuesCont = [];
  
    var backs = ['#b3e5f2', '#ffaaaa', '#ffd7d7', '#ffc782', '#ffdba5', '#f1caa4', '#ecd6bb', '#cbc8b1', '#a9a894', '#c7d9e6', '#9cd9c2', '#bad0e8', '#F0E68C', '#B8860B', '#DAA520', '#d0d386', '#e2e690', '#e4d4b9', '#818a39', '#c0bc99', '#00a064', '#fa8085', '#faabb0', '#94b5e0', '#9c8fc9', '#578ad6', '#8273ba', '#4fadc1', '#8160a3', '#94b5e0', '#9c8fc9', '#b3c7e3', '#5f97a0', '#f86b81', '#fb9f6f', '#c1be7b', '#81c4c7', '#f2b775', '#ffc2a3', '#9d575c', '#eb494e', '#eb494e', '#eb494e', '#eb494e', '#e4b1b2', '#7cc9b1', '#8cff8c', '#ffaaaa', '#2880ff', '#aa5555', '#f2e8ae', '#ff9664', '#00a064', '#ee93d2', '#ffc3e1', '#FFA3D1', '#5f5fff', '#82ffff', '#ff4141', '#87558c', '#856c9e', '#84bd84', '#f3f0db', '#f0c7e3', '#8b8bd3', '#75bdbd', '#87558c'];
    var backsCounter = 0;
  
    for (var i = 1; i <= numRows; i++)
    {
      for (var j = 1; j <= numCols; j++)
      {
        if (currentRange.getCell(i, j).getValue() != ""){
          repeatedValuesCont.push(currentRange.getCell(i, j).getValue());
        }
      }
    }
  
    var repeatedValues = findDuplicates(repeatedValuesCont);
    var dickt = {}
    for (var t = 0; t < repeatedValues.length; t++){
      dickt[repeatedValues[t]] = backs[backsCounter]
      backsCounter += 1;
    }
  
    console.log(repeatedValues.length);
  
    for (var i = 1; i <= numRows; i++){
      for (var j = 1; j <= numCols; j++){
        var cell = currentRange.getCell(i, j);
        if (repeatedValues.includes(cell.getValue()) && cell.getValue() != ""){
          cell.setBackground(dickt[cell.getValue()]);
        }
      }
    }
  }
  
  const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }