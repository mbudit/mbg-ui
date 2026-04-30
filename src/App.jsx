import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, QrCode, Upload, MapPin, Users, Database, Wallet, PieChart } from "lucide-react";

// Fake data for demo purposes
const penerimaDemo = [
  { nik: "3278012301010001", nama: "Asep Permana", kategori: "Siswa SD", sekolah: "SDN 1 Sukapura", status: "Terverifikasi" },
  { nik: "3278012301010002", nama: "Siti Rahma", kategori: "Balita", sekolah: "Posyandu Mekar", status: "Perlu Verifikasi" },
  { nik: "3278012301010003", nama: "Budi Santoso", kategori: "Siswa SMP", sekolah: "SMPN 2 Tasik", status: "Terverifikasi" },
];

const distroDemo = [
  { id: "MBG-00091", tujuan: "SDN 1 Sukapura", paket: 320, keberangkatan: "08:10", status: "Berangkat" },
  { id: "MBG-00092", tujuan: "SMPN 2 Tasik", paket: 280, keberangkatan: "08:25", status: "Siap Berangkat" },
];

const menuGizi = [
  { hari: "Senin", menu: "Nasi, Ayam Suwir, Sayur Bayam, Buah Pisang", kalori: 620, protein: 28 },
  { hari: "Selasa", menu: "Nasi, Telur Balado, Sop Wortel, Pepaya", kalori: 590, protein: 24 },
  { hari: "Rabu", menu: "Bubur Kacang Hijau, Susu UHT", kalori: 430, protein: 18 },
];

export default function MBGMockApp() {
  const [activeTab, setActiveTab] = useState("dinas");

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900 p-6">
      <header className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">MBG – Makan Bergizi Gratis</h1>
          <p className="text-sm text-neutral-600">Prototype UI – SIMTECH</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><PieChart className="h-4 w-4 mr-2" />Demo Data</Button>
          <Button><Upload className="h-4 w-4 mr-2" />Import CSV</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="dinas">Admin Dinas</TabsTrigger>
            <TabsTrigger value="sekolah">Sekolah / Puskesmas</TabsTrigger>
            <TabsTrigger value="distribusi">Petugas Distribusi</TabsTrigger>
            <TabsTrigger value="umkm">UMKM / Katering</TabsTrigger>
            <TabsTrigger value="publik">Portal Publik</TabsTrigger>
          </TabsList>

          {/* Admin Dinas */}
          <TabsContent value="dinas" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" />Pendataan Penerima</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Cari NIK / Nama" className="flex-1" />
                    <Button>Search</Button>
                    <Button variant="secondary">Tambah Penerima</Button>
                  </div>
                  <div className="rounded-xl border">
                    <div className="grid grid-cols-5 p-3 border-b bg-neutral-100 text-sm font-semibold rounded-t-xl">
                      <div>NIK</div>
                      <div>Nama</div>
                      <div>Kategori</div>
                      <div>Unit</div>
                      <div>Status</div>
                    </div>
                    {penerimaDemo.map((p, idx) => (
                      <div key={idx} className="grid grid-cols-5 p-3 border-b text-sm">
                        <div>{p.nik}</div>
                        <div>{p.nama}</div>
                        <div>{p.kategori}</div>
                        <div>{p.sekolah}</div>
                        <div>
                          <Badge variant={p.status === "Terverifikasi" ? "default" : "secondary"}>{p.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle><Users className="inline h-5 w-5 mr-2" />Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm"><span>Total Penerima</span><b>12.480</b></div>
                  <Progress value={78} />
                  <div className="flex items-center justify-between text-sm"><span>Verifikasi NIK</span><b>78%</b></div>
                  <Progress value={92} />
                  <div className="flex items-center justify-between text-sm"><span>Distribusi Hari Ini</span><b>92%</b></div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Menu & Kandungan Gizi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {menuGizi.map((m, i) => (
                    <div key={i} className="p-3 rounded-lg border">
                      <div className="font-semibold">{m.hari}</div>
                      <div className="text-sm text-neutral-700">{m.menu}</div>
                      <div className="text-xs text-neutral-500">Kalori: {m.kalori} kcal • Protein: {m.protein} g</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integrasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>Dukcapil (NIK)</span><Badge>Connected</Badge></div>
                  <div className="flex items-center justify-between"><span>Dapodik (Sekolah)</span><Badge>Connected</Badge></div>
                  <div className="flex items-center justify-between"><span>SatuSehat / Puskesmas</span><Badge variant="secondary">Pending</Badge></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Akuntabilitas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between"><span>Log Audit</span><Button variant="outline" size="sm">Lihat</Button></div>
                  <div className="flex items-center justify-between"><span>Open Data</span><Button variant="outline" size="sm">Export CSV</Button></div>
                  <div className="flex items-center justify-between"><span>Rekap Anggaran</span><Button variant="outline" size="sm">Unduh</Button></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sekolah / Puskesmas */}
          <TabsContent value="sekolah" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Verifikasi Kehadiran Penerima</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input placeholder="Scan / Masukkan QR/NIK" />
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
                <CardHeader>
                  <CardTitle>Pelaporan Harian</CardTitle>
                </CardHeader>
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

          {/* Petugas Distribusi */}
          <TabsContent value="distribusi" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Rute & Pengiriman Hari Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {distroDemo.map((d, i) => (
                    <div key={i} className="p-3 rounded-lg border flex items-center justify-between text-sm">
                      <div>
                        <div className="font-semibold">{d.id} • {d.tujuan}</div>
                        <div className="text-neutral-600">Paket: {d.paket} • ETD {d.keberangkatan}</div>
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
                <CardHeader>
                  <CardTitle>Checklist Kendaraan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <label className="flex items-center gap-2"><input type="checkbox" /> Ban & Rem</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Suhu Box Pendingin</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Surat Jalan</label>
                  <Button className="mt-2" variant="outline" size="sm">Simpan Checklist</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* UMKM / Katering */}
          <TabsContent value="umkm" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Marketplace Bahan Pangan</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-3 text-sm">
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
                <CardHeader>
                  <CardTitle>Rekap PO & Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>PO Aktif</span><b>12</b></div>
                  <div className="flex items-center justify-between"><span>Tagihan Bulan Ini</span><b>Rp 182 jt</b></div>
                  <Button className="w-full"><Wallet className="h-4 w-4 mr-2" />Unduh Rekap</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portal Publik */}
          <TabsContent value="publik" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lokasi & Jadwal Distribusi</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div>Hari ini: <b>92 lokasi</b> • Paket: <b>12.100</b></div>
                  <div className="p-3 rounded-lg border">Peta mini (placeholder)</div>
                  <Button variant="outline" size="sm">Lihat Semua</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Menu & Kandungan Gizi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {menuGizi.map((m, i) => (
                    <div key={i} className="p-3 rounded-lg border">
                      <div className="font-semibold">{m.hari}</div>
                      <div className="text-neutral-700">{m.menu}</div>
                      <div className="text-xs text-neutral-500">Kal: {m.kalori} • Pro: {m.protein} g</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pengaduan & Saran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea placeholder="Tulis saran / pengaduan Anda" />
                  <Button>Kirim</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="max-w-7xl mx-auto mt-8 text-xs text-neutral-500">
        © {new Date().getFullYear()} SIMTECH • Prototype UI untuk diskusi dan validasi kebutuhan MBG.
      </footer>
    </div>
  );
}
