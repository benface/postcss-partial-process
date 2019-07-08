const postcss = require('postcss');

module.exports = postcss.plugin('postcss-partial-process', ({
    startComment = 'postcss-partial-process start',
    endComment = 'postcss-partial-process end',
    removeComments = 'auto',
    plugins = []
} = {}) => {
    return root => {
        let processing = false;
        let partialRoot = null;
        const promises = [];

        const end = (callback) => {
            promises.push(
                postcss(plugins).process(partialRoot, {
                    from: undefined
                }).then(callback)
            );
        };

        root.each(node => {
            let starting = false;
            let ending = false;
            let removeComment = false;

            if (node.type === 'comment') {
                let comment = node.toString();
                let matches = comment.match(/\/\*!?\s*(.*?)\s*\*\//, '');
                matches = matches || [];
                if (matches.length > 1) {
                    starting = !processing && matches[1] === startComment;
                    ending = processing && matches[1] === endComment;
                    removeComment = removeComments === true || (removeComments === 'auto' && !comment.startsWith('/*!'));
                }
            }

            if (ending) {
                end(result => {
                    node.before(result.root);
                    if (removeComment) {
                        node.remove();
                    }
                });
                processing = false;
            }

            if (processing) {
                partialRoot.append(node);
            }

            if (starting) {
                partialRoot = postcss.root();
                if (removeComment) {
                    node.remove();
                }
                processing = true;
            }
        });

        if (processing) {
            end(result => {
                root.append(result.root);
            });
        }

        return Promise.all(promises);
    };
});
