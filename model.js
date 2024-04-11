const mongoose = require("mongoose");
const {Schema} = mongoose;

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://morningdhansen");

const expenseSchema = Schema({
    description: {
        type: String,
        required: [true, "Must have a description."]
    },
    amount: {
        type: Number,
        required: [true, "Must have a amount."]
    },
    category: {
        type: String,
        required: [true, "Must have a category."]
    }
},
{ timestamps: true }
);

const Expenses = mongoose.model("expenses", expenseSchema);


module.exports = {
    Expenses : Expenses
}