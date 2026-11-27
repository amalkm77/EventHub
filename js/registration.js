let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

const registrationForm = document.getElementById("registrationForm");
const eventDropdown = document.getElementById("selectedEvent");

function loadEventOptions() {
    if (!eventDropdown) {
        return;
    }

    eventsData.forEach(function (event) {
        const option = document.createElement("option");
        option.value = event.id;
        option.textContent = event.name;
        eventDropdown.appendChild(option);
    });

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("event");

    if (eventId) {
        eventDropdown.value = eventId;
    }
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    const errors = document.querySelectorAll(".error");

    errors.forEach(function (error) {
        error.textContent = "";
    });
}

function displayRegistrations() {
    const table = document.getElementById("registrationRows");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    if (registrations.length === 0) {
        table.innerHTML = "<tr><td colspan='7'>No registrations found.</td></tr>";
        return;
    }

    registrations.forEach(function (registration) {
        const row = document.createElement("tr");
        const values = [
            registration.id,
            registration.name,
            registration.email,
            registration.eventName,
            registration.registrationDate,
            registration.status
        ];

        values.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.textContent = "View";
        viewButton.className = "btn view-btn";
        viewButton.onclick = function () {
            viewRegistration(registration.id);
        };
        actionCell.appendChild(viewButton);

        if (registration.status === "Active") {
            const cancelButton = document.createElement("button");
            cancelButton.type = "button";
            cancelButton.textContent = "Cancel";
            cancelButton.className = "btn cancel-btn";
            cancelButton.onclick = function () {
                cancelRegistration(registration.id);
            };
            actionCell.appendChild(cancelButton);
        }

        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

function viewRegistration(id) {
    const registration = registrations.find(function (item) {
        return item.id === id;
    });

    if (!registration) {
        return;
    }

    alert(
        "Registration Details\n\n" +
        "ID: " + registration.id + "\n" +
        "Name: " + registration.name + "\n" +
        "Email: " + registration.email + "\n" +
        "Mobile: " + registration.mobile + "\n" +
        "Gender: " + registration.gender + "\n" +
        "Department: " + registration.department + "\n" +
        "Year: " + registration.year + "\n" +
        "Event: " + registration.eventName + "\n" +
        "Interests: " + registration.interests.join(", ") + "\n" +
        "Status: " + registration.status
    );
}

function cancelRegistration(id) {
    const confirmCancel = confirm("Are you sure you want to cancel this registration?");

    if (!confirmCancel) {
        return;
    }

    registrations = registrations.map(function (registration) {
        if (registration.id === id) {
            registration.status = "Cancelled";
        }

        return registration;
    });

    localStorage.setItem("registrations", JSON.stringify(registrations));
    alert("Registration cancelled successfully.");
    displayRegistrations();
}

if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();
        document.getElementById("success").style.display = "none";

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const department = document.getElementById("department").value;
        const year = document.getElementById("year").value;
        const selectedEvent = eventDropdown.value;
        const comments = document.getElementById("comments").value.trim();
        const interests = document.querySelectorAll('input[name="interest"]:checked');
        let isValid = true;

        if (name.length < 3) {
            showError("nameError", "Name must contain at least 3 characters.");
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError("emailError", "Enter a valid email address.");
            isValid = false;
        }

        if (!/^[0-9]{10}$/.test(mobile)) {
            showError("mobileError", "Mobile number must contain exactly 10 digits.");
            isValid = false;
        }

        if (!gender) {
            showError("genderError", "Please select your gender.");
            isValid = false;
        }

        if (department === "") {
            showError("departmentError", "Please select your department.");
            isValid = false;
        }

        if (year === "") {
            showError("yearError", "Please select your year of study.");
            isValid = false;
        }

        if (selectedEvent === "") {
            showError("eventError", "Please select an event.");
            isValid = false;
        }

        if (interests.length === 0) {
            showError("interestError", "Select at least one area of interest.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const chosenEvent = eventsData.find(function (item) {
            return item.id === Number(selectedEvent);
        });

        const registrationID = "REG" + Date.now();
        const newRegistration = {
            id: registrationID,
            name: name,
            email: email,
            mobile: mobile,
            gender: gender.value,
            department: department,
            year: year,
            eventId: Number(selectedEvent),
            eventName: chosenEvent.name,
            interests: Array.from(interests).map(function (item) {
                return item.value;
            }),
            comments: comments,
            registrationDate: new Date().toLocaleDateString(),
            status: "Active"
        };

        registrations.push(newRegistration);
        localStorage.setItem("registrations", JSON.stringify(registrations));

        document.getElementById("successMessage").textContent =
            "Registration successful! Your ID is " + registrationID;
        document.getElementById("registrationDetails").textContent =
            "Name: " + name +
            " | Email: " + email +
            " | Mobile: " + mobile +
            " | Gender: " + gender.value +
            " | Department: " + department +
            " | Year: " + year +
            " | Event: " + chosenEvent.name +
            " | Interests: " + Array.from(interests).map(function (item) {
                return item.value;
            }).join(", ");
        document.getElementById("success").style.display = "block";

        registrationForm.reset();
        displayRegistrations();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadEventOptions();
    displayRegistrations();
});
