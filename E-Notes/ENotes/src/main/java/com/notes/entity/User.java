package com.notes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String fullname;
	private String address;
	private String email;
	private String password;
	private String mobileNo;
	private String role;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", fullname=" + fullname + ", address=" + address + ", email=" + email + ", password="
				+ password + ", mobileNo=" + mobileNo + ", role=" + role + "]";
	}

	public User() {
	}

	public User(int id, String role, String mobileNo, String password, String email, String address, String fullname) {
		this.id = id;
		this.role = role;
		this.mobileNo = mobileNo;
		this.password = password;
		this.email = email;
		this.address = address;
		this.fullname = fullname;
	}
}
