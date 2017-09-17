const assert = require( "assert" );
const User = require( "../src/user" );

describe( "learning about read in Mongodb", () => {
   let joe;
   beforeEach(( done ) => {
      joe = new User({ name : "joe" });
      joe.save()
         .then(() => {
            done();
         });
   });

   it( "should find a user named Joe", ( done ) => {
      User.find({ name : "joe" })
          .then(( users ) => {
            done();
          });
   });

   it( "should match the ids of joes", ( done ) => {
      User.findOne({ name : "joe" })
          .then(( user ) => {
            assert( user._id.toString() === joe._id.toString() );
            done();
          });
   });

   it( "should find a user with an id", ( done ) => {
      User.findOne({ _id : joe._id })
          .then(( user ) => {
            assert( user.name === joe.name );
            done();
          });
   });
});