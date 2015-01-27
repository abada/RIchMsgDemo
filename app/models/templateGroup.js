exports.definition = {
	config: {
		columns: {
			"id": 'INTEGER PRIMARY KEY AUTOINCREMENT',
		    "templategroupid": "text",
		    "templatefileid": "text",
		    "properties": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "templateGroup",
			idAttribute: 'id'
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};