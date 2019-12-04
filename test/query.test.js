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

test('Query a record by uid', async () => {
    const result = await db.insert(testData.customer1);

    const query = await db.query({
        uid: result.uid
    });

    expect(query[0].uid).toBe(result.uid);
});

test('Query unique records', async () => {
    await db.insert(testData.customer1);
    await db.insert(testData.customer2);

    const query = await db.query({
        email: testData.customer2.email
    });

    expect(query.length).toBe(1);
    expect(query[0].email).toBe(testData.customer2.email);
});
