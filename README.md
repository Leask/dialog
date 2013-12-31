dialog
======

The easy way to make audio dialogs demo for English teaching.

![Cover](https://raw.github.com/Leask/dialog/master/images/cover.jpg "Cover")

This project was initially created for my girl friend who is a English teacher.

For OS X currently.

## How to Use?

![Dialog](https://raw.github.com/Leask/dialog/master/images/dialog.jpg "Dialog")

- Prepare the script
    <pre>
    $ cat script.txt
    Samantha: Hello!
    Tom: Hello!
    Samantha: My name is Han Meimei. What is your name?
    Tom: My name is Li Lei.
    </pre>
- Test audio dialog
    <pre>
    $ dialog script.txt
    </pre>
- Make audio dialog file
    <pre>
    $ dialog script.txt save
    </pre>


## Demo

![Screenshot](https://raw.github.com/Leask/dialog/master/images/screenshot.jpg "Screenshot")
