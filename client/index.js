var Images = new FS.Collection("images");

Template.filePicker.events({
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
			Images.insert(files[i], insertCallback);
		}
	}
});

Template.imageList.images = function(){
  return Images.find();
};


Template.home.items = function(){
  return Items.find();
};
