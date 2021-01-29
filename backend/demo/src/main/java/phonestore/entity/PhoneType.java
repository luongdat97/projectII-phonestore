package phonestore.entity;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
 
@Entity
@Table(name = "phone_type")
public class PhoneType {
 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
    @Column(name = "id", nullable = false)
    private Long id;
	
    @OneToMany(cascade = CascadeType.ALL, mappedBy="phoneType", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Phone> phones; 
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "price")
    private Long price;
    
    @Column(name = "screen")
    private String screen;
    
    @Column(name = "screen_size")
    private Float screenSize;
    
    @Column(name = "os")
    private String os;
    
    @Column(name = "back_camera")
    private String backCamera;
    
    @Column(name = "front_camera")
    private String frontCamera;
    
    @Column(name = "battery")
    private int battery;
    
    @Column(name = "cpu")
    private String cpu;
    
    @Column(name = "ram")
    private String ram;
    
    @Column(name = "internal_memory")
    private String internalMemory;
    
    @Column(name = "sim")
    private String sim;
    
    @Column(name = "memory_stick")
    private String memoryStick;
    
    @Column(name = "promotion")
    private String promotion;
    
    @Column(name = "guarantee")
    private int guarantee;
    
    @Column(name = "inside_box")
    private String insideBox;
    
    @Column(name = "brand")
    private String brand;
    
    @Column(name = "release_day")
    private Date release;

	public PhoneType(Long id) {
		super();
		this.id = id;
	}

	public PhoneType() {
	}

	public Long getId() {
		return id;
	}

	public List<Phone> getPhones() {
		return phones;
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

	public void setId(Long id) {
		this.id = id;
	}

	public void setPhones(List<Phone> phones) {
		this.phones = phones;
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

	

	public Date getRelease() {
		return release;
	}

	public void setRelease(Date release) {
		this.release = release;
	}

	@Override
	public String toString() {
		return "PhoneType [id=" + id + ", phones=" + phones + ", name=" + name + ", price=" + price + ", screen="
				+ screen + "]";
	}

	

	
}
