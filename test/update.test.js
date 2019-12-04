const db = require('../lib/db');
const testData = require('./data');

beforeAll(() => {
    db.setup({
        file: './test/test-db.json'
    });
});

beforeEach(async() => {
    await db.flushDb();
});

test('Update single record', async () => {
    const result = await db.insert(testData.customer1);

    const update = await db.update({
        uid: result.uid
    },{
        email: 'sarah.jones@gmail.com'
    });

    expect(update[0].email).toBe('sarah.jones@gmail.com');
});

test('Update multiple records', async () => {
    await db.insert(testData.customer1);
    await db.insert(testData.customer2);

    const update = await db.update({
        country: 'Australia'
    },{
        country: 'Scotland'
    });

    expect(update.length).toBe(2);
    expect(update[0].country).toBe('Scotland');
});
