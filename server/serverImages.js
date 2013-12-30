Images = new FS.Collection("images", {
	useHTTP: true,
	store: new FS.FileSystemStore("images", "~/uploads"),
	beforeSave: function () {
		this.gm().resize(60, 60).save();
	},
	filter: {
		maxSize: 104857600, //in bytes
		allow: {
			contentTypes: ['image/*'],
			extensions: ['png', 'jpg', 'jpeg']
		},
		onInvalid: function (message) {
			console.log(message);
		}
	}
});

// can't insert without a this section
Images.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	remove: function (userId, doc) {
		return true;
	}
});


Meteor.publish('items', function(){
	return Items.find();
});

Meteor.publish('images', function(){
	return Images.find();
});

if (Meteor.isServer) {
	Meteor.startup(function() {

		if (Items.find().count() === 0) {
			console.log("Adding sample items");

			var seeditems = ["Diecast Cars", "Watches", "Cameras", "Guitars" ];
			for (var i = seeditems.length - 1; i >= 0; i--) {
				Items.insert({
					name: seeditems[i],
					creationDate: new Date()

				});
			}
		}
	});
}