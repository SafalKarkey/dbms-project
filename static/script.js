document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch and update user data
  const fetchUserData = () => {
    fetch('/get-data')
      .then(response => response.json())
      .then(data => {
        const userDataDiv = document.getElementById('userData');

        // Clear the existing content
        userDataDiv.innerHTML = '';

        // Create a table to display the user data
        const table = document.createElement('table');

        // Create table header
        const tableHead = document.createElement('thead');
        const tableHeadRow = document.createElement('tr');
        const tableHeadCell = document.createElement('th');
        tableHeadCell.textContent = 'Name';
        tableHeadRow.appendChild(tableHeadCell);
        tableHead.appendChild(tableHeadRow);
        table.appendChild(tableHead);

        // Create table body
        const tableBody = document.createElement('tbody');
        data.forEach(user => {
          const tableRow = document.createElement('tr');
          const tableCell = document.createElement('td');
          tableCell.textContent = user.name;
          tableRow.appendChild(tableCell);
          tableBody.appendChild(tableRow);
        });
        table.appendChild(tableBody);

        // Append the table to the userDataDiv
        userDataDiv.appendChild(table);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  // Call the fetchUserData function initially to display the data
  fetchUserData();

  // Add event listener to the form submit button
  const submitButton = document.querySelector('form[action="/submit"] button');
  submitButton.addEventListener('click', fetchUserData);
});