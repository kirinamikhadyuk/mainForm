function handleAddBook () {
     const formData = document.querySelector('#form').elements;

     const json = {};
     for (let i = 0; i < formData.length; i++) {
          json[formData[i].id] = formData[i].value;
     }

     fetch('https://book-service-mikhadyuk.herokuapp.com/book', {
          method: 'POST',
          mode: "cors",
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
          },
          body: json
     })
         .then(response => console.log(response.json()))
         .catch(error => console.log(error));

}
