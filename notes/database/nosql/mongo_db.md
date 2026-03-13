# MongoDB

- Works on the concept of collection and document.
- Database is a physical container for collections.
- Each database gets it's own set of files.

- Collection is a group of MondoDB documents. It is the equivalent of an RDBMS table.
- A document is a set of **key-value** pairs.

## RDBMS vs MongoDB

| RDBMS         | MongoDB            |
| ------------- | ------------------ |
| Database      | Database           |
| Table         | Collection         |
| Row           | Document           |
| Column        | Field              |
| Table Join    | Embedded Documents |
| Primary Key   | Primary Key        |
| MySQLd/Oracle | mongod             |
| mysql/sqlplus | mongo              |

## Advantages of MongoDB

- Schema-less.
- Scalability.
- Cheaper.
- High performance.

## Disadvantages of MongoDB

- High memory usage.
- Less flexible with Querying.
- No support of transactions.

## Inserting data to MongoDB Collection

```mongo
db.inventory.insertMany([
    { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "B" },
    { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
    { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D"},
    { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A"}
])
```

## SELECT data from MongoDB

### Get all the data

```mongo
db.inventory.find({})
```

## Where Clause

### Equality

> Let's get the items whose status is B

```mongo
db.inventory.find({status:"B"})
```

> Let's get the items that are notebook

```mongo
db.inventory.find({item:"notebook"})
```

> Let's get the items whose status are A and D

```mongo
db.inventory.find({
    status: {
        $in: ["A","D"]
    }
})
```

### Less Than and Greater Than

- less than - `$lt`
- less than or equal - `$lte`
- greater than - `$gt`
- greater than or equal - `$gte`
- not equal - `$ne`
- not equal in - `$nin`

> Let's get the items whose quantity is less than 60

```mongo
db.inventory.find({
    qty:{
        $lt:60
    }
})
```

> Let's get the items whose quantity is greater than 60

```mongo
db.inventory.find({
    qty:{
        $gt:60
    }
})
```

> Let's get the items which is not an paper or planner

```mongo
db.inventory.find({
  item: {
    $nin: [
      "paper",
      "planner"
    ]
  }
})
```

## AND Condition

> Let's get them items whose status is A and quantity less than 30

```mongo
db.inventory.find({
  status: "A",
  qty: {
    $lt: 30
  }
})
```

## OR Condition

- OR Operator - `$or`

> Let's get the items whose status is D or quantity less than 30

```mongo
db.inventory.find({
  $or: [
    {
      status: "D"
    },
    {
      qty: {
        $lt: 30
      }
    }
  ]
})
```

### Using AND and OR

> Let's get the items whose status equals "A"and either qty is less than ($lt) 30 or item starts with the character p:

```mongo
db.inventory.find({
  status: "A",
  $or: [
    {
      qty: {
        $lt: 30
      }
    },
    {
      item:/^p/
    }
  ]
})
```

## Update Document

### Update One

- This will update the first document where item equals paper

```mongo
db.inventory.updateOne(
  { item: "paper" },
  {
    $set: {
      "size.uom": "cm",
      "status": "P"
    },
    $currentDate: {
      lastModified: true
    }
  }
)
```

### Update Many

- This will update all documents where qty is less than 50

```mongo
db.inventory.updateMany(
    {qty:{
        $lt: 50
    }},
    {
        $set: {
            "size.uom":"in",
            "status":"P"
        },
        $currentDate: {
            lastModified: true
        }
    }
)
```

## Replace One

```mongo
db.inventory.replaceOne(
  { item: "notebook" },
  {
    item: "sketchbook",
    qty: 10,
    status: "A",
    notes: "New arrival"
  }
);
```

Result:

```json
[
  {
    "item": "journal",
    "qty": 25,
    "size": { "h": 14, "w": 21, "uom": "cm" },
    "status": "A"
  },
  {
    // The "notebook" is GONE. This is all that remains:
    "item": "sketchbook",
    "qty": 10,
    "status": "A",
    "notes": "New arrival"
    // NOTICE: The 'size' object was deleted because it wasn't in the replacement!
  }
]
```

## Delete

### Delete All

```mongo
db.inventory.deleteMany({})
```

### Delete with Conditions

- Can apply the conditions in a same way of a `find()` query.

> Let's delete items whose status is A

```mongo
db.inventory.deleteMany({
    status:"A"
})
```

- This will delete **all the items** whose status is A.
- But in order to delete the first occurrence of status is A,

```mongo
db.inventory.deleteOne({
    status:"A"
})
```
