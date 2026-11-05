
import { booksApi, categoriesApi } from '../api.js';
import { showToast, escapeHtml } from '../utils.js';

export async function renderDashboard(container) {
    container.innerHTML = `
        <div class="mb-8 page-enter">
            <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p class="text-gray-500">
                Selamat datang di Sistem Informasi Perpustakaan
            </p>
        </div>

        <div id="stats" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            ${skeletonCard()}
            ${skeletonCard()}
        </div>

        <div id="recent-books" class="bg-white rounded-xl shadow p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
                Buku Terbaru
            </h3>
            <div class="text-center py-8 text-gray-400">
                Memuat...
            </div>
        </div>
    `;

    const statsContainer = container.querySelector('#stats');
    const recentBooksContainer = container.querySelector('#recent-books');

    try {
        const [booksRes, categoriesRes] = await Promise.all([
            booksApi.list(),
            categoriesApi.list()
        ]);

        // Validasi respons API
        const books = Array.isArray(booksRes.data)
            ? booksRes.data
            : [];

        const categories = Array.isArray(categoriesRes.data)
            ? categoriesRes.data
            : [];

        // Perhitungan statistik
        const totalBooks = books.length;

        const totalStock = books.reduce(
            (sum, book) => sum + (Number(book.stok) || 0),
            0
        );

        const totalCategories = categories.length;

        // Render statistik
        statsContainer.innerHTML = `
            <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-6 text-white">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-blue-100 text-sm font-medium">
                            Total Buku
                        </p>
                        <p class="text-4xl font-bold mt-2">
                            ${totalBooks}
                        </p>
                    </div>

                    <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        📚
                    </div>
                </div>

                <p class="text-xs text-blue-100 mt-4">
                    ${totalStock} total stok tersedia
                </p>
            </div>

            <div class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-amber-100 text-sm font-medium">
                            Kategori
                        </p>
                        <p class="text-4xl font-bold mt-2">
                            ${totalCategories}
                        </p>
                    </div>

                    <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        🏷
                    </div>
                </div>

                <p class="text-xs text-amber-100 mt-4">
                    Kategori buku terdaftar
                </p>
            </div>
        `;

        // Ambil 5 buku terbaru
        const recentBooks = [...books]
            .sort((a, b) => Number(b.id) - Number(a.id))
            .slice(0, 5);

        // Render daftar buku terbaru
        recentBooksContainer.innerHTML = `
            <h3 class="text-lg font-bold text-gray-800 mb-4">
                Buku Terbaru
            </h3>

            ${recentBooks.length === 0
                ? `
                        <p class="text-center py-8 text-gray-400">
                            Belum ada buku
                        </p>
                    `
                : `
                        <div class="divide-y">
                            ${recentBooks.map(book => {
                    const stock = Number(book.stok) || 0;

                    return `
                                    <div class="flex justify-between items-center py-3 gap-4">
                                        <div class="min-w-0">
                                            <p class="font-medium text-gray-800">
                                                ${escapeHtml(book.judul ?? '')}
                                            </p>

                                            <p class="text-sm text-gray-500">
                                                ${escapeHtml(book.penulis ?? '')}
                                                &middot;
                                                ${escapeHtml(String(book.tahun ?? '-'))}
                                            </p>
                                        </div>

                                        <span class="shrink-0 px-3 py-1 rounded-full text-xs font-medium ${stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }">
                                            Stok: ${stock}
                                        </span>
                                    </div>
                                `;
                }).join('')}
                        </div>
                    `
            }
        `;

    } catch (error) {
        console.error('Dashboard Error:', error);

        showToast(error.message, 'error');

        statsContainer.innerHTML = `
            <div class="md:col-span-2 bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">
                <p class="font-medium">
                    Gagal memuat data
                </p>

                <p class="text-sm mt-1">
                    ${escapeHtml(error.message || 'Terjadi kesalahan saat mengambil data')}
                </p>
            </div>
        `;

        recentBooksContainer.innerHTML = `
            <h3 class="text-lg font-bold text-gray-800 mb-4">
                Buku Terbaru
            </h3>

            <p class="text-center py-8 text-gray-400">
                Data buku tidak dapat dimuat.
            </p>
        `;
    }
}

function skeletonCard() {
    return `
        <div class="bg-white rounded-xl shadow p-6">
            <div class="animate-pulse h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div class="animate-pulse h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
    `;
}
