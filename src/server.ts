import 'dotenv/config'
import app from "./app.js";

app.listen(Number(process.env.SERVER_PORT) ?? 3333, () => {
    console.log(`
    \x1b[32m──────────────────────────────────────────────────
    ° Servidor iniciado com sucesso!
    ° URL: http://localhost:${process.env.SERVER_PORT ?? 3333}
    ° Ambiente: ${process.env.NODE_ENV ?? "development"}
    ° ${new Date().toLocaleString()}
    ──────────────────────────────────────────────────\x1b[0m
    `);
});