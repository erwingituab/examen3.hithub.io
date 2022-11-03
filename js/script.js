var option = 1;
var ClienteID = 0;
$(document).ready(function(){
    $("#frmRegistro").on('submit',function(event){        
        if(option == 1)
        {
            Guardar();
        }
        if(option == 2)
        {
            Editar();
        }
        $(this)[0].reset(); 
        event.preventDefault();               
    });
});
function Guardar(){
    var cliente = {
        idCliente   : Math.floor(100000 + Math.random()*900000),
        nombre      : document.getElementById('txtnombre').value,
        apellido    : document.getElementById('txtapellido').value,
        email       : document.getElementById('txtemail').value,
        ciudad      : document.getElementById('txtciudad').value,
        direccion   : document.getElementById('txtdireccion').value,
        telefono    : document.getElementById('txttelefono').value
    }
    var transaccion = db.transaction("cliente","readwrite");
    const objetocliente = transaccion.objectStore('cliente');
    const cargarInfo = objetocliente.add(cliente);
    ListarDatos();
    console.log("Se a guardado el cliente.");   
    
}
var contproducto1 = 0;
var contproducto2 = 0;
var contproducto3 = 0;
function GuardarCarrito(idproducto)
{  
    if(idproducto.id==1)
    {
        var braxton = {
            idProducto : idproducto.id,
            producto  : "BRAXTON",
            precio : 249.99                
        }
        var transaccion = db1.transaction("producto","readwrite");
        const objetocliente = transaccion.objectStore('producto');
        const cargarInfo = objetocliente.add(braxton);        
        console.log("Se a guardado el producto."); 
        contproducto1 = contproducto1 + 1;
    }
    if(idproducto.id==2)
    {
        var valentino = {
            idProducto : idproducto.id,
            producto  : "VALENTINO",
            precio    : 189.99
        }
        var transaccion = db1.transaction("producto","readwrite");
        const objetocliente = transaccion.objectStore('producto');
        const cargarInfo = objetocliente.add(valentino);        
        console.log("Se a guardado el producto.");
        contproducto2 = contproducto2 + 1;
    }
    if(idproducto.id==3)
    {
        var lost = {
            idProducto : idproducto.id,
            producto  : "LOST",
            precio    : 149.99 
        } 
        var transaccion = db1.transaction("producto","readwrite");
        const objetocliente = transaccion.objectStore('producto');
        const cargarInfo = objetocliente.add(lost);        
        console.log("Se a guardado el producto.");
        contproducto3 = contproducto3 + 1;
    }
    ListarProductos();
}
function ListarProductos()
{
    var total = 0;
    var datosp="";
    var mostrarDatos = document.getElementById('datosp');
    db1 = dbConnection1.result;
    var transaccion = db1.transaction("producto","readonly");
    const objeto = transaccion.objectStore('producto');    
    const cursor = objeto.openCursor();
    cursor.onsuccess = (e) =>{
        const c = e.target.result;
        if(c)
        {                                            
            datosp +="<tr><td>"+c.value['idProducto']+"</td><td>"+c.value['producto']+"</td><td>"+c.value['precio']+"</td></tr>";
            total = total + parseInt(c.value['precio'].toString());
            mostrarDatos.innerHTML = datosp;
            c.continue();
        }        
    }
    console.log(total);
}
function ListarDatos(){
    var datos = "";
    var mostrarDatos = document.getElementById('datos');
    db = dbConnection.result;
    var transaccion = db.transaction("cliente","readonly");
    const objeto = transaccion.objectStore('cliente');    
    const cursor = objeto.openCursor();
    cursor.onsuccess = (e) =>{
        const c = e.target.result;
        if(c)
        {
            var parametro = {
                idCliente : c.value['idCliente'],
                nombre : c.value['nombre'],
                apellido : c.value['apellido'],
                email : c.value['email'],
                ciudad : c.value['ciudad'],
                direccion : c.value['direccion'],
                telefono : c.value['telefono']
            }                                   
            datos +="<tr><td>"+c.value['nombre']+"</td><td>"+c.value['apellido']+"</td><td>"+c.value['email']+"</td><td>"+c.value['ciudad']+"</td><td>"+c.value['direccion']+"</td><td>"+c.value['telefono']+"</td><td><button class='btn btn-info' onclick='Ver("+JSON.stringify(parametro)+")'> <span class='glyphicon glyphicon-pencil'></span> </button> <button class='btn btn-danger' onclick='Eliminar("+c.value['idCliente']+")'><span class='glyphicon glyphicon-trash'></span></button></td></tr>";
            mostrarDatos.innerHTML = datos;
            c.continue();
        }        
    }
}
function Ver(parametro)
{
    //console.log(parametro);
    ClienteID = parametro['idCliente'];
    document.getElementById('txtnombre').value = parametro['nombre'];
    document.getElementById('txtapellido').value = parametro['apellido'];
    document.getElementById('txtemail').value = parametro['email'];
    document.getElementById('txtciudad').value = parametro['ciudad'];
    document.getElementById('txtdireccion').value = parametro['direccion'];
    document.getElementById('txttelefono').value = parametro['telefono'];
    document.getElementById("enviar").value="Editar";
    option = 2;
}
function Editar()
{
    var cliente = {
        idCliente   : ClienteID,
        nombre      : document.getElementById('txtnombre').value,
        apellido    : document.getElementById('txtapellido').value,
        email       : document.getElementById('txtemail').value,
        ciudad      : document.getElementById('txtciudad').value,
        direccion   : document.getElementById('txtdireccion').value,
        telefono    : document.getElementById('txttelefono').value
    }
    var transaccion = db.transaction("cliente","readwrite");
    const objetocliente = transaccion.objectStore('cliente');
    const actualizarInfo = objetocliente.put(cliente);
    if(actualizarInfo)
    {
        console.log("Se actualizo con exito.",actualizarInfo);
    }
    ListarDatos();
    document.getElementById('enviar').value = "Guardar";
    option=1;
}
function Eliminar(idCliente){
    var transaccion = db.transaction("cliente","readwrite");
    const objeto = transaccion.objectStore('cliente');
    const eliminado = objeto.delete(idCliente);
    eliminado.onsuccess = () =>{
        ListarDatos();
    }
    eliminado.onerror = (error) =>{
        console.log(error);
    }
}