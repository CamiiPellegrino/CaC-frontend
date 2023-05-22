//Armar las promociones: 
let mostrarError = document.getElementById("mostrar-error");

const precioUnitario = parseInt(document.getElementById("precio-unitario").innerText); 
const arrayInfoPromociones = [['Estudiante', '80'], ['Trainee', '50'], ['Junior', '15']];
const containerPromociones = document.getElementById("container-promociones");
const select = document.getElementById("compra-ticket-select");

for(i=0; i<arrayInfoPromociones.length; i++){
    let elm = crearElemento("div", null, ["promociones"], null),
        elmContenido = crearElemento("div", null, ["promociones-contenido"], null),
        titulo = crearElemento("h3", null, null, arrayInfoPromociones[i][0]),
        p = crearElemento("p", null, null, "Tienen un descuento"),
        porcentaje = crearElemento("h4", null, null, arrayInfoPromociones[i][1]+"%"),
        p2 = crearElemento("p", null, null, "* Presentar documentación");
    
    elm.appendChild(elmContenido);       elmContenido.appendChild(titulo); 
    elmContenido.appendChild(p);         elmContenido.appendChild(porcentaje);
    elmContenido.appendChild(p2);        containerPromociones.appendChild(elm);

    let option = crearElemento("option", null, null, arrayInfoPromociones[i][0]);
    select.appendChild(option);
}
select.appendChild(crearElemento("option", null, null, "Ninguno de los anteriores"));


//Funciones: 
function mostrarPrecioFinal() {
    let precioFinal = calcularPrecioFinal();
    if(precioFinal <=0){
        mostrarError.innerText = "Ingrese una cantidad mayor o igual a 1";
        document.getElementById('precio-con-desc').innerText = "";

    }else {
        document.getElementById('precio-con-desc').innerText = precioFinal;
        mostrarError.innerText = "";
    }
}
function calcularPrecioFinal(){
    var selected = select.options[select.selectedIndex].text;
    let porcentajeDesc = arrayInfoPromociones.filter((desc) =>{
        return desc[0]==selected;
    });
    let precioUnitarioConDesc;
    if(porcentajeDesc.length>0) {
        precioUnitarioConDesc = precioUnitario-(precioUnitario*porcentajeDesc[0][1]/100);
    }else {
        precioUnitarioConDesc = precioUnitario;
    }
    let cant = parseInt(document.getElementById("compra-ticket-cantidad").value);
    return precioUnitarioConDesc * cant;
    
}
function crearElemento(etiqueta, id, arrayClases, inner){
    let div = document.createElement(etiqueta);
    id != null && id != undefined ? div.setAttribute("id", id):"";
    if(arrayClases != null && arrayClases != undefined){
        arrayClases.forEach((clase) =>{
            div.classList.add(clase);
        });
    }
    inner != null && inner != undefined ? div.innerText = inner: "";
    return div;
}