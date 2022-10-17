const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');



class Server {


    constructor() {

        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server);

        this.pathRoutes = { }
 
        //MIDDLEWARES
        this.middlewares();
        //RUTAS DE LA APLICACIÓN
        this.routes();

        //EVENTOS DEL SOCKET O CONFIGURACIÓN DEL SOCKET
        this.sockets();

      }

      middlewares() {
        // CORS
        this.app.use( cors());
   
        //Directorio Público
        this.app.use( express.static('public') );

      }

      routes() {

        //   this.app.use(this.pathRoutes.auth, require('../routes/auth.routes'));
         

    }

    sockets() {

        this.io.on("connection", socketController );


    }

        listenServer() {
          
            this.server.listen(this.port, () => {

                console.log('Running in port', this.port)
            })
        }

    }
    

module.exports = Server;