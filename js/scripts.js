//By the way, if someone uses the same instance name more than once, the script will break.

function createAudioPlayer(instanceName,musicSrc) {
    var mouseDown = false;
    
    window["playerObject_"+instanceName] = new Object();   //Making an object to contain all of the elements and properties and many functions, to make it in a module (names ot dynamically through the variable recieved name)
    
    window["playerObject_"+instanceName].name = instanceName;  //Sets the name of the object to the variable recieved
    
    window["playerObject_"+instanceName].container = document.createElement('div');  //Making the container for all of the elements (just the elements)
    window["playerObject_"+instanceName].container.setAttribute('id','audioContainer_'+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].container.setAttribute('class','audioContainer');
    
    window["playerObject_"+instanceName].containerProgressBar = document.createElement('div'); //Making a container for the progress bar, so it looks nice and sets ID
    window["playerObject_"+instanceName].containerProgressBar.setAttribute('id','progressBar_container_'+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].containerProgressBar.setAttribute('class','progressBar_container');
    
    window["playerObject_"+instanceName].progressBar = document.createElement("div"); // Making the progress bar, sets ID and Class
    window["playerObject_"+instanceName].progressBar.setAttribute('id','progressBar_'+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].progressBar.setAttribute('class','progressBar');// 
    window["playerObject_"+instanceName].containerProgressBar.appendChild(window["playerObject_"+instanceName].progressBar);
    
    window["playerObject_"+instanceName].playerSlider = document.createElement("div"); //Makes the player slider
    window["playerObject_"+instanceName].playerSlider.setAttribute('id',"playerSlider_"+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].playerSlider.setAttribute('class',"playerSlider");
    
    window["playerObject_"+instanceName].playPauseButton  = document.createElement('button'); //Makes the play/pause button and adds the ID for it, and some default (play) text
    window["playerObject_"+instanceName].playPauseButton.setAttribute('id',"playPauseButton_"+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].playPauseButton.setAttribute('class','playPauseButton');
    window["playerObject_"+instanceName].playPauseButton.textContent = "Play";
    
    window["playerObject_"+instanceName].audioElem = document.createElement('audio');  //Makes the actual audio element, and sets the ID
    window["playerObject_"+instanceName].audioElem.setAttribute('id',window["playerObject_"+instanceName].name+"_audioElem");
    
    for(var i = 0;i < musicSrc.length;i++){  //Goes through the array of music received in the function, and adds it to the audio element
        window["playerObject_"+instanceName].sourceElem = document.createElement('source');
        window["playerObject_"+instanceName].sourceElem.setAttribute('src',musicSrc[i]);
        window["playerObject_"+instanceName].sourceElem.setAttribute('type','audio/mpeg');
        window["playerObject_"+instanceName].sourceElem.setAttribute('id',window["playerObject_"+instanceName].name+"_source_"+i);
        window["playerObject_"+instanceName].audioElem.appendChild(window["playerObject_"+instanceName].sourceElem); //Sets the audio <source> as child of the <audio> element
    }
        
    window["playerObject_"+instanceName].progressBar.appendChild(window["playerObject_"+instanceName].playerSlider);  //Assigns the player slider as a child of the progress bar
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].containerProgressBar); //Makes the container of the progress bar a child of the (overall) container
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].audioElem); //Makes the audio element a child of the (overall) container
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].playPauseButton); //Makes the play/pause button a child of the (overall) container
    
    document.body.appendChild(window["playerObject_"+instanceName].container); //Assigns the container as a child of the main html <body>
    
    /////////////////////////////////////////////////////
    //////
    //////////////
    ///
    var trackLen,percentPerSecond,canPlayMusic;
    var totalTracks = i;
    var trackNo = 0;
    
    var audioElem = window[window["playerObject_"+instanceName].name+"_audioElem"];
    var playerSlider = window["playerSlider_"+window["playerObject_"+instanceName].name];
    
    var wasPaused = true;
    ///
    /////////////
    //////
    /////////////////////////////////////////////////////
    
    function updateSliderPosition(){
        
        var tempHowMuchMarLeft = (((100/(window["playerObject_"+instanceName].progressBar.offsetWidth)) * (event.screenX-10 - window["playerObject_"+instanceName].containerProgressBar.offsetLeft)))+"%";
        
        //console.log(tempHowMuchMarLeft);
        
        if(tempHowMuchMarLeft.replace(/%/g,'') > 100){
            tempHowMuchMarLeft = 100+"%";
        }else if(tempHowMuchMarLeft.replace(/%/g,'') < 0){
            tempHowMuchMarLeft = 0+"%";
        }
        
        setTimeout(function(){window["playerObject_"+instanceName].playerSlider.style.marginLeft = tempHowMuchMarLeft;},20);
        
        if((((100/(window["playerObject_"+instanceName].progressBar.offsetWidth)) * (event.screenX - 10 - window["playerObject_"+instanceName].containerProgressBar.offsetLeft))) > 100){
            window["playerObject_"+instanceName].playerSlider.style.marginLeft = 100+"%";
            audioElem.currentTime = audioElem.duration;
        }
        
        audioElem.currentTime = playerSlider.style.marginLeft.replace(/%/g,'') / (100/audioElem.duration);
        
        if(audioElem.currentTime <= 0){
            audioElem.pause();
            audioElem.currentTime = 0;
            window["playerObject_"+instanceName].playPauseButton.textContent = "Play";
            mouseDown = false;
        }
        //console.log((playerSlider.style.marginLeft.replace(/%/g,''))+" --- "+100+"/"+audioElem.duration);
    }
    
    window["playerObject_"+instanceName].progressBar.onmousedown = function(event){
        
        //console.log(((    (100/(window["playerObject_"+instanceName].progressBar.offsetWidth)) + " ---- " + (event.screenX - window["playerObject_"+instanceName].containerProgressBar.offsetLeft))));
        
        audioElem.pause();
        window["playerObject_"+instanceName].playPauseButton.textContent = "Play";
        updateSliderPosition();
        //wasPaused = false;
        mouseDown = true;
        
        document.body.style.cursor = "pointer";;
    }
    
    function mouseUpUpdateProgressBar(event){
        //audioElem.pause();
        
        updateSliderPosition();

        if(wasPaused == false){
            if(!audioElem.ended){
                audioElem.play();
            }
            wasPaused = false;  //This makes it so that the audio plays on line 81, because it was previously playing || can't do this with paused, so hook it up to some buttons first.
            window["playerObject_"+instanceName].playPauseButton.textContent = "Pause";
        }
        
        document.body.style.cursor = "default";
        audioElem.currentTime = playerSlider.style.marginLeft.replace(/%/g,'') / (100/audioElem.duration);
        
        mouseDown = false;
        //console.log(playerSlider.style.marginLeft.replace(/%/g,'') / (100/audioElem.duration))
    }
    
    window["playerObject_"+instanceName].containerProgressBar.onmousedown = function(){
        updateSliderPosition();
    }
    
    audioElem.onplaying = function(){
        window["playerObject_"+instanceName].playPauseButton.textContent = "Pause";
    }
    
    document.onmouseup = function(){
        if(mouseDown == true){
            audioElem.play();
        }
        
        mouseDown = false;
        //console.log("yes");
    }
    
    window["playerObject_"+instanceName].containerProgressBar.addEventListener('mouseup',function(event){mouseUpUpdateProgressBar(event);},false);
    window["playerObject_"+instanceName].playerSlider.addEventListener('mouseup',function(event){mouseUpUpdateProgressBar(event);},false);
    
    document.body.onmousemove = function(event){
        
        if(mouseDown == true){
            updateSliderPosition();
            
            //console.log(Math.round((window["playerObject_"+instanceName].playerSlider.style.marginLeft.replace(/%/g,''))));
            
            if((window["playerObject_"+instanceName].playerSlider.style.marginLeft.replace(/%/g,'')) > 100){  //Makes sure that the player thing doesnt go further than the edge of the screen
                window["playerObject_"+instanceName].playerSlider.style.marginLeft = 100+"%";
            }
            
            if(audioElem.currentTime <= 0){
                audioElem.pause();
                audioElem.currentTime = 0;
                window["playerObject_"+instanceName].playPauseButton.textContent = "Play";
                mouseDown = false;
            }
        }
    }
    
    window["playerObject_"+instanceName].playPauseButton.onclick = function(){
        if(window["playerObject_"+instanceName].playPauseButton.textContent == "Play"){
            audioElem.play();
            window["playerObject_"+instanceName].playPauseButton.textContent = "Pause";
            wasPaused = false;  //This makes it so that the audio plays, because it was previously playing || can't do this with paused, so hook it up to some buttons first.
        }else if(window["playerObject_"+instanceName].playPauseButton.textContent == "Pause"){
            audioElem.pause();
            window["playerObject_"+instanceName].playPauseButton.textContent = "Play";
            wasPaused = true;  //This makes it so that the audio plays, because it was previously playing || can't do this with paused, so hook it up to some buttons first.
        }
    }
    
    audioElem.ontimeupdate = function(){
        playerSlider.style.marginLeft = audioElem.currentTime*(100/audioElem.duration)+"%";  //It gets the current time of the audio, then multiplies it by (100/the duration of the audio) -- this results in getting the what percentage away from left the playerSlider thing should be
        if(playerSlider.style.marginLeft == "100%"){
            audioElem.pause();
            wasPaused = true;
            window["playerObject_"+instanceName].playPauseButton.textContent = "Play";
            audioElem.currentTime = audioElem.duration;
        }
    }
    
    audioElem.onended = function(){
        window["playerObject_"+instanceName].playPauseButton.textContent = "Play";
        audioElem.currentTime = 0;
        audioElem.pause();
    }
}