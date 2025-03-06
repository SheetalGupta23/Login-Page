// // code for upload selected picture in the profile.........................

if (sessionStorage.getItem("user") == null) {
	window.location.replace("../index.html");
} else {
	// code for uploading name.................................
	var user_mail = sessionStorage.getItem("user");
	var all_data = localStorage.getItem(user_mail);
	var extracted_data = JSON.parse(all_data);
	var only_name = atob(extracted_data.name);
	var user_name = document.getElementById("user_name");
	user_name.innerHTML = only_name;

	// code for storing name in main profile box................................
	var m_user_name = document.getElementById("main_username");
	m_user_name.innerHTML = only_name;
	var user_picture = localStorage.getItem(user_mail + "image");
	var user_pic = document.getElementById("user_pic");
	user_pic.style.backgroundImage = "url(" + user_picture + ")";
	user_pic.style.backgroundSize = "cover";
	user_pic.style.backgroundPosition = "center";
	// upto here..................................................................

	if (localStorage.getItem(user_mail + "image") != null) {
		var box = document.getElementById("box");
		box.style.display = "none";
		var top_head = document.getElementById("top_head");
		top_head.style.display = "block";
	}

	var choose_pic = document.getElementById("choose_pic");
	choose_pic.onchange = function () {
		var reader = new FileReader();
		reader.readAsDataURL(choose_pic.files[0]);
		reader.onload = function () {
			var profile_box = document.getElementById("profile_box");
			var pic_icon = document.getElementById("pic_icon");
			var selected_pic = reader.result;
			profile_box.style.backgroundImage = "url(" + selected_pic + ")";
			profile_box.style.backgroundSize = "cover";
			pic_icon.style.display = "none";
			profile_box.style.position = "center";

			// code to enable next button after picture is uploaded.......
			var next_button = document.getElementById("btn");
			next_button.style.background =
				"linear-gradient(to right, #240b36, #c31432)";
			next_button.style.cursor = "pointer";

			next_button.onclick = function () {
				localStorage.setItem(user_mail + "image", selected_pic);
				// code to open main profile box.....................
				window.location.reload("../index.html");
			};
		};
	};
}

// logout_btn code..........................................................
var logout_btn = document.getElementById("logout");
logout_btn.onclick = function () {
	var wait_text = document.getElementById("wait_text");
	wait_text.innerHTML = "Please Wait..!";

	setTimeout(function () {
		sessionStorage.clear();
		window.location.replace("../index.html");
	}, 2000);
};

// open_contact_box code........................................................
var open_contact_box = document.getElementById("contact");
open_contact_box.onclick = function () {
	window.location="contact/contact.html";
};

// open videoplayer page code...............................................
var openProfilePage=document.getElementById('player');
openProfilePage.onclick=function()
{
	window.location="videoplayer/vdoplayer.html";
}
