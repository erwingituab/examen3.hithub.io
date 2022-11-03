const dbConnection = window.indexedDB.open('registro' , 2);
const dbConnection1 = window.indexedDB.open('carrito' , 2);
let db1;
dbConnection1.onsuccess = () => {
    db1 = dbConnection1.result;    
    //console.log("Base de datos abierta", db);
}
dbConnection1.onupgradeneeded = (e) => {
    db1 = e.target.result;
    //console.log("Crear objetos de DB", db);
    const coleccionObjetos = db1.createObjectStore('producto',{
        keyPath: 'idProducto'
    });    
}
dbConnection1.onerror = (error) => {
    //console.log('error');
}


let db;
dbConnection.onsuccess = () => {
    db = dbConnection.result;
    ListarDatos();
    //console.log("Base de datos abierta", db);
}
dbConnection.onupgradeneeded = (e) => {
    db = e.target.result;
    //console.log("Crear objetos de DB", db);
    const coleccionObjetos = db.createObjectStore('cliente',{
        keyPath: 'idCliente'
    });    
}
dbConnection.onerror = (error) => {
    //console.log('error');
}