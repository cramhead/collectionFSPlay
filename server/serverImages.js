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
	insert: function(userId, file) {
		return true;
	},
	update: function(userId, files, fields, modifier) {
		return true;
	},
	remove: function(userId, files) {
		return true;
	},
	download: function(userId, file) {
		return true;
	}
});


Meteor.publish('items', function(){
	return Items.find();
});

Meteor.publish('images', function(){
	return Images.find();
});

function getAssetPath() {
    var meteor_root = Npm.require('fs').realpathSync(process.cwd() + '/../');
    console.log(meteor_root);

    var application_root = Npm.require('fs').realpathSync(meteor_root + '/../');
    // if running on dev mode
    if (Npm.require('path').basename(Npm.require('fs').realpathSync(meteor_root + '/../../../')) == '.meteor') {
        application_root = Npm.require('fs').realpathSync(meteor_root + '/../../../../');
    }

    var assets_folder = meteor_root + '/server/assets/app';
    //var assets_folder = meteor_root + '/server/assets/' + Npm.require('path').basename( application_root );
    console.log(assets_folder);
    return assets_folder;
}

if (Meteor.isServer) {
	Meteor.startup(function() {

		//fs = Npm.require('fs');

    // var loadImages = function() {

    //     var assets_folder = getAssetPath();
    //     var image = fs.readFileSync(assets_folder + '/20131022_GR-Limited-Edition.jpg', 'binary');
    //     //fs.writeFileSync('/Users/cram/Desktop/test.jpg', image, {encoding: 'binary', mode: 777});
    //     var saved = Images.storeBuffer('20131022_GR-Limited-Edition.jpg', image, {encoding: 'binary', noProgress: true, contentType: 'image/jpeg'});
    // };
    // loadImages();


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