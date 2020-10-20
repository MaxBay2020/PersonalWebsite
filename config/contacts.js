/*File Name: contact.js
Created by: Cong Wang
Student Number: #301098547
Created on: 10.19.2020*/

const fs = require('fs');
const dbPath = './db.json';

//get all contacts
exports.find=function (callback) {
    //read file
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if(err){
            return callback(err);
        }
        callback(null, JSON.parse(data).contacts);
    })
}

//get one contact based on id
exports.findOneById = function(contactId, callback){
    //read file
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if(err){
            return callback(err);
        }

        var contacts = JSON.parse(data).contacts;
        var con = contacts.find(function (item) {
            return item.id===parseInt(contactId);
        })

        callback(null, con);
    })
}


//add new contact
exports.add=function (contact, callback) {
    //read file
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if(err){
            return callback(err);
        }
        var contacts =  JSON.parse(data).contacts;

        contact.id=contacts[contacts.length-1].id+1;

        //add new contact
        contacts.push(contact);

        //object to string
        var newContacts = JSON.stringify({
            contacts: contacts
        });

        //write new string to file
        fs.writeFile(dbPath, newContacts, function (err) {
            if(err){
                return callback(err);
            }
            callback(null);
        });
    })
}

//modify contact
exports.updateById = function (contact, callback) {
    //read file
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if(err){
            return callback(err);
        }
        var contacts =  JSON.parse(data).contacts;

        //turn string to int
        contact.id=parseInt(contact.id);

        //find contact
        var con = contacts.find(function (item) {
            return item.id===contact.id;
        })

        for (let key in con) {
            con[key]=contact[key];
        }

        //object to string
        var newContacts = JSON.stringify({
            contacts: contacts
        });

        //write new string to file
        fs.writeFile(dbPath, newContacts, function (err) {
            if(err){
                return callback(err);
            }
            callback(null);
        });

    })
}

//delete contact
exports.deleteById = function (contactId, callback) {
    fs.readFile(dbPath,'utf-8', function (err, data) {
        if(err){
            return callback(err);
        }

        var contacts = JSON.parse(data).contacts;

        var con = contacts.find(function (item) {
            return item===parseInt(contactId);
        })

        contacts.pop(con);

        //object to string
        var newContacts = JSON.stringify({
            contacts: contacts
        });

        //write new string to file
        fs.writeFile(dbPath, newContacts, function (err) {
            if(err){
                return callback(err);
            }
            callback(null);
        });

    })
}