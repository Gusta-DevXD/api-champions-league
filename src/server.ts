import express from 'express';
import createApp from './app';
import router from './routes/routes';

const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});