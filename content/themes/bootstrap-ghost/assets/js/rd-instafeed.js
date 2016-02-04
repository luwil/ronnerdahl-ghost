/**
 * Created by Svinto on 2016-02-03.
 */

var feed = new Instafeed({
    get: 'tagged',
    tagName: 'awesome',
    clientId: 'YOUR_CLIENT_ID'
});
feed.run();

