function colorizeDuplicates() {

  var currentSheet = SpreadsheetApp.getActive();
  var currentRange = currentSheet.getActiveRange();
  
  var numRows = currentRange.getNumRows();
  var numCols = currentRange.getNumColumns();
  var repeatedValuesCont = [];
  
  var backs = [ //67
    '#b3e5f2', '#ffaaaa', '#ffd7d7', '#ffc782', '#ffdba5', '#f1caa4',
    '#ecd6bb', '#cbc8b1', '#a9a894', '#c7d9e6', '#9cd9c2', '#bad0e8',
    '#f0e68c', '#b8860b', '#daa520', '#d0d386', '#e2e690', '#e4d4b9',
    '#818a39', '#c0bc99', '#00a064', '#fa8085', '#faabb0', '#94b5e0',
    '#9c8fc9', '#578ad6', '#8273ba', '#4fadc1', '#8160a3', '#94b5e0',
    '#9c8fc9', '#b3c7e3', '#5f97a0', '#f86b81', '#fb9f6f', '#c1be7b',
    '#81c4c7', '#f2b775', '#ffc2a3', '#9d575c', '#eb494e', '#eb494e',
    '#eb494e', '#eb494e', '#e4b1b2', '#7cc9b1', '#8cff8c', '#ffaaaa',
    '#2880ff', '#aa5555', '#f2e8ae', '#ff9664', '#00a064', '#ee93d2',
    '#ffc3e1', '#ffa3d1', '#5f5fff', '#82ffff', '#ff4141', '#87558c',
    '#856c9e', '#84bd84', '#f3f0db', '#f0c7e3', '#8b8bd3', '#75bdbd',
    '#87558c'
  ];
  
  for (var i = 1; i <= numRows; i++) {
    for (var j = 1; j <= numCols; j++) {
      if (currentRange.getCell(i, j).getValue() != "") {
        repeatedValuesCont.push(currentRange.getCell(i, j).getValue());
      }
    }
  }
  
  var backsCounter = 0;
  var repeatedValues = findDuplicates(repeatedValuesCont);
  var dickt = {}
  for (var i = 0; i < repeatedValues.length; i++) {
    dickt[repeatedValues[i]] = backs[backsCounter]
    backsCounter += 1;
  }
  
  for (var i = 1; i <= numRows; i++) {
    for (var j = 1; j <= numCols; j++) {
      var cell = currentRange.getCell(i, j);
      if (repeatedValues.includes(cell.getValue()) && cell.getValue() != "") {
        cell.setBackground(dickt[cell.getValue()]);
      }
    }
  }

  var duplicateCount = repeatedValues.length;
  var duplicateLabel = duplicateCount === 1 ? 'duplicate' : 'duplicates';

  SpreadsheetApp.getUi().alert(
    duplicateCount + ' unique ' + duplicateLabel + ' found. The script has finished.'
  );
}
  
const findDuplicates = (arr) => {
  let sorted_arr = arr.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i] && !results.includes(sorted_arr[i])) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('bogdanmari-scripts')
    .addItem(
      'Colorize Duplicates',
      'colorizeDuplicates'
    )
    .addToUi();
}