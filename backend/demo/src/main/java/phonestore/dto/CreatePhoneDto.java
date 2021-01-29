package phonestore.dto;

import java.io.File;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.web.multipart.MultipartFile;

import phonestore.entity.CartPhone;
import phonestore.entity.PhoneType;

public class CreatePhoneDto {
	
    private Long id;
    
    private String image;
    
    private String color;
        
    private int quantity;
    
    public CreatePhoneDto() {
    	
    }

	public Long getId() {
		return id;
	}

	public String getColor() {
		return color;
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

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "CreatePhoneDto [image=" + image + ", color=" + color + ", quantity=" + quantity + "]";
	}

	
}
