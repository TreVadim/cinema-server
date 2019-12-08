module.exports = {
	asyncMiddleware: fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next),
	to: promise => promise.then(data => [null, data]).catch(err => [err])
};
