const db = require('../lib/db');
const testData = require('./data');

beforeAll(() => {
    db.setup({
        file: './test/test-db.json'
    });
});

test('Flush the db', async () => {
    const result = await db.insert(testData.customer1);
    expect(result.email).toBe(testData.customer1.email);

    const flushedDb = await db.flushDb();
    expect(flushedDb.length).toBe(0);
});