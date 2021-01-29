package phonestore.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import phonestore.entity.Phone;

public class CreatePhoneTypeDto {

	
    private Long id;
    
    private List<CreatePhoneDto> createPhoneDtos; 
    
    private String name;
    
    private Long price;
    
    private String screen;
    
    private Float screenSize;
    
    private String os;
    
    private String backCamera;
    
    private String frontCamera;
    
    private int battery;
    
    private String cpu;
    
    private String ram;
    
    private String internalMemory;
    
    private String sim;
    
    private String memoryStick;
    
    private String promotion;
    
    private int guarantee;
    
    private String insideBox;
    
    private String brand;
    
    private String release;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public Long getPrice() {
		return price;
	}

	public String getScreen() {
		return screen;
	}

	public Float getScreenSize() {
		return screenSize;
	}

	public String getOs() {
		return os;
	}

	public String getBackCamera() {
		return backCamera;
	}

	public String getFrontCamera() {
		return frontCamera;
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

	public String getSim() {
		return sim;
	}

	public String getMemoryStick() {
		return memoryStick;
	}

	public String getPromotion() {
		return promotion;
	}

	public int getGuarantee() {
		return guarantee;
	}

	public String getInsideBox() {
		return insideBox;
	}

	public String getBrand() {
		return brand;
	}

	public String getRelease() {
		return release;
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

	public void setScreen(String screen) {
		this.screen = screen;
	}

	public void setScreenSize(Float screenSize) {
		this.screenSize = screenSize;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public void setBackCamera(String backCamera) {
		this.backCamera = backCamera;
	}

	public void setFrontCamera(String frontCamera) {
		this.frontCamera = frontCamera;
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

	public void setSim(String sim) {
		this.sim = sim;
	}

	public void setMemoryStick(String memoryStick) {
		this.memoryStick = memoryStick;
	}

	public void setPromotion(String promotion) {
		this.promotion = promotion;
	}

	public void setGuarantee(int guarantee) {
		this.guarantee = guarantee;
	}

	public void setInsideBox(String insideBox) {
		this.insideBox = insideBox;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public void setRelease(String release) {
		this.release = release;
	}

	public List<CreatePhoneDto> getCreatePhoneDtos() {
		return createPhoneDtos;
	}

	public void setCreatePhoneDtos(List<CreatePhoneDto> createPhoneDtos) {
		this.createPhoneDtos = createPhoneDtos;
	}

	@Override
	public String toString() {
		return "CreatePhoneTypeDto [createPhoneDtos=" + createPhoneDtos.toString() + ", name=" + name + ", price=" + price
				+ ", screen=" + screen + "]";
	}

	

	
	
	
}
