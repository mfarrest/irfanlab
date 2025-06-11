const kursusByFakulti = {
    "Perakaunan": [
        { value: "AC220", text: "AC220 - Sarjana Muda Perakaunan (Kepujian)" }
    ],
    "Sains Pentadbiran dan Polisi": [
        { value: "AM235", text: "AM235 - Sarjana Muda Pentadbiran Korporat (Kepujian)" }
    ],
    "Sains Kesihatan": [
        { value: "HS241", text: "HS241 - Teknologi Makmal Perubatan" },
        { value: "HS243", text: "HS243 - Kesihatan & Keselamatan Persekitaran" }
    ],
    "Sains Gunaan": [
        { value: "AS201", text: "AS201 - Sains (Biologi)" },
        { value: "AS222", text: "AS222 - Sains (Kimia dgn Pengurusan)" }
    ],
    "Sains Sukan dan Rekreasi": [
        { value: "SR241", text: "SR241 - Pengurusan Sukan" },
        { value: "SR243", text: "SR243 - Sains Sukan" }
    ],
    "Komunikasi dan Media": [
        { value: "MC243", text: "MC243 - Komunikasi Massa (Penyiaran)" }
    ],
    "Sains Komputer dan Matematik": [
        { value: "CS240", text: "CS240 - Teknologi Maklumat" },
        { value: "CS248", text: "CS248 - Matematik Pengurusan" }
    ],
    "Pengurusan dan Perniagaan": [
        { value: "BA240", text: "BA240 - Pemasaran" },
        { value: "BA242", text: "BA242 - Kewangan" },
        { value: "BA243", text: "BA243 - HR" },
        { value: "BA246", text: "BA246 - Antarabangsa" },
        { value: "BA249", text: "BA249 - Perbankan Islam" }
    ],
    "Sains Maklumat": []
};

document.addEventListener("DOMContentLoaded", function () {
    $('#fakulti').select2({
        placeholder: "Sila Pilih Fakulti",
        allowClear: true
    });

    $('#kodKursus').select2({
        placeholder: "Sila Pilih Kod Kursus",
        allowClear: true
    });

    $('#fakulti').on('change', function () {
        const fakulti = $(this).val();
        const courses = kursusByFakulti[fakulti] || [];

        $('#kodKursus').empty().append('<option></option>');
        if (courses.length === 0) {
            $('#kodKursus').append('<option disabled selected>Tiada kursus untuk fakulti ini</option>');
        } else {
            courses.forEach(course => {
                $('#kodKursus').append(new Option(course.text, course.value));
            });
        }

        $('#kodKursus').trigger('change');
    });

 
    function showToast(message) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#d9534f";
        toast.style.color = "white";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "5px";
        toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
        toast.style.zIndex = "10000";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

   
    const kadPelajarInput = document.getElementById("kad_pelajar");
    const noKPInput = document.getElementById("no_kp");

    kadPelajarInput.addEventListener("input", () => {
        if (kadPelajarInput.value.length > 10) {
            showToast("⚠️ No. Kad Pelajar tidak boleh melebihi 10 digit.");
        }
    });

    noKPInput.addEventListener("input", () => {
        if (noKPInput.value.length > 12) {
            showToast("⚠️ No. KP tidak boleh melebihi 12 digit.");
        }
    });

    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const confirmSubmit = confirm("Adakah anda pasti mahu hantar borang penyertaan ini?");
        if (!confirmSubmit) return;

        const data = {
            nama_penuh: form.nama_penuh.value.trim(),
            kad_pelajar: form.kad_pelajar.value.trim(),
            no_kp: form.no_kp.value.trim(),
            tarikh_tamat: form.tarikh_tamat.value,
            fakulti: form.fakulti.value,
            kodKursus: form.kodKursus.value,
            alamat_kediaman: form.alamat_kediaman.value.trim(),
            no_hp: form.no_hp.value.trim(),
            kemahiran_muzik: form.kemahiran_muzik.value.trim(),
            nama_waris: form.nama_waris.value.trim(),
            tel_waris: form.tel_waris.value.trim()
        };

        // Validation
        if (!/^[A-Za-zÀ-ÿ\s'.-]+$/.test(data.nama_penuh)) return alert("Nama Penuh wajib diisi dan hanya huruf dibenarkan.");
        if (!/^\d{10}$/.test(data.kad_pelajar)) return alert("No. Kad Pelajar mesti 10 digit.");
        if (!/^\d{12}$/.test(data.no_kp)) return alert("No. KP mesti 12 digit.");
        if (!data.tarikh_tamat) return alert("Sila pilih Tarikh Tamat Pengajian.");
        if (!data.fakulti) return alert("Sila pilih Fakulti.");
        if (!data.kodKursus) return alert("Sila pilih Kod Kursus.");
        if (!data.alamat_kediaman) return alert("Alamat Kediaman wajib diisi.");
        if (!/^\d{10,11}$/.test(data.no_hp)) return alert("No. HP wajib diisi dan hanya nombor (10-11 digit).");
        if (!/^[A-Za-zÀ-ÿ\s'.-]+$/.test(data.nama_waris)) return alert("Nama Waris hanya huruf dibenarkan.");
        if (!/^\d{10,11}$/.test(data.tel_waris)) return alert("No. Tel Waris hanya nombor (10-11 digit).");

        const kursusText = $('#kodKursus option:selected').text();
        const previewTable = document.getElementById("previewTable");

        previewTable.innerHTML = `
            <tr><td>Nama Penuh</td><td>${data.nama_penuh}</td></tr>
            <tr><td>Kad Pelajar</td><td>${data.kad_pelajar}</td></tr>
            <tr><td>No. KP</td><td>${data.no_kp}</td></tr>
            <tr><td>Tarikh Tamat</td><td>${data.tarikh_tamat}</td></tr>
            <tr><td>Fakulti</td><td>${data.fakulti}</td></tr>
            <tr><td>Kursus</td><td>${kursusText}</td></tr>
            <tr><td>Alamat Kediaman</td><td>${data.alamat_kediaman}</td></tr>
            <tr><td>No HP</td><td>${data.no_hp}</td></tr>
            <tr><td>Kemahiran Muzik</td><td>${data.kemahiran_muzik}</td></tr>
            <tr><td>Nama Waris</td><td>${data.nama_waris}</td></tr>
            <tr><td>Tel Waris</td><td>${data.tel_waris}</td></tr>
        `;

        document.getElementById("preview").style.display = "block";
        alert("Borang dihantar dengan berjaya!");
    });
});
