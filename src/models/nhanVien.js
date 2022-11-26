function NHANVIEN(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam,
  _loaiNhanVien
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.loaiNhanVien = "";

  //Method

  this.tinhTongLuong = function () {
    this.tongLuong = parseFloat(this.gioLam) * parseFloat(this.luongCoBan);
  };

  /**
   * Xếp loại
   */
  this.xepLoaiNV = function () {
    var content = "";
    if (this.gioLam < 160) {
      content = " Trung Bình";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      content = "Khá";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      content = "Giỏi";
    } else {
      content = "Xuất Sắc";
    }
    this.loaiNhanVien = content;
  };
}
