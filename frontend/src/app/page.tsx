'use client';

import { useState, FormEvent } from 'react';

// THROWAWAY TEST PAGE - hardcoded values, no services/models split, gets deleted before real frontend work.
const API_BASE = 'https://localhost:7244';
const API_KEY = 'bruno123';

const VEHICLE_TYPES = ['Car', 'Suv', 'Van', 'Truck', 'Bus', 'Minibus', 'Motorcycle', 'Trailer', 'Tractor', 'Helicopter', 'Boat', 'Other'];
const COLOURS = ['White', 'Black', 'Silver', 'Grey', 'Blue', 'Red', 'Green', 'Brown', 'Yellow', 'Orange'];

type Vehicle = {
  id: string;
  registrationNumber: string;
  vehicleType: number;
  make: string;
  model: string;
  year: number;
  colour: number;
  sellerName: string;
  pricePerDay: number;
  imageUrls: string[];
  createdDate: string;
};

export default function Home() {
  const [mode, setMode] = useState<'idle' | 'search' | 'add'>('idle');

  const [searchReg, setSearchReg] = useState('');
  const [searchResult, setSearchResult] = useState<Vehicle | 'not-found' | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [form, setForm] = useState({
    registrationNumber: '',
    vehicleType: 0,
    make: '',
    model: '',
    year: new Date().getFullYear(),
    colour: 0,
    sellerName: '',
    pricePerDay: 0,
  });
  const [addResult, setAddResult] = useState<Vehicle | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    setSearchLoading(true);
    setSearchResult(null);

    const res = await fetch(`${API_BASE}/api/vehicles/${encodeURIComponent(searchReg)}`, {
      headers: { 'X-Api-Key': API_KEY },
    });

    setSearchResult(res.status === 404 ? 'not-found' : await res.json());
    setSearchLoading(false);
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setAddLoading(true);
    setAddResult(null);
    setAddError(null);

    const res = await fetch(`${API_BASE}/api/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY },
      body: JSON.stringify({ ...form, hireStartDate: null, hireEndDate: null, imageUrls: [] }),
    });

    const body = await res.json();
    if (res.ok) {
      setAddResult(body);
    } else {
      setAddError(JSON.stringify(body.errors ?? body, null, 2));
    }

    setAddLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 p-16 bg-zinc-50">
      <h1 className="text-2xl font-bold">Bruno Vehicle Hire — Test Page</h1>

      <div className="flex gap-4">
        <button onClick={() => setMode('search')} className="px-4 py-2 rounded bg-blue-600 text-white">
          Search Vehicle
        </button>
        <button onClick={() => setMode('add')} className="px-4 py-2 rounded bg-green-600 text-white">
          Add Vehicle
        </button>
      </div>

      {mode === 'search' && (
        <form onSubmit={handleSearch} className="flex flex-col gap-2 w-full max-w-sm">
          <input
            className="border p-2 rounded"
            placeholder="Registration number"
            value={searchReg}
            onChange={(e) => setSearchReg(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
            {searchLoading ? 'Searching...' : 'Search'}
          </button>

          {searchResult === 'not-found' && <p className="text-red-600">No vehicle found.</p>}
          {searchResult && searchResult !== 'not-found' && (
            <pre className="bg-white border rounded p-3 text-sm whitespace-pre-wrap">
              {JSON.stringify(searchResult, null, 2)}
            </pre>
          )}
        </form>
      )}

      {mode === 'add' && (
        <form onSubmit={handleAdd} className="flex flex-col gap-2 w-full max-w-sm">
          <input
            className="border p-2 rounded"
            placeholder="Registration number"
            value={form.registrationNumber}
            onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.vehicleType}
            onChange={(e) => setForm({ ...form, vehicleType: Number(e.target.value) })}
          >
            {VEHICLE_TYPES.map((type, i) => (
              <option key={type} value={i}>{type}</option>
            ))}
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Make"
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
          <select
            className="border p-2 rounded"
            value={form.colour}
            onChange={(e) => setForm({ ...form, colour: Number(e.target.value) })}
          >
            {COLOURS.map((colour, i) => (
              <option key={colour} value={i}>{colour}</option>
            ))}
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Seller name"
            value={form.sellerName}
            onChange={(e) => setForm({ ...form, sellerName: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Price per day"
            value={form.pricePerDay}
            onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })}
          />
          <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">
            {addLoading ? 'Adding...' : 'Add Vehicle'}
          </button>

          {addResult && (
            <pre className="bg-white border rounded p-3 text-sm whitespace-pre-wrap">
              {JSON.stringify(addResult, null, 2)}
            </pre>
          )}
          {addError && <pre className="text-red-600 whitespace-pre-wrap text-sm">{addError}</pre>}
        </form>
      )}
    </div>
  );
}
