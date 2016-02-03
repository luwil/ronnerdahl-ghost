/*
*	MAIN JS FILE for Ascend Ghost Theme
*
*	If you want to edit, add or remove any functionality
*	feel free to contact the author marcos@aftertype.com
*
*	Require.js is used for performance optimization,
*	call the required scripts on context
*	and execute extra Services.
*/

requirejs.config({
	paths: {
		userConfig: 'config',
		velocity: '//cdn.jsdelivr.net/velocity/1.2.1/velocity.min',
		velocityUI: '//cdn.jsdelivr.net/velocity/1.2.1/velocity.ui.min',
		fitvids: '//cdn.jsdelivr.net/fitvids/1.1.0/jquery.fitvids',
		nanoscroller: '//cdn.jsdelivr.net/nanoscrollerjs/0.8.0/javascripts/jquery.nanoscroller.min',
		prettify: '//cdn.jsdelivr.net/prettify/0.1/prettify',
		adds: 'adds'
	}
});

requirejs(
[
	'userConfig',
	'velocity',
	'fitvids',
	'nanoscroller'
],
function (_uconfig){

// ===============================
// Start User Config.
// ===============================
if (_uconfig._userCustomScripts.length > 0) {
	require(_uconfig._userCustomScripts, function(){});
};

// ===============================
// Define recurrernt vars.
// ===============================
var _window = $(window),
	_body = $('body'),
	_cTemplate = '',
	_menuBar = $('#main-head-asnd'),
	_mainSection = $('#main-asnd');

// ===============================
// Get current template & menu indicator
// ===============================
if (_body.hasClass('home-template')) {
	_cTemplate = 'home';
};

if (_body.hasClass('post-template')) {
	_cTemplate = 'post-page';
};

if (_body.hasClass('archive-template')) {
	_cTemplate = 'archive';
};

if (_body.hasClass('tag-template')) {
	_cTemplate = 'tag';
};

if (_body.hasClass('author-template')) {
	_cTemplate = 'author';
};


// ===============================
// DynaWidgets
// ===============================
if (_uconfig.widgetsConfig._active) {
require(['adds/dynawidgets'], function (dynarender){
	dynarender( _uconfig.widgetsConfig );
});
};

// ===============================
// SocialProfiles
// ===============================
if (_uconfig.socialProfiles._active) {
	$.each(_uconfig.socialProfiles.items, function (key, profile){
		var sLink = '<a href="'+profile.url+'" class="fa fa-'+profile.site+'"></a>';
		$('#dynasocial-links').append(sLink);
	});
};

// ===============================
// Comments System
// ===============================
if (_uconfig.commentsSystem._active) {
	require(['adds/dynacomments'], function (dynacomments){	
		if (_uconfig.commentsSystem.type == 'disqus') {
			dynacomments.disqus(_uconfig.commentsSystem.idOrShortname);
		};

		if (_uconfig.commentsSystem.type == 'livefyre') {
			require(['livefyre'], function (){
				dynacomments.livefyre(_uconfig.commentsSystem.idOrShortname);		
			});
		};

		if (_uconfig.commentsSystem.type == 'facebook') {
			dynacomments.facebook(_uconfig.commentsSystem.appID);
		};
	});
} else {
	$('#dynacomments').remove();
};

// ===============================
// Menu
// ===============================
$('#mobile-menu-ignite-asnd').click(function (ev){
	_menuBar.toggleClass('active');
		
	if (_menuBar.hasClass('active')) {
		_menuBar.velocity({'margin-left': 0}, {duration: 300});
		_mainSection.velocity({'margin-left': 206}, {duration: 300});
		return;
	};
	_menuBar.velocity({'margin-left': -148}, {duration: 300});
	_mainSection.velocity({'margin-left': 42}, {duration: 300});
});

_mainSection.click(function (){
	if (_menuBar.hasClass('active')) {
		_menuBar.velocity({'margin-left': -148}, {duration: 300});
		_mainSection.velocity({'margin-left': 42}, {duration: 300});
		_menuBar.toggleClass('active');
	};
});

$(".nano").nanoScroller();

// ===============================
// Styling Helpers
// ===============================
if (_cTemplate = 'post-page') {

	$('#post-content-asnd').fitVids();
	
	require(['prettify'], function(){
		$('pre').addClass('prettyprint');
		prettyPrint();
	});
};

});