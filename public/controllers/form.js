function handleAddBook () {
     const formData = document.querySelector('#form').elements;

     const json = {};
     for (let i = 0; i < formData.length; i++) {
          json[formData[i].id] = formData[i].value;
     }
     console.log(json);

     fetch('https://book-service-mikhadyuk.herokuapp.com/book', {
          method: 'POST',
          mode: "cors",
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(json)
     })
         .then(response => console.log(response))
         .catch(error => console.log(error));

}
