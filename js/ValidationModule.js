function validateFname(fName)
{
    var nameRegex = /^[a-z]{3,}$/i;
    if(nameRegex.test(fName))
    {
        return true    
    }
    else
    {
        throw new Error("Full name shouldn't be less than 3 letters")
    }
}
// /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)([\w- ]+\.)+[\w-]{2,4})?$/

function validateEmail(Umail)
{
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    if(emailRegex.test(Umail))
    {
        return true    
    }
    else
    {
        throw new Error("Email isn't in the correct fromat")
    }
}

function validatePhone(UPhone)
{
    var phoneRegex =  /^(010|011|012|014|015)[0-9]{8}$/;
    if(phoneRegex.test(UPhone))
    {
        return true    
    }
    else
    {
        throw new Error("Phone number isn't true")
    }
}

function validatePassword(Upassword)
{
    var passRegex = /.{6,}/i;
    // var passRegex =/ ^.(?=.{8,})(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&+=]).*$/;
    if(passRegex.test(Upassword))
    {
        return true    
    }
    else
    {
        throw new Error("Password must be more than 6 characters")
    }
}