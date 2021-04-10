const http = require('http');
const path = require('path');
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const listRouter = require('./routers/list');
const projectRouter = require('./routers/project');
const teamRouter = require('./routers/team');
const calendarRouter = require('./routers/calendar');
const messageRouter = require('./routers/message');
const commentRouter = require('./routers/comment');

const app = express();
const server = http.createServer(app);
(require('./socket/socketio.js'))(server);

const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public/');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(listRouter);
app.use(projectRouter);
app.use(teamRouter);
app.use(calendarRouter);
app.use(messageRouter);
app.use(commentRouter);
app.use(express.static(publicPath));


server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});