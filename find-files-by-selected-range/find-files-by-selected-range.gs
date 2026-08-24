function GetFileNamesForSearch()
{
  var listOfFileNamesForSearch = [];

  var currentSheet = SpreadsheetApp.getActive();
  var currentRange = currentSheet.getActiveRange();

  var numRows = currentRange.getNumRows(); 
  var numCols = currentRange.getNumColumns();

  for (var i = 1; i <= numRows; i++)
  {
    for (var j = 1; j <= numCols; j++)
    {
      listOfFileNamesForSearch.push(currentRange.getCell(i, j));
    }
  }
  return listOfFileNamesForSearch;
}

function FindFilesBySelectedRange()
{
  const allEqual = arr => arr.every(v => v === arr[0]); //Функция для анализа массива на одинаковые элементы

  var listOfFilesForSearch = GetFileNamesForSearch();
  var drives = Drive.Drives.list()['drives'];
  var findingFiles = [];

  for (var f = 0; f < listOfFilesForSearch.length; f++)
  {
    var findingFile = [listOfFilesForSearch[f], []]

    for (var i = 0; i < drives.length; i++)
    {
      var driveId = drives[i].id;
      var files = Drive.Files.list({
        q : 'name = "' + listOfFilesForSearch[f].getValue() + '" and trashed = false',
        corpora : 'drive',
        driveId : driveId,
        includeItemsFromAllDrives : true,
        supportsAllDrives : true
      });

      if (files.files.length != 0)
      {
        for (var t = 0; t < files.files.length; t++)
        {
          var file = DriveApp.getFileById(files.files[t].id);
          findingFile[1].push([file.getUrl(), file.getSize()]);
        }
        findingFiles.push(findingFile);
      }
    }
  }

  for (var i = 0; i < findingFiles.length; i++)
  {
    var sets = findingFiles[i][1];
    var str = ""
    if (sets.length != 0)
    {
      str += "Count of Elements: " + sets.length + "\n";
      str += "-----\n"
      var sizes = [];
      for (var j = 0; j < sets.length; j++)
      {
        var set_ = sets[j];
        sizes.push(set_[1])
        str += "Link to File: " + set_[0] +"\n"
        str += "File Size: " + set_[1]
        str += "\n-----"

        var link = SpreadsheetApp.newRichTextValue()
        .setText("Link")
        .setLinkUrl(set_[0])
        .build();
        findingFiles[i][0].offset(0, 1).setValue(str)
      }
      if (allEqual(sizes))
      {
        var down = sets[i][1];
        // findingFiles[i][0].offset(0, 2).setValue(down)
      }
    }
    else
    {
      findingFiles[i][0].offset(0, 1).setValue("Not Found");
    }
  }
}