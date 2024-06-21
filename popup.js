document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('myButton');

    button.addEventListener('click', function () {
        showModal();
    });

    function showModal() {
        // Create the modal elements
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Select Filters</h2>
                <table>
                    <tr>
                        <th>Filter</th>
                        <th>Option</th>
                    </tr>
                    <tr>
                        <td>Filter 1</td>
                        <td><input type="checkbox" id="filter1"></td>
                    </tr>
                    <tr>
                        <td>Filter 2</td>
                        <td><input type="checkbox" id="filter2"></td>
                    </tr>
                    <!-- Add more filters as needed -->
                </table>
                <button id="applyFilters">Apply Filters</button>
            </div>
        `;
        
        // Append the modal to the body
        document.body.appendChild(modal);

        // Show the modal
        modal.style.display = 'block';

        // Add event listeners for closing the modal
        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        });

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            }
        });

        // Add event listener for applying filters
        const applyButton = modal.querySelector('#applyFilters');
        applyButton.addEventListener('click', function () {
            const filter1 = document.getElementById('filter1').checked;
            const filter2 = document.getElementById('filter2').checked;
            // Add logic to handle the filters as needed
            console.log('Filter 1:', filter1);
            console.log('Filter 2:', filter2);
            modal.style.display = 'none';
            document.body.removeChild(modal);
        });
    }
});
