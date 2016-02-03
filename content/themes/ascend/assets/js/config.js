/* 
*	ASCEND CONFIG Settings
*	
*	Read the documentation that comes with the theme
*	for a better understanding of the features you
*	can manage with this file. 
*
*	Including:
*	- External scripts 
*	- Social profiles 
*	- Comments System 
*	- Widgets 
*/

define([], function(){

	var _userconfig = {
		_userCustomScripts: [],
		socialProfiles: {
			_active: true,
			items: [
				{
					site: 'twitter',
					url: '//twitter.com/tryghost'
				}
			]
		},
		commentsSystem: {
			_active: false,			
			type: '', // Options: 'disqus', 'livefyre', 'facebook'
			idOrShortname: '', // Disqus Shortname OR Livefyre ID
			appID: '' // For facebook comments only
		},
		widgetsConfig: {
			_active: false,
			_areas: [
				{
					name: 'footer',
					spots: [1,2,3]
				}
			],
			_widgets: [
				{
					type: 'dribbble',
					_id: 'dribbble', 
					label: 'Dribbble Shots',
					area: 'footer',
					spot: 1,
					active: true
				},
				{
					type: 'flickr',
					_id: '', 
					label: 'Flickr',
					area: 'footer',
					spot: 2,
					active: true
				},
				{
					type: 'instagram',
					_id: '', 
					_clientId: '', 
					label: 'Instagram',
					area: 'footer',
					spot: 3,
					active: true
				}
			]
		}
	};

	return _userconfig;
});