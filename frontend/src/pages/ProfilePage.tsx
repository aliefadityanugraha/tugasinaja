import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { updateCurrentUser } from '@/api/authApi';

export default function ProfilePage() {
  const { user, isLoading, refreshUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', avatarUrl: user?.avatarUrl || '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="p-6">User not found.</div>;
  }

  const handleEdit = () => {
    setForm({ name: user.name, avatarUrl: user.avatarUrl || '' });
    setEditMode(true);
    setMessage(null);
    setError(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setMessage(null);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await updateCurrentUser({ name: form.name, avatarUrl: form.avatarUrl });
      await refreshUser();
      setMessage('Profil berhasil diupdate');
      setEditMode(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal update profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profil Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <img
              src={user.avatarUrl || '/avatars/default.jpg'}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border"
            />
            {editMode ? (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Avatar URL</label>
                  <input
                    type="text"
                    name="avatarUrl"
                    value={form.avatarUrl}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel} disabled={loading} className="w-full">
                    Batal
                  </Button>
                </div>
                {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              </form>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-xl font-semibold">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                  <div className="text-sm text-muted-foreground">{user.roleDisplayName}</div>
                  <div className="text-xs text-gray-400 mt-2">Bergabung: {new Date(user.createdAt).toLocaleDateString('id-ID')}</div>
                </div>
                <Button variant="outline" className="mt-4 w-full" onClick={handleEdit}>
                  Edit Profil
                </Button>
                {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 