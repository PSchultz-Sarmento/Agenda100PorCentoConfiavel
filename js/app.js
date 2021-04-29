//Form Inputs
let inputs = document.querySelectorAll("body input");
//Send button
let button = document.querySelector(".send");

//Def Arrays
let register = [];
let allReg = [];

//
let error = 0;

//File input
let input = document.querySelector("input#file");

//File output
let output = document.querySelector("textarea#output");

//Download func 
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//Save on array function
button.addEventListener("click", () => {
  error = 0
  for (i = 0; i < (inputs.length - 1); i++) {
    if (inputs[i].value == '') {
      alert("Por favor, preencha todos os dados pedidos no formulario.")
      error = 1
      break
    } else {
      if (i == 0) register[i] = `\n\n - - - - - - - - - - - - - Id: ${allReg.length + 1} - - - - - - - - - - - - - \n\n${inputs[i].id}: ${inputs[i].value}`;
      else register[i] = `\n\n${inputs[i].id}: ${inputs[i].value}`;
    }
  }
  //Error treatment
  if (error == 0) {
    allReg.push(register.toString());
    console.log(allReg);
  } else console.log(error);
});

//Download btn function
let downloadBtn = () => {
  download("log", allReg);
}

//File reader function
file.addEventListener("change", () => {
  let files = input.files;
  if (files.length == 0) return;
  const file = files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);
    output.value = lines.join("\n");
  };
  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(file);
});
