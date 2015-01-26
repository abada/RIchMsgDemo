exports.definition = {
	config: {
		columns: {
			"id": 'INTEGER PRIMARY KEY AUTOINCREMENT',
		    "templatefileid": "text",
		    "templatecontent": "text",
		    "isdelete": "boolean",
		    "ismain": "boolean"
		},
		adapter: {
			type: "sql",
			collection_name: "templateFile",
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