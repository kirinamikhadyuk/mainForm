let selectedBook;
let selectedCustomer;

function init() {
     const booksDropDown = document.getElementById("books");
     const customersDropDown = document.getElementById("customers");

    Promise.all([
        fetch('https://book-service-mikhadyuk.herokuapp.com/allBooks', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                generateDropdownOptions(booksDropDown, response, 'title');
            })
            .catch(error => console.log(error)),
        fetch('https://customer-service-mikhadyuk.herokuapp.com/allCustomers', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                generateDropdownOptions(customersDropDown, response, 'name');
            })
            .catch(error => console.log(error))])
        .then(() => {
            document.getElementById('container').classList.toggle('hide');
            document.getElementById('loader').classList.toggle('hide');
        })
}

function generateDropdownOptions(dropdownElement, options, fieldTitle) {
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.setAttribute('value', options[i][fieldTitle]);
        option.setAttribute('_id', options[i]._id);

        const optionText = document.createTextNode(options[i][fieldTitle]);
        option.appendChild(optionText);

        dropdownElement.appendChild(option);
    }
}

function saveOrder() {
    selectedBook = [...document.getElementById('books').options].find(item => item.selected);
    selectedCustomer = [...document.getElementById('customers').options].find(item => item.selected);

    const requestBody = {
        bookId: selectedBook.getAttribute('_id'),
        customerId: selectedCustomer.getAttribute('_id'),
        initialDate: Date.now(),
        deliveryDate: Date.now() + 10 * 24 * 60 * 60 * 1000
    };

    fetch('https://order-service-mikhadyuk.herokuapp.com/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(() => {
            document.getElementById('container').classList.toggle('hide');
            document.getElementById('finish').classList.toggle('hide');
        })
        .catch(error => console.log(error))
}

function openOrderTemplate() {
    selectedBook.selected = false;
    selectedCustomer.selected = false;

    document.getElementById('container').classList.toggle('hide');
    document.getElementById('finish').classList.toggle('hide');
}
