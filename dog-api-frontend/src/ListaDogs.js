import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaDogs = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ nome: '', raca: '', peso: '', idade: '', proprietario: '' });
  const [editFoto, setEditFoto] = useState(null);
  const [saving, setSaving] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/dogs` : '/api/dogs';

  const loadDogs = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get(API_URL);
      setDogs(Array.isArray(data) ? data : (data?.dogs || data?.items || data?.data || []));
    } catch (e) {
      setError('Erro ao carregar cachorros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDogs();
  }, []);

  const startEdit = (dog) => {
    setEditingId(dog._id);
    setEditData({
      nome: dog.nome || '',
      raca: dog.raca || '',
      peso: dog.peso ?? '',
      idade: dog.idade ?? '',
      proprietario: dog.proprietario || ''
    });
    setEditFoto(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ nome: '', raca: '', peso: '', idade: '', proprietario: '' });
    setEditFoto(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFotoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEditFoto(file);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      setSaving(true);
      const formData = new FormData();
      Object.entries(editData).forEach(([k, v]) => formData.append(k, v));
      if (editFoto) formData.append('foto', editFoto);
      const { data } = await axios.put(`${API_URL}/${editingId}`, formData);
      // merge updated dog
      setDogs((prev) => prev.map((d) => (d._id === editingId ? data : d)));
      cancelEdit();
    } catch (e) {
      setError('Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  const removeDog = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este cachorro?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setDogs((prev) => prev.filter((d) => d._id !== id));
    } catch (e) {
      setError('Erro ao excluir cachorro');
    }
  };

  if (loading) return <div className="text-center mt-5">Carregando...</div>;

  return (
    <div>
      <h2 className="mb-4">Lista de Cachorros (CRUD)</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {dogs.length === 0 ? (
        <div className="alert alert-info">Nenhum cachorro cadastrado.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Raça</th>
                <th>Peso (kg)</th>
                <th>Idade</th>
                <th>Proprietário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog) => (
                <tr key={dog._id}>
                  <td style={{width: 120}}>
                    {dog.fotoUrl && (
                      <img src={dog.fotoUrl} alt={dog.nome} style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 6 }} />
                    )}
                  </td>
                  {editingId === dog._id ? (
                    <>
                      <td>
                        <input className="form-control" name="nome" value={editData.nome} onChange={handleEditChange} />
                      </td>
                      <td>
                        <input className="form-control" name="raca" value={editData.raca} onChange={handleEditChange} />
                      </td>
                      <td>
                        <input type="number" className="form-control" name="peso" value={editData.peso} onChange={handleEditChange} />
                      </td>
                      <td>
                        <input type="number" className="form-control" name="idade" value={editData.idade} onChange={handleEditChange} />
                      </td>
                      <td>
                        <input className="form-control" name="proprietario" value={editData.proprietario} onChange={handleEditChange} />
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-2">
                          <input type="file" accept="image/*" onChange={handleEditFotoChange} />
                          <div className="btn-group">
                            <button className="btn btn-sm btn-success" onClick={saveEdit} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                            <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>Cancelar</button>
                          </div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{dog.nome}</td>
                      <td>{dog.raca}</td>
                      <td>{dog.peso}</td>
                      <td>{dog.idade}</td>
                      <td>{dog.proprietario}</td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(dog)}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => removeDog(dog._id)}>Excluir</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaDogs;
