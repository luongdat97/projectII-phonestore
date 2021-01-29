package phonestore.controller;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;
import phonestore.dao.StaffDao;
import phonestore.dao.OrderDao;
import phonestore.dao.PhoneDao;
import phonestore.entity.Staff;


@RestController
public class StaffController {
	@Autowired 
	private StaffDao staffDao;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@PostMapping("/staff")
	Long createNewStaff(@RequestBody Staff staff) {
		System.out.println(".....................");
		Staff existStaff = staffDao.findStaffByUsername(staff.getUsername());
		Boolean isExist = (existStaff != null) ? true : false;
		if (isExist) {
			return 0L;
		} else {
			staff.setPassword(bcryptEncoder.encode(staff.getPassword()));
			staffDao.saveStaff(staff);
			return 1L;
		}
	}
	
	
	@GetMapping("/staff")
	List<Staff> getAllStaff() {
		System.out.println("gettttttttttttttttttttttttttttt");
		List<Staff> staffs = staffDao.findAllStaff();
		for (Staff staff : staffs) {
			staff.setOrders(null);
			staff.setPassword(null);
		}
		return staffs;
	}
	
	@PutMapping("/staff/{staffId}")
	Long editStaff(@PathVariable Long staffId, @RequestBody Staff staff ) {
		System.out.println("puttt");
		Staff staffOld = staffDao.findStaffById(staffId);
		staffOld.setName(staff.getName());
		staffOld.setBirthday(staff.getBirthday());
		staffOld.setPhoneNumber(staff.getPhoneNumber());
		staffOld.setAddress(staff.getAddress());
		staffOld.setEmail(staff.getEmail());
		staffOld.setRole(staff.getRole());
		staffDao.updateStaff(staffOld);
		return 1L;
	}
	
	@GetMapping("/staff/{staffId}")
	Staff getStaff(@PathVariable Long staffId) {
		Staff staff = staffDao.findStaffById(staffId);
		return staff;
	}
	
	@PutMapping("/staff/{staffId}/reset-password")
	Long editStaffPassword(@PathVariable Long staffId, @RequestBody String password ) {
		Staff staffOld = staffDao.findStaffById(staffId);
		staffOld.setPassword(bcryptEncoder.encode(password));
		staffDao.updateStaff(staffOld);
		return 1L;
	}
	
	@PutMapping("/staff/{staffId}/change-state")
	Long editStaffState(@PathVariable Long staffId, @RequestBody int active ) {
		Staff staffOld = staffDao.findStaffById(staffId);
		staffOld.setActive(active);
		staffDao.updateStaff(staffOld);
		return 1L;
	}
	
	@PutMapping("/staff/{staffId}/change-password")
	Long changePassword(@PathVariable Long staffId, @RequestBody Map<String, String> json ) {
		Staff staffOld = staffDao.findStaffById(staffId);
		if (!bcryptEncoder.matches(json.get("oldPassword"), staffOld.getPassword())) {
			return 0L;
		}
		staffOld.setPassword(bcryptEncoder.encode(json.get("newPassword")));
		staffDao.updateStaff(staffOld);
		return 1L;
	}

}
