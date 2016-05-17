(function($) {

    function ViewModel() {
        var self = this;
        self.title = ko.observable();
        self.messages = ko.observableArray([]);
    }

    var uid = getCookie("uid");
    // generate unique identifier
    if (!uid) {
        uid = Math.ceil(Math.random() * 100000);
        // set a cookie for 7 days
        setCookie("uid", uid, 7);
    }

    var vm = new ViewModel();
    $.extend($, {
        vm: vm,
        uid: uid
    });

    $(function() {
        FastClick.attach(document.body);
        ko.applyBindings(vm);
    });

    // register the service worker if available
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function(reg) {
            console.log('Successfully registered service worker', reg);
        }).catch(function(err) {
            console.log('Error whilst registering service worker', err);
        });
    }

})(jQuery);
