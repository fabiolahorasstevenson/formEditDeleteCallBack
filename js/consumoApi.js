let inputId = document.getElementById('identificador');
let inputName = document.getElementById('name');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');
let tabla = document.getElementById('container');
let btn = document.querySelector('.btn');
let url = 'https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees';
let urlDel = "https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees?id="
btn.addEventListener('click', addUser);

function botonEditar(id,name,city,email,datos){

  console.log('Se ha hecho clic en el botón EDITAR');
  console.log('El id a editar es: '+id);
  inputId.value = id;
  inputName.value = name;
  inputCity.value = city;
  inputEmail.value = email;

}
function actualizarDatos(id, nameEditar,cityEditar,emailEditar){
let urlEdit = url+'?id='+id;
fetch(urlEdit, {
  method: "PUT",
  body: {
    name: nameEditar,
    city: cityEditar,
    email: emailEditar
  },
})
  .then((res) => res.json())
  .then((body) => {
      console.log('success', body)
      
  });

}

function botonDelete(id,name,city,email){
  let urlDel = url+'?id='+parseInt(id);
  console.log('Se ha hecho clic en el botón BORRAR');
  console.log('Id a borrar: '+id);
  inputId.value = id;
  inputName.value = name;
  inputCity.value = city;
  inputEmail.value = email;
  fetch(urlDel, {
    method: 'DELETE',
  })
    .then(response => {
        if (response.status == 204){
            console.log("Error");
        }
    })
       
  
} 

function addUser(datos) {
  let tr = document.createElement('tr');
  let tdId = document.createElement('td');
  let tdName = document.createElement('td');
  let tdCity = document.createElement('td');
  let tdEmail = document.createElement('td');
  let tdEdit = document.createElement('td');
  let tdDelete = document.createElement('td');
  let btnEdit = document.createElement('button');
  let btnDelete = document.createElement('button');
  
  tdId.innerText = inputId.value;
  tdName.innerText = inputName.value;
  tdCity.innerText = inputCity.value;
  tdEmail.innerText = inputEmail.value;

  const buttonEdit = document.createElement("button");
  buttonEdit.textContent = "Editar";
  buttonEdit.setAttribute("class","btn btn-warning");
  buttonEdit.addEventListener("click", function() {
    let id = tdId.innerText; 
    let name = tdName.innerText;
    let city = tdCity.innerText;
    let email = tdEmail.innerText;
    botonEditar(id,name,city,email);
    btn.addEventListener("click",function(){
     console.log("Click en actualizar");
    let nameEditar = tdName.innerText;
    let cityEditar = tdCity.innerText;
    let emailEditar = tdEmail.innerText;
    if (nameEditar!= name || cityEditar!=city || emailEditar!=email){
      actualizarDatos(id, nameEditar,cityEditar,emailEditar);
    }
     
    })
    });
  //buttonEdit.addEventListener('click',botonEditar);
  
  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Borrar";
  buttonDelete.setAttribute("class","btn btn-danger");

  buttonDelete.addEventListener("click", function() {
    let id = tdId.innerText;
    let name = tdName.innerText;
    let city = tdCity.innerText;
    let email = tdEmail.innerText;
    botonDelete(id,name,city,email);
    });

  //buttonDelete.addEventListener('click',botonDelete);

  let tbody = document.getElementById('tab');
  tbody.appendChild(tr);
  tr.appendChild(tdId);
  tr.appendChild(tdName);
  tr.appendChild(tdCity);
  tr.appendChild(tdEmail);
  tr.appendChild(tdEdit);
  tr.appendChild(tdDelete);
  tdEdit.appendChild(buttonEdit);
  tdDelete.appendChild(buttonDelete);

}

function cargarDatos(datos){
  const empleados = datos;
  for (let i = 0; i < empleados.length; i++) {
    console.log("Persona", empleados[i]);
      inputId.value = empleados[i].id;
      inputName.value = empleados[i].name;
      inputCity.value = empleados[i].city;
      inputEmail.value = empleados[i].email;
      addUser(datos);
  }
  inputId.value = '';
  inputName.value = '';
  inputCity.value = '';
  inputEmail.value = '';
}

fetch(url)
  .then(response => response.json())
  .then(datos => {
    cargarDatos(datos);
  }         
)
.catch(err => console.log('Hubo un problema con la petición Fetch:' + err.message))