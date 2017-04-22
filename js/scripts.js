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
    
    window["playerObject_"+instanceName].playPauseButton_container = document.createElement('div'); //Makes the container element for the buttons as it allows for the cool perspective effect
    window["playerObject_"+instanceName].playPauseButton_container.setAttribute('class','playPauseButton_container');
    
    window["playerObject_"+instanceName].playPauseButton  = document.createElement('button'); //Makes the play/pause button and adds the ID for it, and some default (play) text
    window["playerObject_"+instanceName].playPauseButton.setAttribute('id',"playPauseButton_"+window["playerObject_"+instanceName].name);
    window["playerObject_"+instanceName].playPauseButton.setAttribute('class','playPauseButton');
    window["playerObject_"+instanceName].playPauseButton.setAttribute("style",'transform:rotateX(0deg) translate(-50%,0);');
    
    window["playerObject_"+instanceName].playPauseButtonImage = document.createElement('img');  //Makes the play/pause images inside the button
    window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('src','images/play.svg');
    window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('class','playPauseButtonImg');
    window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('data-state','paused');
    window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('id',"playPauseImage_"+window["playerObject_"+instanceName].name);
    
    window["playerObject_"+instanceName].audioElem = document.createElement('audio');  //Makes the actual audio element, and sets the ID
    window["playerObject_"+instanceName].audioElem.setAttribute('id',window["playerObject_"+instanceName].name+"_audioElem");
    
    for(var i = 0;i < musicSrc.length;i++){  //Goes through the array of music received in the function, and adds it to the audio element
        window["playerObject_"+instanceName].sourceElem = document.createElement('source');
        window["playerObject_"+instanceName].sourceElem.setAttribute('src',musicSrc[i]);
        window["playerObject_"+instanceName].sourceElem.setAttribute('type','audio/mpeg');
        window["playerObject_"+instanceName].sourceElem.setAttribute('id',window["playerObject_"+instanceName].name+"_source_"+i);
        window["playerObject_"+instanceName].audioElem.appendChild(window["playerObject_"+instanceName].sourceElem); //Sets the audio <source> as child of the <audio> element
    }
     
    window["playerObject_"+instanceName].playPauseButton.appendChild(window["playerObject_"+instanceName].playPauseButtonImage); //Sets the play/pause image as the play/pause button's child
    window["playerObject_"+instanceName].playPauseButton_container.appendChild(window["playerObject_"+instanceName].playPauseButton); //Sets the play/pause buttons as child of the container for the perspective effects
    window["playerObject_"+instanceName].progressBar.appendChild(window["playerObject_"+instanceName].playerSlider);  //Assigns the player slider as a child of the progress bar
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].containerProgressBar); //Makes the container of the progress bar a child of the (overall) container
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].audioElem); //Makes the audio element a child of the (overall) container
    window["playerObject_"+instanceName].container.appendChild(window["playerObject_"+instanceName].playPauseButton_container); //Makes the play/pause button a child of the (overall) container
    
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
    
    var wasPaused = false;
    ///
    /////////////
    //////
    /////////////////////////////////////////////////////
    
    function playPause(playOrPause){
        ///console.log(window["playerObject_"+instanceName].playPauseButtonImage.getAttribute('data-state')); --outputted if playing or not
        if(playOrPause == "play"){
            audioElem.play();
            window["playerObject_"+instanceName].playPauseButton.setAttribute("style",'transform:rotateX(360deg) translate(-50%,0);background-color:#6577a0;');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('data-state','playing');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('src','images/pause.svg');
        }else if(playOrPause == "pause"){
            audioElem.pause();
            window["playerObject_"+instanceName].playPauseButton.setAttribute("style",'transform:rotateX(0deg) translate(-50%,0);background-color:#6ba065;');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('data-state','paused');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('src','images/play.svg');
        }
    }
    
    function playPauseForButtons(){
        ///console.log(window["playerObject_"+instanceName].playPauseButtonImage.getAttribute('data-state')); --outputted if playing or not
        if(window["playerObject_"+instanceName].playPauseButtonImage.getAttribute('data-state') == "paused"){
            audioElem.play();
            window["playerObject_"+instanceName].playPauseButton.setAttribute("style",'transform:rotateX(360deg) translate(-50%,0);background-color:#6577a0;');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('data-state','playing');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('src','images/pause.svg');
        }else if(window["playerObject_"+instanceName].playPauseButtonImage.getAttribute('data-state') == "playing"){
            audioElem.pause();
            window["playerObject_"+instanceName].playPauseButton.setAttribute("style",'transform:rotateX(0deg) translate(-50%,0);background-color:#6ba065;');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('data-state','paused');
            window["playerObject_"+instanceName].playPauseButtonImage.setAttribute('src','images/play.svg');
        }
    }
    
    function updateSliderPosition(){
        
        var tempHowMuchMarLeft = (((100/(window["playerObject_"+instanceName].progressBar.offsetWidth)) * (event.clientX-10 - window["playerObject_"+instanceName].containerProgressBar.offsetLeft)))+"%";
        
        if(tempHowMuchMarLeft.replace(/%/g,'') > 100){
            tempHowMuchMarLeft = 100+"%";
        }else if(tempHowMuchMarLeft.replace(/%/g,'') < 0){
            tempHowMuchMarLeft = 0+"%";
        }
        
        window["playerObject_"+instanceName].playerSlider.style.marginLeft = tempHowMuchMarLeft;
        
        if((((100/(window["playerObject_"+instanceName].progressBar.offsetWidth)) * (event.clientX - 10 - window["playerObject_"+instanceName].containerProgressBar.offsetLeft))) > 100){
            window["playerObject_"+instanceName].playerSlider.style.marginLeft = 100+"%";
            audioElem.currentTime = audioElem.duration;
        }
        
        audioElem.currentTime = playerSlider.style.marginLeft.replace(/%/g,'') / (100/audioElem.duration);
        //console.log(playerSlider.style.marginLeft.replace(/%/g,'') / (100/audioElem.duration));
    }
    
    function mouseup_UpdateProgressBar(event){
        
        updateSliderPosition();
        
        document.body.style.cursor = "default";
        audioElem.currentTime = playerSlider.style.marginLeft.replace(/%/g,'') / (100/audioElem.duration);
        
        if(wasPaused == true){
            playPause("play");
        }
        
        mouseDown = false;
    }
    
    function changeWasPausedBoolValue(){
        if(window["playerObject_"+instanceName].playPauseButtonImage.getAttribute('data-state') == 'playing'){ //This is to check if it was manually paused or not
            wasPaused = false; //If clicked while playing, it is paused
        }else{
            wasPaused = true; //Else if clicked while paused, it is playing
        }
    }
    
    function updateSliderPositionOnBarOnMouseDown(){
        updateSliderPosition();
        mouseDown = true;
        
        document.body.style.cursor = "pointer";;
    }
    
    function updateSliderPositionMouseUp(){
        mouseDown = false;
        
        if(window["playerObject_"+instanceName].playerSlider.style.marginLeft.replace(/%/g,'') >= 100){
            audioElem.currentTime = 0;
            window["playerObject_"+instanceName].playerSlider.style.marginLeft = "0%";
        }
    }
    
    function updateSliderPositionWhileMouseDown(event){
        if(mouseDown == true){
            updateSliderPosition();
            
            if((window["playerObject_"+instanceName].playerSlider.style.marginLeft.replace(/%/g,'')) > 100){  //Makes sure that the player thing doesnt go further than the edge of the screen
                window["playerObject_"+instanceName].playerSlider.style.marginLeft = 100+"%";
            }
            
            if(audioElem.currentTime <= 0){
                playPause("pause");
                audioElem.currentTime = 0;
                mouseDown = false;
            }
        }
    }
    
    function update_slider_with_time(){
        playerSlider.style.marginLeft = audioElem.currentTime*(100/audioElem.duration)+"%";  
        //It gets the current time of the audio, then multiplies it by (100/the duration of the audio) -- this results in getting the what percentage away from left the playerSlider thing should be
    }
    
    function audio_ended_function(){
        playPause("pause");
        audioElem.currentTime = 0;
    }
    
    window["playerObject_"+instanceName].playPauseButton.addEventListener('pointerdown',changeWasPausedBoolValue,false);
    
    window["playerObject_"+instanceName].containerProgressBar.addEventListener('pointerdown',updateSliderPositionMouseUp,false); 
    //The above 2 are specifically for the container as it also covers the 20px that the bar doesn't have (at the end) due to the player slider
    
    document.body.addEventListener('pointerup',updateSliderPositionMouseUp,false);
    
    document.body.addEventListener('pointermove',updateSliderPositionWhileMouseDown,false);
    
    audioElem.addEventListener('ended',audio_ended_function,false);
    audioElem.addEventListener('timeupdate',update_slider_with_time,false);
    
    window["playerObject_"+instanceName].containerProgressBar.addEventListener('pointerup',function(event){mouseup_UpdateProgressBar(event);},false);
    window["playerObject_"+instanceName].playerSlider.addEventListener('pointerup',function(event){mouseup_UpdateProgressBar(event);},false);
    
    window["playerObject_"+instanceName].playPauseButton.addEventListener('pointerdown',playPauseForButtons,false);
    
    document.body.onclick = function(event){
        console.log((((100/(window["playerObject_"+instanceName].progressBar.offsetWidth)) * (event.clientX-10 - window["playerObject_"+instanceName].containerProgressBar.offsetLeft))));
    }
}