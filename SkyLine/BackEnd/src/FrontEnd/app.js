const baseUrl = 'http://localhost:5900/flightcrew';

async function getAllFlightCrew() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        const tbody = document.querySelector('#allFlightCrew tbody');
        tbody.innerHTML = ''; // Clear existing data

        data.forEach(crew => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crew.flightcrew_id}</td>
                <td>${crew.first_name}</td>
                <td>${crew.last_name}</td>
                <td>${crew.gender}</td>
                <td>${crew.position}</td>
                <td>${crew.address}</td>
                <td>${crew.contact_phone}</td>
                <td>${crew.contact_email}</td>
                <td>${crew.flight_id}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching all flight crew:', error);
    }
}

async function getFlightCrewById() {
    const id = document.getElementById('crewId').value;
    if (!id) {
        alert('Please enter an ID');
        return;
    }
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const data = await response.json();
        const table = document.getElementById('flightCrewById');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing data

        if (data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.flightcrew_id}</td>
                <td>${data.first_name}</td>
                <td>${data.last_name}</td>
                <td>${data.gender}</td>
                <td>${data.position}</td>
                <td>${data.address}</td>
                <td>${data.contact_phone}</td>
                <td>${data.contact_email}</td>
                <td>${data.flight_id}</td>
            `;
            tbody.appendChild(row);
            table.classList.remove('hidden');
        } else {
            alert('No data found');
            table.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error fetching flight crew by ID:', error);
    }
}

async function createFlightCrew() {
    const crewId = document.getElementById('newCrewId').value;
    const firstName = document.getElementById('newFirstName').value;
    const lastName = document.getElementById('newLastName').value;
    const gender = document.getElementById('newGender').value;
    const position = document.getElementById('newPosition').value;
    const address = document.getElementById('newAddress').value;
    const contactPhone = document.getElementById('newContactPhone').value;
    const contactEmail = document.getElementById('newContactEmail').value;
    const flightId = document.getElementById('newFlightId').value;

    const body = {
        flightcrew_id: crewId,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        position: position,
        address: address,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        flight_id: flightId
    };

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.text();
        document.getElementById('createdFlightCrew').textContent = data;
    } catch (error) {
        console.error('Error creating flight crew member:', error);
    }
}

async function updateFlightCrew() {
    const id = document.getElementById('updateCrewId').value;
    const firstName = document.getElementById('updateFirstName').value;
    const lastName = document.getElementById('updateLastName').value;
    const gender = document.getElementById('updateGender').value;
    const position = document.getElementById('updatePosition').value;
    const address = document.getElementById('updateAddress').value;
    const contactPhone = document.getElementById('updateContactPhone').value;
    const contactEmail = document.getElementById('updateContactEmail').value;
    const flightId = document.getElementById('updateFlightId').value;

    const body = {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        position: position,
        address: address,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        flight_id: flightId
    };

    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.text();
        document.getElementById('updatedFlightCrew').textContent = data;
    } catch (error) {
        console.error('Error updating flight crew member:', error);
    }
}

async function deleteFlightCrew() {
    const id = document.getElementById('deleteCrewId').value;
    if (!id) {
        alert('Please enter an ID');
        return;
    }
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
        const data = await response.text();
        document.getElementById('deletedFlightCrew').textContent = data;
    } catch (error) {
        console.error('Error deleting flight crew member:', error);
    }
}
