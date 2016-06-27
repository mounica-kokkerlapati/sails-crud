/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

create: function (req, res) {

if(req.method=="POST"&&req.param("User",null)!=null)
{

User.create(req.param("User"),function(err,model){

// Error handling
if (err) {

res.send("Error:Sorry!Something went Wrong");

}else {
//res.send("Successfully Created!");
//console.log("Successfully Created!");
res.redirect( 'user/view/'+model.id);

}

});

}
else
{

res.render( 'users/create');
}

},
index: function (req, res) {

User.find().exec(function(err, users) {

res.render( 'users/index',{'users':users});
return;

});

},
view: function (req, res) {

var id=req.param("id",null);

User.findOne(id).exec(function(err,model){

res.render( 'users/view',{'model':model});

});

},

update: function (req, res) {

var id=req.param("id",null);

User.findOne(id).exec(function(err, model) {

if(req.method=="POST"&&req.param("User",null)!=null)
{

var usr=req.param("User",null);

model.fName=usr.fName;
model.mName=usr.mName;
model.lName=usr.lName;
model.dob=usr.dob;
model.Username=usr.Username;
model.password=usr.password;
model.email=usr.email;

model.save(function(err){

if (err) {

res.send("Error");

}else {

res.redirect( 'user/view/'+model.id);

}

});

}
else
{

res.render( 'users/update',{'model':model});
}

});

},

delete: function (req, res) {

var id=req.param("id",null);
User.findOne(id).exec(function(err, usar) {

usar.destroy(function(err) {

res.redirect( 'user/index/');

// record has been removed
});

});

}

};

