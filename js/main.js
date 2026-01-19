document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen hamburger menu dan navigasi UTAMA (<nav>)
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav'); // <-- UBAH INI: Targetkan elemen <nav>

    // Pastikan kedua elemen ada sebelum menambahkan event listener
    if (hamburger && nav) { // <-- UBAH INI: Cek 'nav'
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('show'); // <-- UBAH INI: Toggle kelas 'show' pada <nav>
        });
    }

    // Animasi scroll halus untuk semua link dengan href="#"
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simulasi data produk untuk halaman kategori (jika ada)
    if (window.location.pathname.includes('kategori.html')) {
        const categories = {
            laptop: [
                { name: 'Laptop Gaming Pro', price: 'Rp 15.999.000', image: 'assets/images/laptop1.jpg' },
                { name: 'Laptop Ultra Slim', price: 'Rp 12.500.000', image: 'assets/images/laptop2.jpg' },
                { name: 'Laptop Bisnis', price: 'Rp 10.750.000', image: 'assets/images/laptop3.jpg' }
            ],
            handphone: [
                { name: 'Smartphone Flagship', price: 'Rp 12.499.000', image: 'assets/images/phone1.jpg' },
                { name: 'Smartphone Mid-range', price: 'Rp 6.999.000', image: 'assets/images/phone2.jpg' },
                { name: 'Smartphone Budget', price: 'Rp 3.499.000', image: 'assets/images/phone3.jpg' }
            ],
            tablet: [
                { name: 'Tablet Premium', price: 'Rp 8.799.000', image: 'assets/images/tablet1.jpg' },
                { name: 'Tablet Android', price: 'Rp 5.299.000', image: 'assets/images/tablet2.jpg' },
                { name: 'Tablet Entry-level', price: 'Rp 2.999.000', image: 'assets/images/tablet3.jpg' }
            ]
        };

        for (const category in categories) {
            const container = document.querySelector(`.category-section:nth-of-type(${
                category === 'laptop' ? 1 : category === 'handphone' ? 2 : 3
            }) .products`);

            if (container) {
                categories[category].forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <button>Lihat Detail</button>
                    `;
                    container.appendChild(productCard);
                });
            }
        }
    }

    // Form submission untuk halaman karier
    const careerForm = document.querySelector('.application-form form');
    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Lamaran Anda telah berhasil dikirim! Kami akan menghubungi Anda segera.');
            this.reset();
        });
    }

    // Set active menu berdasarkan halaman saat ini
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else if (link.parentElement.classList.contains('dropdown') &&
                   (currentPage === 'maintenance.html' || currentPage === 'laptop.html' || currentPage === 'handphone.html' || currentPage === 'tablet.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Menangani dropdown di mobile saat diklik
    const dropdownToggle = document.querySelector('li.dropdown > a');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Cek lebar layar
                e.preventDefault(); // Mencegah navigasi langsung
                const dropdownContent = this.nextElementSibling;
                if (dropdownContent) {
                    dropdownContent.classList.toggle('show-dropdown'); // Toggle kelas 'show-dropdown'
                }
            }
        });
    }
});