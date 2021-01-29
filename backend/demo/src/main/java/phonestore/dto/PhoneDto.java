package phonestore.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import phonestore.entity.CartPhone;
import phonestore.entity.PhoneType;

public class PhoneDto {
	
    private Long id;
    
    private String color;
    
    private String image;
    
    private int quantity;
    
    public PhoneDto() {
    	
    }

	public PhoneDto(String color, String image, int quantity) {
		super();
		this.color = color;
		this.image = image;
		this.quantity = quantity;
	}

	public Long getId() {
		return id;
	}

	public String getColor() {
		return color;
	}

	public String getImage() {
		return image;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
    
    
}
