/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * https://github.com/facebook/flux/blob/master/LICENSE
 */

var Utils = require('../util/Utils');

var _prefix = 'ID_';

function Dispatcher() {
	this._lastID = 1;
	this._callbacks = {};
	this._isPending = {};
	this._isHandled = {};
	this._isDispatching = false;
	this._pendingPayload = null;
}


/**
 * Registers a callback to be invoked with every dispatched payload. Returns
 * a token that can be used with `waitFor()`.
 *
 * @param {function} callback
 * @return {string}
 */
Dispatcher.prototype.register = function register(callback) {
	var id = _prefix + this._lastID++;
	this._callbacks[id] = callback;
	return id;
};


/**
 * Removes a callback based on its token.
 *
 * @param {string} id
 */
Dispatcher.prototype.unregister = function unregister(id) {
	Utils.checkNull(
		this._callbacks[id],
		'Dispatcher.unregister(...): %s does not map to a registered callback.',
		id
	);
	delete this._callbacks[id];
}

/**
 * Waits for the callbacks specified to be invoked before continuing execution
 * of the current callback. This method should only be used by a callback in
 * response to a dispatched payload.
 *
 * @param {array<string>} ids
 */
Dispatcher.prototype.waitFor = function waitFor(ids) {
	Utils.checkNull(
		this._isDispatching,
		'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	);
	for (var ii = 0; ii < ids.length; ii++) {
		var id = ids[ii];
		if (this._isPending[id]) {
			Utils.checkNull(
				this._isHandled[id],
				'Dispatcher.waitFor(...): Circular dependency detected while ' +
				'waiting for %s.',
				id
			);
			continue;
		}
		Utils.checkNull(
			this._callbacks[id],
			'Dispatcher.waitFor(...): %s does not map to a registered callback.',
			id
		);
		this._invokeCallback(id);
	}
};

/**
 * Dispatches a payload to all registered callbacks.
 *
 * @param {object} payload
 */
Dispatcher.prototype.dispatch = function dispatch(payload) {
	Utils.checkNull(!this._isDispatching,
		'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	);
	this._startDispatching(payload);
	try {
		for (var id in this._callbacks) {
			if (this._isPending[id]) {
				continue;
			}
			this._invokeCallback(id);
		}
	} finally {
		this._stopDispatching();
	}
};

/**
 * Is this Dispatcher currently dispatching.
 *
 * @return {boolean}
 */
Dispatcher.prototype.isDispatching = function isDispatching() {
	return this._isDispatching;
};

/**
 * Call the callback stored with the given id. Also do some internal
 * bookkeeping.
 *
 * @param {string} id
 * @internal
 */
Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	this._isPending[id] = true;
	this._callbacks[id](this._pendingPayload);
	this._isHandled[id] = true;
};

/**
 * Set up bookkeeping needed when dispatching.
 *
 * @param {object} payload
 * @internalb
 */
Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	for (var id in this._callbacks) {
		this._isPending[id] = false;
		this._isHandled[id] = false;
	}
	this._pendingPayload = payload;
	this._isDispatching = true;
};

/**
 * Clear bookkeeping used for dispatching.
 *
 * @internal
 */
Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	this._pendingPayload = null;
	this._isDispatching = false;
};


module.exports = Dispatcher;
