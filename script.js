let data = JSON.parse(localStorage.getItem("pemasukan")) || [];

function render() {
  const tbody = document.getElementById("riwayat");
  const totalElem = document.getElementById("total");
  tbody.innerHTML = "";

  let total = 0;
  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.tanggal}</td>
      <td>${item.sumber}</td>
      <td>Rp ${parseInt(item.jumlah).toLocaleString("id-ID")}</td>
    `;
    tbody.appendChild(row);
    total += parseInt(item.jumlah);
  });

  totalElem.innerText = total.toLocaleString("id-ID");
}

function tambahPemasukan() {
  const tanggal = document.getElementById("tanggal").value;
  const sumber = document.getElementById("sumber").value.trim();
  const jumlah = document.getElementById("jumlah").value;

  if (!tanggal || !sumber || !jumlah || jumlah <= 0) {
    alert("Isi semua data dengan benar.");
    return;
  }

  data.push({ tanggal, sumber, jumlah });
  localStorage.setItem("pemasukan", JSON.stringify(data));
  document.getElementById("tanggal").value = "";
  document.getElementById("sumber").value = "";
  document.getElementById("jumlah").value = "";

  render();
}

function hapusSemua() {
  if (confirm("Yakin ingin menghapus semua data pemasukan?")) {
    data = [];
    localStorage.removeItem("pemasukan");
    render();
  }
}

function exportExcel() {
  if (data.length === 0) {
    alert("Tidak ada data untuk diexport.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pemasukan");
  XLSX.writeFile(wb, "pemasukan_harian.xlsx");
}

render();
