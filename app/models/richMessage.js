exports.definition = {
	config: {
		columns: {
			"id": 'INTEGER PRIMARY KEY AUTOINCREMENT',
		    "richid": "text",
		    "templategroupid": "text",
		    "properties": "text",
		    "isdelete": "boolean"
		},
		adapter: {
			type: "sql",
			collection_name: "richMessage",
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