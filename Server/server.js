const express = require('express');
const db = require('mongoose');
const { personApi } = require('./Controllers/Personal');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { lessonApi } = require('./Controllers/Lesson');
const { workApi } = require('./Controllers/Work');
const { specialLinksApi } = require('./Controllers/SpecialLinks');
const morgan = require('morgan');
const { projectApi } = require('./Controllers/Project');
const { authApi } = require('./Auth/authentication');
const { announcemetApi } = require('./Controllers/Announcement');

try {
    db.connect(process.env.ALI_ORAL_DB_URI).then(()=>{
        console.log("DB Connection established!")
    })
}catch(err) {
    console.log(err)
}

/** Middlewares */
app.use(morgan('common'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

const port = process.env.PORT || 4000

app.use('/api/person', personApi)
app.use('/api/lesson', lessonApi)
app.use('/api/works', workApi)
app.use('/api/special-links', specialLinksApi)
app.use('/api/projects', projectApi)
app.use('/api/auth', authApi)
app.use('/api/announcement', announcemetApi)

app.listen(port, () => {
    console.log("listening on http://localhost:" + port)
})

module.exports = {app, db}