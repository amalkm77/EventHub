const eventsData = [
    {
        id: 1,
        name: "Web Development Workshop",
        category: "Technical Workshop",
        date: "2026-12-10",
        venue: "Computer Lab",
        description: "Learn HTML, CSS and basic web development through practical sessions.",
        fee: 200,
        image: "images/Collaborative Web Development Workshop.png"
    },
    {
        id: 2,
        name: "Technology Seminar",
        category: "Seminar",
        date: "2026-12-20",
        venue: "Seminar Hall",
        description: "Explore new technologies and learn about the latest developments in IT.",
        fee: 0,
        image: "images/seminar.jpg"
    },
    {
        id: 3,
        name: "Coding Competition",
        category: "Coding Competition",
        date: "2026-12-15",
        venue: "College Auditorium",
        description: "Test your programming skills and solve challenging coding problems.",
        fee: 100,
        image: "images/coding.jpg"
    },
    {
        id: 4,
        name: "Cultural Fest",
        category: "Cultural Event",
        date: "2026-12-25",
        venue: "College Ground",
        description: "Enjoy music, dance, performances and cultural activities.",
        fee: 150,
        image: "images/Kerala Cultural Festival Performance.png"
    },
    {
        id: 5,
        name: "Career Development Session",
        category: "Career Development",
        date: "2026-12-30",
        venue: "Seminar Hall",
        description: "Improve your interview skills and learn about career opportunities.",
        fee: 0,
        image: "images/career.jpg"
    }
];

function displayEvents(eventList) {
    const container = document.getElementById("eventContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (eventList.length === 0) {
        const noResults = document.createElement("p");
        noResults.className = "events-empty";
        noResults.innerText = "No matching events found.";
        container.appendChild(noResults);
        return;
    }

    eventList.forEach(function (event) {
        const card = document.createElement("article");
        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}" alt="${event.name}">
            <h3>${event.name}</h3>
            <p class="category">${event.category}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            <p>${event.description}</p>
            <p><strong>Registration Fee:</strong> ₹${event.fee}</p>
            <div class="card-actions">
                <button class="btn view-btn" type="button" onclick="viewDetails(${event.id})">View Details</button>
                <button class="btn" type="button" onclick="registerEvent(${event.id})">Register Now</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function filterEvents() {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!searchInput || !categoryFilter) {
        return;
    }

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredEvents = eventsData.filter(function (event) {
        const matchesName = event.name.toLowerCase().includes(searchValue);
        const matchesCategory =
            selectedCategory === "All" || event.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    displayEvents(filteredEvents);
}

function viewDetails(id) {
    const selectedEvent = eventsData.find(function (event) {
        return event.id === id;
    });

    if (selectedEvent) {
        alert(
            "Event Details\n\n" +
            "Name: " + selectedEvent.name + "\n" +
            "Category: " + selectedEvent.category + "\n" +
            "Date: " + selectedEvent.date + "\n" +
            "Venue: " + selectedEvent.venue + "\n" +
            "Description: " + selectedEvent.description + "\n" +
            "Fee: ₹" + selectedEvent.fee
        );
    }
}

function registerEvent(id) {
    window.location.href = "registration.html?event=" + id;
}

document.addEventListener("DOMContentLoaded", function () {
    displayEvents(eventsData);
});
