require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utils/db');
const cors = require('cors');
const authRouter = require('./router/auth-router');
const authVideoRouter = require('./router/authVideo-router');
const authCommentRouter = require('./router/authComment-router');

const corsOption = {
    origin: "https://streamify-apk.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}

app.use(cors(corsOption));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/video', authVideoRouter);
app.use('/api/comment', authCommentRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
})
