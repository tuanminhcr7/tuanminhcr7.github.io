function emailIsValid(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function save() {
	let code = document.getElementById('code').value;
	let fullname = document.getElementById('fullname').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('phone').value;
	let day = document.getElementById('day').value;
	let course = document.getElementById('course').value;
	let faculty = document.getElementById('faculty').value;
	let major = document.getElementById('major').value;
	let address = document.getElementById('address').value;
	let gender = '';


	if (document.getElementById('male').checked) {
		gender = document.getElementById('male').value;
	}
	else if (document.getElementById('female').checked) {
		gender = document.getElementById('female').value;
	}

	if(_.isEmpty(code)) {
		code = '';
		document.getElementById('code-error').innerHTML = 'Vui lòng nhập mã sinh viên!';
	}
	else if (code.trim().length > 10) {
		code = '';
		document.getElementById('code-error').innerHTML = 'Mã không đúng!';
	}
	else {
		document.getElementById('code-error').innerHTML = '';
	}


	if (_.isEmpty(fullname)) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ và tên!';
	}
	else if (fullname.trim().length <= 2) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Không được nhỏ hơn 2 kí tự!';
	}
	else if (fullname.trim().length > 50) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Không được lớn hơn 50 kí tự!';
	}
	else {
		document.getElementById('fullname-error').innerHTML = '';
	}


	if (_.isEmpty(email)) {
		email = '';
		document.getElementById('email-error').innerHTML = 'Vui lòng nhập email của bạn!';
	}
	else if(! emailIsValid(email)) {
		email = '';
		document.getElementById('email-error').innerHTML = 'Email không đúng định dạng!';
	}
	else {
		document.getElementById('email-error').innerHTML = '';
	}


	if (_.isEmpty(phone)) {
		phone = '';
		document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại!';
	}
	else if (phone.trim().length > 10) {
		phone = '';
		document.getElementById('phone-error').innerHTML = 'Số điện thoại không đúng!';
	}
	else {
		document.getElementById('phone-error').innerHTML = '';
	}


	if (_.isEmpty(day)) {
		day = '';
		document.getElementById('day-error').innerHTML = 'Vui lòng nhập ngày sinh!';
	}
	else {
		document.getElementById('day-error').innerHTML = '';
	}


	if (_.isEmpty(course)) {
		course = '';
		document.getElementById('course-error').innerHTML = 'Vui lòng nhập khóa !';
	}
	else {
		document.getElementById('course-error').innerHTML = '';
	}


	if (_.isEmpty(faculty)) {
		faculty = '';
		document.getElementById('faculty-error').innerHTML = 'Vui lòng nhập khoa!';
	}
	else {
		document.getElementById('faculty-error').innerHTML = '';
	}


	if (_.isEmpty(major)) {
		major = '';
		document.getElementById('major-error').innerHTML = 'Vui lòng nhập ngành học!';
	}
	else {
		document.getElementById('major-error').innerHTML = '';
	}


	if (_.isEmpty(address)) {
		address = '';
		document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ!';
	}
	else {
		document.getElementById('address-error').innerHTML = '';
	}


	if (_.isEmpty(gender)) {
		gender = '';
		document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính!';
	}
	else {
		document.getElementById('gender-error').innerHTML = '';
	}


	if (code && fullname && email && phone && address && gender) {
		// Lưu vào trong danh sách quản lí sinh viên
		let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

		students.push({
			code: code,
			fullname: fullname,
			email: email,
			phone: phone, 
			day: day,
			faculty: faculty,
			major: major,
			course: course,
			address: address,
			gender: gender
		});

		localStorage.setItem('students', JSON.stringify(students));

		this.renderListStudent();
	}
}

function renderListStudent() {
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

	if (students.length === 0) {
		document.getElementById('list-student').style.display = 'none';
		return false;
	}

	document.getElementById('list-student').style.display = 'block';

	let tableContent = `<tr>
				<td>#</td>
				<td>Mã sinh viên</td>
				<td>Họ và tên</td>
				<td>Email</td>
				<td>Điện thoại</td>
				<td>Ngày sinh</td>
				<td>Khoa</td>
				<td>Ngành học</td>
				<td>Khóa</td>
				<td>Giới tính</td>
				<td>Địa chỉ</td>
				<td>Hành động</td>
			</tr>`;

	students.forEach((student, index) => {
		let studentId = index;
		let genderLable = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
		index++;
			
			tableContent += `<tr>
				<td>${index}</td>
				<td>${student.code}</td>
				<td>${student.fullname}</td>
				<td>${student.email}</td>
				<td>${student.phone}</td>
				<td>${student.day}</td>
				<td>${student.faculty}</td>
				<td>${student.major}</td>
				<td>${student.course}</td>
				<td>${genderLable}</td>
				<td>${student.address}</td>
				<td>
					<a href='#' style="color: blue">Edit</a> | <a href='#' onclick='deleteStudent(${studentId})'  style="color: blue">Delete</a>
				</td>
			</tr>`
		})

		document.getElementById('grid-students').innerHTML = tableContent;
}

function deleteStudent(id) {
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	students.splice(id, 1);
	localStorage.setItem('students', JSON.stringify(students));
	renderListStudent();
}