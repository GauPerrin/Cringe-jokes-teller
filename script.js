const button=document.getElementById('button')
const audioElement=document.getElementById('audio')
// VoiceRSS Javascript SDK :complexe kit to download check the API documentation
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

// Disable/enable button
function toggleButton(){
    // if button is true on the left side then it will be able to false
    button.disabled=!button.disabled;
}
// API key to change in order for it to be presentable
// // function test(){
//     VoiceRSS.speech({
//         key: 'a80cd14df1e24960bbdbecefc635e5f5',
//         src: 'Hello, world!',
//         hl: 'en-us',
//         v: 'Linda',
//         r: 0, 
//         c: 'mp3',
//         f: '44khz_16bit_stereo',
//         ssml: false
//     });
// // }

// This is to pass the Joke variable to the voiceRSS API
function tellMe(joke){
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: 'a80cd14df1e24960bbdbecefc635e5f5',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
// Get jokes from jokeapi
async function getJokes() {
    let joke='';
    // Add the filters
    const apiUrl='https://v2.jokeapi.dev/joke/Dark?blacklistFlags=explicit'
    try{
        const response = await fetch(apiUrl);
        const data =await response.json();
        // Setup is only here for two part jokes see precisely the json format
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke=data.joke;
        }
        // Link done 
        tellMe(joke);
        toggleButton();
    }catch(error){
        // Catch errors
        console.log('sorry')
    }
}


button.addEventListener('click',getJokes);
audioElement.addEventListener('ended', toggleButton);