regular-weasel
-------
use this tool to check your css file for compatibility issues with different
webbrowsers. based on the amazing database from [caniuse](http://caniuse.com/).

USAGE
-------
### install

`npm install regular-weasel`  

### configure

`use the profile.json to choose which browsers and versions you want to test for.`
`optionally you can choose to display additional notes (recommended) and`
`descriptions. you are also able to set a path to your css-file, which will be`
`used when you set "read_from_json" to true.`

### run

`weasel /path/to/your/cssfile.css`  

or with "read_from_json" set to true:

`weasel`  

### supported browsers:

Android Browser (v2.1 - 44)  
Blackberry Browser (v7 - 10)  
Chrome (v4 - 48)  
Chrome for Android (v44)  
Edge (v12 - 13)  
Firefox (v2 - 44)  
Firefox for Android (v40)  
Internet Explorer (v5.5 - 11)  
IE Mobile (v10-11)  
Opera (v9 - 34)  
Opera Mini (v5.0 - 8.0)  
Opera Mobile (v10 - 30)  
Safari (v3.1 - 9)  
iOS Safari (v3.2 - 9)  
UC Browser for Android (v9.9)  


LICENSE
-------

> MIT
