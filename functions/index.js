const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// add a tag key to each tutorial for every tag added

exports.syncTags = functions.database
  .ref('/{user}/tutorials/{tutorial}/tags')
  .onWrite(event => {
    const tags = event.data.val()
    console.log(tags)
    tags.map(tag =>
      admin
        .database()
        .ref(`/${event.params.user}/tutorials/${event.params.tutorial}`)
        .update({ [tag.text]: true })
    )
  })
