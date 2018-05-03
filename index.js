var postcss = require('postcss');

module.exports = postcss.plugin('postcss-partial-process', ({
    startComment = 'start postcss-partial-process',
    endComment = 'end postcss-partial-process',
    removeComments = false,
    plugins = []
} = {}) => {
    return root => {
        let processing = false;
        let partialRoot = null;
        let promises = [];

        let end = (callback) => {
            promises.push(
                postcss(plugins).process(partialRoot, {
                    from: undefined
                }).then(callback)
            );
        };

        root.each(node => {
            let starting = false;
            let ending = false;

            if (node.type === 'comment') {
                let matches = node.toString().match(/\/\*\s*(.*?)\s*\*\//, '');
                matches = matches || [];
                if (matches.length > 1) {
                    starting = !processing && matches[1] === startComment;
                    ending = processing && matches[1] === endComment;
                }
            }

            if (ending) {
                end(result => {
                    node.before(result.root);
                    if (removeComments) {
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
                if (removeComments) {
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
