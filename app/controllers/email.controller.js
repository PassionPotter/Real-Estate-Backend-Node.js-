const sendEmail = require('./auth.controller').sendEmail;

exports.sendNewsletter = (req, res) => {
    let users = req.body.emails;
    let subject = req.body.subject;
    let content = req.body.content;
    users.forEach(user => {
        sendEmail(user, subject, content);
    });
    res.status(200).send({
        message: `Sent Newsletter to ${users.length} Users successfully`
    });
}