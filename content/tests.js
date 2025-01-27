const tests = [];
const runTests = function() {
    return tests.map(func => func());
}

function test(title, func) {
    tests.push(function() {
        return {title, ...func()}
    })
}

function ok(message) {
    return {status: 'OK', message};
}

function fail(message) {
    return {status: 'FAIL', message}
}

test('Has Meta Description', () => {
    const elem = document.querySelector('meta[name="description"]')
    if(!elem) {
        return fail('Meta description does not exist.')
    } else if((elem?.content || "").length == 0 ) {
        return fail('Meta description has no content.')
    }
    return ok('PASSED')
})
