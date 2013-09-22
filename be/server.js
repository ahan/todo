var express = require('express'),
    task = require('./routes/tasks');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/tasks', task.findAll);
app.get('/tasks/:id', task.findById);
app.post('/tasks', task.addTask);
app.put('/tasks/:id', task.updateTask);
app.delete('/tasks/:id', task.deleteTask);

app.listen(4000);
console.log('Listening on port 4000...');
