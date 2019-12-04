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

test('Insert a record', async () => {
    const result = await db.insert(testData.customer1);
    expect(result.email).toBe(testData.customer1.email);
});
