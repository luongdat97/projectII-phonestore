package phonestore.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import phonestore.entity.Phone;

public class ShortenPhoneTypeDto {

	private Long id;

	private String image;

	private String name;

	private Long price;

	private Float screenSize;

	private String os;

	private int battery;

	private String cpu;

	private String ram;

	private String internalMemory;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public Long getPrice() {
		return price;
	}

	public Float getScreenSize() {
		return screenSize;
	}

	public String getOs() {
		return os;
	}

	public int getBattery() {
		return battery;
	}

	public String getCpu() {
		return cpu;
	}

	public String getRam() {
		return ram;
	}

	public String getInternalMemory() {
		return internalMemory;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPrice(Long price) {
		this.price = price;
	}


	public void setScreenSize(Float screenSize) {
		this.screenSize = screenSize;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public void setBattery(int battery) {
		this.battery = battery;
	}

	public void setCpu(String cpu) {
		this.cpu = cpu;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	public void setInternalMemory(String internalMemory) {
		this.internalMemory = internalMemory;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
