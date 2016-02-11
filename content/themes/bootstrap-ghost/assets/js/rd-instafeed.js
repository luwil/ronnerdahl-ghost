/**
 * Created by Svinto on 2016-02-03.
 */
/*
 Play around with styling for the images...
 http://codepen.io/stevenschobert/pen/vJloI
 */


var feed = new Instafeed({
    sortBy: 'most-recent',
    target: 'instafeed',
    get: 'user',
    userId: '2734436307',
    template: '<div class="polaroid-container"><div class="polaroid"><a href="{{link}}"><img src="{{image}}" /><span>{{caption}}</span></a><div class="tape"></div></div></div>',

    clientId: 'see doc',
    accessToken: 'see doc'
    after: function() {
        // Set z-index for polaroids, latest image should be on top and the last at the bottom
        var polaroids = $('#instafeed .polaroid-container');
        $.each(polaroids, function( index, object ) {
            var zindex = polaroids.size()-index;
            $(object).css('z-index', zindex);
        });
    },
    error: function() {
        $('#instafeed').html('');
    }
});

feed.run();
