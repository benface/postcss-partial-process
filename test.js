const postcss = require('postcss');
const partialProcess = require('./');
const prependSelector = require('postcss-prepend-selector');

function run(input, output, opts) {
    return postcss([
            partialProcess(opts),
        ])
        .process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

test('it compiles', () => {
    return run('a {}', 'a {}', {});
});

test('rules inside the comments are processed', () => {
    return run(`
        /* postcss-partial-process start */
        a {}
        b {}
        /* postcss-partial-process end */
    `, `
        #a a {}
        #a b {}
    `, {
        plugins: [
            prependSelector({ selector: '#a ' }),
        ],
    });
});

test('rules outside the comments are not processed', () => {
    return run(`
        body {}
        /* postcss-partial-process start */
        a {}
        /* postcss-partial-process end */
        b {}
        a {}
    `, `
        body {}
        #a a {}
        b {}
        a {}
    `, {
        plugins: [
            prependSelector({ selector: '#a ' }),
        ],
    });
});

test('start/end comments can be customized', () => {
    return run(`
        /* yo start */
        .test { hello: world; }
        /* yo stop */
        b {}
    `, `
        #a .test { hello: world; }
        b {}
    `, {
        startComment: 'yo start',
        endComment: 'yo stop',
        plugins: [
            prependSelector({ selector: '#a ' }),
        ],
    });
});

test('comments are not removed with removeComments: false', () => {
    return run(`
        /* postcss-partial-process start */
        a {}
        /* postcss-partial-process end */
    `, `
        /* postcss-partial-process start */
        #a a {}
        /* postcss-partial-process end */
    `, {
        removeComments: false,
        plugins: [
            prependSelector({ selector: '#a ' }),
        ],
    });
});

test('important comments are not removed by default', () => {
    return run(`
        /*! postcss-partial-process start */
        a {}
        /*! postcss-partial-process end */
    `, `
        /*! postcss-partial-process start */
        #a a {}
        /*! postcss-partial-process end */
    `, {
        plugins: [
            prependSelector({ selector: '#a ' }),
        ],
    });
});

test('important comments are removed with removeComments: true', () => {
    return run(`
        /*! postcss-partial-process start */
        a {}
        /*! postcss-partial-process end */
    `, `
        #a a {}
    `, {
        removeComments: true,
        plugins: [
            prependSelector({ selector: '#a ' }),
        ],
    });
});
