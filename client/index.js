var Images = new FS.Collection("images", {
	useHTTP: true
});

Template.item.events({
	'change .myFileInput': function(event, template) {
		var files = event.target.files;

		var insertCallback = function(err, id) {
			if(err){
				console.log('Error ' + err.message);
			}
			else{
				console.log('Success ' + id);
			}
		};
		for (var i = 0, ln = files.length; i < ln; i++) {
			var fsFile = new FS.File(files[i]);
			var userId = Meteor.userId();
			if(userId){
				fsFile.metadata = { owner: userId };
				Images.insert(fsFile);
				addImageToItem(this._id, fsFile);
			} else {
				alert("You must be logged in to insert a image");
			}
		}
	}
});

var addImageToItem = function(itemId, image){

	Items.update({_id: itemId}, {$addToSet: {images: image}},  { upsert: false, multi: false }, function(err, result){
		if(err){
			console.log('Error: ' + err.message);
		}else{
			console.log('Success: ' + result);
		}
	});
};

// Template.imageList.images = function(){
//   return Images.find();
// };


Template.home.items = function(){
  return Items.find();
};


Handlebars.registerHelper('urlhelper', function() {
		return this.url();
	}
);