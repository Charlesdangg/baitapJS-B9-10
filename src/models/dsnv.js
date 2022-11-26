function DANHSACHNHANVIEN() {
  this.arr = [];

  this.themNV = function (sv) {
    this.arr.push(sv);
  };
  this.timvitriNV = function (taiKhoan) {
    /**
     * Giải thuật bằng cách tìm vị trí
     * 0. tạo biến index gán -1 ( Không tìm thấy)
     * 1.Duyệt mảng
     * nv = arr[i]
     * 2. nếu nv.taiKhoan trùng với tài khoản
     * ==> true => gán i cho biến index
     */
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      if (nv.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };
  this.xoaNV = function (taiKhoan) {
    var index = this.timvitriNV(taiKhoan);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.suaNV = function (taiKhoan) {
    //tìm vị trí sinh viên
    var index = this.timvitriNV(taiKhoan);

    if (index !== -1) {
      var nv = this.arr[index];
      return this.arr[index];
    }
  };
  this.capNhatNV = function (nv) {
    //tim vi tri nv cần update
    var index = this.timvitriNV(nv.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };

  this.timKiemNV = function (keyword) {
    var mangTimKiem = [];

    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      var tenNV = nv.hoTen.toLowerCase();
      var keywordLowerCase = keyword.toLowerCase();

      if (tenNV.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(nv);
      }
    }
    return mangTimKiem;
  };
}
