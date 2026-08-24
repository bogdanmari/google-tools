function ConvertRGBtoHEX(RGB)
{
  var returned_hex = "#";
  var condition = isChecker(RGB)[0];
  var _array = isChecker(RGB)[1];
  if (condition)
  {
    for (var i = 0;i<_array.length;i++)
    {
      var number = _array[i];
      returned_hex += number.toString(16);
    }
  }
  return returned_hex
}
function isChecker(RGB)
{
  var returned_number = [];
  if (typeof(RGB) != "string")
  {
    return [false, null];
  }
  var delimiter = findDelimiter(RGB);
  var _array = RGB.split(delimiter); //Need function to finding delimiter
  if (_array.length != 3)
  {
    return [false, null];
  }
  for (var i = 0;i<3;i++)
  {
    var number = _array[i];
    number = +number;
    if (number < 0 | number > 255)
    {
      return [false, null];
    }
    else
    {
      returned_number.push(number)
    }
  }
  return [true, returned_number];
}
function findDelimiter(RGB)
{
  var delimiter = "";
  var all_delimiters = [];
  for (var i=0;i<RGB.length;i++)
  {
    var one_symbol = RGB[i];
    if (/^\d+$/.test(one_symbol))
    {
      if (delimiter.length != 0)
      {
        all_delimiters.push(delimiter);
        delimiter = "";
      }
    }
    else
    {
      delimiter += one_symbol;
    }
  }
  if (all_delimiters.length != 2)
  {
    return "";
  }
  else if (all_delimiters.length > 2)
  {
    if (all_delimiters[0] != all_delimiters[1])
    {
      return "";
    }
  }
  else
  {
    return all_delimiters[0];
  }
}