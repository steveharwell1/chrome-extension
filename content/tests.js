const tests = [];
const runTests = async function() {
    return Promise.all(tests.map(func => func()));
}

function test(title, func) {
    tests.push(async function() {
        const result = await func();
        if(!result) {
            return {title, ...fail('Test exited without declaring pass or fail')}
        }
        return {title, ...result}
    })
}

function ok(message) {
    return {status: 'OK', message};
}

function fail(message) {
    return {status: 'FAIL', message}
}

test('Has Meta Description', async () => {
    const elem = document.querySelector('meta[name="description"]')
    if(!elem) {
        return fail('Meta description does not exist.')
    } else if((elem?.content || "").length == 0 ) {
        return fail('Meta description has no content.')
    }
    return ok('PASSED')
})
