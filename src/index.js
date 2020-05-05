//arranca la aplicacion

const app = require('./app');

//v2 codigo mejor escrito
async function main(){
    await app.listen(app.get('port'));      //obtenemos el valor de la variable
    console.log('Server on port ',app.get('port'));
}

main();

/* v1 codigo asincrono con un callback

app.listen(3000, () =>{
    console.log('Server on port 3000');
});

*/