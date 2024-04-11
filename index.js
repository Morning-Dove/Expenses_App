const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const model = require("./model.js");

mongoose.connect("mongodb+srv://morningdhansen");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

function expenseValidator(expense){
    var errors = [];
    if (!expense.description){
        errors.push("expense must have a desription.");
    }
    if (!expense.amount){
        errors.push("expense must have an amount.");
    }
    if (!expense.category){
        errors.push("expense must have category");
    }
    return errors
}

app.get("/expenses", function(req, res) {
    model.Expenses.find().then(expense => {
        res.json(expense);
    });
});

app.get("/expenses/:expenseId"), function(req, res){
    model.Expenses.findOne({"_id": req.params.expenseId}).then(expense => {
        if (expense) {
            res.json(expense);
        }else{
            res.status(404).send("Expense not found.");
        }
    }).catch(() => {
        console.log("Bad request (GET by ID).");
        res.status(422).send("Expense not found.");

    })
};

app.post("/expenses", function(req, res){
    const newExpense = new model.Expenses({
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category
    });
    console.log(newExpense);

    var errors = expenseValidator(newExpense);

    if (errors.length == 0){
        newExpense.save().then(function(){
            res.status(201).send(newExpense);
        }).catch(function(errors){
            console.log(errors);
            res.status(400).send("Failed to save Expense.");
        })
    }else{
        res.status(422).send(errors)
    }
});

app.delete("/expenses/:expenseId", function(req, res){
    var expenseId = req.params.expenseId;
    model.Expenses.findOne({"_id":expenseId}).then(expense => {
        if (expense){
            model.Expenses.deleteOne({"_id":expenseId}).then(result => {
                console.log(result.deletedCount);
                res.status(204).send("Expense Deleted");
            })
        }else{
            res.status(404).send("Expense not found")
        }
    }).catch(errors => {
        console.log(errors);
        res.status(400).send("Expense not found/error deleting")
    });
});

app.put("/expenses/:expenseId", function(req, res){
    const updatedExpense = {
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category
    }
    console.log(updatedExpense);

    model.Expenses.findByIdAndUpdate({"_id": req.params.expenseId}, updatedExpense,{"new":true}).then(expense => {
        console.log(expense);
        if (expense){
            res.status(204).send("Expense updated.");
        }else{
            res.status(404).send("Expense not found.");
        }
    }).catch(() => {
        res.status(422).send("Unable to update.");
    });
});


app.listen(port, function() {
    console.log("Server is running on port ", port);
});