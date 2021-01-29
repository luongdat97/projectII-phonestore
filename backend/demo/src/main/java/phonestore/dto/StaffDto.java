package phonestore.dto;

import java.util.Date;
import phonestore.entity.Role;

public class StaffDto {
	
	private Long id;
	
	private String name;
	
	private String email;
	
	private String phoneNumber;
	
	private Date birthday;
	
	private String address;
	
	private int active;
	
	private String username;

	private Role role;
	
	private String token;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public Date getBirthday() {
		return birthday;
	}

	public String getAddress() {
		return address;
	}

	public int getActive() {
		return active;
	}

	public String getUsername() {
		return username;
	}

	public Role getRole() {
		return role;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
