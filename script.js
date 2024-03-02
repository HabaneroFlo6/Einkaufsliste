const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/getShoppingList', (req, res) => {
    fs.readFile('shoppingList.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.post('/saveShoppingList', (req, res) => {
    const shoppingList = req.body.shoppingList;
    fs.writeFile('shoppingList.json', JSON.stringify(shoppingList), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Shopping list saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
