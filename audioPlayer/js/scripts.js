//By the way, if someone uses the same instance name more than once, the script will break.

function createAudioPlayer(instanceName,musicSrc) {
    var mouseDown = false;
    
    window["playerObject_"+instanceName] = new Object();
    
    window["playerObject_"+instanceName].name = instanceName;
    
    window["playerObject_"+instanceName].container = document.createElement('div');
    window["playerObject_"+instanceName].container.setAttribute('id','audioContainer_'+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].container.setAttribute('class','audioContainer');
    
    window["playerObject_"+instanceName].containerProgressBar = document.createElement('div');
    window["playerObject_"+instanceName].containerProgressBar.setAttribute('id','progressBar_container_'+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].containerProgressBar.setAttribute('class','progressBar_container');
    
    window["playerObject_"+instanceName].progressBar = document.createElement("div");
    window["playerObject_"+instanceName].progressBar.setAttribute('id','progressBar_'+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].progressBar.setAttribute('style','width:'+(document.body.offsetWidth-20)+"px");
    
    window.onresize = function(){
        window["playerObject_"+instanceName].progressBar.setAttribute('style','width:'+(document.body.offsetWidth-20)+"px");
    }
    
    
    window["playerObject_"+instanceName].progressBar.setAttribute('class','progressBar');
    
    window["playerObject_"+instanceName].containerProgressBar.appendChild(window["playerObject_"+instanceName].progressBar);
    
    window["playerObject_"+instanceName].playerSlider = document.createElement("div");
    window["playerObject_"+instanceName].playerSlider.setAttribute('id',"playerSlider_"+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].playerSlider.setAttribute('class',"playerSlider");
    
    window["playerObject_"+instanceName].progressBar.appendChild(window["playerObject_"+instanceName].playerSlider);
    
    window["playerObject_"+instanceName].audioElem = document.createElement('audio');
    window["playerObject_"+instanceName].audioElem.setAttribute('id',window["playerObject_"+instanceName].name+"_audioElem");
    window["playerObject_"+instanceName].audioElem.setAttribute('controls',"true");
    //-----------
    for(var i = 0;i < musicSrc.length;i++){
        window["playerObject_"+instanceName].sourceElem = document.createElement('source');
        window["playerObject_"+instanceName].sourceElem.setAttribute('src',musicSrc[i]);
        window["playerObject_"+instanceName].sourceElem.setAttribute('type','audio/mpeg');
        window["playerObject_"+instanceName].sourceElem.setAttribute('id',window["playerObject_"+instanceName].name+"_source_"+i);
        window["playerObject_"+instanceName].audioElem.appendChild(window["playerObject_"+instanceName].sourceElem);
    }
    
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].containerProgressBar);
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].audioElem);
    
    window["playerObject_"+instanceName].progressBar.onmousedown = function(event){
        mouseDown = true;
        document.body.style.cursor = "pointer";
        window["playerObject_"+instanceName].playerSlider.style.marginLeft = event.clientX+"px";
    }
    
    document.body.onmouseup = function(event){
        mouseDown = false;
        document.body.style.cursor = "default";
    }
    
    document.body.onmousemove = function(event){
        if(mouseDown == true){
            window["playerObject_"+instanceName].playerSlider.style.marginLeft = event.clientX+"px";
            
            if((window["playerObject_"+instanceName].playerSlider.style.marginLeft.replace(/\D/g,'')) >= document.body.offsetWidth-20){  //Makes sure that the player thing doesnt go further than the edge of the screen
                window["playerObject_"+instanceName].playerSlider.style.marginLeft = (event.clientX-20)+"px";
            }
        }
    }
    
    document.body.appendChild(window["playerObject_"+instanceName].container);
    
    /////////////////////////////////////////////////////
    //////
    //////////////
    ///
    var trackLen,percentPerSecond,canPlayMusic;
    var totalTracks = i;
    var trackNo = 0;
    
    var audioElem = window[window["playerObject_"+instanceName].name+"_audioElem"];
    var playerSlider = window["playerSlider_"+window["playerObject_"+instanceName].name];
    ///
    /////////////
    //////
    /////////////////////////////////////////////////////
    
    audioElem.ontimeupdate = function(){
        playerSlider.style.marginLeft = audioElem.currentTime*(100/audioElem.duration)+"%";  //It gets the current time of the audio, then multiplies it by (100/the duration of the audio) -- this results in getting the what percentage away from left the playerSlider thing should be
    }
}