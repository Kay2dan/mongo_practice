const assert = require( "assert" );
const User = require( "../src/user" );

describe( " Testing sub-documents ", () => {

   it( "can create a sub-document", ( done ) => {
      let joe = new User({
         name : "joe",
         posts : [{ title : "joe's first post" }]
      });
      joe.save()
         .then(() => User.findOne({ name : "joe" }))
         .then(( user ) => {
            assert( user.name === joe.name );
            done();
         });
   });

   it( "adds a new post to existing document", ( done ) => {
      let joe = new User({
         name : "joe"
      });
      joe.save()
         .then(() => User.findOne({ name : "joe" }))
         .then(( user ) => {
            user.posts.push({ title : "a new post" })
            return user.save();
         })
         .then(() => User.findOne({ name : "joe" }))
         .then(( user ) => {
            assert( user.posts[ 0 ].title === "a new post");
            done();
         });
   });

   it( "can remove an existing document", ( done ) => {
      let joe = new User({
         name : "joe",
         posts : [{ title : "a first post" }]
      });
      joe.save()
         .then(() => User.findOne({ name : "joe" }))
         .then(( user ) => {
            const post = user.posts[ 0 ];
            post.remove();
            return user.save();
         })
         .then(() => User.findOne({ name : "joe" }))
         .then(( user ) => {
            assert( user.posts.length === 0 );
            done();
         });
   });   


});