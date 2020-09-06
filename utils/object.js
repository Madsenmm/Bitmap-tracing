module.exports = function swapColors( obj ) {
	return {
		'color': obj['background'],
		'background': obj['color']
	}
}