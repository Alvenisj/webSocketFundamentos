//REFERENCIAS DEL HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje'); 
const btnEnviar  = document.querySelector('#btnEnviar');
 



const socket = io();


//CUANDO SE CONECTA
socket.on('connect', () => {

    //console.log('CONNECTED READY');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

//CUANDO SE DESCONECTA
socket.on('disconnect', () => {

   // console.log('DESCONNECTED ');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('enviar-mensaje', ( payload ) => {

    console.log( payload );
});

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123456',
        fecha: new Date().getTime()
    }
   
    socket.emit('enviar-mensaje', payload, ( id ) => {

        console.log('Desde el server', id);
    });

});