document.addEventListener('DOMContentLoaded', function () {
    const inputBusqueda = document.getElementById('searchInput');
    const botonBusqueda = document.getElementById('searchButton');
    const contenedorResultados = document.getElementById('results');

    // Función para buscar libros en la API de Open Library
    async function buscarLibros(query) {
        try {
            const apiUrl = `https://openlibrary.org/search.json?q=${query}`;
            const respuesta = await fetch(apiUrl);
            const datos = await respuesta.json();

            // Limpiar resultados
            contenedorResultados.innerHTML = '';

            // Mostrar resultados en la web
            datos.docs.forEach(libro => {
                const divLibro = document.createElement('div');
                divLibro.className = 'book';
                divLibro.innerHTML = `
                    <h2>${libro.title}</h2>
                    <p><strong>Autor:</strong> ${libro.author_name ? libro.author_name.join(', ') : 'N/A'}</p>
                    <p><strong>A&ntilde;o de Publicaci&oacute;n:</strong> ${libro.first_publish_year ? libro.first_publish_year : 'N/A'}</p>
                    <p><strong>T&iacute;tulo Sugerido:</strong> ${libro.title_suggest ? libro.title_suggest : 'N/A'}</p>
                    <p><strong>T&iacute;tulo Ordenado:</strong> ${libro.title_sort ? libro.title_sort : 'N/A'}</p>
                    <p><strong>N&uacute;mero de Ediciones:</strong> ${libro.edition_count ? libro.edition_count : 'N/A'}</p>
                    <p><strong>Fecha de Publicaci&oacute;n:</strong> ${libro.publish_date ? libro.publish_date.join(', ') : 'N/A'}</p>
                    <p><strong>Editor:</strong> ${libro.publisher ? libro.publisher.join(', ') : 'N/A'}</p>
                    <p><strong>Idioma:</strong> ${libro.language ? libro.language.join(', ') : 'N/A'}</p>
                    <p><strong>Lugar:</strong> ${libro.place ? libro.place.join(', ') : 'N/A'}</p>
                    <p><strong>Tema:</strong> ${libro.subject ? libro.subject.join(', ') : 'N/A'}</p>
                `;
                contenedorResultados.appendChild(divLibro);
            });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    // Función para manejar la búsqueda
    function manejarBusqueda() {
        const terminoDeBusqueda = inputBusqueda.value.trim();
        if (terminoDeBusqueda !== '') {
            buscarLibros(terminoDeBusqueda);
        }
    }

    // Evento al hacer clic en el botón de búsqueda
    botonBusqueda.addEventListener('click', manejarBusqueda);

    // Evento al presionar Enter en el campo de búsqueda
    inputBusqueda.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            manejarBusqueda();
        }
    });
});
