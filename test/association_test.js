const mongoose = require( "mongoose" );
const assert = require( "assert" );
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
          .populate({
            path : "blogPosts",
            populate : {
               path : "comments",
               populate : {
                  path : "user"
               }
            }
          })
          .then(( user ) => {
            assert( user.name === "joe" );
            assert( user.blogPosts[0].title === "Js is awesome" );
            assert( user.blogPosts[0].comments[0].content === "I concur!" );
            done();
          });
   });

});