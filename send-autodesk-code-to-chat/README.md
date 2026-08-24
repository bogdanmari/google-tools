# Send Autodesk Code to Chat

## Description

Finds recent emails from `noreply@signin.autodesk.com`, extracts six-digit verification codes, and sends them with the active user's email address to a chat webhook. Processed Gmail threads are marked as read.

## How to Use

Open [Google Apps Script](https://script.google.com/), create a project, paste the contents of `send-autodesk-code-to-chat.gs`, and set `webhookUrl` to your incoming webhook URL. Run `sendFilteredEmailsToChat` once to grant Gmail and external-request permissions, then add a time-driven trigger to run it automatically at the interval you need.
