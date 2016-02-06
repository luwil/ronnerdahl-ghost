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
    template: '<div class="polaroid"><a href="{{link}}"><img src="{{image}}" />{{caption}}</a></div>',
    clientId: 'see doc',
    accessToken: 'see doc'
});

feed.run();

