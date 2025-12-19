import express from 'express';
import Routes from './routes/index.js';
import database from './config/database.js';
import 'dotenv/config'
import cors from 'cors';

const app = express();
// app.use(cors());
app.use(express.json());

app.use(Routes);

database.authenticate()
    .then(()=>{
        console.log(`
                ╔════════════════════════════════════════════════╗
                ║  \x1b[32mBANCO DE DADOS CONECTADO\x1b[0m                      ║
                ║                                                ║
                ║  Provider: ${process.env.DB_DIALECT}                               ║
                ║  ${new Date().toLocaleString().padEnd(38)}        ║
                ╚════════════════════════════════════════════════╝
        `);
})
.catch(error=>{
    console.error(`
        ╔════════════════════════════════════════════════╗
        ║ ❌ ERRO AO CONECTAR NO BANCO                   ║
        ║                                                ║
        ║ 📦 Provider: ${process.env.DB_DIALECT}                              ║
        ║ 🧨 ${String(error).slice(0, 38).padEnd(38)}║
        ╚════════════════════════════════════════════════╝
        `);
});

export default app;