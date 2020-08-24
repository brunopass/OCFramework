module.exports = verifyEmailTemplate = link => {
return `    
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            html{
                width: 100%;
                max-width: 500px;
                height: max-content;
                background-color: #2A2A2A;
                margin: 0;
                padding: 0;
            }

            .cuerpo{
                background-color: #2a2a2a;
                width: 100%;
                max-width: 500px;
                height: 600px;
                margin: 0;
                padding: 0;
            }

            .navbar{
                padding: 10px 0 10px 0;
                width: 100%;
                height: 50px;
                background-color: #1A54DC;
                display: flex;
                justify-content: space-between;
                align-items: center;
                -webkit-box-shadow: 0px 4px 14px 3px rgba(0,0,0,0.25);
                -moz-box-shadow: 0px 4px 14px 3px rgba(0,0,0,0.25);
                box-shadow: 0px 4px 14px 3px rgba(0,0,0,0.25);
            }

            img{
                height: 50px;
                margin-left: 20px;
            }
            h1{
                height: 60px;
                color: #f5f5f5;
                font-family: 'Segoe UI',Arial, Helvetica, sans-serif, Tahoma, Geneva, Verdana, sans-serif;
                margin: 50px 0 0 20px;
                padding: 0;
            }

            h3{
                margin: 0 0 50px 20px;
                color: #f5f5f5;
                font-family: 'Segoe UI', Arial, Helvetica, sans-serif,Tahoma, Geneva, Verdana, sans-serif;
            }

            a{
                text-decoration: none;
            }

            .boton{
                height: 20px;
                padding: 15px 25px 15px 25px;
                width: max-content;
                color: #f5f5f5;
                background-color: #1A54DC;
                font-family: 'Segoe UI', Arial, Helvetica, sans-serif,Tahoma, Geneva, Verdana, sans-serif;
                font-size: 20px;
                font-weight: bolder;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                margin: 0 0 50px 20px;
            }
        </style>
    </head>
    <body>
        <div class="cuerpo">
        <div class="navbar">
            <img src="https://firebasestorage.googleapis.com/v0/b/codex-7dfc9.appspot.com/o/OCFrameworkwhite.png?alt=media&token=069a4fd2-ca90-4eb7-b358-aea710a397a1"/>
        </div>

        <div >
            <h1>Restablecer Contraseña</h1>
            <h3>Haz click en el siguiente boton para Restablecer tu contraseña.</h3>
        </div>

        <a href="${link}">
            <div class="boton">
                Restablecer Contraseña
            </div>
        </a>

        <h3>En caso de que no te hayas registrado vos, ignora este email.</h3>
        </div>
    </body>
</html>`
}