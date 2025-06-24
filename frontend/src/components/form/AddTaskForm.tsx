import { useState } from 'react'
import { createTask } from '../../api/taskApi'
import { redirect } from 'react-router-dom'

export default function AddTaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('harian')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [points, setPoints] = useState(0)
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    // Validasi
    if (title.trim().length < 3) {
        setError('Judul harus minimal 3 karakter.')
        return
    }
  
    if (description.trim().length < 5) {
        setError('Deskripsi harus minimal 5 karakter.')
        return
    }

    if (points < 1) {
        setError('Poin harus lebih dari 0.')
        return
      }
      
    if (!dueDate) {
        setError('Tenggat waktu harus diisi.')
        return
    }
  
    try {
      await createTask({ title, description, category, points, dueDate })
      setSuccess(true)
      setTitle('')
      setDescription('')
      setCategory('harian')
      setError('')
      redirect('/tasks')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Terjadi kesalahan')
    }
  }

  return (
    <div className='pt-5'>
      {success && <p className="text-green-600 mb-2">Tugas berhasil ditambahkan!</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Judul</label>
          <input
            type="text"
            className={`w-full border px-3 py-2 rounded ${
                error.includes('Judul') ? 'border-red-500' : ''
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Deskripsi</label>
          <textarea
            className={`w-full border px-3 py-2 rounded ${
                error.includes('Deskripsi') ? 'border-red-500' : ''
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Kategori</label>
          <select
            className={`w-full border px-3 py-2 rounded ${
                error.includes('Kategori') ? 'border-red-500' : ''
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="harian">Harian</option>
            <option value="mingguan">Mingguan</option>
            <option value="bulanan">Bulanan</option>
            <option value="tahunan">Tahunan</option>
          </select>
        </div>

        <div>
            <label className="block font-semibold">Poin</label>
            <input
                type="number"
                className={`w-full border px-3 py-2 rounded ${
                error.includes('Poin') ? 'border-red-500' : ''
                }`}
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                required
                min={0}
            />
            </div>

            <div>
            <label className="block font-semibold">Tenggat Waktu</label>
            <input
                type="date"
                className={`w-full border px-3 py-2 rounded ${
                error.includes('Tenggat') ? 'border-red-500' : ''
                }`}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Simpan Tugas
        </button>
      </form>
    </div>
  )
}
