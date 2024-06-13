"use strict";

var NAVBAR_VERTICAL_CONFIG = {
  isNavbarVerticalCollapsed: false
};

var isNull = function isNull(key) {
  return JSON.parse(localStorage.getItem(key)) === null;
};

document.addEventListener("DOMContentLoaded", function () {
  isNull('isNavbarVerticalCollapsed') && localStorage.setItem('isNavbarVerticalCollapsed', NAVBAR_VERTICAL_CONFIG.isNavbarVerticalCollapsed);
  var isNavbarVerticalCollapsed = JSON.parse(localStorage.getItem('isNavbarVerticalCollapsed'));

  const userLabel = document.getElementById('userLabel');
  const employeeLabel = document.getElementById('employeeLabel');
  const adminLabel = document.getElementById('adminLabel');
  
  userLabel.classList.add("d-none");
    employeeLabel.classList.add("d-none");
    adminLabel.classList.add("d-none"); 
  if (isNavbarVerticalCollapsed) {
    document.documentElement.className += ' navbar-vertical-collapsed';
  }

  document.getElementById('toggle-button-navbar').addEventListener('click' , () =>{
    var isNavbarVerticalCollapsed = JSON.parse(localStorage.getItem('isNavbarVerticalCollapsed'));
    if(isNavbarVerticalCollapsed){
      userLabel.classList.add("d-none");
      userLabel.classList.add("py-4");
      employeeLabel.classList.add("d-none");
      employeeLabel.classList.add("py-4");
      adminLabel.classList.add("d-none");
      adminLabel.classList.add("py-4");
    }
    else{
      userLabel.classList.remove("d-none");
      userLabel.classList.remove("py-4");
      employeeLabel.classList.remove("d-none");
      employeeLabel.classList.remove("py-4");
      adminLabel.classList.remove("d-none");
      adminLabel.classList.remove("py-4");
    }
  })


});
