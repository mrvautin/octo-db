import{ serial as test } from 'ava';
const db = require('../lib/db');

test('adds 1 + 2 to equal 3', () => {
    expect(1).toBe(3);
});

test('adds 1 + 2 to equal 3', () => {
    expect(3).toBe(3);
});

// test('[Success] Remove a record', async t => {
//     const customer = {
//         email: 'sarah.jones@test.com',
//         firstName: 'Sarah',
//         lastName: 'Jones',
//         address1: '1 Sydney Street',
//         address2: '',
//         country: 'Australia',
//         state: 'NSW',
//         postcode: '2000',
//         phone: '0412345678'
//     };

//     const res = await db.insert(customer);
//     console.log('res', res);

//     const remove = await db.remove({
//         uid: res.uid
//     });

//     console.log('remove', remove);
// });
