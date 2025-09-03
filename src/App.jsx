import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, QrCode, Upload, MapPin, Users, Database, Wallet, PieChart, Pencil, Trash2, Save, X } from "lucide-react"

const distroDemo = [
  { id: "MBG-00091", tujuan: "SDN 1 Sukapura", paket: 320, etd: "08:10", status: "Berangkat" },
  { id: "MBG-00092", tujuan: "SMPN 2 Tasik", paket: 280, etd: "08:25", status: "Siap Berangkat" },
]

const menuGizi = [
  { hari: "Senin", menu: "Nasi, Ayam Suwir, Sayur Bayam, Pisang", kalori: 620, protein: 28 },
  { hari: "Selasa", menu: "Nasi, Telur Balado, Sop Wortel, Pepaya", kalori: 590, protein: 24 },
  { hari: "Rabu", menu: "Bubur Kacang Hijau, Susu UHT", kalori: 430, protein: 18 },
]

// util kecil
const isValidNik = (nik) => /^\d{16}$/.test(nik)

// initial data (kalau belum ada di localStorage)
const seedPenerima = [
  { nik: "3278012301010001", nama: "Asep Permana", kategori: "Siswa SD", unit: "SDN 1 Sukapura", status: "Terverifikasi" },
  { nik: "3278012301010002", nama: "Siti Rahma", kategori: "Balita", unit: "Posyandu Mekar", status: "Perlu Verifikasi" },
  { nik: "3278012301010003", nama: "Budi Santoso", kategori: "Siswa SMP", unit: "SMPN 2 Tasik", status: "Terverifikasi" },
]

export default function App() {
  const [activeTab, setActiveTab] = useState("dinas")

  // --- STATE utama penerima (persist ke localStorage)
  const [penerima, setPenerima] = useState(() => {
    const s = localStorage.getItem("mbg_penerima")
    return s ? JSON.parse(s) : seedPenerima
  })
  useEffect(() => {
    localStorage.setItem("mbg_penerima", JSON.stringify(penerima))
  }, [penerima])

  // --- STATE UI form tambah & edit
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nik: "", nama: "", kategori: "", unit: "", status: "Perlu Verifikasi" })
  const [editingNik, setEditingNik] = useState(null)
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return penerima
    return penerima.filter(
      (p) =>
        p.nik.includes(q) ||
        p.nama.toLowerCase().includes(q) ||
        p.kategori.toLowerCase().includes(q) ||
        p.unit.toLowerCase().includes(q)
    )
  }, [search, penerima])

  const stats = useMemo(() => {
    const total = penerima.length
    const ver = penerima.filter((p) => p.status === "Terverifikasi").length
    const verperc = total ? Math.round((ver / total) * 100) : 0
    return { total, ver, verperc, distribusiHariIni: 92 }
  }, [penerima])

  const resetForm = () => {
    setForm({ nik: "", nama: "", kategori: "", unit: "", status: "Perlu Verifikasi" })
    setError("")
    setEditingNik(null)
    setShowForm(false)
  }

  const submitForm = () => {
    setError("")
    // validasi
    if (!isValidNik(form.nik)) {
      setError("NIK harus 16 digit angka.")
      return
    }
    if (!form.nama || !form.kategori || !form.unit) {
      setError("Nama, Kategori, dan Unit wajib diisi.")
      return
    }
    // duplikat
    const exists = penerima.some((p) => p.nik === form.nik)
    if (!editingNik && exists) {
      setError("NIK sudah terdaftar.")
      return
    }
    if (editingNik && editingNik !== form.nik && exists) {
      setError("NIK baru bentrok dengan data lain.")
      return
    }

    if (editingNik) {
      setPenerima((arr) => arr.map((p) => (p.nik === editingNik ? { ...form } : p)))
    } else {
      setPenerima((arr) => [{ ...form }, ...arr])
    }
    resetForm()
  }

  const onEdit = (nik) => {
    const row = penerima.find((p) => p.nik === nik)
    if (!row) return
    setForm({ ...row })
    setEditingNik(nik)
    setShowForm(true)
  }

  const onDelete = (nik) => {
    if (!confirm(`Hapus data NIK ${nik}?`)) return
    setPenerima((arr) => arr.filter((p) => p.nik !== nik))
  }

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">MBG — Makan Bergizi Gratis</h1>
          <p className="text-sm text-neutral-600">Prototype UI • SIMTECH</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PieChart className="h-4 w-4 mr-2" />
            SIMNTECH Demo Data
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
        </div>
      </header>

      {/* TABS */}
      <main className="max-w-7xl mx-auto px-6 pb-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="dinas">Admin Dinas</TabsTrigger>
            <TabsTrigger value="sekolah">Sekolah / Puskesmas</TabsTrigger>
            <TabsTrigger value="distribusi">Petugas Distribusi</TabsTrigger>
            <TabsTrigger value="umkm">UMKM / Katering</TabsTrigger>
            <TabsTrigger value="publik">Portal Publik</TabsTrigger>
          </TabsList>

          {/* TAB: ADMIN DINAS */}
          <TabsContent value="dinas" className="mt-4 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Pendataan Penerima
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Cari NIK / Nama / Kategori / Unit" className="flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={() => setShowForm((s) => !s)} variant={showForm ? "secondary" : "default"}>
                      {showForm ? <X className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                      {showForm ? "Tutup Form" : "Tambah Penerima"}
                    </Button>
                  </div>

                  {/* FORM TAMBAH/EDIT */}
                  {showForm && (
                    <div className="p-4 rounded-xl border bg-white space-y-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <Input placeholder="NIK (16 digit)" value={form.nik} onChange={(e) => setForm((f) => ({ ...f, nik: e.target.value.trim() }))} />
                        <Input placeholder="Nama Lengkap" value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} />
                        <Input placeholder="Kategori (Siswa SD/SMP, Balita, Ibu Hamil)" value={form.kategori} onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value }))} />
                        <Input placeholder="Unit (Sekolah/Posyandu/Puskesmas)" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button onClick={submitForm}><Save className="h-4 w-4 mr-2" />{editingNik ? "Simpan Perubahan" : "Simpan"}</Button>
                        <Button variant="outline" onClick={resetForm}><X className="h-4 w-4 mr-2" />Batal</Button>
                        {form.status && <Badge variant={form.status === "Terverifikasi" ? "default" : "secondary"}>{form.status}</Badge>}
                      </div>
                      {error && <div className="text-sm text-red-600">{error}</div>}
                      {!isValidNik(form.nik) && form.nik && <div className="text-xs text-orange-600">Format NIK harus 16 digit angka.</div>}
                    </div>
                  )}

                  {/* TABEL */}
                  <div className="rounded-xl border overflow-hidden">
                    <div className="grid grid-cols-6 p-3 border-b bg-neutral-100 text-sm font-semibold">
                      <div>NIK</div>
                      <div>Nama</div>
                      <div>Kategori</div>
                      <div>Unit</div>
                      <div>Status</div>
                      <div className="text-right">Aksi</div>
                    </div>
                    {filtered.map((p) => (
                      <div key={p.nik} className="grid grid-cols-6 p-3 border-b text-sm items-center">
                        <div className="font-mono">{p.nik}</div>
                        <div>{p.nama}</div>
                        <div>{p.kategori}</div>
                        <div>{p.unit}</div>
                        <div><Badge variant={p.status === "Terverifikasi" ? "default" : "secondary"}>{p.status}</Badge></div>
                        <div className="text-right space-x-1">
                          <Button variant="outline" size="sm" onClick={() => onEdit(p.nik)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm" onClick={() => onDelete(p.nik)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                    {filtered.length === 0 && <div className="p-4 text-sm text-neutral-500">Tidak ada data.</div>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm"><span>Total Penerima</span><b>{stats.total}</b></div>
                  <Progress value={stats.verperc} />
                  <div className="flex items-center justify-between text-sm"><span>Verifikasi NIK</span><b>{stats.verperc}%</b></div>
                  <Progress value={92} />
                  <div className="flex items-center justify-between text-sm"><span>Distribusi Hari Ini</span><b>92%</b></div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader><CardTitle>Menu & Kandungan Gizi</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {menuGizi.map((m) => (
                    <div key={m.hari} className="p-3 rounded-lg border">
                      <div className="font-semibold">{m.hari}</div>
                      <div className="text-sm text-neutral-700">{m.menu}</div>
                      <div className="text-xs text-neutral-500">Kalori: {m.kalori} kcal • Protein: {m.protein} g</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Integrasi</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>Dukcapil (NIK)</span><Badge>Connected</Badge></div>
                  <div className="flex items-center justify-between"><span>Dapodik (Sekolah)</span><Badge>Connected</Badge></div>
                  <div className="flex items-center justify-between"><span>SatuSehat / Puskesmas</span><Badge variant="secondary">Pending</Badge></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Akuntabilitas</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between"><span>Log Audit</span><Button variant="outline" size="sm">Lihat</Button></div>
                  <div className="flex items-center justify-between"><span>Open Data</span><Button variant="outline" size="sm">Export CSV</Button></div>
                  <div className="flex items-center justify-between"><span>Rekap Anggaran</span><Button variant="outline" size="sm">Unduh</Button></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: SEKOLAH / PUSKESMAS */}
          <TabsContent value="sekolah" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Verifikasi Kehadiran Penerima</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input placeholder="Scan / Masukkan QR / NIK" />
                    <Button><QrCode className="h-4 w-4 mr-2" />Scan</Button>
                  </div>
                  <div className="p-3 rounded-lg border text-sm">
                    <div className="font-semibold">Hasil Terakhir</div>
                    <div>NIK: 3278012301010001 • Nama: Asep Permana</div>
                    <Badge className="mt-2">Valid & Tercatat</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Pelaporan Harian</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Jumlah paket diterima" />
                    <Input placeholder="Jumlah paket tersalurkan" />
                  </div>
                  <Textarea placeholder="Catatan kendala (opsional)" />
                  <Button><Check className="h-4 w-4 mr-2" />Kirim Laporan</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: PETUGAS DISTRIBUSI */}
          <TabsContent value="distribusi" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader><CardTitle>Rute & Pengiriman Hari Ini</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {distroDemo.map((d) => (
                    <div key={d.id} className="p-3 rounded-lg border flex items-center justify-between text-sm">
                      <div>
                        <div className="font-semibold">{d.id} • {d.tujuan}</div>
                        <div className="text-neutral-600">Paket: {d.paket} • ETD {d.etd}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{d.status}</Badge>
                        <Button variant="outline" size="sm"><MapPin className="h-4 w-4 mr-2" />Lacak</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Checklist Kendaraan</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <label className="flex items-center gap-2"><input type="checkbox" /> Ban & Rem</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Suhu Box Pendingin</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Surat Jalan</label>
                  <Button className="mt-2" variant="outline" size="sm">Simpan Checklist</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: UMKM / KATERING */}
          <TabsContent value="umkm" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader><CardTitle>Marketplace Bahan Pangan</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                  {["Beras Premium 25kg", "Ayam Fillet 10kg", "Sayur Campur 20kg", "Susu UHT 1 dus", "Telur 10 rak", "Pisang 30kg"].map((item, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="font-semibold">{item}</div>
                      <div className="text-neutral-600">Supplier: UMKM #{i + 1}</div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary">Tersedia</Badge>
                        <Button size="sm" variant="outline">PO</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Rekap PO & Pembayaran</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>PO Aktif</span><b>12</b></div>
                  <div className="flex items-center justify-between"><span>Tagihan Bulan Ini</span><b>Rp 182 jt</b></div>
                  <Button className="w-full"><Wallet className="h-4 w-4 mr-2" />Unduh Rekap</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: PORTAL PUBLIK */}
          <TabsContent value="publik" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader><CardTitle>Lokasi & Jadwal Distribusi</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div>Hari ini: <b>92 lokasi</b> • Paket: <b>12.100</b></div>
                  <div className="p-3 rounded-lg border">Peta mini (placeholder)</div>
                  <Button variant="outline" size="sm">Lihat Semua</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Menu & Kandungan Gizi</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {menuGizi.map((m) => (
                    <div key={m.hari} className="p-3 rounded-lg border">
                      <div className="font-semibold">{m.hari}</div>
                      <div className="text-neutral-700">{m.menu}</div>
                      <div className="text-xs text-neutral-500">Kal: {m.kalori} • Pro: {m.protein} g</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Pengaduan & Saran</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <Textarea placeholder="Tulis saran / pengaduan Anda" />
                  <Button>Kirim</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 pb-8 text-xs text-neutral-500">
        © {new Date().getFullYear()} SIMTECH • Prototype UI untuk validasi kebutuhan MBG.
      </footer>
    </div>
  )
}
