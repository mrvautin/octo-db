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

test('[Success] Remove single record', async () => {
    const result = await db.insert(testData.customer1);

    const remove = await db.remove({
        uid: result.uid
    });

    expect(remove[0].uid).toBe(result.uid);
});
