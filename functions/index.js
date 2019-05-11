const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// add a tag key to each tutorial for every tag added

exports.syncTags = functions.database
  .ref('/{user}/tutorials/{tutorial}/tags')
  .onCreate(event => {
    const tags = event.data.val()
    tags.map(tag =>
      admin
        .database()
        .ref(`/${event.params.user}/tutorials/${event.params.tutorial}`)
        .update({ [tag.text]: true })
    )
  })

exports.createNewTags = functions.database
  .ref('/{user}/tutorials/{tutorial}/tags')
  .onCreate(event => {
    const tags = event.data.val()
    tags.map(tag => admin.database().ref(`/tags`).update({ [tag.text]: true }))
  })
