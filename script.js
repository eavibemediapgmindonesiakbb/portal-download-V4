const SCRIPT_URL = 'PASTE_URL_WEB_APP_LO_DISINI'; // GANTI INI

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
  }, 1500);

  document.getElementById('toggle-password').addEventListener('click', function() {
    const pass = document.getElementById('password');
    const icon = this.querySelector('i');
    if (pass.type === 'password') {
      pass.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      pass.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });

  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nik = document.getElementById('nik').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('login-message');
    const btn = document.getElementById('login-button');
    
    msg.innerText = '';
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    btn.disabled = true;

    fetch(`${SCRIPT_URL}?action=login&nik=${nik}&password=${password}`)
    .then(res => res.json())
    .then(res => {
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
        btn.disabled = false;
        if (res.success) {
          document.getElementById('login-page').classList.add('hidden');
          document.getElementById('dashboard-user').classList.remove('hidden');
          loadDashboard(res);
        } else {
          msg.innerText = res.pesan;
        }
      })
    .catch(err => {
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
        btn.disabled = false;
        msg.innerText = 'Gagal konek ke server';
      });
  });
});

function loadDashboard(data) {
  document.getElementById('user-name').innerText = data.nama + ' 👋';
  document.getElementById('profile-nama').innerText = data.nama;
  document.getElementById('profile-nik').innerText = data.nik;
  document.getElementById('profile-status').innerText = data.status;
  document.getElementById('user-avatar').src = data.foto;
  
  const badgeBayar = document.getElementById('profile-bayar');
  const btnDownload = document.getElementById('btn-download');
  
  if(data.iuran === 'Lunas') {
    badgeBayar.className = 'badge-lunas';
    badgeBayar.innerText = 'Lunas';
    btnDownload.disabled = false;
    btnDownload.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Download Sertifikat';
    btnDownload.onclick = () => window.open(data.linkSertifikat, '_blank');
  } else {
    badgeBayar.className = 'badge-belum';
    badgeBayar.innerText = 'Belum';
    btnDownload.disabled = true;
    btnDownload.innerHTML = '<i class="fa-solid fa-ban"></i> Sertifikat Belum Tersedia';
  }

  document.getElementById('btn-bukti').onclick = () => {
    const pesan = `Halo admin, saya ${data.nama} mau kirim bukti pembayaran iuran`;
    window.open(`https://wa.me/62812xxxxxxx?text=${encodeURIComponent(pesan)}`); // GANTI NO WA
  }
}

function logout() {
  document.getElementById('dashboard-user').classList.add('hidden');
  document.getElementById('login-page').classList.remove('hidden');
  document.getElementById('nik').value = '';
  document.getElementById('password').value = '';
}
