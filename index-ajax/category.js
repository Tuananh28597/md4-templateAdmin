const URL_BASE = 'http://localhost:8080/categories';


function getCategory(i, result) {
  return `<tr>
          <td>${i + 1}</td>
          <td>${result.content[i].name}</td>
          <td><button onclick="showEditCategoryForm(${result.content[i].id})" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1">Edit</button></td>
          <td><button onclick="removeCategory(${result.content[i].id})" type="button" class="btn btn-danger">Delete</button></td>
        </tr>`;
}


function getAllCategoryList() {
  $.ajax({
    url: `http://localhost:8080/categories`,
    type: 'GET',
    // header:{
    //   'Authorization': 'Bearer ' + currentUser.accessToken
    // },
    success: function (result) {
      let content = "";
      for (let i = 0; i < result.content.length; i++) {
        content += getCategory(i, result)
      }
      $('#showCategory').html(content);
    }
  });
}


function saveCategory() {
  let name = $('#name').val();
  let newCategory = {
    name: name
  }
  $.ajax({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    type: "POST",
    data: JSON.stringify(newCategory),
    //tên API
    url: `http://localhost:8080/categories`,
    success: getAllCategoryList
  })
  event.preventDefault();
}


function showEditCategoryForm(id) {
  let content = `
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel1">Edit Category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="addMusic">
                <table>
                <tr>

                <td><input type="text" hidden value="${id}" ></td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td><input type="text"  id="cateName"></td>
                 </tr>
                </table>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onclick="editCategory(${id})" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
            </div>
          </div>`;

  $('#showEditForm').html(content);

}

function editCategory(id) {
  console.log(id)
  let name = document.getElementById("cateName").value;
  let newEditCategory = {
    id:id,
    name: name
  }
  $.ajax({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    type: 'PUT',
    data: JSON.stringify(newEditCategory),
    //tên API
    url: `http://localhost:8080/categories/${id}`,
    success: getAllCategoryList
  })
  event.preventDefault();

}

function removeCategory(id) {
  $.ajax({
    url: `http://localhost:8080/categories/${id}`,
    // header: {
    //   'Authorization': 'Bearer ' + currentUser.accessToken
    // },
    type: 'DELETE',
    success: getAllCategoryList
  });
}

getAllCategoryList();
