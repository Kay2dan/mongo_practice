const assert = require( "assert" );
const User = require( "../src/user" );

describe( "removing transactions", () => {
   let joe;
   beforeEach(( done ) => {
      joe = new User({ name : "joe" });
      joe.save()
         .then(() => done() );
   });

   it( "model instance remove", ( done ) => {
      joe.remove()
         .then(() => User.findOne({ name : "joe" }))
         .then(( user ) => {
            assert( user === null );
            done();
         });
   });

   it( "class method remove", ( done ) => {
      User.remove({ name : "joe" })
          .then(() => User.findOne({ name : "joe" }))
          .then(( user ) => {
            assert( user === null );
            done();
          });
   });

   it( "class method findOneAndRemove", ( done ) =>{
      User.findOneAndRemove({ name : "joe" })
          .then(() => User.findOne({ name : "joe" }))
          .then(( user ) => {
            assert( user === null );
            done();
          });
   });

   it( "class method findByIdAndRemove", ( done ) => {
      User.findByIdAndRemove( joe._id )
          .then(() => User.findOne({ name : "joe" }))
          .then(( user ) => {
            assert( user === null );
            done();
          });
   });

});
