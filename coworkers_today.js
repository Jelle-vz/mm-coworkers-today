/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */


 // TODO: JV: Change api/Json call to async call with succes callback
 // TODO: JV: Add refresh for every morning to check if project status changed

Module.register("coworkers_today",{

	// Default module config.
	defaults: {
		apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
		data:[
			{
				apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
				apiToken:"9-158js00RcqehtTVZPXWCrCINfdMSKNHDKRWJPCIS", //Jelle Verzijden
				userId:"9"
			},
			{
				apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
				apiToken:"6-lrlUSZZ6rVMLuBXuqDNxFBpq0H3h3esjqb3q2Qlh", //Chris Bogaards
				userId:"6"
			},
			{
				apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
				apiToken:"2-x7MtOIbEMHLGjLdFFCPs7npCAdhf5HHqDjKgRLKt", //Jordi Verzijden
				userId:"2"
			},
			{
				apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
				apiToken:"17-vsPjvGmHbuS65jNBO7kp3CYDNH138g3szHCUcPre", //Menno Boer
				userId:"17"
			},
			{
				apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
				apiToken:"103-6u1kEoufHJR1oHQXfgB9Fr8AncsGhJACzL7N7bNC", //Carlo Carels
				userId:"103"
			},
			{
				apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
				apiToken:"13-69a8H2SfNXcWgukJ7nn3nyz8RtwWwrUwnrn7qtJc", //John  Verzijden
				userId:"13"
			},
			{
				apiUrl:"http://mijn.wvzonline.nl/public/api.php?",
				apiToken:"66-aAdefGT7TsuVojq5e2nKKciXGnGYfrlgSpkXV4SD", //Ferry Brak
				userId:"66"
			}
		]
	},

	getStyles: function(){
		return [
			'coworkers_today.css'
		]
	},

	// Override dom generator.
	getDom: function() {

		function getJSON(url) {
			let Httpreq = new XMLHttpRequest(); // a new request
			
		    Httpreq.open("GET", url, false);
		    Httpreq.send(null);

		    return JSON.parse(Httpreq.responseText);
		}

		let wrapper = document.createElement("div");
		let apiUrl = this.config.apiUrl;

		let list = this.config.data.reduce(function(result, item, index){
			let user = item.userId ? getJSON(apiUrl + "&auth_api_token=" + item.apiToken + "&path_info=people/1/users/" + item.userId +"&format=json") : "No user data specified";

			let template = `
				<img src="${user.avatar.photo}" />
				<span class='name'>${user.short_display_name}</span>
				<span class='project'>(${user.title})</span>
			`;

			return result + `<li class='item'>${template}</li>`;
		},"");

		wrapper.className = "small bright";
		wrapper.innerHTML = `<span class='normal medium'>Wij werken vandaag aan </span>
							<ul class='item-list'>${list}</ul>`;

		return wrapper;
	}
});
