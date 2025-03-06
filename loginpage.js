var loginPage=document.getElementById('login');
var signinPage=document.getElementById('signin');
var buttonOne=document.getElementById('btn-one')
var buttonTwo=document.getElementById('btn-two');

// .....................................code for changing div..................................
buttonOne.onclick=function loginbtn()
{
	loginPage.style.display="none";
	signinPage.style.display="block";
}

buttonTwo.onclick=function signinbtn()
{
	loginPage.style.display="block";
	signinPage.style.display="none";
}
// ........................................upto here..........................................


// var signMobile=document.getElementById('sign-mobile');
// signMobile.onblur=function()
// {	
// 	var countMobile=document.getElementById('sign-mobile').value;
// 	if(countMobile.length<10)
// 	{
// 		alert("invalid");
// 	}
// }
// ...................................code for storing data.................................... 
var signin_form=document.getElementById('signin-frm');
signin_form.onsubmit=function()
{	
	var signinUser=btoa(document.getElementById('sign-user').value);//use btoa() for securing the data
	var signinMail=btoa(document.getElementById('sign-email').value);
	var signinNumber=btoa(document.getElementById('sign-mobile').value);
	var signinPassword=btoa(document.getElementById('sign-pass').value);
	// data stored in object form........................................................
	var data={name:signinUser,
	emailid:signinMail,
	mobile:signinNumber,
	password:signinPassword}

	var text=JSON.stringify(data);
// ..............condition for checking that each data is filled.............................
	if(signinUser !=="" && signinMail !=="" && signinNumber !=="" && signinPassword !=="")
	{	
		localStorage.setItem(signinMail,text);
		var signbutton=document.getElementById('sign-btn');
		signbutton.style.background="linear-gradient(to right, #52c234, #061700)";
		signbutton.innerHTML="SignIn Successful";

// for renewing the sign up page after submittion..............................................
		setTimeout(function(){
			signbutton.innerHTML="Sign in";
			signbutton.style.background="linear-gradient(to right, #240b36, #c31432)";
			signbutton.style.outline="none";
			signin_form.reset();
		},2000);
	}
	return false;
}

// ...................code for checking the value of email....................................
var mail_input=document.getElementById('sign-email');
mail_input.onchange=function()
{	
	// condition to check that the entered email is not same...............
	var signin_mail=btoa(document.getElementById('sign-email').value);//use btoa for securing the data//use btao for securing the data
	if(localStorage.getItem(signin_mail)!==null)
	{
		var alert_msg=document.getElementById('alert_msg');
		var sign_btn=document.getElementById('sign-btn');
		alert_msg.style.display="block";
		sign_btn.disabled=true;
		sign_btn.style.background="grey";
		sign_btn.style.cursor="not-allowed";

		//code for removing the alert sign and msg after using different email..........
		mail_input.onclick=function()
		{	
			mail_input.value="";
			alert_msg.style.display="none";
			sign_btn.disabled=false;
			sign_btn.style.background="linear-gradient(to right, #52c234, #061700)";
			sign_btn.style.cursor="pointer";
		}
	}
}


//......................... code for login form.......................................
var login_form=document.getElementById('login-frm');
var mail_alert=document.getElementById('alert_one');
var pass_alert=document.getElementById('alert_two');
login_form.onsubmit=function()
{
	var login_mail=btoa(document.getElementById('login-user').value);//use btao for securing the data
	var login_pass=btoa(document.getElementById('login-pass').value);//use btao for securing the data

	// condition to check if the email Id is same or not as the stored email
	if(localStorage.getItem(login_mail)===null)
	{	
		mail_alert.style.display="block";

		var mail_input=document.getElementById('login-user');
		mail_input.onclick=function()
		{
			mail_input.value="";
			mail_alert.style.display="none";
		}
	}
	else
	{
		var text_data=localStorage.getItem(login_mail);//to get all data of the user
		var extracted_data=JSON.parse(text_data);//for extracting specific data from all data 
		var stored_mail=extracted_data.emailid;//extracted email id from localStorage
		var stored_pass=extracted_data.password;//extracted password from localStorage

		if (stored_mail===login_mail) 
		{	
			if (stored_pass===login_pass) 
			{
				sessionStorage.setItem("user",login_mail);
				window.location.replace("profile/profile.html")
			}
			else
			{
				pass_alert.style.display="block";

				var pass_input=document.getElementById('login-pass');
				pass_input.onclick=function()
				{	
					pass_input.value="";
					pass_alert.style.display="none";
				}
			}
		}
	}
	return false;
}






