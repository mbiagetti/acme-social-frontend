// Service that encapsulate HTTP and pagination logic
acmeSocialApp.factory('AcmeSocialPaginator', function($http) {
    var AcmeSocialPaginator = function(url, elemNameAttribute) {
        this.items = [];
        this.busy = false;
        this.end = false;

        this.next = url;
        this.elemNameAttribute = elemNameAttribute;
    };

    AcmeSocialPaginator.prototype.isScrollDisabled = function(){
        return (this.busy || this.end);
    };

    AcmeSocialPaginator.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        var url = this.next;
        $http.get(url).error(function(data, status, headers, config) {
        }).success(function(data) {
            var items = data[this.elemNameAttribute];
            for (var i = 0; i < items.length; i++) {
                this.items.push(items[i]);
            }
            // hasNext?
            var a = data.pagination.links.filter(function (el) {
                return el.rel == 'next';
            });
            if ( a[0] ) // true
            {
                this.next= a[0].href;
            }
            else    // false
            {
                this.end = true;
                this.busy = false;
            }

            this.busy = false;
        }.bind(this));
    };
    return AcmeSocialPaginator;
});

// Service that encapsulate HTML Page stage
acmeSocialApp.factory('Page', function(){
    var title = 'acme social';
    var query = '';
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; },
        setQuery: function(newQuery) {query = newQuery; },
        getQuery: function() { return query; }
    };
});
