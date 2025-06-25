import { useState } from 'react'
import { createPortfolio } from '../../api/portfolioApi'
import { redirect } from 'react-router-dom'
import { PortfolioType } from '../../api/portfolioApi'

export default function AddPortfolioForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(PortfolioType.TULISAN)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [userId, setUserId] = useState('1e702760-decc-4fff-a30d-eed40c69ba85')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (title.trim().length < 3) {
        setError('Judul harus minimal 3 karakter.')
        return
    }
  
    if (description.trim().length < 5) {
        setError('Deskripsi harus minimal 5 karakter.')
        return
    }

    if (!fileUrl) {
        setError('File URL harus diisi.')
        return
    }

    setUserId('1e702760-decc-4fff-a30d-eed40c69ba85')
  
    try {
      await createPortfolio({userId, title, type: type as PortfolioType, fileUrl, description })
      setSuccess(true)
      setTitle('')
      setDescription('')
      setType(PortfolioType.TULISAN)
      setFileUrl('')
      setError('')
      redirect('/portfolios')
    } catch (err: any) {
      console.log(err)
      setError(err?.response?.data?.message || 'Terjadi kesalahan')
    }
  }

  return (
    <div>
      {success && <p className="text-green-600 mb-2">Portfolio berhasil ditambahkan!</p>}
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
            value={type}
            onChange={(e) => setType(e.target.value as PortfolioType)}
          >
            {Object.values(PortfolioType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
            <label className="block font-semibold">File URL</label>
            <input
                type="text"
                className={`w-full border px-3 py-2 rounded ${
                error.includes('File URL') ? 'border-red-500' : ''
                }`}
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                required
            />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Simpan Portofolio
        </button>
      </form>
    </div>
  )
}
