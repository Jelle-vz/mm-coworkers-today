/* global Module */

/* Mirror.online
 * Module: What are we working on today
 *
 * By Team wvz.online http://www.wvz.online
 * MIT Licensed.
 */


 // TODO: JV: Change api/Json call to async call with succes callback
 // TODO: JV: Add refresh for every morning to check if project status changed

Module.register("mm-coworkers-today",{

	// Default module config.
	defaults: {
	},
	getStyles: function(){
		return [
			'mm-coworkers-today.css'
		]
	},
	getScripts: function() {
		return ["axios"];
	},
	start: function(){
		//Do something when module starts but dom not loaded
	},

	// Override dom generator.
	getDom: function() {

		let wrapper = document.createElement("div");
			wrapper.className = "small bright";
			wrapper.innerHTML = "<span class='loader'>Bezig met laden...</span>"

		let api = axios.create({
		  baseURL: this.config.apiUrl,
		  headers: {
			  'Authorization': 'Bearer ' + this.config.apiToken
		  }
		});


		function getApiData() {
			api.get('coworkers').then((response) => {
				setCoworkersHtml(response);
			}).catch((error) => {
				console.error(error);
			});
		} getApiData();

		setInterval(function(){
			getApiData();
		}, 3600000); //Get data every hour

		let setCoworkersHtml = function(response){
			let data = response.data.data.data;
			let list = data.reduce(function(result, item){
				let listItem = `
					<li class='item'>
						<span class='project'>${item.project}</span>
						- <img src="${item.avatar}" />
						<span class='name'>${item.name}</span>
					</li>
				`
				return result + listItem
			},"");

			wrapper.innerHTML = `
				<span class='normal medium'>Vandaag werken wij aan</span><br/>
				<ul class="item-list">${list}</ul>
			`;
		}

		return wrapper;
	}
});
