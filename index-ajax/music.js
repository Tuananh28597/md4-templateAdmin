const URL_BASE = 'http://localhost:8080/musics';

function getMusic(i, result){

  return `<tr>
          <td>${i+1}</td>
          <td>${result.content[i].name}</td>
          <td>${result.content[i].created}</td>
          <td>${result.content[i].description}</td>
          <td>${result.content[i].image}</td>
          <td>${result.content[i].user?.username}</td>
          <td>${result.content[i].category?.name}</td>
          <td><button onclick="editMusic(${result.content[i].id})" type="button" class="btn btn-success">Edit</button></td>
          <td><button onclick="removeMusic(${result.content[i].id})" type="button" class="btn btn-danger">Delete</button></td>
        </tr>`;

}



function getAllMusic(){
  $.ajax({
    url: `http://localhost:8080/musics`,
    type: 'GET',
    // header:{
    //   'Authorization': 'Bearer ' + currentUser.accessToken
    // },
    success: function (result){
      let content = "";
      for (let i = 0; i < result.content.length ; i++){
        content += getMusic(i, result)
      }
      $('#showMusic').html(content);
    }
  });
}

function getCategory(i,category){
  let content =  `<option value="${category.content[i].id}"> ${category.content[i].name}</option>`;
  return content;
}

function showAllNameCategory(){
  $.ajax({
    url: `http://localhost:8080/categories`,
    type: "GET",
    header:{
      "Accept": "application/json"
    },
    success: function (result){
      let content = "";
      for (let i= 0; i < result.content.length; i++){
        content += getCategory(i,result);
      }
      $('#showCategory').html(content);
    }
  })
}

$(document).ready(function (){
  getAllMusic();
})

function showCreateMusic() {
  showAllNameCategory();

}


function removeMusic(id){
  $.ajax({
    url: `http://localhost:8080/musics/${id}`,
    // header: {
    //   'Authorization': 'Bearer ' + currentUser.accessToken
    // },
    type: 'DELETE',
    success: getAllMusic
  });
}



function saveMusic(){
  let fileUpload = new FormData($("#addMusic")[0]);
  $.ajax({
    headers: {
      'Authorization' : 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNjM2NjU5OSwiZXhwIjo4ODAzNjM2NjU5OX0.7jUVfyp2B9MdXr9QEfoYAWLhvt-rnbEOPlr2G15IYHnbuLLQXw0DQ9_Wg6giElNv2rM7sa7W1YlIaKGR9R4mlg",

    },
    type: "POST",
    url: `http://localhost:8080/musics`,
    enctype: 'multipart/form-data',
    cache: false,
    processData: false,
    contentType: false,
    timeout : 6000000,
    data: fileUpload,
    success: function (data) {
      console.log("oK")
    }
  })


  // let name = $('#name').val();
  // let created = $('#created').val();
  // let description = $('#description').val();
  // let image = $('#image').val();
  // let category = {
  //   id: $('#category').val()
  // }
  // let newMusic = {
  //   name: name,
  //   created: created,
  //   description: description,
  //   image: image,
  //   category: category,
  // };
  //
  // $.ajax({
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   type: "POST",
  //   data: JSON.stringify(newSmartphone),
  //   //tên API
  //   url: `http://localhost:8080/musics`,
  //   success: console.log('created')
  // });
  // event.preventDefault();

}





function editMusic(id) {
    // $('#editMusicForm').submit(function (event) {
    //   var name = $('#name').val();
    //   var vip = $('#vip').val();
    //   var description = $('#description').val();
    //   var json = {"name":name, "vip":vip, "description":description};
    //   $.ajax({
    //     url: `http://localhost:8080/musics/${id}`,
    //     data: JSON.stringify(json),
    //     type: "POST",
    //     success: function (music) {
    //       var respContent = "";
    //       respContent += "<span class='success'>Smartphone was edited: [";
    //       respContent += music.name + " : ";
    //       respContent += music.created + " : ";
    //       respContent += music.description + "]</span>";
    //       $("#table-showMusic1").html(respConent);
    //     }
    //   });
    //   event.preventDefault();
    // });
  };


