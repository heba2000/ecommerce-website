// let show=false;
// $(".toggle-password").click(function() {
//     $(this).toggleClass("fa-eye fa-eye-slash");
//     input = $(this).parent().find("input");
//     if (input.attr("type") == "password") {
//         input.attr("type", "text");
//     } else {
//         input.attr("type", "password");
//     }
// });


document.getElementById("exampleInputEmail1").onblur = emailValidation;
function emailValidation(){
    var emailInp = document.getElementById("exampleInputEmail1");
    try {
        validateEmail(emailInp.value)
        emailInp.classList.remove("is-invalid");
        }
    catch (e)
        {
        emailInp.classList.add("is-invalid")
        }
}

document.getElementById("exampleInputPassword1").onblur = passValidation;
function passValidation(){
    var passInp = document.getElementById("exampleInputPassword1");
    try {
        validatePassword(passInp.value)
        passInp.classList.remove("is-invalid");
        }
    catch (e)
        {
        passInp.classList.add("is-invalid")
        }
} 


document.forms[0].onsubmit = function(e){
    e.preventDefault();
    emailValidation();
    passValidation();

    var errorDivs = document.querySelectorAll(".incorrect-format");
    flag = true;
    for(d of errorDivs){
        if(d.innerText != "")
            flag = false;
    }

    if(flag)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("get","Data/Users.json",true)
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                users = JSON.parse(xhr.responseText)
                for(u of users)
                {
                    if(u.email == document.getElementById("exampleInputEmail1").value && 
                        u.password == document.getElementById("exampleInputPassword1").value )   
                    {
                        var date = new Date();
                        date.setDate(date.getDate()+10);
                        document.cookie = `usermail=${u.email};expires=${date.toUTCString()}`;
                        document.cookie = `userpassword=${u.password};expires=${date.toUTCString()}`;
                        document.forms[0].submit();
                    }
                }
            }
        
        }        
        xhr.send();
    }

}

