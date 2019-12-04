const db = require('../lib/db');

test('Setup with missing required args', async () => {
    try{
        db.setup({});
    }catch(err){
        expect(err.message).toBe('Missing "file" argument');
    }
});

test('Try insert when not setup', async () => {
    try{
        await db.insert({ test: 'test'})
    }
    catch(err){
        expect(err).toBe('Not setup. Please call setup first.');
    }
});
