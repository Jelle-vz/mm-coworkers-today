/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */


 // TODO: JV: Change api/Json call to async call with succes callback
 // TODO: JV: Add refresh for every morning to check if project status changed

Module.register("mm-coworkers-today",{

	// Default module config.
	defaults: {
		data:[
			{userId:"9"},
			{userId:"6"},
			{userId:"2"},
			{userId:"17"},
			{userId:"103"},
			{userId:"13"},
			{userId:"66"}
		],
		getJSON:function(url) {
			let Httpreq = new XMLHttpRequest();

			Httpreq.open("GET", url, false);
			Httpreq.send(null);

			if (Httpreq.readyState == 4 && Httpreq.status == 200) {
				return JSON.parse(Httpreq.responseText);
			}

			return `Something whent wrong with fetching ${url}`;
		},
	},
	getStyles: function(){
		return [
			'mm-coworkers-today.css'
		]
	},
	start: function(){
		//Do something when module starts but dom not loaded
	},

	// Override dom generator.
	getDom: function() {

		let wrapper = document.createElement("div");
			wrapper.className = "small bright";

		let apiUrl = this.config.apiUrl;
		let apiToken = this.config.apiToken;
		let getJSON = url => this.config.getJSON(url);

		let fetchedUsers = this.config.data.map((item) => {
			let user = item.userId ? getJSON(apiUrl + "&auth_api_token=" + apiToken + "&path_info=people/1/users/" + item.userId +"&format=json") : "No user data specified";
			return {
				name: user.short_display_name,
				avatar: user.avatar.photo,
				project:user.title
			}
		}).sort((a,b) => a.project < b.project ? -1 : a.project > b.project ? 1 : 0); //Sort by Alphabet

		let list = fetchedUsers.reduce((result, item, index) => {
			let template = `
				<li class='item'>
					<span class='project'>${item.project}</span>
					- <img src="${item.avatar}" />
					<span class='name'>${item.name}</span>

				</li>
				`;
			return result + template;
		},"");


		wrapper.innerHTML = `<span class='normal medium'>Wij werken vandaag aan </span>
							<ul class='item-list'>${list}</ul>`;

		return wrapper;
	}
});
