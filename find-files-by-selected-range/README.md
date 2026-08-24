# Find Files by Selected Range

## Description

Searches all accessible shared drives for filenames listed in the selected Google Sheets range. For every match, it writes the file URL, file size, and number of results into the adjacent cell.

## How to Use

Open a Google Sheet, go to **Extensions → Apps Script**, paste the contents of `find-files-by-selected-range.gs`, and enable the advanced **Drive API** service in the Apps Script project. Enter filenames in the sheet, select those cells, run `FindFilesBySelectedRange`, and grant the requested permissions. Results are written one column to the right of each selected cell.
