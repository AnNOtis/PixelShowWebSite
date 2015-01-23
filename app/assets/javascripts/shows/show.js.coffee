triggerDialog = ->
  FB.ui(
    method: 'share'
    href: document.URL
    , (response) -> )

$(document).on 'page:change', ->
  $("#share-btn").click ->
    triggerDialog()



