var userMail=sessionStorage.getItem("user");
var video=document.getElementById('vdo');
var playIcon=document.getElementById('play');
playIcon.onclick=function()
{
	if(playIcon.className=="fa fa-play-circle")
	{
		video.play();
		playIcon.className="fa fa-pause";
	}
	else if(playIcon.className=="fa fa-pause")
	{
		video.pause();
		playIcon.className="fa fa-play-circle";
	}
}

video.ontimeupdate=function()
{
	var current_time=this.currentTime;
	var total_time=this.duration;

	// code for getting remaining seconds...................
	var current_sec=Math.floor(current_time)-Math.floor(current_time/60)*60;
	var total_sec=Math.floor(total_time)-Math.floor(total_time/60)*60;

	// code for getting time in minutes.....................
	var current_time_min=Math.floor(current_time/60);
	var total_time_min=Math.floor(total_time/60);

	var show_time=document.getElementById('time');
	show_time.innerHTML=current_time_min+" : "+Math.floor(current_sec)+" / "+total_time_min+" : "+Math.floor(total_sec);

	// progressbar CODE......................................
	var progressBar=document.getElementById('progress_bar');
	progressBar.style.height="5px";
	progressBar.style.background="linear-gradient(to right,rgb(231, 40, 155), #fc6767)"
	var fillBar=(current_time/total_time)*100;
	progressBar.style.width=fillBar+"%";

	if(current_time==total_time)
	{
		playIcon.className="fa fa-play-circle";
	}
}

function addVideos()
{
	var plusButton=document.getElementById('plus_icon');
	plusButton.onclick=function()
	{
		var addBox=document.getElementById('url_link_box');
		if(plusButton.className=="fa fa-plus-square")
		{
			addBox.style.display="block";
			plusButton.className="fa fa-times";
		}
		else if(plusButton.className=="fa fa-times")
		{
			addBox.style.display="none";
			plusButton.className="fa fa-plus-square";
		}
	}
}
addVideos();

function saveVideo()
{
	var saveButton=document.getElementById('sub_mit');
	saveButton.onclick=function()
	{
		var nameInput=document.getElementById('name_input');
		var linkInput=document.getElementById('link_input');
		if(nameInput.value!="" && linkInput.value!="")
		{	
			var objData=
			{
				name:nameInput.value,
				link:linkInput.value
			}

			var textData=JSON.stringify(objData);
			localStorage.setItem(userMail+"video"+nameInput.value,textData);
		}
		else
		{
			alert("Empty field");
		}
	}
}
saveVideo();

function loadVideo()
{
	for(var i=0;i<localStorage.length;i++)
	{
		var allVdoData=localStorage.key(i);
		if(allVdoData.match(userMail+"video"))
		{	
			var storedData=localStorage.getItem(allVdoData);
			var extractedData=JSON.parse(storedData);

			// create Dynamic elements.................................
			var vdoBox=document.createElement('div');
			vdoBox.setAttribute('id','vdo_list');

			var titleText=document.createElement('p');
			titleText.setAttribute('id','title');
			titleText.setAttribute('class','video_title');
			titleText.innerHTML=extractedData.name;

			var btnDiv=document.createElement('div');
			btnDiv.setAttribute('id','btn_box');

			var playButton=document.createElement('button');
			playButton.setAttribute('id','play_btn');
			playButton.setAttribute('class','p_btn');
			playButton.setAttribute('url',extractedData.link);
			playButton.innerHTML="Play";

			var delButton=document.createElement('button');
			delButton.setAttribute('id','dlt_btn');
			delButton.setAttribute('class','d_btn');
			delButton.innerHTML="Delete";

			btnDiv.appendChild(playButton);
			btnDiv.appendChild(delButton);

			vdoBox.appendChild(titleText);
			vdoBox.appendChild(btnDiv);

			var mainBox=document.getElementById("video_list");
			mainBox.appendChild(vdoBox);
		}
	}
}
loadVideo();

function playVideo()
{
	var playButton=document.getElementsByClassName('p_btn');
	for(var i=0;i<playButton.length;i++)
	{
		playButton[i].onclick=function()
		{	
			removePlaying();
			this.innerHTML="Playing...";
			var vdoSource=document.getElementById('v_src');
			var selectVideo=this.getAttribute('url');
			vdoSource.setAttribute('src',selectVideo);
			video.load();
			video.play();

			playIcon.className="fa fa-pause";
		}
	}
}
playVideo();

function removePlaying()
{
	var playButton=document.getElementsByClassName('p_btn');
	for(var i=0;i<playButton.length;i++)
	{
		playButton[i].innerHTML="Play";
	}
}

function deleteVideo()
{
	var delButton=document.getElementsByClassName('d_btn');
	for(var i=0;i<delButton.length;i++)
	{
		delButton[i].onclick=function()
		{
			var parentDiv=this.parentElement?.parentElement;
			var vdoTitle=parentDiv.getElementsByClassName('video_title')[0].innerHTML;
			var confirmMsg=confirm("Do you want to delete the video");
			if(confirmMsg)
			{
				localStorage.removeItem(userMail+"video"+vdoTitle);
				parentDiv.remove();
				video.load();
			}
		}
	}
}
deleteVideo();

function playNext()
{
	var nextButton=document.getElementById('forward');
	nextButton.onclick=function()
	{	
		var playButton=document.getElementsByClassName('p_btn');
		for(var i=0;i<playButton.length;i++)
		{
			if(playButton[i].innerHTML=="Playing...")
			{
				var selectedBox=playButton[i].parentElement?.parentElement.nextElementSibling;
				var nextVdo=selectedBox.getElementsByClassName('p_btn')[0];
				nextVdo.click();
			}
		}
	}
}
playNext();

function playPre() {
    var preButton = document.getElementById('backward');
    preButton.onclick = function() {  
        var playButton = document.getElementsByClassName('p_btn');
        for (var i = 0; i < playButton.length; i++) {
            if (playButton[i].innerHTML == "Playing...") {
                var selectedBox = playButton[i].parentElement?.parentElement.previousElementSibling; 
                if (selectedBox) { // Ensure previous video exists
                    var preVdo = selectedBox.getElementsByClassName('p_btn')[0];
                    if (preVdo) {
                        preVdo.click();
                    }
                }
            }
        }
    };
}
playPre();

function searchName()
{
	var srch_input=document.getElementById('srch_input');
	srch_input.oninput=function()
	{
		var videoTitle=document.getElementsByClassName('video_title');
		for(var i=0;i<videoTitle.length;i++)
		{
			if(videoTitle[i].innerHTML.toUpperCase().match(srch_input.value.toUpperCase()))
			{
				videoTitle[i].parentElement.style.display="block";
			}
			else
			{
				videoTitle[i].parentElement.style.display="none";
			}
		}
	}
}
searchName();

function showVolBox()
{
	var volume=document.getElementById('vol_ume');
	volume.onclick=function()
	{	
		var volBox=document.getElementById('volume_box')
		if(volBox.style.opacity==0 || volBox.style.opacity == "")
		{
			volBox.style.opacity=1;

			// code for controlling volume of the video................... 
			var volRange=document.getElementById('volume_range');
			volRange.oninput=function()
			{
				video.volume=this.value;//we can also use volRange in place of `this`..
			}
		}
		else
		{
			volBox.style.opacity=0;
		}
	}
}
showVolBox()

function showSpeedBox()
{
	var speedIcon=document.getElementById('speed_icon');
	speedIcon.onclick=function()
	{	
		var speedBox=document.getElementById('speed_box')
		if(speedBox.style.opacity==0 || speedBox.style.opacity=="")
		{
			speedBox.style.opacity=1;

			// code for controlling speed of the video................... 
			var speedRange=document.getElementById('speed_range');
			speedRange.oninput=function()
			{
				video.playbackRate=this.value;//we can also use speedRange in place of `this`..
			}
		}
		else
		{
			speedBox.style.opacity=0;
		}
	}
}
showSpeedBox()

function fullScreen()
{
	var convertToFullScreen=document.getElementById('full_screen');
	convertToFullScreen.onclick=function()
	{
		video.requestFullscreen();
	}
}
fullScreen()


