var plus_icon = document.getElementById("plus_icon");
plus_icon.onclick = function () {
	var big_box = document.getElementById("black_box");
	big_box.style.display = "block";
};

if (sessionStorage.getItem("user") == null) {
	window.location.replace( "../../index.html");
} else {
	// for showing profile pic..........................
	var user_mail = sessionStorage.getItem("user");
	var user_picture = localStorage.getItem(user_mail + "image");
	var user_pic = document.getElementById("pic_box");
	user_pic.style.backgroundImage = "url(" + user_picture + ")";
	user_pic.style.backgroundSize = "cover";
	user_pic.style.backgroundPosition = "center";

	var alert_for_name = document.getElementById("n_alert");
	var alert_for_number = document.getElementById("m_alert");

	var close_btn = document.getElementById("dlt_btn");
	close_btn.onclick = function () {
		var big_box = document.getElementById("black_box");
		big_box.style.display = "none";
		alert_for_name.style.display = "none";
		alert_for_number.style.display = "none";
	};

	var save_btn = document.getElementById("save_btn");
	var user_name = document.getElementById("person_name");
	var mobile_numb = document.getElementById("person_numb");
	save_btn.onclick = function () {
		var data_in_object = {
			name: user_name.value,
			mobile_no: mobile_numb.value,
		};
		var data_text = JSON.stringify(data_in_object);
		if (user_name.value != "" && mobile_numb.value != "") {
			localStorage.setItem(user_mail + "contact_info" + user_name.value,data_text);
		} else {
			if (user_name.value == "") {
				alert_for_name.style.display = "block";
				user_name.onclick = function () {
					alert_for_name.style.display = "none";
				};
			}

			if (mobile_numb.value == "") {
				alert_for_number.style.display = "block";
				mobile_numb.onclick = function () {
					alert_for_number.style.display = "none";
				};
			}
			return false;
		}
	};
	// code for all contact...............................................
	function all_contact() {
		for (var i = 0; i < localStorage.length; i++) {
			var key_data = localStorage.key(i);
			if (key_data.match(user_mail + "contact_info")) {
				var all_data = localStorage.getItem(key_data);
				var json_data = JSON.parse(all_data);
				var for_name = json_data.name;
				var for_number = json_data.mobile_no;

				// code for creating elemnts
				var detail_box = document.createElement("div");
				detail_box.setAttribute("id", "name_num_box");

				var p_for_name = document.createElement("p");
				p_for_name.setAttribute("id", "for_name");
				p_for_name.setAttribute("class", "conatct_names");

				var icon_for_user = document.createElement("i");
				icon_for_user.setAttribute("class", "fa fa-user");

				var p_for_number = document.createElement("p");
				p_for_number.setAttribute("id", "for_numb");

				var icon_for_number = document.createElement("i");
				icon_for_number.setAttribute("class", "fa fa-mobile");

				var div_for_icon = document.createElement("div");
				div_for_icon.setAttribute("id", "inner_box");

				var trash_icon = document.createElement("i");
				trash_icon.setAttribute("class", "fa fa-trash dlt_contact");

				var edit_icon = document.createElement("i");
				edit_icon.setAttribute("class", "fa fa-edit edit_contact");

				// code for positioning the Elements
				detail_box.appendChild(p_for_name);
				p_for_name.appendChild(icon_for_user);
				p_for_name.innerHTML += for_name;
				detail_box.appendChild(p_for_number);
				p_for_number.appendChild(icon_for_number);
				p_for_number.innerHTML += for_number;
				detail_box.appendChild(div_for_icon);
				div_for_icon.appendChild(trash_icon);
				div_for_icon.appendChild(edit_icon);

				// code for positioning main  div
				var main_con_box = document.getElementById("con_list_box");
				main_con_box.appendChild(detail_box);
			}
		}
	}
	all_contact();

	// code for searching name........................................
	var search_input = document.getElementById("srch");
	search_input.oninput = function () {
		var conatct_names = document.getElementsByClassName("conatct_names");
		for (var i = 0; i < conatct_names.length; i++) {
			if (
				conatct_names[i].innerHTML
					.toUpperCase()
					.match(search_input.value.toUpperCase())
			) {
				conatct_names[i].parentElement.style.display = "block";
			} else {
				conatct_names[i].parentElement.style.display = "none";
			}
		}
	};

	// code for deleting conatct data.........................................
	function dlt() {
		var dlt_icon = document.getElementsByClassName("dlt_contact");
		for (var i = 0; i < dlt_icon.length; i++) {
			dlt_icon[i].onclick = function () {
				var ask = confirm("Are you sure?");
				if (ask == true) {
					var main_box = this.parentElement.parentElement;
					var name_element =
						main_box.getElementsByClassName("conatct_names")[0];
					var username = name_element.textContent;

					main_box.className += "animate__animated animate__fadeOut";
					main_box.addEventListener("animationend", function () {
						main_box.remove();
					});
					localStorage.removeItem(
						user_mail + "contact_info" + username,
					);
				}
			};
		}
	}
	dlt();

	//code for editing existing contact...........................
	function edit() {
		var edit_icons = document.getElementsByClassName("edit_contact");
		for (var i = 0; i < edit_icons.length; i++) {
			edit_icons[i].onclick = function () {
				var main_box = this.parentElement.parentElement;
				var p_tags = main_box.getElementsByTagName("p");
				var name_only = p_tags[0].textContent;
				var numb_only = p_tags[1].textContent;

				// code for displaying name and number in contact box................
				var black_box = document.getElementById("black_box");
				black_box.style.display = "block";
				var title = document.getElementById("h_txt");
				title.innerText = "Edit Contact";
				var save_btn = document.getElementById("save_btn");
				save_btn.value = "Update";
				var name = document.getElementById("person_name");
				name.value = name_only;
				var number = document.getElementById("person_numb");
				number.value = numb_only;
				var close_btn = document.getElementById("dlt_btn");
				close_btn.style.display = "none";

				// code for deleting name from the saved contact..............
				localStorage.removeItem(user_mail + "contact_info" + name_only);
			};
		}
	}
	edit();
}
