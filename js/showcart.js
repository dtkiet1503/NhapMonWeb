function doSearch(){
    var frm=document.forms["frm-search"];
    if(frm.words.value.length>0)
    frm.submit();

}

function showSearch()
{
	var url = new URL(window.location);
	var ws = url.searchParams.get("words");
	document.getElementById("searchDetail").innerHTML="<h1>Từ khóa tìm: </h1> <b>"+ws+"</b>";
}

function checkKeySearch(e){

var key =Event.which|| Event.keyCode;
    if(key==32) {doSearch();}

}

/*DANG NHAP */
function loginValidate(frm)
{
	var email1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if ( email1.test(frm.email.value) == false ) {
		alert("Vui lòng nhập email .");
		frm.email.focus();
		return false;
		}
	if ( frm.psw.value.length<8 ) {
		alert("Mật khẩu có tối thiểu 8 ký tự.");
		frm.psw.focus();
		return false;
		}
	alert("Đã gửi dữ liệu Đăng nhập");
	return true;
}
var itemList={
	"sp001":{	"name": "Hoa","price":16990000,"photo": "images/samsung-galaxy-s21-fe.jpg"
},
	"sp002":{	
		"name": "Samsung Galaxy S21 FE" ,"price":27490000,"photo":"images/samsung-galaxy-s21-fe.jpg"
	},
	"sp003":{
			"name": "IPhone 13 Pro Max 512GB","price":38490000,"photo": "images/iphone-13-pro-max.jpg"
		},
	"sp004":{	
		"name": "IPhone 13" ,"price":20990000,"photo": "images/iphone-13.jpg"
	},
	"sp005":{	
		"name": "IPhone 11 64GB " ,"price":14990000,"photo": "images/iphone-11-64-gb.jpg"
	},
	"sp006":{	
		"name": "Galaxy Z Fold3 5G 256GB" ,"price":35990000,"photo": "images/samsung-galaxy-z-fold.jpg"
	},
	"sp007":{
			"name": "IPhone 12 Pro 256GB" ,"price":26290000,"photo": "images/iphone-12-pro-2-56gb.jpg"
		},
	"sp008":{	
		"name": "Xiaomi Redmi Note" ,"price":6490000,"photo": "images/xiaomi-redmi-note.jpg"
	},
	"sp009":{	
		"name": "Google Pixel 6" ,"price":13799000,"photo": "images/google-pixel-6.jpg"
	},
    "sp010":{	
		"name": "Google Pixel 6 Pro" ,"price":21490000,"photo": "images/google-pixel-6-pro.jpg"
	},		
    "sp011":{	
		"name": "OnePlus 9 Pro" ,"price":10000000,"photo": "images/oneplus-9-pro.jpg"
	},		
    "sp012":{	
		"name": "Galaxy Note 20 Ultra 5G" ,"price":22982764,"photo": "images/samsung-galaxy-z-fold.jpg"
	}																													
};
function addCart(code)
{
var number=parseInt(document.getElementById(code).value);
var name=itemList[code].name;
if(number==0)return;
if(typeof localStorage[code] === "undefined"){
window.localStorage.setItem(code,number);
}else{
var current=parseInt(window.localStorage.getItem(code));
if(current+number>100)
{
window.localStorage.setItem(code,100);
alert("Mỗi mặt hàng chỉ có thể đặt 100 sản phẩm cho mỗi đơn hàng. Bạn đã đặt 100 sản phẩm của "+name+" này.");
return;
}
else
window.localStorage.setItem(code,current+number);
}
alert("Đã cập nhật sản phẩm "+name+" với số lượng "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+parseInt(window.localStorage.getItem(code))+".");
}
function openCart(){
	window.location.href = "donhang.html";
}


function showCart()
{
var formatter = new Intl.NumberFormat('vi-VN', {
style: 'currency',
currency: 'VND'
});
var
container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
container.innerHTML="";
var sum=0;//tổng mỗi mặt hàng
var totalPreTax=0;//tổng trước thuế
var discountRate=getDiscountRate();//tỉ lệ khuyến mãi
var taxRate=0.1;//tỉ lệ thuế
var discount=0;//tiền giảm giá
var tax=0;//tiền thuế
for(var i=0;i<window.localStorage.length;i++)
{
if(typeof itemList[localStorage.key(i)] === "undefined")
continue;
var tr=document.createElement("tr");
var photoCell=document.createElement("td");
var nameCell=document.createElement("td");
var priceCell=document.createElement("td");
var numberCell=document.createElement("td");
var sumCell=document.createElement("td");
var removeCell=document.createElement("td");
var removeLink=document.createElement("a");
var item=itemList[localStorage.key(i)];
var number=localStorage.getItem(localStorage.key(i));
photoCell.style.textAlign="center";
photoCell.innerHTML="<img src='"+item.photo+" 'class=' round-figure' width='100px'/>";
nameCell.innerHTML=item.name;
priceCell.innerHTML=formatter.format(item.price);
priceCell.style.textAlign="right";
numberCell.innerHTML=number;
numberCell.style.textAlign="right";
sum=number*item.price;
sumCell.innerHTML=formatter.format(sum);
sumCell.style.textAlign="right";
removeLink.innerHTML="<i class='fa fa-trash icon-pink'></i>";
removeLink.setAttribute("href","#");
removeLink.setAttribute("data-code",localStorage.key(i));
removeLink.onclick=function(){
removeCart(this.dataset.code);
};
removeCell.style.textAlign="center";
removeCell.appendChild(removeLink);
tr.appendChild(photoCell);
tr.appendChild(nameCell);
tr.appendChild(numberCell);
tr.appendChild(priceCell);13
tr.appendChild(sumCell);
tr.appendChild(removeCell);
container.appendChild(tr);
totalPreTax+=sum;
}
var discount=totalPreTax*discountRate;
var tax=(totalPreTax-discount)*taxRate;
document.getElementById("bill_pre_tax_total").innerHTML=formatter.format(totalPreTax);
document.getElementById("bill_discount").innerHTML=discountRate+" x A = "+formatter.format(discount);
document.getElementById("bill_tax").innerHTML=formatter.format(tax);
document.getElementById("bill_total").innerHTML=formatter.format(totalPreTaxdiscount+tax);
}
function getDiscountRate()
{
var d=new Date();//lấy ngày hiện tại của máy tính
var weekday=d.getDay();//lấy ngày trong tuần
var totalMins=d.getHours()*60+d.getMinutes(); 
if(weekday>=1&&weekday<=3&&((totalMins>=420&&totalMins<=660)||(totalMins>=780&&totalMins<=1020)))
return 0.1;
return 0;
}
function removeCart(code)
{
if(typeof window.localStorage[code] !== "undefined")
{
//xóa sản phẩm khỏi localStorage
window.localStorage.removeItem(code);
//Xóa nội dung của phần thân của bảng (<tbody>)
document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML
="";
//Hiển thị lại nội dung của đơn hàng
showCart();
}
}
//Cập nhật trang chi tiết đơn hàng khi cập nhật số lượng sản phẩm
window.onstorage = () => {
showCart();
};
var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}
