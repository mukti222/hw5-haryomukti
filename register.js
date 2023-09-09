class DataHandler {
  constructor() {
    this.dataNama = [];
    this.dataUmur = [];
    this.dataSangu = [];
    this.currentIndex = 0;
    this.sudahrunUmurSangu = false;
  }

  getDataInput() {
    const namaInput = document.getElementById("nama");
    const umurInput = document.getElementById("umur");
    const sanguInput = document.getElementById("sangu");

    if (namaInput && umurInput && sanguInput) {
      const namaValue = namaInput.value;
      const umurValue = parseFloat(umurInput.value);
      const sanguValue = parseFloat(sanguInput.value);

      if (
        namaValue.length >= 10 &&
        !isNaN(umurValue) &&
        umurValue >= 25 &&
        !isNaN(sanguValue) &&
        sanguValue >= 100000 &&
        sanguValue <= 1000000
      ) {
        this.dataNama.push(namaValue);
        this.dataUmur.push(umurValue);
        this.dataSangu.push(sanguValue);
        document.getElementById("view").disabled = false;

        this.displaySuccessMessage("Berhasil submit!");

        localStorage.setItem("dataNama", JSON.stringify(this.dataNama));
        localStorage.setItem("dataUmur", JSON.stringify(this.dataUmur));
        localStorage.setItem("dataSangu", JSON.stringify(this.dataSangu));
      } else {
        this.displayErrorMessage("Error data tidak memenuhi minimum");
      }
    }
  }

  testNama() {
    const storedDataNama = JSON.parse(localStorage.getItem("dataNama"));
    if (storedDataNama && storedDataNama.length > 0) {
      const buat = document.createElement("td");
      const nama1 = document.createTextNode(
        storedDataNama[this.currentIndex]
      );
      buat.appendChild(nama1);

      document.getElementById("buatnama").appendChild(buat);
      this.currentIndex++;
    } else {
      console.log("DataNama is empty or missing in localStorage.");
    }
    if (this.currentIndex !== storedDataNama.length) {
      this.testNama();
    }
  }

  testResume(callback) {
    if (!this.sudahrunUmurSangu) {
      const storedDataUmur = JSON.parse(localStorage.getItem("dataUmur"));
      const storedDataSangu = JSON.parse(localStorage.getItem("dataSangu"));

      function calculateAverage(data) {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i];
        }
        return sum / data.length;
      }

      if (storedDataUmur && storedDataUmur.length > 0) {
    const ratasangu = calculateAverage(storedDataSangu);
    const rataumur = calculateAverage(storedDataUmur);
    const buatumur = document.createElement("td");
    let formattedRataUmur;


    if (rataumur === Math.floor(rataumur)) {
        formattedRataUmur = 'Rata" Umur : ' + rataumur + ", dan Rata\" sangu  : Rp." + ratasangu.toFixed(2);
    } else {
        formattedRataUmur = 'Rata" Umur : ' + rataumur.toFixed(2) + ", dan Rata\" sangu  : Rp." + ratasangu.toFixed(2);
    } const umur1 = document.createTextNode(formattedRataUmur);
        buatumur.appendChild(umur1);
        document.getElementById("buatresume").appendChild(buatumur);
        buatumur.colSpan = storedDataSangu.length;
        this.sudahrunUmurSangu = true;
      } else {
        console.log("DataUmur is empty or missing in localStorage.");
      }
      document.getElementById("buatbutton").disabled = true;
      
      // Automatically call the viewDataNama function as a callback
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      console.log("Function executed.");
    }
  }

  displaySuccessMessage(message) {
    const pesanerror = document.createElement("p");
    const error1 = document.createTextNode(message);
    pesanerror.appendChild(error1);
    pesanerror.style.color = "green";
    document.getElementById("pesanerr").appendChild(pesanerror);

    setTimeout(() => {
      pesanerror.textContent = "";
    }, 2000);
  }

  displayErrorMessage(message) {
    const pesanerror = document.createElement("p");
    const error1 = document.createTextNode(message);
    pesanerror.appendChild(error1);
    pesanerror.style.color = "darkred";
    document.getElementById("pesanerr").appendChild(pesanerror);

    setTimeout(() => {
      pesanerror.textContent = "";
    }, 2000);
  }
}

const dataHandler = new DataHandler();

function submitData() {
  dataHandler.getDataInput();
}
function viewDataNama() {
  dataHandler.testNama();
}
function viewDataResume() {
  dataHandler.testResume(viewDataNama);
}


