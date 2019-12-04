# octo-db

`octo-db` is a simple flat file JSON DB to be used for prototyping and testing. Super easy to setup and use.

### Setup

``` javascript
const db = require('octo-db');
db.setup({
    file: 'path/to/my/file-db.json'
});
```

### Insert

``` javascript
const db = require('octo-db');
const result = await db.insert({
    email: 'peter.smith@test.com',
    firstName: 'Peter',
    lastName: 'Smith',
    address1: '1 Adelaide Street',
    address2: '',
    country: 'Australia',
    state: 'VIC',
    postcode: '3000',
    phone: '0412345678'
});
console.log(result);
```

### Query

``` javascript
const db = require('octo-db');
const query = await db.query({
    email: 'peter.smith@test.com'
});
console.log(query);
```

### Remove

``` javascript
const db = require('octo-db');
const remove = await db.remove({
    email: 'peter.smith@test.com'
});
console.log(remove);
```

### Flush DB

This removes all records from the DB

``` javascript
const db = require('octo-db');
await db.flushDb();
```

### Update

Update takes two args. First the matching object then the keys/value to update. Eg: This updates all records which have an email of `sarah.smith@test.com` to `sarah.jones@gmail.com` and returns the result.

``` javascript
const db = require('octo-db');
const update = await db.update({
    email: 'sarah.smith@test.com'
},{
    email: 'sarah.jones@gmail.com'
});

console.log(update);
```