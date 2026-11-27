document.addEventListener("DOMContentLoaded", function () {
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    const totalEvents = document.getElementsByClassName("card").length;
    var totalRegistrations = registrations.length;

    const technicalEvents = eventsData.filter(function (event) {
        return event.category === "Technical Workshop" ||
            event.category === "Coding Competition";
    }).length;

    const culturalEvents = eventsData.filter(function (event) {
        return event.category === "Cultural Event";
    }).length;

    const cancelledRegistrations = registrations.filter(function (registration) {
        return registration.status === "Cancelled";
    }).length;

    document.getElementById("totalEvents").textContent = totalEvents;
    document.getElementById("totalRegistrations").textContent = totalRegistrations;
    document.getElementById("technicalEvents").textContent = technicalEvents;
    document.getElementById("culturalEvents").textContent = culturalEvents;
    document.getElementById("cancelledRegistrations").textContent = cancelledRegistrations;
});
