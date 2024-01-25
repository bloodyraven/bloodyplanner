$(document).ready(function() {
    loadData();
});

// load local data
function loadData() {
	$("#header-wording").html(localStorage.getItem("header-wording"));
	$("#footer-wording").html(localStorage.getItem("footer-wording"));
	
	loadDataDay("lundi");
	loadDataDay("mardi");
}

function loadDataDay(day) {
	$("#"+day+"-one-text").html(localStorage.getItem(day+"-one-text"));
	$("#"+day+"-two-text-1").html(localStorage.getItem(day+"-two-text-1"));
	$("#"+day+"-two-text-2").html(localStorage.getItem(day+"-two-text-2"));
	if(localStorage.getItem(day+"-off-game") != null) {
		$("#"+day+"-off-game").css("background-image","linear-gradient(to bottom, rgba(245, 246, 252, 0.1) 75%, #fff), url('"+localStorage.getItem(day+"-off-game")+"')");
		$("#"+day+"-off-game").css("backgroundPosition",localStorage.getItem(day+"-off-range")+"px");
		$("#"+day+"-off-range").val(localStorage.getItem(day+"-off-range"));
	}
	if(localStorage.getItem(day+"-one-game") != null) {
		$("#"+day+"-one-game").css("background-image","linear-gradient(to bottom, rgba(245, 246, 252, 0.1) 75%, #fff), url('"+localStorage.getItem(day+"-one-game")+"')");
		$("#"+day+"-one-game").css("backgroundPosition",localStorage.getItem(day+"-one-game-range")+"px");
		$("#"+day+"-one-range").val(localStorage.getItem(day+"-one-game-range"));
	}
	if(localStorage.getItem(day+"-two-game-1") != null) {
		$("#"+day+"-two-game-1").css("background-image","linear-gradient(to bottom, rgba(245, 246, 252, 0.1) 75%, #fff), url('"+localStorage.getItem(day+"-two-game-1")+"')");
		$("#"+day+"-two-game-1").css("backgroundPosition",localStorage.getItem(day+"-two-game-1-range")+"px");
		$("#"+day+"-two-range-1").val(localStorage.getItem(day+"-two-game-1-range"));
	}
	if(localStorage.getItem(day+"-two-game-2") != null) {
		$("#"+day+"-two-game-2").css("background-image","linear-gradient(to bottom, rgba(245, 246, 252, 0.1) 75%, #fff), url('"+localStorage.getItem(day+"-two-game-2")+"')");
		$("#"+day+"-two-game-2").css("backgroundPosition",localStorage.getItem(day+"-two-game-2-range")+"px");
		$("#"+day+"-two-range-2").val(localStorage.getItem(day+"-two-game-2-range"));
	}
	if(localStorage.getItem(day+"-logo") != null)
		$("#"+day+"-logo").attr("src",localStorage.getItem(day+"-logo"));
	if(localStorage.getItem(day+"-mini-logo-1") != null)
		$("#"+day+"-mini-logo-1").attr("src",localStorage.getItem(day+"-mini-logo-1"));
	if(localStorage.getItem(day+"-mini-logo-2") != null)
		$("#"+day+"-mini-logo-2").attr("src",localStorage.getItem(day+"-mini-logo-2"));
	if(localStorage.getItem(day+"-select")==null) {
		$("#"+day+"-select").val("off");
	} else {
		$("#"+day+"-select").val(localStorage.getItem(day+"-select"));
	}
	loadLayout(localStorage.getItem(day+"-select"), day);
	
	refreshFavLogo();
	refreshBgLogo();
	
	refreshSocialLabel();
	// input val
	$("#tiktok-input").val(localStorage.getItem("tiktok-wording"));
	$("#twitch-input").val(localStorage.getItem("twitch-wording"));
	// box check
	if(localStorage.getItem("tiktok-checkbox-checked")=='true') {
		$("#tiktok-checkbox").prop('checked', 'true')
	}
	if(localStorage.getItem("twitch-checkbox-checked")=='true') {
		$("#twitch-checkbox").prop('checked', 'true')
	}
}

function selectLayout(selectItem, day) {
	store(day+'-select', selectItem);
	loadLayout(selectItem, day);
}

function loadLayout(selectItem, day) {
	if(selectItem=="off" || selectItem==null) {
		$("#"+day).show();
		$("#"+day+'-one-game').hide();
		$("#"+day+'-two-games').hide();
		$("#"+day+'-offline').show();
		$("#settings-"+day+'-one').hide();
		$("#settings-"+day+'-two').hide();
		$("#settings-"+day+'-off').show();
	}
	if(selectItem=="1") {
		$("#"+day).show();
		$("#"+day+'-one-game').show();
		$("#"+day+'-two-games').hide();
		$("#"+day+'-offline').hide();
		$("#settings-"+day+'-one').show();
		$("#settings-"+day+'-two').hide();
		$("#settings-"+day+'-off').hide();
	}
	if(selectItem=="2") {
		$("#"+day).show();
		$("#"+day+'-one-game').hide();
		$("#"+day+'-two-games').show();
		$("#"+day+'-offline').hide();
		$("#settings-"+day+'-one').hide();
		$("#settings-"+day+'-two').show();
		$("#settings-"+day+'-off').hide();
	}
	if(selectItem=="") {
		$("#"+day).hide();
		$("#settings-"+day+'-one').hide();
		$("#settings-"+day+'-two').hide();
		$("#settings-"+day+'-off').hide();
	}
}

// show modal and reset it, also set hidden id (click origin)
function chooseImage(el) {
	resetModal(el.id);
	$("#modal-file").show();
	$("#hidden-id").val(el.id);
}

// close modal
function closeFileModal() {
	$("#modal-file").hide();
}

// save logo button
function saveNewLogo() {
	var id = $("#hidden-id").val();
	var url = $("#url-logo").val();
	$("#"+id).attr("src",url);
	store(id, url);
	$("#modal-file").hide();
}

function showLogo() {
	$("#logo-show").attr("src",$("#url-logo").val());
}

function resetModal(el) {
	if(localStorage.getItem(el) != "") {
		$("#logo-show").attr("src",localStorage.getItem(el));
		$("#url-logo").val(localStorage.getItem(el));
	} else {
		$("#logo-show").attr("src","");
		$("#url-logo").val("");
	}
}

function logoFavorite() {
	var list = localStorage.getItem("favLogoList");
	var url = $("#url-logo").val();
	if(list == "" || list == null) {
		store("favLogoList", url);
	} else {
		store("favLogoList", list+","+url);
	}
	refreshFavLogo();
}

function refreshFavLogo() {
	$("#logoFavList").html("");
	if(localStorage.getItem("favLogoList") != "" && localStorage.getItem("favLogoList") != null) {
		var imgs = localStorage.getItem("favLogoList").split(",");
		for(var i=0 ; imgs.length > i; i++) {
			$("#logoFavList").append("<div><img class='logo-fav' onclick='selectFavLogo(this)' src='"+imgs[i]+"'/><button class='logo-del' onclick='deleteFavLogo("+i+")'>X</button></div>");
		}
	}
}

function deleteFavLogo(i) {
	var imgs = localStorage.getItem("favLogoList").split(",");
	imgs.splice(i, 1);
	localStorage.setItem("favLogoList", imgs);
	refreshFavLogo();
}

function selectFavLogo(el) {
	$("#url-logo").val(el.src);
	$("#logo-show").attr("src",el.src);
}



function chooseBgImage(id) {
	resetBgModal(id);
	$("#modal-file-bg").show();
	$("#hidden-id").html(id);
}

// close modal
function closeFileBgModal() {
	$("#modal-file-bg").hide();
}

// save bg button
function saveNewBg() {
	var id = $("#hidden-id").html();
	console.log(id);
	var url = $("#url-bg").val();
	console.log(url);
	$("#"+id).css("background-image","linear-gradient(to bottom, rgba(245, 246, 252, 0.1) 75%, #fff), url('"+url+"')");
	store(id, url);
	$("#modal-file-bg").hide();
}

function showBg() {
	$("#bg-show").attr("src",$("#url-bg").val());
}

function resetBgModal(el) {
	console.log(el);
	if(localStorage.getItem(el) != "") {
		$("#bg-show").attr("src",localStorage.getItem(el));
		$("#url-bg").val(localStorage.getItem(el));
	} else {
		$("#bg-show").attr("src","");
		$("#url-bg").val("");
	}
}

function bgFavorite() {
	var list = localStorage.getItem("favBgList");
	var url = $("#url-bg").val();
	if(list == "" || list == null) {
		store("favBgList", url);
	} else {
		store("favBgList", list+","+url);
	}
	refreshBgLogo();
}

function refreshBgLogo() {
	$("#bgFavList").html("");
	if(localStorage.getItem("favBgList") != "" && localStorage.getItem("favBgList") != null) {
		var imgs = localStorage.getItem("favBgList").split(",");
		for(var i=0 ; imgs.length > i; i++) {
			$("#bgFavList").append("<div><img class='logo-fav' onclick='selectFavBg(this)' src='"+imgs[i]+"'/><button class='logo-del' onclick='deleteFavBg("+i+")'>X</button></div>");
		}
	}
}

function deleteFavBg(i) {
	var imgs = localStorage.getItem("favBgList").split(",");
	imgs.splice(i, 1);
	localStorage.setItem("favBgList", imgs);
	refreshBgLogo();
}

function selectFavBg(el) {
	$("#url-bg").val(el.src);
	$("#bg-show").attr("src",el.src);
}



function store(key, value) {
	localStorage.setItem(key, value);
}

function editBg(v, e) {
	store(e+"-range", v);
	document.getElementById(e).style.backgroundPosition = v+"px";
}

function mouseover(e) {
	e.style.border="dashed red";
}

function mouseout(e) {
	e.style.border="";
}

function enable(e) {
	var id = e.id;
	var checked = e.checked;
	store(id+"-checked",checked);
	refreshSocialLabel();
}

function refreshSocialLabel() {
	var w = "";
	if(localStorage.getItem("twitch-checkbox-checked")=="true") {
		w+="<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' class='bi bi-twitch social-margin' viewBox='0 0 16 16'><path d='M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z'/><path d='M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z'/></svg>";
		w+="<span class='social-margin'>"+localStorage.getItem("twitch-wording")+"</span>";
	}
	if(localStorage.getItem("tiktok-checkbox-checked")=="true") {
		w+="<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' class='bi bi-tiktok social-margin' viewBox='0 0 16 16'><path d='M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z'/></svg>";
		w+="<span class='social-margin'>"+localStorage.getItem("tiktok-wording")+"</span>";
	}
	$("#footer-wording").html(w);
}