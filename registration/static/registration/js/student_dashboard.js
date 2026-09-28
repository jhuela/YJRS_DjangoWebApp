async function loadStudents() {
    const studentTableBody = document.getElementById("student-table-body");
    const studentCount = document.getElementById("student-count");
    const loadingMessage = document.getElementById("loading-message");
    const emptyMessage = document.getElementById("empty-message");
    const errorMessage = document.getElementById("error-message");

    try {
        loadingMessage.style.display = "block";
        emptyMessage.style.display = "none";
        errorMessage.style.display = "none";

        const response = await fetch("/api/students/");

       if (!response.ok) {
            if (response.status === 401) {
                 throw new Error( "Authentication required. Please log in.");
             }

            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        studentCount.textContent = data.count;

        studentTableBody.innerHTML = "";

        if (data.count === 0) {
            emptyMessage.style.display = "block";
            return;
        }

        data.students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.student_name}</td>
                <td>${student.program}</td>
                <td>${student.year_level}</td>
                <td>${student.email}</td>
            `;

            studentTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading students:", error);

        errorMessage.textContent =
            "Unable to load student records. Please try again.";

        errorMessage.style.display = "block";

    } finally {
        loadingMessage.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", loadStudents);