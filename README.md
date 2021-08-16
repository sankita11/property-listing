# Property Listing APP

This is simple to create, edit, update property.

This uses 
  * React typescript in UI
  * Node, typescript, Graphql, postgres in backend

### How to use instructions are in separate README.md of UI and API folders

# Improvemets

##### FrontEnd
* Currently, the form asks for Cover image Url which is a text box, it should be a file upload. These can be upload to AWS S3 bucket or Cloudinary or any other service.
* Options to add multiple images
* I could not add edit property functionality in UI, however, API is already done
* Good validations for the create property form

##### Backend
* Option to add multiple images which get saved in a separate table
* API to upload an image and return the URL
* Better error handling
* Better test coverage


