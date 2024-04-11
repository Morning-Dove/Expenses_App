# My Project
A small expense tracker using mongodb.
Project completed for CodeSchool 2023.

**Expense Tracker**

Attributes:

* description (string)
* amount (float)
* category (string)

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve expenses collection   | GET    | /expenses
Retrieve expenses member       | GET    | /expenses/*\<expid\>*
Create expenses member         | POST   | /expenses
Update expenses member         | PUT    | /expenses/*\<expid\>*
Delete expenses member         | DELETE | /expenses/*\<expid\>*