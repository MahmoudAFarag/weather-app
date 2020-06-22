document.querySelector("form").onsubmit = () => {
  let location = document.querySelector("#location").value;
  let msg1 = document.querySelector("#msg1");
  let msg2 = document.querySelector("#msg2");
  let button = document.querySelector("#thebtn");
  let status = document.querySelector("#worrd");

  button.classList.add("spinner-border", "spinner-border-sm");
  status.innerHTML = "Loading...";
  msg1.innerHTML = "Fetching Data...";
  msg2.innerHTML = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (msg1.innerHTML = "<p style='color:red'>Error</p>"), (msg2.innerHTML = data.error);
      }
      button.classList.remove("spinner-border", "spinner-border-sm");
      status.innerHTML = "Search";
      msg1.innerHTML = data.location;
      msg2.innerHTML = data.forecast;
    });
  });
  return false;
};
