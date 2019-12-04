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

test('Remove single record', async () => {
    const result = await db.insert(testData.customer1);

    const remove = await db.remove({
        uid: result.uid
    });

    expect(remove[0].uid).toBe(result.uid);
});

test('Remove multiple records', async () => {
    await db.insert(testData.customer1);
    await db.insert(testData.customer2);
    await db.insert(testData.customer3);

    const remove = await db.remove({
        country: 'Australia'
    });

    const query = await db.query({});

    expect(remove.length).toBe(2);
    expect(remove[0].country).toBe('Australia');
    expect(query[0].country).not.toBe('Australia');
});
