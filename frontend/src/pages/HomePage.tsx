import NavbarMain from '../components/NavbarMain'

export default function HomePage() {
  return (
    <div>
      <NavbarMain />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Selamat Datang di Aplikasi Dashboard</h2>
        <p className="text-gray-700">Gunakan navigasi di atas untuk melihat tugas, portofolio, dan fitur lainnya.</p>
      </main>
    </div>
  )
}
