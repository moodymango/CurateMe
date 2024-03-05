# CurateMe Database Design Explanation

I was inspired to redesign my database after taking <a href=""> CS50's Introduction to Databases with SQL course.</a>

### What is the purpose of CurateMe database?

Artsy Fartsy's database aims to keep track of the individual users, the collections they curate, the artworks they add to collectons, and the ordering of the artworks within the individual collections.

### Which people, places, things, etc. are you including in the scope of this database?

I am including individual users, the collections they create, a special collection of artworks representing a user's favorites, and the individual artworks saved within those collections, and a user's individual impressions on these artworks.
Because the front-end of this project includes drag-and-drop functionality, I also want to persist the order of a collection's artwork items within a separate table.

### Which people, places, things, etc. are _outside_ the scope of this database?

The application utilziing this database interacts with a third party API containing more detailed information about the artworks the users choose to add their own collections.
Because I am only interested in keeping track of basic information such as the artwork title, artist, and date, any other information about individual works such as the exibition history, department and themes are out of scope.
Any bibliological information about the artist is also outside the scope of this project such as country of origin, date of birth or death, and typical styles associated with the artist themselves.
I also am not saving a table of the individual artists since I am only interested in saving data about the individual artworks that are of interest to the user.
I am also not interested in saving information on the users such as their addresses and phone numbers.

## Functional Requirements

### What should a user be able to do with this database?

A database user should be able to:

CREATE

    -create a collection to exhibit a user's selected artworks
    -if an artwork does not exist in the database, it will be added to both the artwork table, and then the subsequent collection_order table based on the collection_id
    - write impressions for individual artworks based on user_id and artwork_id
    - create a record for collection_order table once an artwork has been added to user's collection collection based on user_id and collection_id.

READ

    - grab list of all users and their pertinant information
    - pull up all collections created by a user based on user_id
    - pull up all artworks within a collection in the correct order by consulting the collection_order table and grabbing list of all artworks with the requested collection_id
    - pull up all impressions written by an individual user based on user id or pull up all impressions for an individual artwork based on artwork id.

DELETE

    -remove a user, and therefore all collections, impressions associated with their individual user id
    -remove an artwork from the database if the artwork is no longer available within the third-party api
    -remove an artwork from a user's collection based on the artwork id (most likely will be removed from the collection_order table)
    -remove a collection from a user's account based on collection_id, which in turn will remove all artworks from the collection_order table matching the collection_id)
    - delete a user's impression of an individual's artwork using user_id and artwork_id

UPDATE

    - make updates to a user's information such as password, username, first and last name
    - re-order individual artworks within a collection by changing its positions, nextID(reference to the artwork in front of it) and prevID(reference to the artwork behind it)
    - add an artwork to a collection by adding the collection_id and individual artwork_id to the collection_order table
    - update the title or description of an individual user's collection based on user_id and collection id
    - update the description of a user's impression on an artwork according to the user_id and artwork_id

### What's beyond the scope of what a user should be able to do with your database?

For now, users will not be able to learn any information about the artist that created the individual artworks other than a particular artist's popularity with a certain user based on the artist's frequency in an individual since I have no bibliological information pertaining to any artists saved to the database.

## Representation

### Entities

#### Which entities will you choose to represent in your database?

Please see the schema.sql file to look at the entities in the datbase.

#### Why did you choose the types you did?

Primary and Foreign Key Types:

I selected integers for any foreign key id attributes because according to the PostgreSQL documentation, the range for integer goes from -2147483648 to +2147483647 to properly accomodate the expanding number of records I have in my frequently referenced tables such as user, collections, and artworks.

I used serial for any primary keys because I wanted the program to ensure that the primary key is an integer type, and any subsequent rows added will have its default values assigned from a sequence generator.
I also used integer for the position attribute of my collection_order in order to keep track of an individual artwork's position within a user's collection of artworks. I do not imagine a user having upwards of 2147483647 artworks in their collection, so I believe it will be fine to utilize an integer type.

Varchar/Text Types:

I decided to use varchar for any attribites where I can anticipate a user input that would use fewer characters than average in order to ensure attributes such as first and last name, username, and password were not too long.
I used text for any attributes where I can anticipate a much longer string of user-input such as collection and impression description. For these attributes, I ancitipate the user will have much more to say about their favorite artwork or collection and do not want to limit their creativity.

Date Type:

Only the creation_date attribute receives a date type because I want the user to keep track of when they created an individual collection. I am only interested in the creation month day and year and have no need for the time.

#### Why did you choose the constraints you did?

I selected primary key for an id attributes because I wanted to ensure that each id remains unique and not null. I also wanted to leverage the B-tree index that was created on the primary key to ensure than any data retirval querys were as performant as possible when querying my database.

I used a foreign key constraint on my tables that frequenly reference my artwork, collection and user tables because I want to ensure that I am able to make the nessessary joins to combine tables based on unique user_ids, artwork_ids and collection ids.

On each foreign key, I also ensured to use keyword ON DELETE CASCADE to ensure when a row from the parent table (typically user, artwork or collection) was deleted, any subsqeuent reference rows in the child table were properly deleted in order to ensure the consistency of my database.

### Relationships

Please visit the entity relationship diagram here: <a href="https://mermaid.live/edit#pako:eNqNUsFOwzAM_ZUo520f0BuISVRITOqG4FBpMo1XrDVJ5SQg1PbfydYCRekBX2L5vSTPfu5kZRXKTCLfEdQMujQixtN-W4i-32z6Tmxf7vPb_JDvHkUmqsDg0c1Y3ZhfwnkmUwvUQE1SDQ7ZgMYEaMG5D8sqAU7Ezh8X7zTwBxnGY6Y0VeXJN-lDCl3F1Hqy5hczQb8ii4bO352mHwx2vY7DuSkOz7viIQ7GGg9kJv5U_rcMYE-xo2WQNNR4DNwsIC2jcz_ih5kvF4F2JvAE75bp6l15pcuV1MjRKxX9vwotpX_DOFOZxVQBn0tZmiHyIHi7_zSVzDwHXMnQqrgF08aMxeELb223Eg"> CurateMe ER </a>

User - Registered user who is able to create art collections and favorite individual pieces

Collections - Collections of curated artworks selected by the user

Artworks - Artworks on featured in user's digital collection

Collection_Order - Join table for artworks and collections, also keeps track of an individual artwork's position within a single collection.

Impressions - Written reflections on individual artworks by users

User and Collections - 1 to many relationship

User and Impressions - 1 to many relationship

Artwork and Impressions - 1 to many relationship

Collections and Artwork - Many to Many relationship managed with a join table called collection_order, which will also keep track of an individual artwork's position within the collection

#### Doubly Linked List in SQL

The collection_order table implements a doubly linked list structure. Each row represents an individual artwork within a single collection, and features next and prev columns to keep track of neighboring artworks.

I selected this method because I intent on implementing a drag and drop functionality on my frontend, allowing users to reorganize the artworks in their collection as they see fit. Consequently I needed a way to persist the ordering of the collection within the database. Since linked lists are more suitable for element insertion, I felt like implementing a doubly linked list strucutre within my collection_order table was the best way to move forward.

I was inspired by the following article to implement this design for the collection_order <a href="https://readmedium.com/en/https:/betterprogramming.pub/the-best-way-to-update-a-drag-and-drop-sorting-list-through-database-schemas-31bed7371cd0">Update Drag and Drop Sorting List</a>

With these relationships, a user can perform CRUD functionality with the data related to users, artworks, collections, impressions,and collection_order.

## Optimizations

#### Which optimizations (e.g., indexes, views) did you create? Why?

I created indexes on all foreign keys using PostgreSQL's Hash index on all foreign key columns. Ideally these columns will frequently appear in several "WHERE" clauses that checks for direct equality.

For example, users.id = collections.user_id or collection_order.collection_id = collections.id.

I was inspired by <a href="https://www.freecodecamp.org/news/postgresql-indexing-strategies/"> this article </a> to employ hash indexes as opposed to B-Tree indexes since PostgreSQL allows users to choose between the two.

## Limitations

- What are the limitations of your design?

- What might your database not be able to represent very well?
