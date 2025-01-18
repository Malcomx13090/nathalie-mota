document.addEventListener('DOMContentLoaded', function () {
    const filterCategorie = document.getElementById('filter-categorie');
    const filterFormat = document.getElementById('filter-format');
    const filterDate = document.getElementById('filter-date');

    // Helper function to apply a CSS class based on the selected value
    function updateFilterClass(filterElement, defaultClass, activeClass) {
        if (filterElement.value === "") {
            filterElement.classList.remove(activeClass);
            filterElement.classList.add(defaultClass);
        } else {
            filterElement.classList.remove(defaultClass);
            filterElement.classList.add(activeClass);
        }
    }

    // Event listeners for each filter
    filterCategorie.addEventListener('change', function () {
        updateFilterClass(filterCategorie, 'filter-default', 'filter-active');
    });

    filterFormat.addEventListener('change', function () {
        updateFilterClass(filterFormat, 'filter-default', 'filter-active');
    });

    filterDate.addEventListener('change', function () {
        updateFilterClass(filterDate, 'filter-default', 'filter-active');
    });

    // Initialize classes on page load
    updateFilterClass(filterCategorie, 'filter-default', 'filter-active');
    updateFilterClass(filterFormat, 'filter-default', 'filter-active');
    updateFilterClass(filterDate, 'filter-default', 'filter-active');
});