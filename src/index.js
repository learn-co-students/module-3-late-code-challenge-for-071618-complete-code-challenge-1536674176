document.addEventListener('DOMContentLoaded', function() {

  const imageId = 17 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageSrc = document.getElementById("image")
  const name = document.getElementById("name")
  const likes = document.getElementById("likes")
  const commentsList = document.getElementById("comments")
  const likeButton = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  const commentInput = document.getElementById("comment_input")

  let likeCount = 0
  let comments = []

fetch(imageURL).then(res => res.json()).then(function(image){
  imageSrc.src = image.url
  name.innerHTML = image.name
  likes.innerHTML = image.like_count
  likeCount = image.like_count
  image.comments.forEach(comment => comments.push(comment.content))
  displayComments()
})

function displayComments(){
  commentsList.innerHTML = ""
  comments.forEach(function(comment){
    let node = document.createElement("li")
    node.innerHTML = comment
    commentsList.appendChild(node)
  })
}

likeButton.addEventListener("click", function(event){
  likeCount++
  likes.innerHTML = likeCount
  updateLikeCount()
})

function updateLikeCount(){
  fetch('https://randopic.herokuapp.com/likes', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({image_id: imageId})
  })
}

commentForm.addEventListener("submit", function(event){
  event.preventDefault()
  updateComments(commentInput.value)
  comments.push(commentInput.value)
  displayComments()
  commentInput.value = ""
})

function updateComments(comment){
  fetch('https://randopic.herokuapp.com/comments', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({image_id: imageId, content: comment})
  })
}

// function addComment(comment){
//   let node = document.createElement("li")
//   node.innerHTML = comment
//   commentsList.appendChild(node)
// }

})
