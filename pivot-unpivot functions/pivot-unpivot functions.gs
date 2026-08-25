/**
 * The function converts a color in RGB format to HEX format.
 * @param {string} RGB RGB string in String format
 * @param {string} RGB RGB string in String format
 * @return {string}
 * @customfunction
 */
function PIVOT(flat, sortFlag) {
  if (!flat || flat.length < 2 || flat[0].length < 3) {
    return [["Error: A range with three columns is required (Parameter, System, Value)"]];
  }

  const rows = flat.slice(1);

  let params = [...new Set(rows.map(r => r[0]))];
  let systems = [...new Set(rows.map(r => r[1]))];

  if (sortFlag === true || sortFlag === "TRUE") {
    params.sort();
    systems.sort();
  }

  const output = [["Parameter", ...systems]];

  params.forEach(param => {
    const row = [param];
    systems.forEach(sys => {
      const found = rows.find(r => r[0] === param && r[1] === sys);
      row.push(found ? found[2] : "");
    });
    output.push(row);
  });

  return output;
}

/**
 * The function converts a color in RGB format to HEX format.
 * @param {string} RGB RGB string in String format
 * @return {string}
 * @customfunction
 */
function UNPIVOT(matrix) {
  if (!matrix || matrix.length < 2 || matrix[0].length < 2) {
    return [["Error: Minimum 2x2 range required"]];
  }

  const headers = matrix[0].slice(1);
  const output = [["Parameter", "System", "Value"]];

  for (let i = 1; i < matrix.length; i++) {
    const param = matrix[i][0];
    for (let j = 1; j < matrix[0].length; j++) {
      output.push([param, headers[j - 1], matrix[i][j]]);
    }
  }
  return output;
}