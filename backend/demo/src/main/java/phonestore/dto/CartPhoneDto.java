package phonestore.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

import phonestore.entity.Phone;
import phonestore.entity.Cart;
import phonestore.entity.CartPhone;

public class CartPhoneDto {
	
	private Long id;
	
	private Phone phone;
	
	private int quantity;

	public Long getId() {
		return id;
	}

	public Phone getPhone() {
		return phone;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setPhone(Phone phone) {
		this.phone = phone;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	
    
}