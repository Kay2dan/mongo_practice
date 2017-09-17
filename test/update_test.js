const User = require( "../src/user" );
const assert = require( "assert" );

describe( "learning about updates...", () => {

   let joe;
   beforeEach(( done ) => {
      joe = new User({ name : "joe", likes : 1 });
      joe.save()
         .then(() => {
            done();
         });
   });

   function assertName( operation, done ){
      operation.then(() => User.find({}))
         .then(( users ) => {
            assert( users.length === 1 );
            assert( users[ 0 ].name === "alex" );
            done();
         });
   }

   it( "instance type using set & save", ( done ) =>{
      joe.set({ name : "alex" });
      assertName( joe.save(), done );
   });

   it( "A model instance can update", ( done ) => {
      assertName( joe.update({ name : "alex" }), done );
   });

   it( "A model class can update", ( done ) => {
      assertName( User.update({ name : "joe" }, { name : "alex" }),
                  done );
   });

   it( "A model class can update one record", ( done ) =>{
      assertName( User.findOneAndUpdate({ name : "joe" }, { name : "alex" }),
                  done );
   });

   it( "A model class can find a record with an ID & update", ( done ) => {
      assertName( User.findByIdAndUpdate( joe._id, { name : "alex" }), done );
   });

   it( "A user can have their postCount incremented by One", ( done ) => {
      User.update({ name : "joe" }, { $inc : { likes : 1 }})
          .then(() => User.findOne({ name : "joe" }))
          .then(( user ) => {
            assert( user.likes === 2 );
            done();
          });
   });

});