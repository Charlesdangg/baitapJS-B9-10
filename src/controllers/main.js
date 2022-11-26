function getEle(id) {
  return document.getElementById(id);
}

//tao đối tượng  dsnv
var dsnv = new DANHSACHNHANVIEN();
var vadiation = new Validation();

getLocalStorage();

function layThongTinNhanVien() {
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCoBan = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  /**
   * Check Vadiation
   * b1 tạo ra 1 flag - cờ
   *
   */

  var isValid = true; //hơp lệ

  isValid &= vadiation.kiemtrarong(
    taiKhoan,
    "errorTK",
    "(*)Vui lòng nhập tài khoản "
  );
  isValid &= vadiation.kiemtrarong(hoTen, "errorName", "(*)Vui lòng nhập Tên ");
  isValid &= vadiation.kiemtrarong(
    email,
    "errorEmail",
    "(*)Vui lòng nhập Email "
  );
  isValid &= vadiation.kiemtrarong(
    matKhau,
    "errorMk",
    "(*)Vui lòng nhập Mật Khẩu "
  );
  isValid &= vadiation.kiemtrarong(
    ngayLam,
    "errorNl",
    "(*)Vui lòng nhập Ngày Làm"
  );
  isValid &= vadiation.kiemtrarong(
    luongCoBan,
    "errorLcb",
    "(*)Vui lòng nhập Lương Cơ Bản "
  );

  isValid &= vadiation.kiemtrarong(gioLam, "errorGl", "(*)Vui lòng Giờ Làm ");

  if (!isValid) return;

  var nv = new NHANVIEN(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );

  nv.tinhTongLuong();
  nv.xepLoaiNV();
  return nv;
}

/**
 *
 * Tìm nhân viên
 */

getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;

  var mangtimKiem = dsnv.timKiemNV(keyword);
  renderTable(mangtimKiem);
});

//reset form

function myFunction() {
  document.getElementById("formNV").reset();
}

///update sau khi sửa
getEle("btnCapNhat").style.display = "inline-block";

//update nhân viên
getEle("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTinNhanVien();
  dsnv.capNhatNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
});

//thêm nhân viên
getEle("btnThemNV").onclick = function () {
  var nv = layThongTinNhanVien();
  if (nv) {
    dsnv.themNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
  }
};
//edit nhân viên
function editNv(taiKhoan) {
  var nv = dsnv.suaNV(taiKhoan);

  if (nv) {
    //dom tới các thẻ input
    getEle("tknv").value = nv.taiKhoan;
    // getEle("tknv").disabled = true;
    /**
     *  nếu là mã nhân viên thì không cho sửa bằng cách
     *  getEle('tknv').disabled = true
     * */

    getEle("name").value = nv.hoTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}

//Delete nv
function deleteNv(taiKhoan) {
  // console.log(taiKhoan);
  dsnv.xoaNV(taiKhoan);
  // sau khi xóa phải render lại danh sách mới
  renderTable(dsnv.arr);
  //và phải gọi lại hàm lưu trên web để cập nhật lại
  setLocalStorage();
}

function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
      <tr>
      <td>${nv.taiKhoan}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngayLam}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.tongLuong}</td>
      <td>${nv.loaiNhanVien}</td>
      <td>
      <button  data-toggle="modal"
      data-target="#myModal" class=" btn btn-success" onclick="editNv('${nv.taiKhoan}')">Edit</button>
         <button class="btn btn-danger"onclick="deleteNv('${nv.taiKhoan}')">Delete</button>
      </td>
      <tr>

      

      `;
  }
  getEle("tableDanhSach").innerHTML = content;

  // Xóa Nhân viên
}
//lưu dữ liệu trên web như storage, cokkie ...

function setLocalStorage() {
  // ta phải convert dữ liệu từ json - string mới lưu lên trên dc
  var dataString = JSON.stringify(dsnv.arr);
  //lưu danh sách lên web
  localStorage.setItem("DSNV", dataString);
}
function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    // phải thêm điều kiện khi lưu dữ liệu nếu k sẽ lỗi, vì máy khác k được lưu
    var dataString = localStorage.getItem("DSNV");
    //Convers string sang JSON
    dsnv.arr = JSON.parse(dataString);
    renderTable(dsnv.arr);
  }
}
