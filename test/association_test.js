const mongoose = require( "mongoose" );
const User = require( "../src/user" );
const Comment = require( "../src/comment" );
const BlogPost = require( "../src/blostPost" );

describe( "Associations", () => {
   let joe,
       blogPost,
       comment;

   beforeEach(( done ) => {
      joe = new User({ name : "joe" });
      blogPost = new BlogPost({ 
         title : "Js is awesome",
         content : "Yes it is!" });
      comment = new Comment({ content : "I concur!" });
      
      joe.blogPosts.push( blogPost );
      blogPost.comments.push( comment );
      comment.user = joe;

      Promise.all([
         joe.save(),
         blogPost.save(),
         comment.save()
      ]).then(() => done());
   });

   it( "saves a relation between a user & a blogpost", ( done ) => {
      User.findOne({ name : "joe" })
          .then(( user ) => {
            console.log( user );
            done();
          });
   });

});