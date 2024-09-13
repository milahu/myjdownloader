'use strict';

var ServiceWorkerUtils = function () {
    var reg;
    var sub;
    var isSubscribed = false;
    var isSubScribedOnServer = false;
};

ServiceWorkerUtils.register = function (done, failed) {
    var serviceWorker = this;
    if ('serviceWorker' in navigator) {
        console.log('Service Worker is supported');
        navigator.serviceWorker.register('js/serviceworker.js').then(function (serviceWorkerRegistration) {
            serviceWorker.reg = serviceWorkerRegistration;
            if (done && typeof done === 'function') {
                done(serviceWorkerRegistration);
            }
            return navigator.serviceWorker.ready;
        }).catch(function (error) {
            if (failed && typeof failed === 'function') {
                failed(error);
            }
        });
    } else {
        if (failed && typeof failed === 'function') {
            failed("Browser does not support service workers");
        }
    }
};

ServiceWorkerUtils.subscribe = function (onSubscribtion) {
    var serviceWorker = this;
    serviceWorker.reg.pushManager.subscribe({userVisibleOnly: true}).
        then(function (pushSubscription) {
            serviceWorker.sub = pushSubscription;
            console.log('Subscribed! Endpoint:', serviceWorker.sub.endpoint);
            var subIdRegex = /https:\/\/android.googleapis.com\/gcm\/send\/(.*)+/g;
            var subscriptionId = subIdRegex.exec(serviceWorker.sub.endpoint);
            serviceWorker.isSubscribed = true;
            if (onSubscribtion && typeof onSubscribtion === 'function') {
                onSubscribtion(subscriptionId[1]);
            }
        });
};

ServiceWorkerUtils.unsubscribe = function () {
    var serviceWorker = this;
    serviceWorker.sub.unsubscribe().then(function (event) {
        console.log('Unsubscribed!', event);
        serviceWorker.isSubscribed = false;
    }).catch(function (error) {
        console.log('Error unsubscribing', error);
    });
};

ServiceWorkerUtils.listenForMessages = function (onMessage) {
    navigator.serviceWorker.addEventListener('message', function (event) {
        if (onMessage && typeof onMessage === 'function') {
            onMessage(event.data);
        }
    });
};