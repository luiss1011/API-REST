const CONFIG =  require('./app/config/configuracion')
const app = require('./app/app')

app.listen(CONFIG.PORT, ()=>{
    console.log(`Aplicación corriendo en puerto ${CONFIG.PORT}`);
})
