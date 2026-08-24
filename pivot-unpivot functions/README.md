# Pivot and Unpivot Functions

## Description

Adds two custom Google Sheets functions for reshaping data. `PIVOT` converts a three-column table (`Parameter`, `System`, `Value`) into a matrix, while `UNPIVOT` converts a matrix back into the three-column format.

## How to Use

Open a Google Sheet, go to **Extensions → Apps Script**, paste the contents of `pivot-unpivot functions.gs`, and save the project. Use `=PIVOT(A1:C10)` to create a matrix, `=PIVOT(A1:C10, TRUE)` to sort its parameters and systems, or `=UNPIVOT(E1:H10)` to convert a matrix back into a flat table. Include headers in the referenced ranges.
