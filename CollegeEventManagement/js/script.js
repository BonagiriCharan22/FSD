document.addEventListener("DOMContentLoaded",function(){
const form=document.getElementById("eventForm");
if(!form){
return;
}
const success=document.getElementById("successMsg");
const currentUser=sessionStorage.getItem("currentUser");
if(currentUser){
success.classList.remove("d-none");
success.classList.add("alert-info");
success.innerHTML=
"Welcome back "+currentUser+
". You have already registered during this session.";
}
form.addEventListener("submit",function(e){
e.preventDefault();
const name=document.getElementById("studentName").value.trim();
const roll=document.getElementById("rollNumber").value.trim();
const branch=document.getElementById("branch").value;
const email=document.getElementById("email").value.trim();
const mobile=document.getElementById("mobile").value.trim();
const event=document.getElementById("eventSelection").value;
let registrations=
JSON.parse(localStorage.getItem("registrations")) || [];
const alreadyRegistered=
registrations.some(student =>
student.roll===roll && student.event===event
);
success.classList.remove("d-none");
if(alreadyRegistered){
success.className="alert alert-warning";
success.innerHTML="Registration already exists for Roll Number "+roll+" in "+event+".";
return;
}

const studentData={
name:name,
roll:roll,
branch:branch,
email:email,
mobile:mobile,
event:event,
registeredAt:new Date().toLocaleString()
};
registrations.push(studentData);
localStorage.setItem(
"registrations",
JSON.stringify(registrations)
);
sessionStorage.setItem(
"currentUser",
name
);
success.className="alert alert-success";
success.innerHTML="Registration Successful! Welcome "+name+". You have been registered for "+event+".";
form.reset();
window.scrollTo({
top:0,
behavior:"smooth"
});
});
});