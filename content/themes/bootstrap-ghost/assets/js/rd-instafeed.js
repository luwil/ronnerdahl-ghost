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
    template: '<a href="{{link}}"><img src="{{image}}" /></a>"{{caption}}"',
    clientId: 'see doc',
    accessToken: 'see doc',
});

feed.run();

