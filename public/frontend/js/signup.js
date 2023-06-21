function validateAge() {
  var birthdateInput = document.getElementById("birthdate");
  var birthdate = new Date(birthdateInput.value);
  var now = new Date();
  var age = now.getFullYear() - birthdate.getFullYear();
  var monthDiff = now.getMonth() - birthdate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  if (age < 16) {
    alert("You must be at least 16 years old to proceed.");
  } else {
    alert("Validation successful. You may proceed.");
    // Add code here to perform further actions if needed
  }
}
