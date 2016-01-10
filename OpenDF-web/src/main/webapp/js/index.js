function changePassword(data){
    console.log(data);
    $.post("api/user/change/password", data, function(){ alert("Password is successfully changed"); });
}
function changeUsername(data){
    console.log(data);
    $.post("api/user/change/username", data, function(){ alert("Username is successfully changed");  });
}
function changeDisplayName(data){
    console.log(data);
    $.post("api/user/change/displayname", data, function(){ alert("Display Name is successfully changed");  });
}
function changeEmail(data){
    console.log(data);
    $.post("api/user/change/email", data, function(){ alert("Email is successfully changed");  });
}
