
document.getElementById("exampleInputName").onblur = nameValidation;
function nameValidation(){
    var nameInp = document.getElementById("exampleInputName");
    var errorText = nameInp.nextElementSibling;
    try {
        validateFname(nameInp.value)
        nameInp.classList.remove("is-invalid");
        errorText.innerText = "";
        
        }
    catch (e)
        {
        errorText.innerText = e.message;
        nameInp.classList.add("is-invalid")
        }
} 

document.getElementById("exampleInputEmail1").onblur = emailValidation;
function emailValidation(){
    var emailInp = document.getElementById("exampleInputEmail1");
    var errorText = emailInp.nextElementSibling;
    try {
        validateEmail(emailInp.value)
        emailInp.classList.remove("is-invalid");
        errorText.innerText = "";
        }
    catch (e)
        {
        errorText.innerText = e.message;
        emailInp.classList.add("is-invalid")
        }
} 

document.getElementById("exampleInputPhone").onblur = phoneValidation;
function phoneValidation(){
    var phoneInp = document.getElementById("exampleInputPhone");
    var errorText = phoneInp.nextElementSibling;
    try {
        validatePhone(phoneInp.value)
        phoneInp.classList.remove("is-invalid");
        errorText.innerText = "";
        }
    catch (e)
        {
        errorText.innerText = e.message;
        phoneInp.classList.add("is-invalid")
        }
} 

document.getElementById("exampleInputPassword1").onblur = passValidation;
function passValidation(){
    var passInp = document.getElementById("exampleInputPassword1");
    var errorText = passInp.nextElementSibling;
    try {
        validatePassword(passInp.value)
        passInp.classList.remove("is-invalid");
        errorText.innerText = "";
        }
    catch (e)
        {
        errorText.innerText = e.message;
        passInp.classList.add("is-invalid")
        }
} 





document.forms[0].onsubmit = function(eve){
  
    eve.preventDefault();
    nameValidation();
    emailValidation();
    phoneValidation();
    passValidation();

    var errorDivs = document.querySelectorAll(".incorrect-format");
    flag = true;
    for(d of errorDivs){
        if(d.innerText != "")
            flag = false;
    }

    if(flag)
    this.submit();
        var date = new Date();
        date.setDate(date.getDate()+1);
        document.cookie = `username=${document.getElementById("exampleInputName").value};expires=${date.toUTCString()}`;
        document.cookie = `password=${document.getElementById("exampleInputPassword1").value};expires=${date.toUTCString()}`;
     
}

